import React, { useState } from "react";
import Head from "expo-router/head";
import { NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { AppBar, IconButton } from "react-native-materia";
import { PageContent } from "@/components/Page/PageContent";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Figure } from "@/components/Figure";
import appBarContent from "@/content/app-bar.md";
import { DeviceFrame } from "@/components/DeviceFrame";
import { ScrollView } from "react-native-gesture-handler";

const AppBarPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);
  };

  return (
    <PageContent>
      <Head>
        <title>React Native Materia - AppBar</title>
      </Head>
      <MarkdownRenderer
        content={appBarContent}
        slots={{
          DEMO_MAIN: (
            <Figure style={{ paddingBottom: 0 }}>
              <DeviceFrame>
                <AppBar
                  style={{
                    minHeight: 96,
                    paddingTop: 32,
                  }}
                  headline="App Bar"
                  leading={
                    <IconButton icon="arrow-back-rounded" onPress={() => {}} />
                  }
                />
              </DeviceFrame>
            </Figure>
          ),
          DEMO_LEADING: (
            <Figure style={{ paddingBottom: 0 }}>
              <DeviceFrame>
                <AppBar
                  style={{
                    minHeight: 96,
                    paddingTop: 32,
                  }}
                  headline="App Bar"
                  leading={
                    <IconButton icon="menu-rounded" onPress={() => {}} />
                  }
                />
              </DeviceFrame>
            </Figure>
          ),
          DEMO_SUBTITLE: (
            <Figure style={{ paddingBottom: 0 }}>
              <DeviceFrame>
                <AppBar
                  style={{
                    minHeight: 96,
                    paddingTop: 32,
                  }}
                  headline="App Bar"
                  subtitle="With Subtitle"
                  leading={
                    <IconButton icon="arrow-back-rounded" onPress={() => {}} />
                  }
                />
              </DeviceFrame>
            </Figure>
          ),
          DEMO_TRAILING: (
            <Figure style={{ paddingBottom: 0 }}>
              <DeviceFrame>
                <AppBar
                  style={{
                    minHeight: 96,
                    paddingTop: 32,
                  }}
                  headline="App Bar"
                  subtitle="With Subtitle"
                  leading={
                    <IconButton icon="arrow-back-rounded" onPress={() => {}} />
                  }
                  trailing={
                    <>
                      <IconButton icon="check-rounded" onPress={() => {}} />
                      <IconButton icon="close-rounded" onPress={() => {}} />
                    </>
                  }
                />
              </DeviceFrame>
            </Figure>
          ),
          DEMO_SCROLLED: (
            <Figure style={{ paddingBottom: 0 }}>
              <DeviceFrame>
                <AppBar
                  style={{
                    minHeight: 96,
                    paddingTop: 32,
                  }}
                  isScrolled={isScrolled}
                  headline="App Bar"
                  subtitle="With Subtitle"
                  leading={
                    <IconButton icon="arrow-back-rounded" onPress={() => {}} />
                  }
                  trailing={
                    <>
                      <IconButton icon="check-rounded" onPress={() => {}} />
                      <IconButton icon="close-rounded" onPress={() => {}} />
                    </>
                  }
                />
                <ScrollView
                  style={{ flex: 1 }}
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                >
                  <View style={{ height: 320 }} />
                </ScrollView>
              </DeviceFrame>
            </Figure>
          ),
        }}
      />
    </PageContent>
  );
};

export default AppBarPage;
