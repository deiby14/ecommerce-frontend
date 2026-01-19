import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

interface CheckoutProps {
  onBack: () => void;
  onComplete: () => void;
  onShowToast?: (message: string, type?: 'success' | 'error' | 'info') => void;
}

interface FormData {
  email: string;
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  [key: string]: string;
}

export const Checkout = ({ onBack, onComplete, onShowToast }: CheckoutProps) => {
  const { cart, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = 'El email es requerido';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido';
      
      if (!formData.fullName) newErrors.fullName = 'El nombre completo es requerido';
      if (!formData.address) newErrors.address = 'La dirección es requerida';
      if (!formData.city) newErrors.city = 'La ciudad es requerida';
      if (!formData.zipCode) newErrors.zipCode = 'El código postal es requerido';
      if (!formData.country) newErrors.country = 'El país es requerido';
    }

    if (step === 2) {
      if (!formData.cardNumber) newErrors.cardNumber = 'El número de tarjeta es requerido';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
      }
      
      if (!formData.cardName) newErrors.cardName = 'El nombre en la tarjeta es requerido';
      if (!formData.expiryDate) newErrors.expiryDate = 'La fecha de expiración es requerida';
      else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Formato inválido (MM/AA)';
      }
      
      if (!formData.cvv) newErrors.cvv = 'El CVV es requerido';
      else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV inválido';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    }
    return v;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    clearCart();
    onShowToast?.('¡Pago procesado exitosamente! 🎉', 'success');
    
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (isComplete) {
    return (
      <div className="checkout-container">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h2>¡Pago Completado!</h2>
          <p>Tu orden ha sido procesada exitosamente</p>
          <div className="order-summary-success">
            <p><strong>Número de orden:</strong> #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p><strong>Total pagado:</strong> ${totalPrice.toFixed(2)}</p>
            <p><strong>Email de confirmación:</strong> {formData.email}</p>
          </div>
          <p className="success-message">Recibirás un email de confirmación en breve</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="back-button" onClick={onBack}>
          ← Volver al carrito
        </button>
        <h2>Proceso de Pago</h2>
      </div>

      <div className="checkout-stepper">
        <div className={`stepper-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          <div className="stepper-number">1</div>
          <div className="stepper-label">Información</div>
        </div>
        <div className="stepper-line"></div>
        <div className={`stepper-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          <div className="stepper-number">2</div>
          <div className="stepper-label">Pago</div>
        </div>
        <div className="stepper-line"></div>
        <div className={`stepper-step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="stepper-number">3</div>
          <div className="stepper-label">Confirmación</div>
        </div>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          {currentStep === 1 && (
            <div className="form-step">
              <h3>Información de Envío</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'error' : ''}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="fullName">Nombre Completo *</label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={errors.fullName ? 'error' : ''}
                    placeholder="Juan Pérez"
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="address">Dirección *</label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={errors.address ? 'error' : ''}
                    placeholder="Calle y número"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="city">Ciudad *</label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={errors.city ? 'error' : ''}
                    placeholder="Ciudad"
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">Código Postal *</label>
                  <input
                    type="text"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className={errors.zipCode ? 'error' : ''}
                    placeholder="12345"
                  />
                  {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="country">País *</label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className={errors.country ? 'error' : ''}
                  >
                    <option value="">Selecciona un país</option>
                    <option value="ES">España</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CL">Chile</option>
                    <option value="PE">Perú</option>
                    <option value="US">Estados Unidos</option>
                  </select>
                  {errors.country && <span className="error-message">{errors.country}</span>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="form-step">
              <h3>Información de Pago</h3>
              <div className="payment-methods">
                <div className="payment-method active">
                  <span>💳 Tarjeta de Crédito/Débito</span>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="cardNumber">Número de Tarjeta *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                    className={errors.cardNumber ? 'error' : ''}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="cardName">Nombre en la Tarjeta *</label>
                  <input
                    type="text"
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    className={errors.cardName ? 'error' : ''}
                    placeholder="JUAN PEREZ"
                  />
                  {errors.cardName && <span className="error-message">{errors.cardName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="expiryDate">Fecha de Expiración *</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                      }
                      handleInputChange('expiryDate', value);
                    }}
                    className={errors.expiryDate ? 'error' : ''}
                    placeholder="MM/AA"
                    maxLength={5}
                  />
                  {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="cvv">CVV *</label>
                  <input
                    type="text"
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    className={errors.cvv ? 'error' : ''}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && <span className="error-message">{errors.cvv}</span>}
                </div>
              </div>
              <div className="security-note">
                🔒 Tus datos están protegidos con encriptación SSL
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="form-step">
              <h3>Resumen de la Orden</h3>
              <div className="order-summary">
                <div className="order-items">
                  {cart.map((item) => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.title} className="order-item-image" />
                      <div className="order-item-info">
                        <h4>{item.title}</h4>
                        <p>Cantidad: {item.quantity}</p>
                      </div>
                      <div className="order-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Envío:</span>
                    <span>Gratis</span>
                  </div>
                  <div className="total-row final">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="checkout-sidebar">
          <div className="order-summary-card">
            <h3>Resumen del Pedido</h3>
            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span>{item.title}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-actions">
        {currentStep > 1 && (
          <button className="checkout-button secondary" onClick={handleBack}>
            ← Atrás
          </button>
        )}
        {currentStep < 3 ? (
          <button className="checkout-button primary" onClick={handleNext}>
            Continuar →
          </button>
        ) : (
          <button
            className="checkout-button primary"
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="spinner-small"></span> Procesando...
              </>
            ) : (
              '💳 Confirmar y Pagar'
            )}
          </button>
        )}
      </div>
    </div>
  );
};
