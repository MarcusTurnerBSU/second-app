import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import responseArray from "./responseArray";
import { useTheme } from "@react-navigation/native";
import images from "./images.js"

const STORAGE_KEY = "@save_hour";

const App = () => {
  const { colors } = useTheme();
  const [hour, setHour] = useState("");
  let [outputMessage, setoutputMessage] = useState("...");
  let [outputImage, setOutputImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false)

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, hour);
      alert("Data successfully saved");
    } catch (e) {
      alert("Failed to save the data to the storage");
    }
  };

  const readData = async () => {
    try {
      const userHour = await AsyncStorage.getItem(STORAGE_KEY);

      if (userHour !== null) {
        setHour(userHour);
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };

  useEffect(() => {
    readData();
  }, []);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  const onChangeText = (userHour) => setHour(userHour);

  const onSubmitEditing = () => {
    if (!hour) return;

    saveData(hour);

    if (hour >= 6) {
      outputMessage = responseArray[0];
      setoutputMessage(outputMessage);
      outputImage = images[0];
      setOutputImage(outputImage);
    } 
    else if (hour < 6 && hour >= 4) {
      outputMessage = responseArray[1];
      setoutputMessage(outputMessage);
      outputImage = images[1];
      setOutputImage(outputImage);
    }
    else if (hour < 4 && hour >= 0) {
      outputMessage = responseArray[2];
      setoutputMessage(outputMessage);
      outputImage = images[2];
      setOutputImage(outputImage);
    }
  };

  return (
    <View style={[styles.container,{backgroundColor: colors.background}]}>
      <Modal 
      animationType={"slide"} 
      visible={modalVisible} 
      transparent={true} 
      onRequestClose={() => {
      }}><View style={styles.modalView}>
          <Text style={styles.modalText}>Instructions{"\n"}
          {"\n"}Enter your hours into the text field{"\n"}
          {"\n"}You can save your input by clicking the 'Save Data' button{"\n"}
          {"\n"}You can clear your input by clicking the 'Clear Data' button
          </Text>
          <TouchableOpacity style={styles.modalButton} 
            onPress={() => {
          setModalVisible(!modalVisible)
          }}>
          <Text style={styles.modalButton}>Close Instructions</Text></TouchableOpacity></View></Modal> 
      <View style={styles.header}>
        <Text style={styles.title}>Productivity App</Text>
      </View>
      <View style={styles.panel}>
        <Text style={[styles.text, {color: colors.text}]}>Enter hours spent programming</Text>
        <TextInput
          style={[styles.input, {backgroundColor: colors.card}, {color: colors.text}]} 
          borderRadius={5}
          value={hour}
          textAlign="center"
          placeholder="Enter Here"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
        />
        <Text style={[styles.outputText, {color: colors.text}]}>{outputMessage}</Text>
          <Image source={outputImage.image}></Image>
        <View style={styles.outputImage}>
          <TouchableOpacity onPress={saveData} style={styles.button}>
            <Text style={styles.buttonText}>Save Data</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearStorage} style={styles.button}>
            <Text style={styles.buttonText}>Clear Data</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rightCorner}>      
          <TouchableOpacity onPress={() => setModalVisible(true) }>
            <Text style={styles.redColour}>i</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    backgroundColor: "#f55",
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "#333",
    fontWeight: "bold",
  },
  panel: {
    paddingTop: 30,
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  outputText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20
  },
  outputImage: {
    padding: 60,
  },
  input: {
    padding: 15,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#333",
    margin: 20,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: "#f55",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
  modalView: {
    margin: 60,
    paddingTop: 70,
    justifyContent: "flex-end",
    padding: 30,
    backgroundColor: 'rgba(132,146,166,0.97)',
    borderRadius: 10,
  },
  modalButton: {
    backgroundColor: "#f55",
    borderRadius: 5,
    fontSize: 15,
    margin: 5,
    padding: 2,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  rightCorner:{
    marginLeft: 350,
    marginTop: 30
  },
  redColour: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#f55"
  }
});
