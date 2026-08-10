import { createContext } from "react";
import type { PortalContextType } from "./types";

export const PortalContext = createContext<PortalContextType | null>(null);
