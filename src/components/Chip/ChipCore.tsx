import { useMemo } from "react";
import { View, StyleSheet } from "react-native";

import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { Tokens } from "../../core/theme/types";
import { RippleHost, useRipple } from "../TouchableRipple";
import { extractBorderRadiusStyles } from "../TouchableRipple/utils";
import { ChipContent } from "./ChipContent";
import { ChipTrailingButton } from "./ChipTrailingButton";
import {
  CHIP_CHECKMARK_ICON,
  CHIP_VERTICAL_HIT_SLOP_INSETS,
  webDisabledStyle,
  webTouchStyle,
} from "./const";
import { ChipCoreProps } from "./types";
import {
  getChipAccessibility,
  getChipColors,
  getChipLayoutMetrics,
  getChipShadowStyle,
} from "./utils";
import { ChipContainer } from "./ChipContainer";

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
  onPressIn,
  onPressOut,
  onHoverIn,
  onHoverOut,
  onFocus,
  onBlur,
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
  const isPrimaryInteractive = Boolean(
    onPress || onLongPress || onPressIn || onPressOut,
  );
  const isPrimaryDisabled = disabled || !isPrimaryInteractive;

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
      }),
    [resolvedLeadingIcon, trailingIcon],
  );

  const a11y = useMemo(
    () =>
      getChipAccessibility(variant, {
        disabled,
        selected,
        isInteractive: isPrimaryInteractive,
        accessibilityRole,
        accessibilityState,
      }),
    [
      variant,
      disabled,
      selected,
      isPrimaryInteractive,
      accessibilityRole,
      accessibilityState,
    ],
  );

  const ripple = useRipple({
    color: colorConfig.stateLayerColor,
    disabled: isPrimaryDisabled,
    useNativeEffect: false,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
  });

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const customBorderStyles = useMemo(
    () => extractBorderRadiusStyles(style),
    [style],
  );

  const rippleBorderStyles = useMemo(
    () => (isElevated ? [styles.rippleHost, customBorderStyles] : undefined),
    [isElevated, styles.rippleHost, customBorderStyles],
  );

  const iconSize = tokens.iconSize["18dp"];
  const resolvedHitSlop = hitSlop ?? CHIP_VERTICAL_HIT_SLOP_INSETS;

  const chipContentPaddingStyle = {
    paddingVertical: layout.paddingVertical,
    paddingLeft: layout.paddingLeft,
    paddingRight: hasInteractiveTrailing
      ? layout.trailingButtonGap
      : layout.paddingRight,
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colorConfig.backgroundColor,
          overflow: isElevated ? "visible" : "hidden",
        },
        shadowStyle,
        style,
      ]}
    >
      <RippleHost ripple={ripple} borderStyles={rippleBorderStyles} />

      <ChipContainer
        interactive={isPrimaryInteractive}
        onPress={onPress}
        onLongPress={onLongPress}
        disabled={disabled}
        hitSlop={resolvedHitSlop}
        rippleHandlers={ripple.handlers}
        style={[styles.chipContainer, isPrimaryDisabled && styles.disabledWeb]}
        {...a11y}
        {...props}
      >
        <View
          style={[styles.chipContent, chipContentPaddingStyle]}
          pointerEvents="none"
        >
          <ChipContent
            leadingIcon={resolvedLeadingIcon}
            leadingIconColor={colorConfig.leadingIconColor}
            trailingIcon={hasInteractiveTrailing ? undefined : trailingIcon}
            trailingIconColor={colorConfig.trailingIconColor}
            labelColor={colorConfig.labelColor}
            labelStyle={labelStyle}
            iconSize={iconSize}
          >
            {children}
          </ChipContent>
        </View>
      </ChipContainer>

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

      {colorConfig.borderWidth > 0 && (
        <View
          pointerEvents="none"
          accessibilityElementsHidden
          importantForAccessibility="no"
          style={[
            styles.borderOverlay,
            {
              borderColor: colorConfig.borderColor,
              borderWidth: colorConfig.borderWidth,
            },
            customBorderStyles,
          ]}
        />
      )}
    </View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      minHeight: tokens.chipScale.default.height,
      maxWidth: "100%",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      borderRadius: tokens.shape.small,
    },
    borderOverlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: tokens.shape.small,
      borderStyle: "solid",
    },
    rippleHost: {
      borderRadius: tokens.shape.small,
    },
    chipContainer: {
      flexShrink: 1,
      alignSelf: "stretch",
      justifyContent: "center",
      ...webTouchStyle,
    },
    disabledWeb: {
      ...webDisabledStyle,
    },
    chipContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  });
