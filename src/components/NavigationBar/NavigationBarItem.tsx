import React, { useMemo, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { NavigationBarItemProps } from "./types";
import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";
import { Icon } from "../Icon";
import { useRipple, RippleHost } from "../TouchableRipple";
import { MateriaText } from "../Text";
import { Tokens } from "../../types";
import { INDICATOR_WIDTH, INDICATOR_HEIGHT, webTouchStyle } from "./const";

export const NavigationBarItem = React.memo(
  ({ route, index, isActive, onTabPress }: NavigationBarItemProps) => {
    const colors = useMateriaColors();
    const tokens = useMateriaTokens();

    const isFirstRender = useRef(true);
    const activeProgress = useSharedValue(isActive ? 1 : 0);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        activeProgress.value = isActive ? 1 : 0;
        return;
      }
      activeProgress.value = withTiming(isActive ? 1 : 0, {
        duration: tokens.duration.short4,
        easing: Easing.bezier(...tokens.easing.standard),
      });
    }, [isActive, tokens, activeProgress]);

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

    const ripple = useRipple({
      color: iconColor,
      centered: true,
      useNativeEffect: false,
    });

    const styles = useMemo(() => createStyles(tokens), [tokens]);

    const handlePress = useCallback(() => {
      onTabPress(index, route.key);
    }, [onTabPress, index, route.key]);

    return (
      <Pressable
        onPress={handlePress}
        style={styles.container}
        accessibilityRole="tab"
        accessibilityState={{ selected: isActive }}
        accessibilityLabel={route.accessibilityLabel ?? route.label}
        {...ripple.handlers}
      >
        <View style={styles.iconContainer}>
          <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
          <RippleHost
            ripple={ripple}
            style={styles.pillShape}
            borderStyles={styles.pillShape}
          />
          {route.icon && (
            <View style={styles.iconWrapper} pointerEvents="none">
              <Icon
                source={
                  isActive && route.activeIcon ? route.activeIcon : route.icon
                }
                size={tokens.iconSize["24dp"]}
                color={iconColor}
              />
            </View>
          )}
        </View>
        <View style={styles.labelContainer} pointerEvents="none">
          <MateriaText
            variant="labelMedium"
            style={{ color: textColor }}
            numberOfLines={1}
          >
            {route.label}
          </MateriaText>
        </View>
      </Pressable>
    );
  },
);

NavigationBarItem.displayName = "NavigationBarItem";

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      ...webTouchStyle,
    },
    iconContainer: {
      width: INDICATOR_WIDTH,
      height: INDICATOR_HEIGHT,
      justifyContent: "center",
      alignItems: "center",
    },
    indicator: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: tokens.shape.full,
      zIndex: 0,
    },
    pillShape: {
      borderRadius: tokens.shape.full,
    },
    iconWrapper: {
      zIndex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    labelContainer: {
      marginTop: tokens.spacing.xs,
      paddingHorizontal: tokens.spacing.xs,
    },
  });
