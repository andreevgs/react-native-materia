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

Additionally, register the route in `docs/components/NavBar/NavBar.tsx` under `<NavBarSubheader>Components</NavBarSubheader>` and add a link in `docs/content/index.md`.

## 2. Markdown Guidelines (`docs/content/*.md`)
The markdown file handles the text, structure, and static code snippets.
- **Header Hierarchy**:
  - Use `# <ComponentName>` (H1) for the main page header. It must be at the root level.
  - Use `## <Section>` (H2) for major sections (`Usage`, `Variants`, `States`, `Icons`, `Props`, `Types`).
  - Use `### <Sub-section>` (H3) for individual variants, props, or types. Do NOT use H4 (`####`) or deeper, as the custom parser only supports up to H3.
- **Interactive Demos (Slots)**: Do not attempt to write JSX/React components inside the markdown file. Instead, use slot placeholders exactly formatted as `<!-- SLOT: DEMO_NAME -->`.
- **Inline Formatting & Readability**:
  - Enclose component names, filenames (e.g., `Button.tsx`), package names, symbols, types, prop names, and short literal values in backticks (e.g., `` `Button` ``, `` `"filled"` ``, `` `disabled` ``).
  - Keep inline code density readable: `InlineCode` renders as highlighted pills, so avoid crowding a paragraph with excessive backticked tokens or numbers when plain prose is clearer.
  - Do NOT wrap multi-word property assignments, inline style objects, or code expressions (e.g., `` `flexDirection: "row"` ``, `` `style={{ alignSelf: "flex-start" }}` ``) in backticks inside prose, as they wrap awkwardly across lines. Describe the behavior in plain language and show exact styles in `tsx` code blocks.
  - Do NOT reference internal theme color roles (e.g., `colors.surfaceContainerLow`, `colors.secondaryContainer`, `colors.onSurface`) or internal token paths (e.g., `tokens.elevation.level1`, `stateOpacity.*`) when explaining a component's visual states; describe the observable appearance directly (e.g., "filled active container", "subtle shadow elevation", "muted disabled styling").
  - Always use double quotes (`"..."`) for string values and string literal types (e.g., `` `"filled" | "outlined"` ``, `` `"standard"` ``), matching codebase style.
  - Use markdown links for referencing other sections (e.g., `[Iconography](/about/iconography)`). The custom renderer will automatically turn these into interactive `InlineLink` components.
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
- **Tone & Intro Style**:
  - Write in a concise, neutral, engineering tone rather than promotional or marketing copy.
  - Keep the introductory paragraph under `# <ComponentName>` to 1–2 direct sentences describing what the component does, where/how it is used in the UI, and its primary capabilities.
  - Do NOT repeat boilerplate openers like `"implements the Material Design 3 ... specification with ..."` or hype adjectives (`"seamlessly"`, `"mathematically harmonious"`, `"organic"`, `"fluid"`, `"comprehensive"`), and do not cram internal animation or implementation details into the intro when they are already covered in dedicated sections below.
- **Code Snippets**:
  - Use standard markdown code fences (e.g., ` ```tsx `) for static code examples. Always write out complete code snippets instead of shortening them with `...` to allow users to copy-paste easily.
  - Align the `## Usage` code snippet with the primary (or first) item shown in `DEMO_MAIN`.
  - When a snippet defines container spacing or `StyleSheet` layout rules, use `useMateriaTokens()` (with `Tokens` from `react-native-materia/types`) and a memoized `createStyles(tokens)` factory (`useMemo(() => createStyles(tokens), [tokens])`) rather than hardcoded magic numbers. Define `createStyles` where first introduced (such as `Usage` or `Layout`), and in follow-up snippets on the same page reference `<View style={styles.<name>}>` directly instead of repeating full style definitions.

## 3. React Page Guidelines (`docs/app/components/*.tsx`)
The React page imports the markdown and renders it using `MarkdownRenderer`, supplying the live React components for the defined slots.
- **Importing Markdown**: Import the `.md` file directly (it is processed by a custom Metro transformer into a string).
  ```tsx
  import buttonContent from "@/content/button.md";
  ```
- **Rendering**: Wrap the page in `<PageContent>` and use `<MarkdownRenderer>`.
- **Figure Wrapper**: EVERY live demo provided in the `slots` object MUST be wrapped in the `<Figure>` component. If you need flexbox behavior to align items in a row, use the `<RowWrap>` component inside the `<Figure>` (e.g., `<Figure><RowWrap><Button /><Button /></RowWrap></Figure>`).
- **Semantic Unity in Demos**: Keep items within each demo slot cohesive around one realistic domain scenario (e.g., connectivity toggles, catalog search filters, place discovery suggestions). Avoid mixing unrelated contexts or using meta-labels named after internal prop behavior (such as `"Default checkmark"`, `"Custom icon"`, `"Delete only"`).
- **Tokens & Icons in Demos**: Use `useMateriaTokens()` and `createStyles(tokens)` for spacing in demo layouts instead of hardcoded pixel values. Prefer icons registered in `docs/const/icons.ts`; if a realistic scenario needs an unregistered icon, leave the icon prop commented out with the intended `<name>-rounded` key rather than forcing a mismatched icon.
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
