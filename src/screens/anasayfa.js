import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Odalar from "../components/Odalar";
import vt from "../components/firebase";
import { useRoute } from "@react-navigation/native";

export default function Anasayfa({ navigation }) {
  const route = useRoute();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = vt.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: route.params.userPhoto }} />
        <Text style={styles.username}>{route.params.userName}</Text>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Odalar yeniOda />
        {rooms.map((room) => (
          <Odalar name={room.data.name} key={room.id} id={room.id} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: "auto",
    paddingHorizontal: 20,
  },
});
