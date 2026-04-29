import { View, Text, FlatList, Image, Pressable, Modal, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function PanierScreen({ utilisateur, onLogout }) {
  const { panier, modifierQuantite, viderPanier, total } = useCart();
  const [modalVisible, setModalVisible] = useState(false);

  function handleConfirmerAchat() {
    viderPanier();
    setModalVisible(false);
    Alert.alert('Merci !', 'Votre commande a été passée avec succès.');
  }

  return (
    <View style={styles.container}>
      <View style={styles.entete}>
        <Text style={styles.bienvenue}> {utilisateur?.nom || 'Invité'}</Text>
        <Pressable onPress={onLogout}>
          <Text style={styles.logout}>Déconnexion</Text>
        </Pressable>
      </View>

      <Text style={styles.titre}>Mon panier</Text>

      {panier.length === 0 ? (
        <View style={styles.vide}>
          <Text style={styles.videTexte}>Votre panier est vide.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={panier}
            keyExtractor={item => item.produit.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.produit.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.nom}>{item.produit.nom}</Text>
                  <Text style={styles.prixUnit}>{item.produit.prix} $ / unité</Text>
                  <Text style={styles.sousTotal}>
                    Sous-total : {item.produit.prix * item.quantite} $
                  </Text>
                  <View style={styles.quantiteRow}>
                    <Pressable
                      style={styles.btnQte}
                      onPress={() => modifierQuantite(item.produit.id, -1)}
                    >
                      <Text style={styles.btnQteTexte}>−</Text>
                    </Pressable>
                    <Text style={styles.quantite}>{item.quantite}</Text>
                    <Pressable
                      style={styles.btnQte}
                      onPress={() => modifierQuantite(item.produit.id, 1)}
                    >
                      <Text style={styles.btnQteTexte}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total : {total} $</Text>
            <Pressable style={styles.btnVider} onPress={viderPanier}>
              <Text style={styles.btnViderTexte}>Vider le panier</Text>
            </Pressable>
            <Pressable style={styles.btnAcheter} onPress={() => setModalVisible(true)}>
              <Text style={styles.btnAcheterTexte}>Acheter</Text>
            </Pressable>
          </View>
        </>
      )}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitre}>Récapitulatif</Text>
            {panier.map(item => (
              <Text key={item.produit.id} style={styles.modalItem}>
                {item.produit.nom} × {item.quantite} — {item.produit.prix * item.quantite} $
              </Text>
            ))}
            <Text style={styles.modalTotal}>Total : {total} $</Text>
            <Pressable style={styles.btnConfirmer} onPress={handleConfirmerAchat}>
              <Text style={styles.btnConfirmerTexte}>Confirmer l'achat</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.annuler}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', paddingTop: 50 },
  entete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  bienvenue: { fontSize: 13, color: '#444' },
  logout: { fontSize: 13, color: '#e63946' },
  titre: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#e63946' },
  vide: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  videTexte: { fontSize: 18, color: '#888' },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  image: { width: 60, height: 85, resizeMode: 'contain' },
  info: { flex: 1, marginLeft: 12 },
  nom: { fontWeight: '600', fontSize: 15 },
  prixUnit: { color: '#555', fontSize: 13, marginTop: 2 },
  sousTotal: { color: '#e63946', fontSize: 13, marginTop: 2 },
  quantiteRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  btnQte: {
    backgroundColor: '#e63946',
    borderRadius: 6,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnQteTexte: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  quantite: { marginHorizontal: 12, fontSize: 16, fontWeight: '600' },
  footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 12, textAlign: 'right' },
  btnVider: {
    borderWidth: 1,
    borderColor: '#e63946',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnViderTexte: { color: '#e63946', fontWeight: '600' },
  btnAcheter: {
    backgroundColor: '#e63946',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  btnAcheterTexte: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalBox: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
  },
  modalTitre: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  modalItem: { fontSize: 14, color: '#444', marginBottom: 4 },
  modalTotal: { fontSize: 17, fontWeight: 'bold', marginTop: 12, marginBottom: 20, color: '#e63946' },
  btnConfirmer: {
    backgroundColor: '#e63946',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnConfirmerTexte: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  annuler: { textAlign: 'center', color: '#888', fontSize: 15 },
});