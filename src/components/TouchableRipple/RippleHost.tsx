import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { RippleHostProps } from "./types";
import { StateLayer } from "./StateLayer";
import { RippleOverlay } from "./RippleOverlay";

export const RippleHost = memo(
  ({
    ripple,
    style,
    borderStyles,
    borderless = ripple.borderless,
  }: RippleHostProps) => {
    return (
      <View
        pointerEvents="none"
        onLayout={ripple.onHostLayout}
        style={[styles.host, borderStyles, style]}
      >
        <StateLayer
          color={ripple.solidColor}
          opacity={ripple.stateLayerOpacity}
          borderStyles={borderStyles}
        />
        {!ripple.hasNativeRipple && (
          <RippleOverlay
            ripples={ripple.ripples}
            color={ripple.solidColor}
            pressedOpacity={ripple.pressedOpacity}
            borderless={borderless}
            borderStyles={borderStyles}
            onRippleFinished={ripple.removeRipple}
          />
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  host: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
});

RippleHost.displayName = "RippleHost";
