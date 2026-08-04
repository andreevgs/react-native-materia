import { useContext, useEffect, useId, useRef } from "react";
import { PortalContext } from "./PortalContext";

export interface PortalProps {
  name?: string;
  hostName?: string;
  children: React.ReactNode;
}

export const Portal = ({ name, hostName = "root", children }: PortalProps) => {
  const context = useContext(PortalContext);
  const reactId = useId();
  const portalName = name ?? reactId;

  // Keep track of the first render to differentiate between mount and update
  const isMounted = useRef(false);

  if (!context) {
    throw new Error("Portal must be used within a PortalProvider");
  }

  useEffect(() => {
    // On Mount
    context.addPortal(hostName, portalName, children);
    isMounted.current = true;

    return () => {
      // On Unmount
      context.removePortal(hostName, portalName);
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount and unmount

  useEffect(() => {
    if (isMounted.current) {
      // On Update
      context.updatePortal(hostName, portalName, children);
    }
  }, [children, hostName, portalName, context]);

  return null;
};
