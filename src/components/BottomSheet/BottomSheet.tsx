import React from "react";
import { BottomSheetProps } from "./types";
import { BottomSheetCore } from "./BottomSheetCore";

export const BottomSheet = (props: BottomSheetProps) => {
  return <BottomSheetCore {...props} />;
};
