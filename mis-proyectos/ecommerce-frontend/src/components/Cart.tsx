import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Checkout } from './Checkout';
import './Cart.css';

interface CartProps {
  onBack?: () => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const Cart = ({ onBack, onShowToast }: CartProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  if (showCheckout) {
    return (
      <Checkout
        onBack={() => setShowCheckout(false)}
        onComplete={() => {
          setShowCheckout(false);
          onBack?.();
        }}
        onShowToast={onShowToast}
      />
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="page-header">
          <button className="back-button" onClick={onBack}>
            ← Volver
          </button>
          <h2>Carrito de Compras</h2>
        </div>
        <div className="empty-cart">
          <p>🛒 Tu carrito está vacío</p>
          <p>¡Añade algunos productos para comenzar!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          ← Volver
        </button>
      </div>
      <div className="cart-header">
        <h2>Carrito de Compras ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</h2>
        <button className="clear-cart-button" onClick={clearCart}>
          🗑️ Vaciar carrito
        </button>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-info">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-category">{item.category}</p>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-controls">
              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
                aria-label="Eliminar producto"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <span className="total-label">Total:</span>
          <span className="total-amount">${totalPrice.toFixed(2)}</span>
        </div>
        <button className="checkout-button" onClick={() => setShowCheckout(true)}>
          💳 Proceder al pago
        </button>
      </div>
    </div>
  );
};
