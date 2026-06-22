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

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableRipple
          onPress={onPress}
          style={styles.touchable}
          contentContainerStyle={styles.touchableContent}
          hitSlop={{ top: 6, bottom: 26, left: 500, right: 500 }}
          accessibilityLabel={route.accessibilityLabel}
          accessibilityRole="tab"
          accessibilityState={{ selected: isActive }}
        >
          <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
          {route.icon && (
            <Icon
              source={
                isActive && route.activeIcon ? route.activeIcon : route.icon
              }
              size={tokens.iconSize["24dp"]}
              color={iconColor}
            />
          )}
        </TouchableRipple>
      </View>
      {route.label && (
        <View style={styles.labelContainer} pointerEvents="none">
          <MateriaText
            variant="labelMedium"
            style={{ color: textColor }}
            numberOfLines={1}
          >
            {route.label}
          </MateriaText>
        </View>
      )}
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
      width: 56,
      height: 32,
      justifyContent: "center",
      alignItems: "center",
    },
    touchable: {
      width: 56,
      height: 32,
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
    indicator: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: tokens.shape.full,
    },
    labelContainer: {
      marginTop: tokens.spacing.xs,
      alignItems: "center",
      paddingHorizontal: tokens.spacing.xs,
    },
  });
