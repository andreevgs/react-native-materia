import { createContext, useContext } from "react";
import { BottomSheetContextValue } from "./types";

export const BottomSheetContext = createContext<BottomSheetContextValue | null>(
  null,
);

export const useBottomSheetContext = () => useContext(BottomSheetContext);

