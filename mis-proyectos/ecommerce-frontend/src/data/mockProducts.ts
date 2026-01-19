import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - 256GB",
    price: 1199.99,
    description: "El iPhone más avanzado con chip A17 Pro, cámara ProRAW y pantalla Super Retina XDR de 6.7 pulgadas.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    rating: { rate: 4.8, count: 324 }
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra",
    price: 1099.99,
    description: "Smartphone premium con S Pen integrado, cámara de 200MP y pantalla Dynamic AMOLED 2X.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    rating: { rate: 4.7, count: 289 }
  },
  {
    id: 3,
    title: "Camiseta Premium Algodón",
    price: 29.99,
    description: "Camiseta 100% algodón orgánico, cómoda y duradera. Disponible en múltiples colores.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    rating: { rate: 4.5, count: 156 }
  },
  {
    id: 4,
    title: "Vestido Elegante de Verano",
    price: 49.99,
    description: "Vestido flojo y cómodo perfecto para el verano. Diseño moderno y elegante.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    rating: { rate: 4.6, count: 203 }
  },
  {
    id: 5,
    title: "MacBook Pro 16 pulgadas M3",
    price: 2499.99,
    description: "Potente laptop profesional con chip Apple M3, 16GB RAM y SSD de 512GB.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400",
    rating: { rate: 4.9, count: 445 }
  },
  {
    id: 6,
    title: "Auriculares Sony WH-1000XM5",
    price: 399.99,
    description: "Auriculares inalámbricos con cancelación de ruido líder y sonido Hi-Res.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: { rate: 4.8, count: 567 }
  },
  {
    id: 7,
    title: "Chaqueta Denim Clásica",
    price: 79.99,
    description: "Chaqueta denim resistente y atemporal. Ideal para todas las temporadas.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    rating: { rate: 4.4, count: 178 }
  },
  {
    id: 8,
    title: "Bolso de Mano de Cuero",
    price: 89.99,
    description: "Bolso elegante de cuero genuino con múltiples compartimentos y diseño sofisticado.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400",
    rating: { rate: 4.7, count: 234 }
  },
  {
    id: 9,
    title: "Zapatillas Running Nike Air Max",
    price: 129.99,
    description: "Zapatillas deportivas de alto rendimiento con tecnología Air Max para máximo confort.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    rating: { rate: 4.6, count: 312 }
  },
  {
    id: 10,
    title: "Reloj Inteligente Apple Watch Series 9",
    price: 429.99,
    description: "Smartwatch con monitor de salud avanzado, GPS integrado y resistencia al agua.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400",
    rating: { rate: 4.7, count: 423 }
  },
  {
    id: 11,
    title: "Falda Plisada Midi",
    price: 39.99,
    description: "Falda elegante plisada perfecta para oficina o ocasiones especiales.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1583496661160-fb588837bf93?w=400",
    rating: { rate: 4.5, count: 145 }
  },
  {
    id: 12,
    title: "Tablet iPad Air 11 pulgadas",
    price: 599.99,
    description: "Tablet versátil con chip M2, pantalla Liquid Retina y compatibilidad con Apple Pencil.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    rating: { rate: 4.8, count: 267 }
  },
  {
    id: 13,
    title: "Pantalones Chinos Clásicos",
    price: 59.99,
    description: "Pantalones chinos de corte clásico, cómodos y versátiles para cualquier ocasión.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400",
    rating: { rate: 4.3, count: 198 }
  },
  {
    id: 14,
    title: "Blazer Formal de Oficina",
    price: 119.99,
    description: "Blazer elegante y profesional, perfecto para reuniones de negocios y eventos formales.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1591047135029-9c2c9a63c97b?w=400",
    rating: { rate: 4.6, count: 176 }
  },
  {
    id: 15,
    title: "Cámara Canon EOS R6",
    price: 2499.99,
    description: "Cámara mirrorless profesional con sensor full-frame y grabación 4K.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    rating: { rate: 4.9, count: 89 }
  },
  {
    id: 16,
    title: "Jeans Slim Fit Premium",
    price: 69.99,
    description: "Jeans de corte slim con stretch para mayor comodidad y estilo moderno.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1582418702059-97ebaf932f11?w=400",
    rating: { rate: 4.4, count: 223 }
  },
  {
    id: 17,
    title: "Blusa de Seda Premium",
    price: 54.99,
    description: "Blusa elegante de seda natural, suave al tacto y perfecta para ocasiones especiales.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400",
    rating: { rate: 4.7, count: 189 }
  },
  {
    id: 18,
    title: "PlayStation 5",
    price: 499.99,
    description: "Consola de última generación con procesador AMD Ryzen Zen 2 y GPU RDNA 2.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    rating: { rate: 4.9, count: 678 }
  },
  {
    id: 19,
    title: "Chaqueta Cortavientos Deportiva",
    price: 64.99,
    description: "Chaqueta resistente al viento y agua, ideal para actividades al aire libre.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400",
    rating: { rate: 4.5, count: 167 }
  },
  {
    id: 20,
    title: "Botas Anchas de Cuero",
    price: 149.99,
    description: "Botas elegantes de cuero genuino con suela antideslizante y diseño moderno.",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1608256246200-53bd35f3f44e?w=400",
    rating: { rate: 4.6, count: 211 }
  }
];

export const mockCategories: string[] = [
  "electronics",
  "men's clothing",
  "women's clothing"
];
