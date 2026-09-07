# Iconography

The iconography system provides a unified, extensible registry of Material Design 3 rounded icons for React Native Materia. It handles global icon distribution, token-based sizing, dynamic theme colors, and type-safe custom icon extensions across all library components.

## Overview

The iconography architecture centers around a global registry defined in `MateriaIconography`. Library components such as `Button`, `Chip`, `IconButton`, and `TextField` do not hardcode static icons. Instead, they reference icons through this centralized registry, allowing you to globally override existing symbols or supply custom icon sets through `MateriaProvider`.

By default, React Native Materia comes bundled with a curated set of Material Design 3 rounded symbols created as lightweight React Native SVG components.

## Icon Component

To display an icon anywhere in your interface, React Native Materia provides a dedicated `Icon` component. It resolves icon names from the registry, scales them with design tokens, and tints them with current theme colors.

Detailed props, source types, and component examples can be found in the [Icon Component Documentation](/components/icon).

## Creating Custom Icons

To create a custom icon compatible with the Materia design system, create a component that accepts `MateriaIconProps`. The icon should render SVG paths scaled to `size` and tinted with `color`.

```tsx
import Svg, { Path } from "react-native-svg";
import { MateriaIconProps } from "react-native-materia/types";

export const GithubIcon = ({ color, size, style }: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path
      fill={color}
      d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
    />
  </Svg>
);
```

## Extending the Icon Registry

To register custom icons throughout your application, create a dictionary that combines `defaultMateriaIconography` with your custom icon components, and pass it to `MateriaProvider`.

```tsx
import { defaultMateriaIconography, MateriaProvider } from "react-native-materia";
import { GithubIcon } from "./icons/GithubIcon";

export const icons = {
  ...defaultMateriaIconography,
  "github": GithubIcon,
};

export default function App() {
  return (
    <MateriaProvider icons={icons}>
      <MainApp />
    </MateriaProvider>
  );
}
```

When custom icons are registered this way, all library components such as `Button`, `IconButton`, and `Chip` can reference your custom icons by name.

## TypeScript Type Augmentation

By default, TypeScript only knows about built-in icon names. To enable full type-safety, autocompletion, and compile-time validation for your custom icons, use TypeScript module augmentation in a `.d.ts` declaration file.

Create a file such as `types/icons.d.ts` and augment the `MateriaIconography` interface:

```typescript
import "react-native-materia";
import { MateriaIcon } from "react-native-materia/types";

declare module "react-native-materia/types" {
  export interface MateriaIconography {
    "github": MateriaIcon;
  }
}
```

Once declared, `"github"` becomes a first-class citizen in `MateriaIconName`. Your IDE will provide autocomplete hints whenever passing icon names to `source` in `Icon` or `icon` in `Button` and `IconButton`.

```tsx
import { IconButton } from "react-native-materia";

export const SocialButton = () => {
  return <IconButton icon="github" onPress={() => {}} />;
};
```

## Icon Sizes

Material Design 3 specifies standard icon sizes corresponding to different component scales and contexts. These values are available under `tokens.iconSize`.

The `"18dp"` token (18) is typically used for compact elements such as `Chip` icons.

The `"20dp"` token (20) is standard for `Button` leading and trailing icons.

The `"24dp"` token (24) is the default size for standalone icons, `IconButton`, `TextField` leading/trailing icons, and `NavigationBarItem`.

The `"40dp"` token (40) and `"48dp"` token (48) are used for prominent graphical symbols, dialog headers, and empty state illustrations.

## Built-in Icons

React Native Materia includes the following default rounded icons in its standard registry:

`"arrow-back-rounded"`

`"arrow-forward-rounded"`

`"close-rounded"`

`"menu-rounded"`

`"check-rounded"`

`"add-rounded"`

`"chevron-right-rounded"`

`"info-rounded"`

`"info-outline-rounded"`

`"home-rounded"`

`"home-outline-rounded"`

`"settings-rounded"`

`"settings-outline-rounded"`

`"error-rounded"`

`"delete-rounded"`

`"light-mode-rounded"`

`"dark-mode-rounded"`

`"content-copy-outline-rounded"`

## Related Links

Explore more in the [Icon Component](/components/icon), [Provider Guide](/about/provider), [Theming Guide](/about/theming), and [Design Tokens](/about/tokens) sections.
