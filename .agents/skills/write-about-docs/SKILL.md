---
name: Write About Documentation
description: Rules, stylistic guidelines, and patterns for creating documentation pages for the About section (guides, architecture, core concepts) in the react-native-materia library.
---

# Write About Documentation

When tasked with writing or updating documentation for the **About** section (such as Getting Started, Provider, Theming, Tokens, Typography, Iconography, Portal, etc.) in `react-native-materia`, you MUST adhere to the custom architecture and stylistic guidelines established for this project.

## 1. File Structure
Documentation consists of two synchronized files per topic:
1. **Markdown Content**: `docs/content/<topic_name>.md` (e.g., `getting-started.md`, `theming.md`, `provider.md`)
2. **React Page**: `docs/app/about/<topic_name>.tsx`

Additionally, ensure the route is registered in the navigation sidebar in `docs/components/NavBar/NavBar.tsx` under `<NavBarSubheader>About</NavBarSubheader>`.

## 2. Markdown Guidelines (`docs/content/*.md`)
The markdown file handles text explanations, conceptual architecture, and static code examples. Because the project uses a lightweight custom markdown parser (`docs/utils/md-parser.ts`), you must strictly respect its syntax rules and limitations:

- **Header Hierarchy**:
  - Use `# <TopicTitle>` (H1) for the main page header. It must be at the root level.
  - Use `## <Section>` (H2) for major sections (`Overview`, `Setup`, `Usage`, `Configuration`, `API`, `Hooks`).
  - Use `### <Sub-section>` (H3) for sub-topics, variants, or individual hooks.
  - Do NOT use H4 (`####`) or deeper, as the custom parser only supports up to H3.
- **Unsupported Formatting (IMPORTANT)**:
  - Do NOT use markdown lists (neither bulleted `- ` / `* ` nor numbered `1. `). The parser does not parse list items and will render them incorrectly as unbroken text. Use regular paragraphs or `###` sub-sections instead.
  - Do NOT use bold markdown syntax (`**text**` or `__text__`). The custom inline renderer does not parse bold tags.
  - Do NOT use blockquotes (`> text`). Blockquotes are not supported by the parser.
  - Separate all paragraphs and blocks with double newlines (`\n\n`).
- **Inline Formatting**:
  - Always enclose component names, filenames (e.g., `App.tsx`), package names (e.g., `react-native-gesture-handler`), symbols, types, prop names, values, numbers (e.g., `57`, `64`), and code references in backticks (e.g., `` `MateriaProvider` ``, `` `useMateriaTheme` ``, `` `"system"` ``).
  - Always use double quotes (`"..."`) for string values and string literal types (e.g., `` `"light" | "dark" | "system"` ``, `` `"standard"` ``), matching codebase style.
  - Use standard markdown links for references (e.g., `[Material Theme Builder](https://material-foundation.github.io/material-theme-builder/)` or internal routes like `[Theming](/about/theming)`). The custom renderer automatically converts these to interactive `InlineLink` components.
- **Props Formatting Standard**:
  - When documenting props with `### <propName>`, strictly follow this pattern:
    ```markdown
    ### <propName>

    `<Type>`

    Description paragraph explaining what the prop controls.

    Default value: `<defaultValue>`
    ```
  - Do NOT use labels like `Type: ...` or bullet points. The type must be its own paragraph in backticks directly under the `###` header, followed by the description, and finally `Default value: ...` (if applicable).
  - Use double quotes for string literal types and default string values (e.g., `` `"system"` ``, `` `"standard" | "medium" | "high"` ``).
- **Interactive Demos (Slots)**:
  - If a live demo or interactive figure is needed, do NOT write JSX inside markdown. Instead, use slot placeholders: `<!-- SLOT: DEMO_NAME -->`.
- **Code Snippets**:
  - Use standard markdown code fences (e.g., ` ```tsx `, ` ```bash `, ` ```js `).
  - Always write complete, copy-pasteable snippets rather than truncating with `...`.

## 3. React Page Guidelines (`docs/app/about/*.tsx`)
The React page imports the markdown content and renders it via `MarkdownRenderer`, optionally providing live components for defined slots.

- **Importing Markdown**: Import the `.md` file directly:
  ```tsx
  import themingContent from "@/content/theming.md";
  ```
- **Structure & Wrapper**: Always wrap the page in `<PageContent>`:
  ```tsx
  import React from "react";
  import Head from "expo-router/head";
  import { PageContent } from "@/components/Page/PageContent";
  import { MarkdownRenderer } from "@/components/MarkdownRenderer";
  import themingContent from "@/content/theming.md";

  const ThemingPage = () => {
    return (
      <PageContent>
        <Head>
          <title>React Native Materia - Theming</title>
        </Head>
        <MarkdownRenderer content={themingContent} />
      </PageContent>
    );
  };

  export default ThemingPage;
  ```
- **SEO/Title**: Always include `<Head>` from `expo-router/head` inside `<PageContent>` with title format `React Native Materia - <TopicTitle>`.
- **Slots & Figures**: If slots are defined in the markdown, supply them via the `slots` prop of `<MarkdownRenderer>`. Every interactive demo must be wrapped in `<Figure>`.

## 4. Standard Documentation Layout
An About/Guide documentation page should follow a clear, logical structure:
1. **Title & Summary**: `# TopicTitle` followed by a concise description explaining what this part of the core architecture does.
2. **Overview / Key Concepts**: `## Overview` or `## Architecture` breaking down how the feature works.
3. **Usage / Setup**: `## Usage` or `## Setup` with complete, realistic code snippets demonstrating imports and configuration.
4. **Behavioral & Runtime Requirements**: Place essential architecture behavior sections (e.g., `## Gesture Handling`, provider requirements) early, immediately following `Usage` and before API references.
5. **Detailed Specifications / Props**: `## Props` with `###` subsections formatted according to the Props Formatting Standard.
6. **Context Hooks / API**: For features providing React hooks (such as `useMateriaColors`, `useMateriaTokens`), document each hook with complete code snippets.
7. **Related Links**: Link to related core guides or external tools (e.g., Material Theme Builder, Material Design 3 guidelines).
