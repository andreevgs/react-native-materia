import { AccessibilityProps, Platform } from "react-native";

export const getIconAccessibilityProps = (
  accessibilityLabel?: string,
  accessibilityProps?: AccessibilityProps,
) => {
  const isAccessible = !!accessibilityLabel;

  const {
    accessible: _accessible,
    accessibilityElementsHidden: _accessibilityElementsHidden,
    importantForAccessibility: _importantForAccessibility,
    ...restA11yProps
  } = accessibilityProps ?? {};

  return Platform.select({
    web: {
      "aria-hidden": !isAccessible,
      ...(isAccessible
        ? {
            "aria-label": accessibilityLabel,
            role: "img" as const,
          }
        : {}),
      ...restA11yProps,
    },
    default: {
      ...restA11yProps,
      accessible: isAccessible,
      accessibilityLabel,
      accessibilityElementsHidden: !isAccessible,
      importantForAccessibility: isAccessible
        ? ("yes" as const)
        : ("no-hide-descendants" as const),
    },
  });
};
