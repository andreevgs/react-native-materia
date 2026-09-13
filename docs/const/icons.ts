import { defaultMateriaIconography } from "react-native-materia";
import { GithubIcon } from "../icons/GithubIcon";
import { LayersRoundedIcon } from "../icons/LayersRoundedIcon";
import { WiFiRoundedIcon } from "@/icons/WiFiRoundedIcon";
import { BluetoothRoundedIcon } from "@/icons/BluetoothRoundedIcon";

export const icons = {
  ...defaultMateriaIconography,
  "github": GithubIcon,
  "layers-rounded": LayersRoundedIcon,
  "wifi-rounded": WiFiRoundedIcon,
  "bluetooth-rounded": BluetoothRoundedIcon,
};
