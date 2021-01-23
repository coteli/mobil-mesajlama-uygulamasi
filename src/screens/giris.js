import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import * as Google from "expo-google-app-auth";

function Giris({ navigation }) {
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "677117166908-f6prgv5tedobv47idrprsu1fqkdj9kac.apps.googleusercontent.com",
        iosClientId:
          "677117166908-ejgju85cqd897cdgp4lmjn15vohudjlj.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log("giriş yapıldı!");
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/giris.png")} />
      <Text style={styles.text}>
        Mobil Mesajlaşma Uygulamasına Hoşgeldiniz!
      </Text>
      <Text style={styles.subtext}>
        Uygulamaya giriş yaptıktan sonra oda ekleme seçeneğini kullanarak yeni
        bir Sohbet Odası ekleyebilir veya mevcut odalardan herhangi birini
        seçerek mesajlaşmaya başlayabilirsiniz!
      </Text>
      <TouchableOpacity>
        <Button onPress={signInWithGoogleAsync} title="Google İle Giriş Yap" />
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
    backgroundColor: "white",
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
