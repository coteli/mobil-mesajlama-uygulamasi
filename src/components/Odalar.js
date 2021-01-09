import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import vt from "./firebase";
import { useNavigation } from "@react-navigation/native";

export default function Odalar({ yeniOda, name, id }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      vt.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  const odaOlustur = () => {
    vt.collection("rooms").add({
      name: text,
    });
    setText("");
    Keyboard.dismiss();
  };

  const navigation = useNavigation();

  return !yeniOda ? (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.push("Sohbet", { id: id });
        }}
      >
        <View style={styles.room}>
          <Image
            style={styles.avatar}
            width="64"
            height="64"
            source={{
              uri: `https://ui-avatars.com/api/?name=${name}&background=ff0000&color=fff&rounded=true`,
            }}
          />

          <View>
            <Text style={styles.roomname}>{name}</Text>
            <Text style={styles.subtext}>{messages[0]?.message}</Text>
          </View>
          <View style={styles.icon}>
            <Feather name="arrow-right-circle" size={24} color="gray" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <View>
      <View style={styles.eklecontainer}>
        <TextInput
          style={styles.ekle}
          placeholder="Yeni Bir Oda Ekleyin!"
          onChangeText={(text) => setText(text)}
          value={text}
        />
        <TouchableOpacity style={styles.icon} onPress={odaOlustur}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  room: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    overflow: "hidden",
  },
  avatar: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },
  roomname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 18,
    color: "gray",
    fontStyle: "italic",
  },
  eklecontainer: {
    flexDirection: "row",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    alignItems: "center",
  },
  ekle: {
    flex: 1,
    height: 90,
    fontSize: 24,
    padding: 30,
  },
  icon: {
    marginLeft: "auto",
    paddingHorizontal: 20,
  },
});
