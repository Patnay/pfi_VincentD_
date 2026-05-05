import { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [panier, setPanier] = useState([]);

  function ajouterAuPanier(produit) {
    setPanier(prev => {
      const existe = prev.find(item => item.produit.id === produit.id);
      if (existe) {
        return prev.map(item =>
          item.produit.id === produit.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      }
      return [...prev, { produit, quantite: 1 }];
    });
  }

  function modifierQuantite(id, delta) {
    setPanier(prev =>
      prev
        .map(item =>
          item.produit.id === id
            ? { ...item, quantite: item.quantite + delta }
            : item
        )
        .filter(item => item.quantite > 0)
    );
  }

  function viderPanier() {
    setPanier([]);
  }

  const total = useMemo(
    () => panier.reduce((acc, item) => acc + item.produit.prix * item.quantite, 0),
    [panier]
  );

  return (
    <CartContext.Provider value={{ panier, ajouterAuPanier, modifierQuantite, viderPanier, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}