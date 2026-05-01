import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Clio's Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "cliosgarden.cacheatelier.work",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: { name: "Fira Code", weights: [300] },
        body: "EB Garamond",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f5",
          lightgray: "#e5e2dc",
          gray: "#a89f93",
          darkgray: "#3e3a35",
          dark: "#1f1d1a",
          secondary: "#0000ee",
          tertiary: "#3030cc",
          highlight: "rgba(170, 216, 249, 0.30)",
          textHighlight: "#aad8f9",
        },
        darkMode: {
          light: "#1a1816",
          lightgray: "#332f2a",
          gray: "#6b6358",
          darkgray: "#d4cfc4",
          dark: "#ebe7df",
          secondary: "#7ab3ff",
          tertiary: "#4a8bdb",
          highlight: "rgba(170, 216, 249, 0.15)",
          textHighlight: "#aad8f94d",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // CustomOgImages disabled for build speed; re-enable post-launch.
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
