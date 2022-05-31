import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Text,
  Pressable,
  Linking,
  TextInput,
} from 'react-native';

const colorGithub = '#010409';
const colorFontGithub = '#C9D1D9';
const colorDarkFontGithub = '#4F565E';

const urlToMyGithub = 'https://github.com/ismaelsousa';

const App = () => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);

  const handleRequestUserData = async () => {
    if (inputRef.current) {
      inputRef.current.blur();
      inputRef.current.clear();
    }

    setProfile(null);

    if (!user) return;

    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setUser(null);
        return;
      }

      setProfile(data);
    } catch (err) {
      console.log(err);
    }

    setUser(null);
  };

  const handlePressGoToGithub = async () => {
    console.log('Verificando link');
    if (!profile) return;
    const res = await Linking.canOpenURL(profile.html_url);
    if (res) {
      console.log('Link aprovado');
      console.log('Abrindo link....');
      await Linking.openURL(profile.html_url);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar
        backgroundColor={colorGithub}
        barStyle="light-content"
      />

      <View style={style.content}>
        <TextInput
          ref={inputRef}
          style={style.input}
          onChangeText={(text) => setUser(text)}
          onSubmitEditing={handleRequestUserData}
        />
        <Pressable onPress={handleRequestUserData}>
          <View style={style.button}>
            <Text style={[style.defaultText, style.textButton]}>Buscar</Text>
          </View>
        </Pressable>
      </View>

      {profile && (
        <View style={style.content}>
          <Image
            accessibilityLabel="Ismael no quarto com fundo azul"
            style={style.avatar}
            source={{ uri: profile?.avatar_url }}
          />
          <Text
            accessibilityLabel="Nome: ismael moreira"
            style={[style.defaultText, style.name]}
          >
            {profile?.name}
          </Text>
          <Text
            accessibilityLabel="Nickname: ismael sousa"
            style={[style.defaultText, style.nickname]}
          >
            {profile?.login}
          </Text>
          <Text
            accessibilityLabel="Descrição: Software engineer | Leader tech at Fleye | Mobile Developer | Mentor
          at Catapulta.club @ismaelmoreiraa | Prof. na DIO"
            style={[style.defaultText, style.description]}
          >
            {profile?.bio}
          </Text>

          <Pressable onPress={handlePressGoToGithub}>
            <View style={style.button}>
              <Text style={[style.defaultText, style.textButton]}>
                Open in Github
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    // Column
    backgroundColor: colorGithub,
    flex: 1, // Expandir para a tela inteira
    alignItems: 'center',
    // flexDirection: 'row',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 2,
  },
  defaultText: {
    color: colorFontGithub,
  },
  name: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 24,
  },
  nickname: {
    fontSize: 18,
    color: colorDarkFontGithub,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    backgroundColor: colorDarkFontGithub,
    borderRadius: 10,
    padding: 20,
  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    backgroundColor: colorFontGithub,
    minWidth: '60%',
    fontSize: 20,
  },
});
