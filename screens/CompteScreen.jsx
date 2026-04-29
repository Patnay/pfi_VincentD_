import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

export default function CompteScreen({ utilisateur, onLogout }) {
  const [mdp, setMdp] = useState(utilisateur?.mdp || '');
  const [adresse, setAdresse] = useState(utilisateur?.adresse || '');
  const [langue, setLangue] = useState(utilisateur?.langue || 'fr');

  function handleSauvegarder() {
    // À remplacer par UPDATE SQLite quand la DB de Vincent est prête
    Alert.alert('Sauvegardé', 'Vos informations ont été mises à jour.');
  }

  return (
    <View style={styles.container}>
      <View style={styles.entete}>
        <Text style={styles.bienvenue}>👤 {utilisateur?.nom || 'Invité'}</Text>
        <Pressable onPress={onLogout}>
          <Text style={styles.logout}>Déconnexion</Text>
        </Pressable>
      </View>

      <Text style={styles.titre}>Mon compte</Text>

      <Text style={styles.label}>Nom</Text>
      <Text style={styles.nomAffiche}>{utilisateur?.nom || '—'}</Text>

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        value={mdp}
        onChangeText={setMdp}
        secureTextEntry
        placeholder="Nouveau mot de passe"
      />

      <Text style={styles.label}>Adresse</Text>
      <TextInput
        style={styles.input}
        value={adresse}
        onChangeText={setAdresse}
        placeholder="Votre adresse"
      />

      <Text style={styles.label}>Langue</Text>
      <View style={styles.radioGroupe}>
        {[
          { label: 'Français', val: 'fr' },
          { label: 'English', val: 'en' },
          { label: 'Auto', val: 'auto' },
        ].map(opt => (
          <Pressable key={opt.val} style={styles.radioOption} onPress={() => setLangue(opt.val)}>
            <View style={[styles.radioCircle, langue === opt.val && styles.radioActif]} />
            <Text style={styles.radioLabel}>{opt.label}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.btnSauvegarder} onPress={handleSauvegarder}>
        <Text style={styles.btnTexte}>Sauvegarder</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingTop: 50, backgroundColor: '#fff' },
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bienvenue: { fontSize: 13, color: '#444' },
  logout: { fontSize: 13, color: '#e63946' },
  titre: { fontSize: 22, fontWeight: 'bold', color: '#e63946', marginBottom: 24, textAlign: 'center' },
  label: { fontSize: 13, color: '#888', marginBottom: 4, marginTop: 16 },
  nomAffiche: { fontSize: 16, fontWeight: '600', color: '#222' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  radioGroupe: { flexDirection: 'row', gap: 20, marginTop: 8 },
  radioOption: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#e63946',
  },
  radioActif: { backgroundColor: '#e63946' },
  radioLabel: { fontSize: 15 },
  btnSauvegarder: {
    backgroundColor: '#e63946',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  btnTexte: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});