'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a context for the selected items
interface ProductsContextType {
  selectedItems: { [key: string]: { quantity: number; checked: boolean } };
  setSelectedItems: React.Dispatch<React.SetStateAction<{ [key: string]: { quantity: number; checked: boolean } }>>;
}

interface ProductsProviderProps {
  children: ReactNode;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useSelectedItems = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useSelectedItems must be used within a ProductsProvider');
  }
  return context;
};


export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: { quantity: number; checked: boolean } }>({});

  return (
    <ProductsContext.Provider value={{ selectedItems, setSelectedItems }}>
      {children}
    </ProductsContext.Provider>
  );
};
