import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from "react-native";
import HomeTopNav from "../components/HomeTopNav";
import Stories from "../components/Stories";
import PostSection from "../components/PostSection";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView keyboardShouldPersistTaps="always">
        <HomeTopNav />
        <Stories />
        <View
          style={{
            borderBottomColor: "#ccc",
            marginTop: 10,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <PostSection />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
