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
        header: "EB Garamond",
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
          secondary: "#5a4a3a",
          tertiary: "#8a7355",
          highlight: "rgba(138, 115, 85, 0.10)",
          textHighlight: "#e8d8a888",
        },
        darkMode: {
          light: "#1a1816",
          lightgray: "#332f2a",
          gray: "#6b6358",
          darkgray: "#d4cfc4",
          dark: "#ebe7df",
          secondary: "#c4a87a",
          tertiary: "#8a7355",
          highlight: "rgba(196, 168, 122, 0.10)",
          textHighlight: "#8a735588",
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
