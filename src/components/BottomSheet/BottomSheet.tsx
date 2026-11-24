import React, { forwardRef } from "react";
import { BottomSheetProps, BottomSheetCoreRef } from "./types";
import { BottomSheetCore } from "./BottomSheetCore";

export const BottomSheet = forwardRef<BottomSheetCoreRef, BottomSheetProps>(
  (props, ref) => {
    return <BottomSheetCore ref={ref} {...props} />;
  },
);
