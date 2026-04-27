import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import {useSQLiteContext, SQLiteProvider} from "expo-sqlite";


export default function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
   if (!name || !email || !password){
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poke Pimps</Text>
      <Image style={styles.logo} source={require('./Images/Small-Logo-Cropped-Digital.jpg')} />
      <TextInput
        placeholder="Nom"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="S'inscrire" onPress={handleSignUp} />
      <Text style={styles.nom}>Vincent Demers, Patrice Paul</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    marginTop: 100,
    marginBottom: 100
  },
  nom: {
    marginTop: 50,
    textAlignVertical: 'bottom',
    justifyContent: 'center'
  },title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  }
});