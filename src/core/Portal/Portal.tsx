import { useContext, useEffect, useId, useRef } from "react";
import { PortalContext } from "./PortalContext";
import { PortalProps } from "./types";
import { DEFAULT_PORTAL_HOST_NAME } from "./const";

export const Portal = ({
  name,
  hostName = DEFAULT_PORTAL_HOST_NAME,
  children,
}: PortalProps) => {
  const context = useContext(PortalContext);
  const reactId = useId();
  const portalName = name ?? reactId;

  const isMounted = useRef(false);

  if (!context) {
    throw new Error("Portal must be used within a PortalProvider");
  }

  useEffect(() => {
    context.addPortal(hostName, portalName, children);
    isMounted.current = true;

    return () => {
      context.removePortal(hostName, portalName);
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      context.updatePortal(hostName, portalName, children);
    }
  }, [children, hostName, portalName, context]);

  return null;
};
