# React Native Materia

React Native Materia is a component library implementing the modern [Material Design 3 specification](https://m3.material.io/). It brings mathematically harmonious color palettes, fluid gesture-driven interactions, and standard type scales to cross-platform mobile and web applications.

<!-- SLOT: DEMO_SHOWCASE -->

## Design Philosophy

Material Design 3 emphasizes expressive, dynamic, and accessible interfaces. React Native Materia is engineered around these core tenets by treating color, motion, shape, and spatial elevation as unified primitives rather than disconnected styling rules.

Components are designed to be composable and predictable. Rather than imposing rigid constraints, the design system provides flexible primitives that seamlessly adapt to custom branding requirements and user accessibility preferences.

## Following Design Guidelines

While React Native Materia implements the components, tokens, and motion curves of the design system, creating an effective user experience still requires adhering to the official [Material Design 3 Guidelines](https://m3.material.io/).

The library handles the technical implementation, such as contrast balancing, touch ripples, typography metrics, and elevation shadows. However, architectural decisions regarding screen composition, visual hierarchy, choosing appropriate component variants, and spatial pacing should always be informed by the official specification. Consulting the guidelines ensures that your application remains intuitive, consistent, and recognizable across platforms.

## Core Architecture

At the center of the library is `MateriaProvider`, an unopinionated runtime root that coordinates dynamic theme schemes, the 8dp baseline grid spacing scale, fifteen typography roles, and a centralized iconography registry.

Overlay elements such as modal dialogs, menus, and bottom sheets are managed through the built-in portal subsystem. This ensures floating elements render at the top of the view hierarchy without detached React contexts or layout clipping issues.

## Performance and Native Motion

Every interactive component is powered by `react-native-reanimated` and `react-native-gesture-handler`. State transitions, surface ripples, and layout morphs execute directly on the UI thread without crossing the React Native bridge.

This architecture ensures consistent performance across iOS, Android, and Web targets, allowing complex interactive components to remain responsive under heavy layout demands.

## Exploring the Documentation

To begin building with React Native Materia, visit the [Getting Started](/about/getting-started) guide for installation instructions and initial application configuration.

Understand the foundational architecture through dedicated guides covering the [Provider](/about/provider), the dynamic [Theming](/about/theming) engine, spatial [Tokens](/about/tokens), the fifteen-variant [Typography](/about/typography) scale, extensible [Iconography](/about/iconography), and the [Portal](/about/portal) overlay subsystem.

Explore the component library through comprehensive references for [Button](/components/button), [Icon Button](/components/icon-button), and [List](/components/list).
