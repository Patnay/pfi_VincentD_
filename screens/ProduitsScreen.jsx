import { FlatList, Pressable, Image, Text, View, StyleSheet } from 'react-native';
import produits from '../data/produits.json';

export default function ProduitsScreen({ navigation, utilisateur, onLogout }) {
  return (
    <View style={styles.container}>
      <View style={styles.entete}>
        <Text style={styles.bienvenue}>👤 {utilisateur?.nom || 'Invité'}</Text>
        <Pressable onPress={onLogout}>
          <Text style={styles.logout}>Déconnexion</Text>
        </Pressable>
      </View>

      <Text style={styles.titre}>Nos cartes Pokémon</Text>

      <FlatList
        data={produits}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.carte}
            onPress={() => navigation.navigate('details', { produit: item })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.nom}>{item.nom}</Text>
              <Text style={styles.prix}>{item.prix} $</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', paddingTop: 50 },
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  bienvenue: { fontSize: 14, color: '#444' },
  logout: { fontSize: 13, color: '#e63946' },
  titre: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#e63946' },
  carte: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  image: { width: 70, height: 100, borderRadius: 8, resizeMode: 'contain' },
  info: { flex: 1, marginLeft: 16, justifyContent: 'center' },
  nom: { fontSize: 16, fontWeight: '600' },
  prix: { fontSize: 14, color: '#555', marginTop: 4 },
});