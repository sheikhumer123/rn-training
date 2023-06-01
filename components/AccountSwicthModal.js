import { Avatar } from "@rneui/base";
import React, { useState, useRef, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import MainContext from "../MainContext/MainContext";

const AccountSwitchModal = ({ AccountModal, setAccountModal }) => {
  const { currentUser } = useContext(MainContext);
  const close = () => {
    setAccountModal(false);
  };
  return (
    <>
      <Modal
        isVisible={AccountModal}
        onBackdropPress={close}
        style={{
          margin: 0,
        }}
        swipeDirection="down"
        swipeThreshold={40}
        onSwipeComplete={close}
        onBackButtonPress={close}
      >
        <View style={styles.modal_setting}>
          <View style={styles.account_modal_container}>
            <View style={styles.modal_bar}></View>
            <View style={styles.account_modal_content}>
              <View style={styles.account_modal_data}>
                <Avatar
                  size={50}
                  s
                  rounded
                  source={{
                    uri: currentUser.user_img,
                  }}
                />
                <Text style={styles.account_modal_content_text}>
                  {currentUser.email}
                </Text>
              </View>
            </View>

            <View style={styles.account_modal_content}>
              <View style={styles.account_modal_data}>
                <Avatar
                  size={50}
                  s
                  rounded
                  source={require("../assets/images/add-img.png")}
                />
                <Text style={styles.account_modal_content_text}>
                  Add account
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  account_modal_data: {
    height: 37,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  account_modal_content: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  account_modal_content_text: {
    marginLeft: 10,
    fontSize: 14,
  },
  account_modal_container: {
    marginTop: 10,
    paddingHorizontal: 5,
  },
  modal_bar: {
    height: 5,
    width: 40,
    backgroundColor: "black",
    borderRadius: 10,
    alignSelf: "center",
  },
  modal_setting: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#ccc",
    borderWidth: 0.6,
    position: "absolute",
    bottom: 0,
    height: 180,
    width: "100%",
  },
});

export default AccountSwitchModal;
