import React, {
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
} from "react";
import { View } from "react-native";
import { ListProps, ListItemProps } from "./types";
import { getListItemStyle, getListStyle } from "./utils";
import { useMateriaColors, useMateriaTokens } from "../../core/MateriaProvider";

export const ListComponent = ({
  children,
  style,
  variant = "standard",
}: ListProps) => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  if (variant === "standard") {
    return <View style={style}>{children}</View>;
  }

  const items = Children.toArray(children).filter(isValidElement);

  const listStyle = getListStyle(variant, tokens);
  const listItemStyle = getListItemStyle(variant, tokens, colors);

  return (
    <View style={[style, listStyle, style]}>
      {items.map((child, index) => {
        return cloneElement(child as ReactElement<ListItemProps>, {
          key: child.key || index,
          style: listItemStyle,
        });
      })}
    </View>
  );
};
