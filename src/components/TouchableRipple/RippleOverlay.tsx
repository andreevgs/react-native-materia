import { memo } from "react";
import { View, StyleSheet } from "react-native";

import { RippleOverlayProps } from "./types";
import { Ripple } from "./Ripple";

export const RippleOverlay = memo(
  ({
    ripples,
    color,
    pressedOpacity,
    borderless,
    borderStyles,
    onRippleFinished,
  }: RippleOverlayProps) => {
    if (ripples.length === 0) return null;

    return (
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          borderless ? styles.borderless : styles.clipping,
          borderStyles,
        ]}
      >
        {ripples.map((ripple) => (
          <Ripple
            key={ripple.uniqueKey}
            uniqueKey={ripple.uniqueKey}
            x={ripple.x}
            y={ripple.y}
            color={color}
            initialOpacity={pressedOpacity}
            parentWidth={ripple.parentWidth}
            parentHeight={ripple.parentHeight}
            onFinished={onRippleFinished}
            isActive={ripple.isActive}
            isExiting={ripple.isExiting}
          />
        ))}
      </View>
    );
  },
);

RippleOverlay.displayName = "RippleOverlay";

const styles = StyleSheet.create({
  clipping: {
    overflow: "hidden",
  },
  borderless: {
    overflow: "visible",
  },
});
