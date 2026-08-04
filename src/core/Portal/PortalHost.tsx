import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { PortalContext } from "./PortalContext";
import { PORTAL_ACTIONS, type PortalType } from "./types";

export interface PortalHostProps {
  name?: string;
}

export const PortalHost = ({ name = "root" }: PortalHostProps) => {
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
      {portals.map((portal) => (
        <React.Fragment key={portal.name}>{portal.node}</React.Fragment>
      ))}
    </View>
  );
};
