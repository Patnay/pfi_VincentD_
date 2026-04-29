import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CartProvider, useCart } from '../context/CartContext';
import ProduitsScreen from '../screens/ProduitsScreen';
import DetailsProduitScreen from '../screens/DetailsProduitScreen';
import PanierScreen from '../screens/PanierScreen';
import CompteScreen from '../screens/CompteScreen';

function TabBar({ ongletActif, setOnglet }) {
  const { panier } = useCart();
  const nbItems = panier.reduce((acc, item) => acc + item.quantite, 0);

  const onglets = [
    { id: 'produits', label: ' Produits' },
    { id: 'panier', label: ` Panier${nbItems > 0 ? ` (${nbItems})` : ''}` },
    { id: 'compte', label: ' Compte' },
  ];

  return (
    <View style={styles.tabBar}>
      {onglets.map(o => (
        <Pressable
          key={o.id}
          style={[styles.tabBtn, ongletActif === o.id && styles.tabBtnActif]}
          onPress={() => setOnglet(o.id)}
        >
          <Text style={[styles.tabTexte, ongletActif === o.id && styles.tabTexteActif]}>
            {o.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function Navigation({ utilisateur, onLogout }) {
  const [onglet, setOnglet] = useState('produits');
  const [ecran, setEcran] = useState('produits');
  const [params, setParams] = useState({});

  const navigation = {
    navigate: (nomEcran, parametres = {}) => {
      setEcran(nomEcran);
      setParams(parametres);
    },
  };

  function changerOnglet(nouvelOnglet) {
    setOnglet(nouvelOnglet);
    setEcran(nouvelOnglet);
    setParams({});
  }

  function renderEcran() {
    if (ecran === 'details') {
      return (
        <DetailsProduitScreen
          navigation={navigation}
          params={params}
          utilisateur={utilisateur}
          onLogout={onLogout}
        />
      );
    }
    if (onglet === 'produits') {
      return (
        <ProduitsScreen
          navigation={navigation}
          utilisateur={utilisateur}
          onLogout={onLogout}
        />
      );
    }
    if (onglet === 'panier') {
      return <PanierScreen utilisateur={utilisateur} onLogout={onLogout} />;
    }
    if (onglet === 'compte') {
      return <CompteScreen utilisateur={utilisateur} onLogout={onLogout} />;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.contenu}>{renderEcran()}</View>
      {ecran !== 'details' && (
        <TabBar ongletActif={onglet} setOnglet={changerOnglet} />
      )}
    </View>
  );
}

export default function PatNavigator({ utilisateur, onLogout }) {
  return (
    <CartProvider>
      <Navigation utilisateur={utilisateur} onLogout={onLogout} />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contenu: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabBtnActif: {
    borderTopWidth: 2,
    borderColor: '#e63946',
  },
  tabTexte: { fontSize: 12, color: '#888' },
  tabTexteActif: { color: '#e63946', fontWeight: 'bold' },
});

/* A ajouter pour la connection : import PatNavigator from './navigation/PatNavigator';

// Dans son composant, quand l'utilisateur est connecté :
const [utilisateurConnecte, setUtilisateurConnecte] = useState(null);

if (utilisateurConnecte) {
  return (
    <PatNavigator
      utilisateur={utilisateurConnecte}
      onLogout={() => setUtilisateurConnecte(null)}
    />
  );
}

Sinon afficher son écran de login normal...*/