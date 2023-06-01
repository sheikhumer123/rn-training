import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";

const CreateModal = ({ createModal, setCreateModal }) => {
  const close = () => {
    setCreateModal(false);
  };
  return (
    <>
      <Modal
        isVisible={createModal}
        onBackdropPress={close}
        style={{
          margin: 0,
        }}
        swipeDirection={"down"}
      >
        <View style={styles.modal_setting}>
          <View style={styles.modal_bar}></View>
          <Text style={styles.create_modal_title}>Create</Text>
          <View style={styles.setting_modal_content}>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"film"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>Reel</Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"grid"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>Post</Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather
                style={{}}
                name={"instagram"}
                size={22}
                color={"black"}
              />
              <Text style={styles.setting_modal_data_text}>Story</Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"slack"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>
                Story Highlight
              </Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather style={{}} name={"tv"} size={22} color={"black"} />
              <Text style={styles.setting_modal_data_text}>Live</Text>
            </View>
            <View style={styles.setting_modal_data}>
              <Feather
                style={{}}
                name={"book-open"}
                size={22}
                color={"black"}
              />
              <Text style={styles.setting_modal_data_text}>Guide</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  setting_modal_data: {
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderColor: "#ccc",
    marginLeft: 10,
  },
  setting_modal_content: {
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
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 7,
  },
  create_modal_title: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
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
});

export default CreateModal;
