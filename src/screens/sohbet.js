import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import vt from "../components/firebase";

export default function Sohbet({ navigation }) {
  const [input, setInput] = useState("");
  const route = useRoute();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (route.params.id) {
      vt.collection("rooms")
        .doc(route.params.id)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      vt.collection("rooms")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [route.params.id]);

  const mesajGonder = () => {
    vt.collection("rooms").doc(route.params.id).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={{
            uri: `https://ui-avatars.com/api/?name=${roomName}&background=random&color=fff&rounded=true`,
          }}
        />
        <Text style={styles.roomname}>{roomName}</Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.govde}>
        <ImageBackground
          style={styles.bgimage}
          source={require("../../assets/arkaplan.png")}
        >
          {messages.map((message, i) => (
            <View style={styles.gelenmesaj} key={i}>
              <Text style={styles.mesaj_isim}>{message.name}</Text>
              <Text style={styles.mesaj_metin}>{message.message}</Text>
              <Text style={styles.mesaj_zaman}>
                {new Date(message.timestamp?.toDate()).toLocaleString()}
              </Text>
            </View>
          ))}
        </ImageBackground>
      </View>
      <View style={styles.mesajcontainer}>
        <TextInput
          style={styles.mesajinput}
          placeholder="Mesajınızı yazın..."
          onChangeText={(input) => setInput(input)}
          value={input}
        />
        <TouchableOpacity onPress={mesajGonder}>
          <Feather name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 90,
    flexDirection: "row",
    backgroundColor: "#ededed",
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 99,
    marginHorizontal: 10,
  },
  roomname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: "auto",
    paddingHorizontal: 20,
  },
  govde: {
    flex: 1,
    overflow: "hidden",
  },
  bgimage: {
    flex: 1,
    resizeMode: "cover",
  },
  mesajcontainer: {
    flexDirection: "row",
    height: 62,
    backgroundColor: "lightgray",
    alignItems: "center",
    padding: 10,
    paddingRight: 20,
  },
  mesajinput: {
    flex: 1,
    borderRadius: 30,
    padding: 10,
    marginRight: 20,
    backgroundColor: "#fff",
  },
});
