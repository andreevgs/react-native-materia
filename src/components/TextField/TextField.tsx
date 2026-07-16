import {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
  Easing,
  runOnJS,
} from "react-native-reanimated";

import {
  useMateriaColors,
  useMateriaTokens,
  useMateriaTypography,
} from "../../core";
import { TextFieldProps } from "./types";
import { getTextFieldColors } from "./utils";
import { Icon } from "../Icon";
import { Tokens } from "../../types";

export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    {
      mode = "filled",
      label,
      value,
      onChangeText,
      disabled = false,
      error = false,
      leadingIcon,
      trailingIcon,
      supportingText,
      style,
      containerStyle,
      inputStyle,
      labelStyle,
      onFocus,
      onBlur,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const colors = useMateriaColors();
    const tokens = useMateriaTokens();
    const typography = useMateriaTypography();

    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const safeValue = value ?? "";
    const hasValue = safeValue.length > 0;
    const isPopulated = hasValue || isFocused;

    const displayedSupportingTextRef = useRef(supportingText);
    const [displayedSupportingText, setDisplayedSupportingText] =
      useState(supportingText);

    const internalRef = useRef<TextInput | null>(null);
    const setRefs = useCallback(
      (node: TextInput | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const {
      containerColor,
      indicatorColorInactive,
      indicatorColorActive,
      labelColor,
      inputColor,
      supportingTextColor,
      iconColor,
      caretColor,
    } = useMemo(
      () =>
        getTextFieldColors(
          mode,
          colors,
          tokens,
          disabled,
          isFocused,
          error,
          isHovered,
        ),
      [mode, colors, tokens, disabled, isFocused, error, isHovered],
    );

    const styles = useMemo(() => createStyles(tokens), [tokens]);

    // lineHeight in TextInput causes caret jumping and layout shifts on empty inputs in React Native.
    const inputTypography = { ...typography.bodyLarge, lineHeight: undefined };

    const focusAnim = useSharedValue(isPopulated ? 1 : 0);
    const labelWidth = useSharedValue(0);

    const supportingTextAnim = useSharedValue(supportingText ? 1 : 0);
    const supportingTextOpacityAnim = useSharedValue(supportingText ? 1 : 0);

    useEffect(() => {
      const bezier = Easing.bezier(
        tokens.easing.standard[0],
        tokens.easing.standard[1],
        tokens.easing.standard[2],
        tokens.easing.standard[3],
      );

      focusAnim.value = withTiming(isPopulated ? 1 : 0, {
        duration: tokens.duration.short3,
        easing: bezier,
      });
    }, [focusAnim, isPopulated, tokens]);

    const updateDisplayedText = useCallback((text: string) => {
      displayedSupportingTextRef.current = text;
      setDisplayedSupportingText(text);
    }, []);

    useEffect(() => {
      const bezier = Easing.bezier(
        tokens.easing.standard[0],
        tokens.easing.standard[1],
        tokens.easing.standard[2],
        tokens.easing.standard[3],
      );

      if (supportingText) {
        if (
          supportingText !== displayedSupportingTextRef.current &&
          displayedSupportingTextRef.current
        ) {
          supportingTextOpacityAnim.value = withTiming(
            0,
            { duration: tokens.duration.short2 },
            (finished) => {
              if (finished) {
                runOnJS(updateDisplayedText)(supportingText);
                supportingTextOpacityAnim.value = withTiming(1, {
                  duration: tokens.duration.short2,
                  easing: bezier,
                });
              }
            },
          );
        } else {
          updateDisplayedText(supportingText);
          supportingTextAnim.value = withTiming(1, {
            duration: tokens.duration.short3,
            easing: bezier,
          });
          supportingTextOpacityAnim.value = withTiming(1, {
            duration: tokens.duration.short3,
            easing: bezier,
          });
        }
      } else {
        supportingTextAnim.value = withTiming(0, {
          duration: tokens.duration.short3,
          easing: bezier,
        });
        supportingTextOpacityAnim.value = withTiming(0, {
          duration: tokens.duration.short3,
          easing: bezier,
        });
        displayedSupportingTextRef.current = supportingText;
      }
    }, [
      supportingText,
      tokens,
      supportingTextAnim,
      supportingTextOpacityAnim,
      updateDisplayedText,
    ]);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChangeText = (text: string) => {
      onChangeText?.(text);
    };

    const labelAnimatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        focusAnim.value,
        [0, 1],
        [0, -(labelWidth.value * 0.125)],
      );

      return {
        transform: [
          { translateX },
          { translateY: interpolate(focusAnim.value, [0, 1], [16, 4]) },
          { scale: interpolate(focusAnim.value, [0, 1], [1, 0.75]) },
        ],
      };
    });

    const indicatorAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(focusAnim.value, [0, 1], [1, 2]),
        backgroundColor: interpolateColor(
          focusAnim.value,
          [0, 1],
          [indicatorColorInactive, indicatorColorActive],
        ),
      };
    });

    const supportingTextAnimatedStyle = useAnimatedStyle(() => {
      return {
        maxHeight: interpolate(supportingTextAnim.value, [0, 1], [0, 24]),
        opacity: supportingTextOpacityAnim.value,
        marginTop: interpolate(
          supportingTextAnim.value,
          [0, 1],
          [0, tokens.spacing.xs],
        ),
      };
    });

    return (
      <View style={[styles.wrapper, style]}>
        <Pressable
          style={[
            styles.container,
            {
              backgroundColor: containerColor,
              borderWidth: mode === "outlined" ? 1 : 0,
              borderColor:
                mode === "outlined" ? indicatorColorActive : "transparent",
            },
            containerStyle,
          ]}
          onPress={() => internalRef.current?.focus()}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          disabled={disabled}
        >
          {leadingIcon && (
            <Icon
              source={leadingIcon}
              size={tokens.iconSize["24dp"]}
              color={iconColor}
              style={styles.leadingIcon}
            />
          )}

          <View style={styles.inputArea}>
            {label && (
              <Animated.Text
                onLayout={(e) => {
                  labelWidth.value = e.nativeEvent.layout.width;
                }}
                style={[
                  typography.bodyLarge,
                  styles.label,
                  {
                    color: labelColor,
                  },
                  labelAnimatedStyle,
                  labelStyle,
                ]}
                numberOfLines={1}
              >
                {label}
              </Animated.Text>
            )}

            <TextInput
              ref={setRefs}
              value={value}
              onChangeText={handleChangeText}
              onFocus={handleFocus}
              onBlur={handleBlur}
              editable={!disabled}
              placeholder={
                isFocused && !label ? placeholder : isFocused ? placeholder : ""
              }
              placeholderTextColor={colors.onSurfaceVariant}
              cursorColor={caretColor}
              selectionColor={colors.primary}
              style={[
                inputTypography,
                styles.input,
                { color: inputColor },
                inputStyle,
              ]}
              {...props}
            />
          </View>

          {trailingIcon && (
            <Icon
              source={trailingIcon}
              size={tokens.iconSize["24dp"]}
              color={iconColor}
              style={styles.trailingIcon}
            />
          )}

          {mode === "filled" && (
            <Animated.View
              style={[styles.activeIndicator, indicatorAnimatedStyle]}
            />
          )}
        </Pressable>

        <Animated.View
          style={[styles.supportingTextContainer, supportingTextAnimatedStyle]}
        >
          <Animated.Text
            style={[
              typography.bodySmall,
              styles.supportingText,
              { color: supportingTextColor },
            ]}
          >
            {displayedSupportingText}
          </Animated.Text>
          <View />
        </Animated.View>
      </View>
    );
  },
);

const createStyles = (tokens: Tokens) =>
  StyleSheet.create({
    wrapper: {
      width: "100%",
    },
    container: {
      height: 56,
      flexDirection: "row",
      alignItems: "center",
      borderTopLeftRadius: tokens.shape.extraSmall,
      borderTopRightRadius: tokens.shape.extraSmall,
      paddingHorizontal: tokens.spacing.l,
      overflow: "hidden",
    },
    inputArea: {
      flex: 1,
      height: "100%",
    },
    label: {
      position: "absolute",
      top: 0,
      left: 0,
    },
    input: {
      flex: 1,
      paddingTop: 24,
      paddingBottom: 8,
      margin: 0,
      paddingHorizontal: 0,
      textAlignVertical: "center",
    },
    leadingIcon: {
      marginRight: tokens.spacing.m,
    },
    trailingIcon: {
      marginLeft: tokens.spacing.m,
    },
    activeIndicator: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    supportingTextContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: tokens.spacing.l,
      overflow: "hidden",
    },
    supportingText: {
      flex: 1,
    },
  });
