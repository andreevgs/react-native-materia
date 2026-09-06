# Portal

The portal system allows floating and overlay UI elements to render at the top of the component tree without losing React context or breaking component lifecycle. It solves view clipping and z-index stacking constraints in complex user interfaces.

## Overview

In React Native, layout boundaries and parent containers with `overflow: "hidden"` often clip floating components like dialogs, modal sheets, dropdown menus, snackbars, and tooltips. Additionally, nesting overlays deep within the component tree can introduce stacking context issues where elements appear underneath sibling views.

The portal architecture resolves this by separating component logic from visual mounting location. Overlay components wrap their content in `Portal`, allowing them to be declared naturally inside any screen while their rendered nodes are transported and mounted directly into a root `PortalHost`.

The system consists of three coordinated primitives. `PortalProvider` manages portal registrations and layer stacking across your app. `PortalHost` acts as the visual destination anchor where transported children are physically mounted. Finally, `Portal` wraps any component subtree you want to teleport into a designated host.

## Root Configuration

To enable portals across your application, wrap your view hierarchy with `PortalProvider` and mount a `PortalHost` at the root of your layout, typically just inside your `MateriaProvider`:

```tsx
import React from "react";
import { MateriaProvider, PortalProvider, PortalHost } from "react-native-materia";
import { StatusBar } from "react-native";
import { MainNavigation } from "./navigation";

export default function App() {
  return (
    <MateriaProvider>
      <PortalProvider>
        <MainNavigation />
        <PortalHost />
        <StatusBar barStyle="light-content" />
      </PortalProvider>
    </MateriaProvider>
  );
}
```

Placing `PortalHost` at the bottom of the root container guarantees that all transported overlays sit visually on top of standard navigation screens and layout elements.

## Building Overlay Components with Portal

Portals are the foundational primitive for creating overlay components such as dialogs, bottom sheets, and floating menus. Inside the overlay component, you wrap your visual tree in `Portal`.

The following example demonstrates building a reusable `CustomDialog` component and consuming it from a screen:

```tsx
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Color from "color";
import {
  Portal,
  Button,
  MateriaText,
  useMateriaColors,
  useMateriaTokens,
} from "react-native-materia";
import { Tokens, MateriaScheme } from "react-native-materia/types";

interface CustomDialogProps {
  visible: boolean;
  onDismiss: () => void;
}

export const CustomDialog = ({ visible, onDismiss }: CustomDialogProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();
  const styles = useMemo(() => createStyle(tokens, colors), [tokens, colors]);

  if (!visible) return null;

  return (
    <Portal>
      <View style={styles.scrim}>
        <View style={styles.dialog}>
          <MateriaText variant="headlineSmall">Confirm Action</MateriaText>
          <MateriaText variant="bodyMedium">
            This dialog is declared inside the local component, but renders into the root host.
          </MateriaText>
          <Button mode="text" onPress={onDismiss}>
            Dismiss
          </Button>
        </View>
      </View>
    </Portal>
  );
};

const createStyle = (tokens: Tokens, colors: MateriaScheme) =>
  StyleSheet.create({
    scrim: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Color(colors.scrim).alpha(0.32).rgb().string(),
      justifyContent: "center",
      alignItems: "center",
    },
    dialog: {
      width: 320,
      padding: tokens.spacing.xl,
      borderRadius: tokens.shape.extraLarge,
      backgroundColor: colors.surfaceContainerHigh,
      gap: tokens.spacing.m,
    },
  });
```

Screen components can now render `CustomDialog` directly in their JSX tree without worrying about layout boundaries, parent clipping, or `zIndex` conflicts:

```tsx
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-materia";
import { CustomDialog } from "./CustomDialog";

export const Screen = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button mode="filled" onPress={() => setVisible(true)}>
        Open Dialog
      </Button>
      <CustomDialog visible={visible} onDismiss={() => setVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```

## Named Hosts and Multiple Layers

By default, portals target the default root host named `"root"`. When building complex experiences such as nested split views, modal dialogs that host their own tooltips, or embedded drawer layouts, you can define custom named hosts.

To target a custom host, specify matching names on `PortalHost` and `Portal`:

```tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Portal, PortalHost, MateriaText } from "react-native-materia";

export const MultiHostDemo = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.previewPane}>
        <PortalHost name="preview-overlay" />
      </View>

      <Portal hostName="preview-overlay">
        <View style={styles.tooltip}>
          <MateriaText variant="labelMedium">Preview Overlay</MateriaText>
        </View>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  previewPane: {
    flex: 1,
    overflow: "hidden",
  },
  tooltip: {
    position: "absolute",
    top: 16,
    right: 16,
  },
});
```

## Layering and Touch Interactions

`PortalHost` coordinates visual stacking and event dispatching through automated layering and touch pass-through.

### Automatic Stacking Order

Each portal mounted into a host receives an incremental `zIndex` based on its mounting order multiplied by `zIndexStep` (defaulting to `100`). This ensures that sequentially opened overlays naturally stack above existing ones without manual index coordination.

### Non-blocking Touch Handling

The host container and individual portal wrappers use `pointerEvents="box-none"`. Touches over transparent areas pass directly through to underlying views, while interactive elements within the portal capture touch events normally.

## Portal Props

### children

`React.ReactNode`

The content elements to be transported and rendered inside the destination host.

### hostName

`string`

The unique name identifier of the destination `PortalHost`.

Default value: `"root"`

### name

`string`

An optional unique identifier for this portal instance. When omitted, a unique identifier is generated automatically using React `useId`.

## PortalHost Props

### name

`string`

The unique name identifier for this host container. Portals specifying a matching `hostName` will render inside this host.

Default value: `"root"`

## PortalProvider Props

### children

`React.ReactNode`

The child component tree to be provided with portal management context.

### zIndexStep

`number`

The increment value used to calculate dynamic `zIndex` stacking across mounted portal layers within each host.

Default value: `100`

## Related Links

Explore more in the [Provider Guide](/about/provider), [Theming Guide](/about/theming), [Design Tokens](/about/tokens), and [Typography](/about/typography) sections.
