import { defaultMateriaIconography } from "react-native-materia";
import { GithubIcon } from "../icons/GithubIcon";
import { LayersRoundedIcon } from "../icons/LayersRoundedIcon";
import { WiFiRoundedIcon } from "@/icons/WiFiRoundedIcon";
import { BluetoothRoundedIcon } from "@/icons/BluetoothRoundedIcon";
import { SearchRoundedIcon } from "@/icons/SearchRoundedIcon";
import { BatteryAndroidFullRoundedIcon } from "@/icons/BatteryAndroidFullRoundedIcon";
import { AndroidCellBarRoundedIcon } from "@/icons/AndroidCellBarRoundedIcon";

export const icons = {
  ...defaultMateriaIconography,
  "github": GithubIcon,
  "layers-rounded": LayersRoundedIcon,
  "wifi-rounded": WiFiRoundedIcon,
  "bluetooth-rounded": BluetoothRoundedIcon,
  "search-rounded": SearchRoundedIcon,
  "battery-android-full-rounded": BatteryAndroidFullRoundedIcon,
  "android-cell-bar-rounded": AndroidCellBarRoundedIcon,
};
