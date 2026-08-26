import "react-native-materia";
import { MateriaIcon } from "react-native-materia/types";

declare module "react-native-materia/types" {
  export interface MateriaIconography {
    "github": MateriaIcon;
    "layers-rounded": MateriaIcon;
    "wifi-rounded": MateriaIcon;
    "bluetooth-rounded": MateriaIcon;
  }
}
