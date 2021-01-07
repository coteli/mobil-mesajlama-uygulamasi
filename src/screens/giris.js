import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";

function Giris() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/giris.png")} />
      <Text style={styles.text}>
        Mobil Mesajlaşma Uygulamasına Hoşgeldiniz!
      </Text>
      <Text style={styles.subtext}>
        Bu uygulama ile oda ekleme seçeneğini kullanarak yeni bir Sohbet Odası
        ekleyebilir veya mevcut odalardan herhangi birini seçerek mesajlaşmaya
        başlayabilirsiniz!
      </Text>
      <TouchableOpacity>
        <Button
          onPress={() => {
            alert("Giriş");
          }}
          title="Google İle Giriş Yap"
        />
      </TouchableOpacity>
    </View>
  );
}
export default Giris;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 50,
  },
  text: {
    paddingHorizontal: 40,
    textAlign: "center",
    fontSize: 24,
    marginBottom: 20,
  },
  subtext: {
    textAlign: "center",
    fontWeight: "100",
    paddingHorizontal: 60,
    marginBottom: 60,
  },
});