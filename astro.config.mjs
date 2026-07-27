import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections";
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import swup from "@swup/astro";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import mermaid from "astro-mermaid";
import satteriCallouts from "satteri-callouts";
import { expressiveCodeConfig } from "./src/config.ts";
import { pluginCustomCopyButton } from "./src/plugins/expressive-code/custom-copy-button.ts";
import { pluginLanguageBadge } from "./src/plugins/expressive-code/language-badge.ts";
import { satteriKatex } from "./src/plugins/satteri-katex.mjs";

// https://astro.build/config
export default defineConfig({
	site: "https://faina.dev",
	base: "/",
	trailingSlash: "always",
	integrations: [
		mermaid({
			theme: "default",
			autoTheme: true,
		}),
		tailwind({ nesting: true }),
		swup({
			animationClass: "transition-swup-",
			smoothScrolling: true,
			cache: true,
			preload: true,
			accessibility: true,
			updateHead: true,
			updateBodyClass: false,
			globalInstance: true,
		}),
		icon({
			include: {
				"preprocess: vitePreprocess(),": ["*"],
				"fa6-brands": ["*"],
				"fa6-regular": ["*"],
				"fa6-solid": ["*"],
			},
		}),
		expressiveCode({
			themes: [expressiveCodeConfig.theme, expressiveCodeConfig.theme],
			plugins: [
				pluginCollapsibleSections(),
				pluginLineNumbers(),
				pluginLanguageBadge(),
				pluginCustomCopyButton(),
			],
			defaultProps: {
				wrap: true,
				overridesByLang: {
					shellsession: { showLineNumbers: false },
				},
			},
			styleOverrides: {
				codeBackground: "var(--codeblock-bg)",
				borderRadius: "0.75rem",
				borderColor: "none",
				codeFontSize: "0.875rem",
				codeFontFamily:
					"'JetBrains Mono Variable', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
				codeLineHeight: "1.5rem",
				frames: {
					editorBackground: "var(--codeblock-bg)",
					terminalBackground: "var(--codeblock-bg)",
					terminalTitlebarBackground: "var(--codeblock-topbar-bg)",
					editorTabBarBackground: "var(--codeblock-topbar-bg)",
					editorActiveTabBackground: "none",
					editorActiveTabIndicatorBottomColor: "var(--primary)",
					editorActiveTabIndicatorTopColor: "none",
					editorTabBarBorderBottomColor: "var(--codeblock-topbar-bg)",
					terminalTitlebarBorderBottomColor: "none",
				},
				textMarkers: {
					delHue: 0,
					insHue: 180,
					markHue: 250,
				},
			},
			frames: {
				showCopyToClipboardButton: false,
			},
		}),
		svelte(),
		sitemap(),
	],
	// markdown: {
	// 	remarkPlugins: [
	// 		remarkMath,
	// 		remarkReadingTime,
	// 		remarkExcerpt,
	// 		remarkGithubAdmonitionsToDirectives,
	// 		remarkDirective,
	// 		remarkSectionize,
	// 		parseDirectiveNode,
	// 	],
	// 	rehypePlugins: [
	// 		rehypeKatex,
	// 		rehypeSlug,
	// 		[
	// 			rehypeComponents,
	// 			{
	// 				components: {
	// 					github: GithubCardComponent,
	// 					note: (x, y) => AdmonitionComponent(x, y, "note"),
	// 					tip: (x, y) => AdmonitionComponent(x, y, "tip"),
	// 					important: (x, y) => AdmonitionComponent(x, y, "important"),
	// 					caution: (x, y) => AdmonitionComponent(x, y, "caution"),
	// 					warning: (x, y) => AdmonitionComponent(x, y, "warning"),
	// 				},
	// 			},
	// 		],
	// 		[
	// 			rehypeAutolinkHeadings,
	// 			{
	// 				behavior: "append",
	// 				properties: { className: ["anchor"] },
	// 				content: {
	// 					type: "element",
	// 					tagName: "span",
	// 					properties: {
	// 						className: ["anchor-icon"],
	// 						"data-pagefind-ignore": true,
	// 					},
	// 					children: [{ type: "text", value: "#" }],
	// 				},
	// 			},
	// 		],
	// 	],
	// },
	markdown: {
		processor: satteri({
			hastPlugins: [satteriCallouts(), satteriKatex()],
			features: {
				directive: true,
				math: true,
				headingAttributes: true,
			},
		}),
	},
	vite: {
		build: {
			cssMinify: false,
			rollupOptions: {
				onwarn(warning, warn) {
					if (
						warning.message.includes("is dynamically imported by") &&
						warning.message.includes("but also statically imported by")
					) {
						return;
					}
					warn(warning);
				},
			},
		},
	},
});
