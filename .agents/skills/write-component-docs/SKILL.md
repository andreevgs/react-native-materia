---
name: Write Component Documentation
description: Rules and patterns for creating documentation pages for UI components in the react-native-materia library.
---

# Write Component Documentation

When tasked with writing or updating documentation for a UI component in `react-native-materia`, you MUST adhere to the custom architecture and stylistic guidelines established for this project.

## 1. File Structure
Documentation consists of two synchronized files per component:
1. **Markdown Content**: `docs/content/<component_name>.md`
2. **React Page**: `docs/app/components/<component_name>.tsx`

## 2. Markdown Guidelines (`docs/content/*.md`)
The markdown file handles the text, structure, and static code snippets.
- **Header Hierarchy**:
  - Use `# <ComponentName>` (H1) for the main page header. It must be at the root level.
  - Use `## <Section>` (H2) for major sections (`Usage`, `Variants`, `States`, `Icons`, `Props`, `Types`).
  - Use `### <Sub-section>` (H3) for individual variants, props, or types. Do NOT use H4 (`####`) or deeper, as the custom parser only supports up to H3.
- **Interactive Demos (Slots)**: Do not attempt to write JSX/React components inside the markdown file. Instead, use slot placeholders exactly formatted as `<!-- SLOT: DEMO_NAME -->`.
- **Inline Formatting**:
  - Always enclose component names, filenames (e.g., `Button.tsx`), package names, symbols, types, prop names, values, numbers (e.g., `18`, `24`), and code references in backticks (e.g., `` `Button` ``, `` `"filled"` ``, `` `disabled` ``).
  - Always use double quotes (`"..."`) for string values and string literal types (e.g., `` `"filled" | "outlined"` ``, `` `"standard"` ``), matching codebase style.
  - Use markdown links for referencing other sections (e.g., `[Iconography](/icons/iconography)`). The custom renderer will automatically turn these into interactive `InlineLink` components.
- **Props Formatting Standard**:
  - When documenting props under `## Props` with `### <propName>`, strictly follow this pattern:
    ```markdown
    ### <propName>

    `<Type>`

    Description paragraph explaining what the prop controls.

    Default value: `<defaultValue>`
    ```
  - Do NOT use labels like `Type: ...` or bullet points. The type must be its own paragraph in backticks directly under the `###` header, followed by the description, and finally `Default value: ...` (if applicable).
  - Use double quotes for string literal types and default string values (e.g., `` `"filled"` ``, `` `"filled" | "tonal"` ``).
- **Unsupported Formatting (IMPORTANT)**:
  - Do NOT use markdown lists (neither bulleted `- ` / `* ` nor numbered `1. `). The parser does not parse list items and will render them incorrectly as unbroken text. Use regular paragraphs or `###` sub-sections instead.
  - Do NOT use bold markdown syntax (`**text**` or `__text__`). The custom inline renderer does not parse bold tags.
  - Do NOT use blockquotes (`> text`). Blockquotes are not supported by the parser.
  - Separate all paragraphs and blocks with double newlines (`\n\n`).
- **Code Snippets**: Use standard markdown code fences (e.g., ` ```tsx `) for static code examples. Always write out complete code snippets instead of shortening them with `...` to allow users to copy-paste easily.

## 3. React Page Guidelines (`docs/app/components/*.tsx`)
The React page imports the markdown and renders it using `MarkdownRenderer`, supplying the live React components for the defined slots.
- **Importing Markdown**: Import the `.md` file directly (it is processed by a custom Metro transformer into a string).
  ```tsx
  import buttonContent from "@/content/button.md";
  ```
- **Rendering**: Wrap the page in `<PageContent>` and use `<MarkdownRenderer>`.
- **Figure Wrapper**: EVERY live demo provided in the `slots` object MUST be wrapped in the `<Figure>` component. If you need flexbox behavior to align items in a row, use the `<RowWrap>` component inside the `<Figure>` (e.g., `<Figure><RowWrap><Button /><Button /></RowWrap></Figure>`).
- **SEO/Title**: Always include the `<Head>` component from `expo-router/head` inside `<PageContent>` to set the page title format to `React Native Materia - <ComponentName>`.
  ```tsx
  import Head from "expo-router/head";
  // ...
  <PageContent>
    <Head>
      <title>React Native Materia - ComponentName</title>
    </Head>
    <MarkdownRenderer
      content={buttonContent}
      slots={{
        DEMO_MAIN: (
          <Figure>
            <Button mode="filled">Click Me</Button>
          </Figure>
        ),
      }}
    />
  </PageContent>
  ```

## 4. Standard Documentation Layout
A complete component documentation page must include the following sections in order:
1. **Title & Description**: `# ComponentName` followed by a brief introduction.
2. **Main Preview**: `<!-- SLOT: DEMO_MAIN -->` showing the primary use cases.
3. **Usage**: `## Usage` section with a basic `tsx` code snippet.
4. **Variants/States**: `## Variants` and `## States`. Each variant/state must have a subheader (`###`), a brief description, a demo slot, and a one-line code snippet.
5. **Props**: `## Props` section listing all properties as subheaders (`###`) with their TS type and description.
6. **Types**: `## Types` section listing related TS interfaces/types with code snippets.
