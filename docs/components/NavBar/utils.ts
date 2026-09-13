import Color from "color";
import { MateriaScheme } from "react-native-materia/types";

export const getScrimContainerStyle = (colors: MateriaScheme) => ({
  backgroundColor: Color(colors.scrim).alpha(0.32).rgb().string(),
});
