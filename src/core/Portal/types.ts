import type { ReactNode } from "react";

/**
 * Actions performed on a portal instance.
 */
export enum PORTAL_ACTIONS {
  MOUNT = "MOUNT",
  UPDATE = "UPDATE",
  UNMOUNT = "UNMOUNT",
}

export type PortalAction = PORTAL_ACTIONS;

/**
 * Representation of an individual portal item.
 */
export interface PortalType {
  /**
   * Unique name identifier of the portal.
   */
  name: string;

  /**
   * React node content to be rendered inside the portal host.
   */
  node: ReactNode;
}

/**
 * Event payload emitted when a portal is mounted, updated, or unmounted.
 */
export interface PortalEvent {
  /**
   * Action type associated with the portal lifecycle event.
   */
  action: PortalAction;

  /**
   * Portal object payload.
   */
  portal: PortalType;
}

/**
 * Context state and methods for managing portal registrations, mounts, and lifecycle events.
 */
export interface PortalContextType {
  /**
   * Registers a new PortalHost by its unique name.
   */
  registerHost: (hostName: string) => void;

  /**
   * Deregisters an existing PortalHost by name.
   */
  deregisterHost: (hostName: string) => void;

  /**
   * Mounts a portal node into a specific host.
   */
  addPortal: (hostName: string, name: string, node: ReactNode) => void;

  /**
   * Updates an existing portal node's content.
   */
  updatePortal: (hostName: string, name: string, node: ReactNode) => void;

  /**
   * Removes a portal node from a specific host.
   */
  removePortal: (hostName: string, name: string) => void;

  /**
   * Subscribes to portal lifecycle events for a specific host. Returns an unsubscribe function.
   */
  on: (hostName: string, callback: (event: PortalEvent) => void) => () => void;

  /**
   * Increment step value used to compute dynamic zIndex stacking across host layers.
   */
  zIndexStep?: number;
}

export interface PortalHostProps {
  /**
   * Optional unique name for the portal host. If not provided, defaults to "root".
   */
  name?: string;
}

export interface PortalProps {
  /**
   * Unique name identifier of the portal. If not provided, a unique identifier will be generated automatically.
   */
  name?: string;

  /**
   * Name of the portal host where the portal should be rendered. If not provided, defaults to "root".
   */
  hostName?: string;

  /**
   * The content to be rendered inside the portal.
   */
  children: React.ReactNode;
}
