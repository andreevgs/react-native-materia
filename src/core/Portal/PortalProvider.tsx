import React, { useCallback, useMemo, useRef } from "react";
import { PortalContext } from "./PortalContext";
import { PORTAL_ACTIONS, type PortalEvent } from "./types";

export const PortalProvider = ({ children }: { children: React.ReactNode }) => {
  const hosts = useRef<Set<string>>(new Set());
  const listeners = useRef<Record<string, Array<(event: PortalEvent) => void>>>(
    {},
  );

  const registerHost = useCallback((hostName: string) => {
    hosts.current.add(hostName);
  }, []);

  const deregisterHost = useCallback((hostName: string) => {
    hosts.current.delete(hostName);
    delete listeners.current[hostName];
  }, []);

  const notifyListeners = useCallback(
    (hostName: string, event: PortalEvent) => {
      if (listeners.current[hostName]) {
        listeners.current[hostName].forEach((callback) => callback(event));
      }
    },
    [],
  );

  const addPortal = useCallback(
    (hostName: string, name: string, node: React.ReactNode) => {
      notifyListeners(hostName, {
        action: PORTAL_ACTIONS.MOUNT,
        portal: { name, node },
      });
    },
    [notifyListeners],
  );

  const updatePortal = useCallback(
    (hostName: string, name: string, node: React.ReactNode) => {
      notifyListeners(hostName, {
        action: PORTAL_ACTIONS.UPDATE,
        portal: { name, node },
      });
    },
    [notifyListeners],
  );

  const removePortal = useCallback(
    (hostName: string, name: string) => {
      notifyListeners(hostName, {
        action: PORTAL_ACTIONS.UNMOUNT,
        portal: { name, node: null },
      });
    },
    [notifyListeners],
  );

  const on = useCallback(
    (hostName: string, callback: (event: PortalEvent) => void) => {
      if (!listeners.current[hostName]) {
        listeners.current[hostName] = [];
      }
      listeners.current[hostName].push(callback);

      return () => {
        listeners.current[hostName] = listeners.current[hostName].filter(
          (cb) => cb !== callback,
        );
      };
    },
    [],
  );

  const contextValue = useMemo(
    () => ({
      registerHost,
      deregisterHost,
      addPortal,
      updatePortal,
      removePortal,
      on,
    }),
    [registerHost, deregisterHost, addPortal, updatePortal, removePortal, on],
  );

  return (
    <PortalContext.Provider value={contextValue}>
      {children}
    </PortalContext.Provider>
  );
};
