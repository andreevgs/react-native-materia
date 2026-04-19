import { ListComponent } from "./List";
import { ListItem } from "./ListItem";

export const List = Object.assign(ListComponent, {
  Item: ListItem,
});

export * from "./types";
