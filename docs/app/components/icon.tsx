import React from "react";
import Head from "expo-router/head";
import Svg, { Path } from "react-native-svg";
import { Icon, useMateriaColors, useMateriaTokens } from "react-native-materia";
import type { MateriaIconProps } from "react-native-materia/types";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import { RowWrap } from "@/components/RowWrap";
import iconContent from "@/content/icon.md";

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

const IconPage = () => {
  const colors = useMateriaColors();
  const tokens = useMateriaTokens();

  return (
    <PageContent>
      <Head>
        <title>React Native Materia - Icon</title>
      </Head>
      <MarkdownRenderer
        content={iconContent}
        slots={{
          DEMO_MAIN: (
            <Figure>
              <RowWrap>
                <Icon source="home-rounded" size={28} />
                <Icon source="settings-outline-rounded" size={28} />
                <Icon source="check-rounded" size={28} />
                <Icon source="delete-rounded" size={28} />
                <Icon source="info-rounded" size={28} />
              </RowWrap>
            </Figure>
          ),
          DEMO_SIZES: (
            <Figure>
              <RowWrap style={{ alignItems: "center" }}>
                <Icon
                  source="settings-outline-rounded"
                  size={tokens.iconSize["18dp"]}
                />
                <Icon
                  source="settings-outline-rounded"
                  size={tokens.iconSize["24dp"]}
                />
                <Icon
                  source="settings-outline-rounded"
                  size={tokens.iconSize["40dp"]}
                />
                <Icon
                  source="settings-outline-rounded"
                  size={tokens.iconSize["48dp"]}
                />
              </RowWrap>
            </Figure>
          ),
          DEMO_COLORS: (
            <Figure>
              <RowWrap>
                <Icon source="info-rounded" color={colors.primary} />
                <Icon source="delete-rounded" color={colors.error} />
                <Icon source="check-rounded" color={colors.tertiary} />
              </RowWrap>
            </Figure>
          ),
          DEMO_CUSTOM: (
            <Figure>
              <RowWrap>
                <Icon
                  source={CustomBookmarkIcon}
                  color={colors.secondary}
                  size={32}
                />
              </RowWrap>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

export default IconPage;
