import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import vt from "./firebase";

export default function Odalar({ yeniOda, id, name }) {
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
    const roomName = prompt((title: "Yeni oda için bir isim girin..."));
    if (roomName) {
      vt.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !yeniOda ? (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          alert("Sohbete Git");
        }}
      >
        <View style={styles.room}>
          <Image
            style={styles.avatar}
            width="64"
            height="64"
            source={{
              uri: `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&rounded=true`,
            }}
          />
          <View>
            <Text style={styles.roomname}>{name}</Text>
            <Text style={styles.subtext}>{messages[0]?.messages}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  ) : (
    <View>
      <TouchableOpacity onPress={odaOlustur}>
        <View style={styles.eklecontainer}>
          <Text style={styles.ekle}>+ Oda Ekleyin!</Text>
        </View>
      </TouchableOpacity>
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
  },
  avatar: {
    width: 70,
    height: 70,
    marginHorizontal: 10,
  },
  roomname: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 18,
  },
  eklecontainer: {
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  ekle: {
    height: 90,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    padding: 30,
  },
});
