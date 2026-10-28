import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { NavigationBarItemProps } from "./types";
import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { Icon } from "../Icon";
import { TouchableRipple } from "../TouchableRipple";
import { MateriaText } from "../Text";
import { Tokens } from "../../types";
import {
  INDICATOR_WIDTH,
  INDICATOR_HEIGHT,
  NAV_ITEM_HIT_SLOP,
  IS_WEB,
} from "./const";

export const NavigationBarItem = ({
  route,
  isActive,
  onPress,
}: NavigationBarItemProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  const activeProgress = useDerivedValue(() => {
    return withTiming(isActive ? 1 : 0, {
      duration: tokens.duration.short4,
      easing: Easing.bezier(
        tokens.easing.standard[0],
        tokens.easing.standard[1],
        tokens.easing.standard[2],
        tokens.easing.standard[3],
      ),
    });
  }, [isActive, tokens]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      opacity: activeProgress.value,
      transform: [{ scaleX: activeProgress.value }],
      backgroundColor: colors.secondaryContainer,
    };
  }, [colors, activeProgress]);

  const iconColor = isActive
    ? colors.onSecondaryContainer
    : colors.onSurfaceVariant;
  const textColor = isActive ? colors.secondary : colors.onSurfaceVariant;

  const styles = useMemo(() => createStyles(tokens), [tokens]);

  const renderIconWithIndicator = () => (
    <>
      <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
      {route.icon && (
        <View style={styles.iconWrapper} pointerEvents="none">
          <Icon
            source={
              isActive && route.activeIcon ? route.activeIcon : route.icon
            }
            size={tokens.iconSize["24dp"]}
            color={iconColor}
            style={styles.icon}
          />
        </View>
      )}
    </>
  );

  const renderLabel = () =>
    route.label ? (
      <View style={styles.labelContainer} pointerEvents="none">
        <MateriaText
          variant="labelMedium"
          style={{ color: textColor }}
          numberOfLines={1}
        >
          {route.label}
        </MateriaText>
      </View>
    ) : null;

  if (IS_WEB) {
    return (
      <TouchableRipple
        onPress={onPress}
        style={styles.touchableWeb}
        contentContainerStyle={styles.touchableContentWeb}
        accessibilityLabel={route.accessibilityLabel}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
      >
        <View style={styles.iconContainer}>{renderIconWithIndicator()}</View>
        {renderLabel()}
      </TouchableRipple>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableRipple
          onPress={onPress}
          style={styles.touchable}
          contentContainerStyle={styles.touchableContent}
          hitSlop={NAV_ITEM_HIT_SLOP}
          accessibilityLabel={route.accessibilityLabel}
          accessibilityRole="tab"
          accessibilityState={{ selected: isActive }}
        >
          {renderIconWithIndicator()}
        </TouchableRipple>
      </View>
      {renderLabel()}
    </View>
  );
};

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: tokens.spacing.xss,
      height: "100%",
      overflow: "hidden",
    },
    iconContainer: {
      width: INDICATOR_WIDTH,
      height: INDICATOR_HEIGHT,
      justifyContent: "center",
      alignItems: "center",
    },
    touchable: {
      width: INDICATOR_WIDTH,
      height: INDICATOR_HEIGHT,
      borderRadius: tokens.shape.full,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    touchableContent: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
    touchableWeb: {
      flex: 1,
      height: "100%",
      overflow: "hidden",
    },
    touchableContentWeb: {
      flex: 1,
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: tokens.spacing.xss,
    },
    indicator: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: tokens.shape.full,
      zIndex: 0,
    },
    iconWrapper: {
      zIndex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      zIndex: 1,
    },
    labelContainer: {
      marginTop: tokens.spacing.xs,
      alignItems: "center",
      paddingHorizontal: tokens.spacing.xs,
    },
  });
