import type { Product } from '../types';
import { mockProducts, mockCategories } from '../data/mockProducts';

// Simulación de delay de red para hacer la app más realista
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    await delay(800); // Simula carga de red
    return mockProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: number): Promise<Product> => {
  try {
    await delay(500);
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchCategories = async (): Promise<string[]> => {
  try {
    await delay(300);
    return mockCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
