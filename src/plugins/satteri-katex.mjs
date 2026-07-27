import katex from "katex";

function hasClass(node, className) {
	const value = node?.properties?.className ?? node?.properties?.class;
	if (Array.isArray(value)) return value.includes(className);
	if (typeof value === "string") return value.split(/\s+/).includes(className);
	return false;
}

function raw(value) {
	return { type: "raw", value };
}

function renderMath(tex, displayMode) {
	return katex.renderToString(tex.trim(), {
		displayMode,
		throwOnError: false,
		strict: "warn",
		output: "html",
	});
}

function getMathCodeChild(node) {
	const children = node?.children;
	if (!Array.isArray(children)) return undefined;
	return children.find(
		(child) => child?.type === "element" && child.tagName === "code" && hasClass(child, "language-math"),
	);
}

export function satteriKatex() {
	return {
		element: [
			{
				filter: ["pre"],
				visit(node, ctx) {
					const code = getMathCodeChild(node);
					if (!code) return;

					const tex = ctx.textContent(code);
					if (!tex.trim()) return;

					try {
						ctx.replaceNode(node, raw(renderMath(tex, true)));
					} catch (error) {
						ctx.report({
							message: `Failed to render display KaTeX: ${error instanceof Error ? error.message : String(error)}`,
							node,
							severity: "warning",
						});
					}
				},
			},
			{
				filter: ["code"],
				visit(node, ctx) {
					if (!hasClass(node, "language-math") || !hasClass(node, "math-inline")) return;

					const tex = ctx.textContent(node);
					if (!tex.trim()) return;

					try {
						ctx.replaceNode(node, raw(renderMath(tex, false)));
					} catch (error) {
						ctx.report({
							message: `Failed to render inline KaTeX: ${error instanceof Error ? error.message : String(error)}`,
							node,
							severity: "warning",
						});
					}
				},
			},
		],
	};
}
