import {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  forwardRef,
  memo,
} from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { useSharedValue, withTiming, Easing } from "react-native-reanimated";

import {
  useMateriaColors,
  useMateriaTokens,
  useMateriaTypography,
} from "../../core";
import { TextFieldProps } from "./types";
import { getTextFieldColors } from "./utils";
import { Icon } from "../Icon";
import { Tokens } from "../../types";
import { TextFieldSupportingText } from "./TextFieldSupportingText";
import { TextFieldLabel } from "./TextFieldLabel";
import { TextFieldIndicator } from "./TextFieldIndicator";
import { TextFieldOutline } from "./TextFieldOutline";

const TextFieldComponent = forwardRef<TextInput, TextFieldProps>(
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

    return (
      <View style={[styles.wrapper, style]}>
        <Pressable
          style={[
            styles.container,
            {
              backgroundColor: containerColor,
            },
            containerStyle,
          ]}
          onPress={() => internalRef.current?.focus()}
          onHoverIn={() => setIsHovered(true)}
          onHoverOut={() => setIsHovered(false)}
          disabled={disabled}
        >
          {mode === "outlined" && (
            <TextFieldOutline
              focusAnim={focusAnim}
              labelWidth={labelWidth}
              indicatorColorInactive={indicatorColorInactive}
              indicatorColorActive={indicatorColorActive}
              hasLabel={!!label}
            />
          )}
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
              <TextFieldLabel
                label={label}
                focusAnim={focusAnim}
                labelColor={labelColor}
                labelStyle={labelStyle}
                labelWidth={labelWidth}
                mode={mode}
                hasLeadingIcon={!!leadingIcon}
              />
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
                mode === "outlined" && { paddingTop: 0, paddingBottom: 0 },
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
            <TextFieldIndicator
              focusAnim={focusAnim}
              indicatorColorInactive={indicatorColorInactive}
              indicatorColorActive={indicatorColorActive}
            />
          )}
        </Pressable>

        <TextFieldSupportingText
          supportingText={supportingText}
          supportingTextColor={supportingTextColor}
        />
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
    },
    inputArea: {
      flex: 1,
      height: "100%",
    },
    input: {
      flex: 1,
      paddingTop: tokens.spacing.xl,
      paddingBottom: tokens.spacing.s,
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
  });

export const TextField = memo(TextFieldComponent);
TextField.displayName = "TextField";
