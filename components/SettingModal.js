import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";

const SettingModal = ({ isModalVisible, setModalVisible }) => {
  const close = () => {
    setModalVisible(false);
  };
  return (
    <>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={close}
        style={{
          margin: 0,
        }}
        swipeDirection={"down"}
      >
        <View style={styles.modal_setting}>
          <View style={styles.modal_bar}></View>
          <View style={styles.setting_modal_content}>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"settings"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>
                Setting and Privacy
              </Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"clock"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>Your activity</Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"archive"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>Archieve</Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"maximize"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>QR code</Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"bookmark"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>Saved</Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather
                style={{}}
                name={"credit-card"}
                size={22}
                color={"black"}
              />
              <Text style={styles.setting_modal_data_text}>
                Order and Payments
              </Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather
                style={{}}
                name={"bar-chart"}
                size={22}
                color={"black"}
              />
              <Text style={styles.setting_modal_data_text}>close Firends</Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"star"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>Favorites</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal_setting: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#ccc",
    borderWidth: 0.6,
    position: "absolute",
    bottom: 0,
    height: 370,
    width: "100%",
  },
  setting_modal_data: {
    height: 42,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  setting_modal_content: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  setting_modal_data_text: {
    marginLeft: 10,
    fontSize: 15,
  },
  modal_bar: {
    height: 5,
    width: 40,
    backgroundColor: "black",

    alignSelf: "center",
    marginTop: 7,
  },
});

export default SettingModal;
