import React, { useState } from "react";
import Head from "expo-router/head";
import Svg, { Path } from "react-native-svg";
import { NavigationBar } from "react-native-materia";
import type { NavigationRoute } from "react-native-materia";
import type { MateriaIconProps } from "react-native-materia/types";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import { DeviceFrameBottom } from "@/components/DeviceFrameBottom";
import navigationBarContent from "@/content/navigation-bar.md";

const CustomBookmarkOutlineIcon = ({
  color,
  size,
  style,
  ...props
}: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style} {...props}>
    <Path
      fill={color}
      d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"
    />
  </Svg>
);

const CustomBookmarkIcon = ({
  color,
  size,
  style,
  ...props
}: MateriaIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style} {...props}>
    <Path
      fill={color}
      d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"
    />
  </Svg>
);

const MAIN_ROUTES: NavigationRoute[] = [
  {
    key: "home",
    label: "Home",
    icon: "home-outline-rounded",
    activeIcon: "home-rounded",
  },
  {
    key: "info",
    label: "Info",
    icon: "info-outline-rounded",
    activeIcon: "info-rounded",
  },
  {
    key: "settings",
    label: "Settings",
    icon: "settings-outline-rounded",
    activeIcon: "settings-rounded",
  },
];

const ICON_VARIATION_ROUTES: NavigationRoute[] = [
  {
    key: "home",
    label: "Home",
    icon: "home-outline-rounded",
    activeIcon: "home-rounded",
  },
  {
    key: "info",
    label: "Info",
    icon: "info-outline-rounded",
    activeIcon: "info-rounded",
  },
  {
    key: "settings",
    label: "Settings",
    icon: "settings-outline-rounded",
  },
];

const FIVE_ROUTES: NavigationRoute[] = [
  {
    key: "home",
    label: "Home",
    icon: "home-outline-rounded",
    activeIcon: "home-rounded",
  },
  {
    key: "create",
    label: "Create",
    icon: "add-rounded",
  },
  {
    key: "info",
    label: "Info",
    icon: "info-outline-rounded",
    activeIcon: "info-rounded",
  },
  {
    key: "trash",
    label: "Trash",
    icon: "delete-rounded",
  },
  {
    key: "settings",
    label: "Settings",
    icon: "settings-outline-rounded",
    activeIcon: "settings-rounded",
  },
];

const CUSTOM_ICON_ROUTES: NavigationRoute[] = [
  {
    key: "home",
    label: "Home",
    icon: "home-outline-rounded",
    activeIcon: "home-rounded",
  },
  {
    key: "saved",
    label: "Saved",
    icon: CustomBookmarkOutlineIcon,
    activeIcon: CustomBookmarkIcon,
  },
  {
    key: "settings",
    label: "Settings",
    icon: "settings-outline-rounded",
    activeIcon: "settings-rounded",
  },
];

const NavigationBarPage = () => {
  const [mainIndex, setMainIndex] = useState(0);
  const [iconsIndex, setIconsIndex] = useState(0);
  const [fiveRoutesIndex, setFiveRoutesIndex] = useState(0);
  const [customIconsIndex, setCustomIconsIndex] = useState(1);

  return (
    <PageContent>
      <Head>
        <title>React Native Materia - NavigationBar</title>
      </Head>
      <MarkdownRenderer
        content={navigationBarContent}
        slots={{
          DEMO_MAIN: (
            <Figure style={{ paddingTop: 0 }}>
              <DeviceFrameBottom>
                <NavigationBar
                  routes={MAIN_ROUTES}
                  selectedIndex={mainIndex}
                  onTabPress={(index) => setMainIndex(index)}
                />
              </DeviceFrameBottom>
            </Figure>
          ),
          DEMO_ICONS: (
            <Figure style={{ paddingTop: 0 }}>
              <DeviceFrameBottom>
                <NavigationBar
                  routes={ICON_VARIATION_ROUTES}
                  selectedIndex={iconsIndex}
                  onTabPress={(index) => setIconsIndex(index)}
                />
              </DeviceFrameBottom>
            </Figure>
          ),
          DEMO_FIVE_ROUTES: (
            <Figure style={{ paddingTop: 0 }}>
              <DeviceFrameBottom>
                <NavigationBar
                  routes={FIVE_ROUTES}
                  selectedIndex={fiveRoutesIndex}
                  onTabPress={(index) => setFiveRoutesIndex(index)}
                />
              </DeviceFrameBottom>
            </Figure>
          ),
          DEMO_CUSTOM_ICONS: (
            <Figure style={{ paddingTop: 0 }}>
              <DeviceFrameBottom>
                <NavigationBar
                  routes={CUSTOM_ICON_ROUTES}
                  selectedIndex={customIconsIndex}
                  onTabPress={(index) => setCustomIconsIndex(index)}
                />
              </DeviceFrameBottom>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

export default NavigationBarPage;
