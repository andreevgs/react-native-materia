import type { ReactNode } from "react";

export enum PORTAL_ACTIONS {
  MOUNT = "MOUNT",
  UPDATE = "UPDATE",
  UNMOUNT = "UNMOUNT",
}

export type PortalAction = PORTAL_ACTIONS;

export interface PortalType {
  name: string;
  node: ReactNode;
}

export interface PortalEvent {
  action: PortalAction;
  portal: PortalType;
}

export interface PortalContextType {
  registerHost: (hostName: string) => void;
  deregisterHost: (hostName: string) => void;
  addPortal: (hostName: string, name: string, node: ReactNode) => void;
  updatePortal: (hostName: string, name: string, node: ReactNode) => void;
  removePortal: (hostName: string, name: string) => void;
  on: (hostName: string, callback: (event: PortalEvent) => void) => () => void;
  zIndexStep?: number;
}
