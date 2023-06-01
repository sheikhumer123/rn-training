import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const SimpleDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = ["Option 1", "Option 2", "Option 3"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <Text>{currentUser.email}</Text>
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent={true}
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleOptionSelect(option)}
              style={styles.optionContainer}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
};
export default SimpleDropdown;
