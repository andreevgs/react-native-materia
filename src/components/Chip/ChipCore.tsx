import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";

import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { Tokens } from "../../core/theme/types";
import { TouchableRipple } from "../TouchableRipple/TouchableRipple";
import { ChipContent } from "./ChipContent";
import { ChipTrailingButton } from "./ChipTrailingButton";
import { CHIP_CHECKMARK_ICON, CHIP_VERTICAL_HIT_SLOP_INSETS } from "./const";
import { ChipCoreProps } from "./types";
import {
  getChipAccessibility,
  getChipColors,
  getChipLayoutMetrics,
  getChipShadowStyle,
} from "./utils";

export const ChipCore = ({
  variant,
  children,
  selected = false,
  elevated = false,
  showCheckmark = false,
  disabled = false,
  leadingIcon,
  trailingIcon,
  onPress,
  onLongPress,
  onTrailingPress,
  trailingAccessibilityLabel,
  style,
  labelStyle,
  accessibilityRole,
  accessibilityState,
  hitSlop,
  ...props
}: ChipCoreProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const resolvedLeadingIcon =
    variant === "filter" && selected && showCheckmark
      ? CHIP_CHECKMARK_ICON
      : leadingIcon;

  const isElevated = variant !== "input" && elevated && !disabled;
  const hasInteractiveTrailing = Boolean(trailingIcon && onTrailingPress);
  const isPrimaryStatic = hasInteractiveTrailing && !onPress && !onLongPress;

  const colorConfig = useMemo(
    () =>
      getChipColors(variant, colors, tokens, {
        elevated,
        selected,
        disabled,
      }),
    [variant, colors, tokens, elevated, selected, disabled],
  );

  const shadowStyle = useMemo(
    () => getChipShadowStyle(isElevated, tokens, colors),
    [isElevated, tokens, colors],
  );

  const layout = useMemo(
    () =>
      getChipLayoutMetrics({
        hasLeading: Boolean(resolvedLeadingIcon),
        hasTrailing: Boolean(trailingIcon),
        borderWidth: colorConfig.borderWidth,
      }),
    [resolvedLeadingIcon, trailingIcon, colorConfig.borderWidth],
  );

  const a11y = useMemo(
    () =>
      getChipAccessibility(variant, {
        disabled,
        selected,
        accessibilityRole,
        accessibilityState,
      }),
    [variant, disabled, selected, accessibilityRole, accessibilityState],
  );

  const styles = useMemo(() => createStyles(tokens), [tokens]);
  const iconSize = tokens.iconSize["18dp"];

  const primaryPaddingStyle = {
    paddingLeft: layout.paddingLeft,
    paddingRight: hasInteractiveTrailing
      ? layout.trailingButtonGap
      : layout.paddingRight,
  };

  const contentProps = {
    leadingIcon: resolvedLeadingIcon,
    leadingIconColor: colorConfig.leadingIconColor,
    trailingIcon: hasInteractiveTrailing ? undefined : trailingIcon,
    trailingIconColor: colorConfig.trailingIconColor,
    labelColor: colorConfig.labelColor,
    labelStyle,
    iconSize,
  };

  return (
    <View style={[styles.container, shadowStyle, style]}>
      <View
        style={[
          styles.surface,
          {
            backgroundColor: colorConfig.backgroundColor,
            borderColor: colorConfig.borderColor,
            borderWidth: colorConfig.borderWidth,
          },
        ]}
      >
        {isPrimaryStatic ? (
          <View
            style={[styles.content, styles.splitPrimary, primaryPaddingStyle]}
          >
            <ChipContent {...contentProps}>{children}</ChipContent>
          </View>
        ) : (
          <TouchableRipple
            onPress={onPress}
            onLongPress={onLongPress}
            disabled={disabled}
            rippleColor={colorConfig.stateLayerColor}
            hitSlop={hitSlop ?? CHIP_VERTICAL_HIT_SLOP_INSETS}
            style={
              hasInteractiveTrailing ? styles.splitPrimary : styles.touchable
            }
            contentContainerStyle={[styles.content, primaryPaddingStyle]}
            contentPointerEvents="none"
            {...a11y}
            {...props}
          >
            <ChipContent {...contentProps}>{children}</ChipContent>
          </TouchableRipple>
        )}

        {trailingIcon && onTrailingPress && (
          <ChipTrailingButton
            icon={trailingIcon}
            color={colorConfig.trailingIconColor}
            size={iconSize}
            stateLayerColor={colorConfig.stateLayerColor}
            disabled={disabled}
            marginRight={layout.trailingButtonRightMargin}
            accessibilityLabel={trailingAccessibilityLabel}
            onPress={onTrailingPress}
          />
        )}
      </View>
    </View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      height: tokens.chipScale.default.height,
      borderRadius: tokens.shape.small,
    },
    surface: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: tokens.shape.small,
      overflow: "hidden",
      borderStyle: "solid",
    },
    touchable: {
      flexGrow: 1,
      flexShrink: 1,
      height: "100%",
      borderRadius: tokens.shape.small,
      justifyContent: "center",
    },
    splitPrimary: {
      flexGrow: 1,
      flexShrink: 1,
      height: "100%",
      justifyContent: "center",
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });
