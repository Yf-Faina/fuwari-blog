import GithubSlugger from "github-slugger";

function headingLink(slug, text, children = []) {
	return {
		type: "element",
		tagName: "a",
		properties: {
			className: ["anchor"],
			href: `#${slug}`,
			ariaLabel: `Link to ${text}`,
			"data-pagefind-ignore": true,
		},
		children: [
			...children,
			{
				type: "element",
				tagName: "svg",
				properties: {
					className: ["anchor-icon"],
					viewBox: "0 0 24 24",
					ariaHidden: "true",
					focusable: "false",
				},
				children: [
					{
						type: "element",
						tagName: "path",
						properties: {
							d: "M10.59 13.41a2 2 0 0 0 2.82 0l4-4a2 2 0 0 0-2.82-2.82l-1.3 1.29-1.42-1.41 1.3-1.3a4 4 0 0 1 5.66 5.66l-4 4a4 4 0 0 1-5.66 0l-1.3-1.3 1.42-1.41 1.3 1.29Zm2.82-2.82a2 2 0 0 0-2.82 0l-4 4a2 2 0 0 0 2.82 2.82l1.3-1.29 1.42 1.41-1.3 1.3a4 4 0 0 1-5.66-5.66l4-4a4 4 0 0 1 5.66 0l1.3 1.3-1.42 1.41-1.3-1.29Z",
						},
						children: [],
					},
				],
			},
		],
	};
}

function containsLink(node) {
	if (node.type === "element" && node.tagName === "a") return true;
	return node.children?.some(containsLink) ?? false;
}

export function satteriHeadingLinks() {
	const slugger = new GithubSlugger();

	return {
		name: "heading-links",
		element: {
			filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
			visit(node, ctx) {
				const text = ctx.textContent(node);
				const existingId = node.properties?.id;
				const slug =
					typeof existingId === "string" ? existingId : slugger.slug(text);

				// Avoid invalid nested anchors for the rare heading that already contains a link.
				if (containsLink(node)) {
					if (typeof existingId !== "string") {
						ctx.setProperty(node, "id", slug);
					}
					ctx.appendChild(node, headingLink(slug, text));
					return;
				}

				ctx.replaceNode(node, {
					...node,
					properties: { ...node.properties, id: slug },
					children: [headingLink(slug, text, node.children)],
				});
			},
		},
	};
}
