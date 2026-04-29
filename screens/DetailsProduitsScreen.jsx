import { View, Text, Image, Pressable, Alert, StyleSheet, ScrollView } from 'react-native';
import { useCart } from '../context/CartContext';

export default function DetailsProduitScreen({ navigation, params, utilisateur, onLogout }) {
  const { produit } = params;
  const { ajouterAuPanier } = useCart();

  function handleAjouter() {
    ajouterAuPanier(produit);
    Alert.alert('Ajouté !', `${produit.nom} a été ajouté au panier.`);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.entete}>
        <Text style={styles.bienvenue}>{utilisateur?.nom || 'Invité'}</Text>
        <Pressable onPress={onLogout}>
          <Text style={styles.logout}>Déconnexion</Text>
        </Pressable>
      </View>

      <Pressable onPress={() => navigation.navigate('produits')} style={styles.retour}>
        <Text style={styles.retourTexte}>← Retour</Text>
      </Pressable>

      <Image source={{ uri: produit.image }} style={styles.image} />
      <Text style={styles.nom}>{produit.nom}</Text>
      <Text style={styles.prix}>{produit.prix} $</Text>
      <Text style={styles.description}>{produit.description}</Text>

      <Pressable style={styles.bouton} onPress={handleAjouter}>
        <Text style={styles.boutonTexte}>Ajouter au panier</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  bienvenue: { fontSize: 13, color: '#444' },
  logout: { fontSize: 13, color: '#e63946' },
  retour: { alignSelf: 'flex-start', marginBottom: 16 },
  retourTexte: { color: '#e63946', fontSize: 16 },
  image: { width: 220, height: 310, resizeMode: 'contain', marginBottom: 24 },
  nom: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  prix: { fontSize: 20, color: '#e63946', marginBottom: 16 },
  description: { fontSize: 15, color: '#555', textAlign: 'center', marginBottom: 32 },
  bouton: {
    backgroundColor: '#e63946',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  boutonTexte: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});