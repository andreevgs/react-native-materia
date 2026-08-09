import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { PortalContext } from "./PortalContext";
import { PORTAL_ACTIONS, PortalHostProps, type PortalType } from "./types";
import { DEFAULT_PORTAL_HOST_NAME, DEFAULT_PORTAL_Z_INDEX_STEP } from "./const";

export const PortalHost = ({
  name = DEFAULT_PORTAL_HOST_NAME,
}: PortalHostProps) => {
  const context = useContext(PortalContext);
  const [portals, setPortals] = useState<PortalType[]>([]);

  if (!context) {
    throw new Error("PortalHost must be wrapped in a PortalProvider");
  }

  useEffect(() => {
    context.registerHost(name);

    const unsubscribe = context.on(name, (event) => {
      setPortals((prev) => {
        switch (event.action) {
          case PORTAL_ACTIONS.MOUNT:
            return [...prev, event.portal];
          case PORTAL_ACTIONS.UPDATE:
            return prev.map((item) =>
              item.name === event.portal.name ? event.portal : item,
            );
          case PORTAL_ACTIONS.UNMOUNT:
            return prev.filter((item) => item.name !== event.portal.name);
          default:
            return prev;
        }
      });
    });

    return () => {
      unsubscribe();
      context.deregisterHost(name);
    };
  }, [context, name]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {portals.map((portal, index) => (
        <View
          key={portal.name}
          pointerEvents="box-none"
          style={[
            StyleSheet.absoluteFill,
            {
              zIndex:
                index * (context.zIndexStep ?? DEFAULT_PORTAL_Z_INDEX_STEP),
            },
          ]}
        >
          {portal.node}
        </View>
      ))}
    </View>
  );
};
