import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiCreditCard, FiDollarSign, FiSmartphone } from 'react-icons/fi';

export default function Checkout() {
  const { cart, totalPrice, checkout, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'cod'
  });
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSection, setPaymentSection] = useState('cod'); // 'cod', 'card', 'upi'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Format card number with spaces every 4 digits
    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Limit to 16 digits + 3 spaces
    }
    
    // Format expiry date with slash
    if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
    }
    
    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
  };

  const validateCard = () => {
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }
    if (!cardDetails.name) {
      alert('Please enter cardholder name');
      return false;
    }
    if (!cardDetails.expiry || !cardDetails.expiry.includes('/') || cardDetails.expiry.length !== 5) {
      alert('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
      alert('Please enter a valid 3-digit CVV');
      return false;
    }
    return true;
  };

  const validateUpi = () => {
    if (!upiId || !upiId.includes('@')) {
      alert('Please enter a valid UPI ID (e.g., name@upi)');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.address || !formData.city || !formData.state || !formData.zip) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Validate payment method specific fields
    if (formData.paymentMethod === 'card' && !validateCard()) return;
    if (formData.paymentMethod === 'upi' && !validateUpi()) return;
    
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      const order = checkout({
        shippingAddress: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        },
        paymentMethod: formData.paymentMethod,
        paymentDetails: formData.paymentMethod === 'card' ? cardDetails : 
                        formData.paymentMethod === 'upi' ? { upiId } : null
      });
      
      setOrderDetails(order);
      setOrderSuccess(true);
      setIsProcessing(false);
      clearCart();
    }, 1500);
  };

  useEffect(() => {
    setPaymentSection(formData.paymentMethod);
  }, [formData.paymentMethod]);

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg"
        >
          Browse Products
        </button>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <FiCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Your order ID is #{orderDetails.id}</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-bold mb-2">Order Summary</h3>
            {orderDetails.items.map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.name} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-2">
              <span>Total</span>
              <span>₹{orderDetails.total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-bold mb-2">Payment Details</h3>
            <p>Method: {orderDetails.paymentMethod.toUpperCase()}</p>
            {orderDetails.paymentMethod === 'card' && (
              <p>Card ending with: **** **** **** {orderDetails.paymentDetails.number.slice(-4)}</p>
            )}
            {orderDetails.paymentMethod === 'upi' && (
              <p>UPI ID: {orderDetails.paymentDetails.upiId}</p>
            )}
          </div>
          
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-orange-600 hover:text-orange-700 mb-6"
      >
        <FiArrowLeft className="mr-1" /> Back to Cart
      </button>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code*</label>
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3 mb-6">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600"
                  />
                  <div className="flex items-center">
                    <FiDollarSign className="text-gray-500 mr-2" />
                    <div>
                      <span className="font-medium">Cash on Delivery</span>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600"
                  />
                  <div className="flex items-center">
                    <FiCreditCard className="text-gray-500 mr-2" />
                    <div>
                      <span className="font-medium">Credit/Debit Card</span>
                      <p className="text-sm text-gray-500">Pay securely with your card</p>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                    className="h-4 w-4 text-orange-600"
                  />
                  <div className="flex items-center">
                    <FiSmartphone className="text-gray-500 mr-2" />
                    <div>
                      <span className="font-medium">UPI Payment</span>
                      <p className="text-sm text-gray-500">Pay instantly via UPI apps</p>
                    </div>
                  </div>
                </label>
              </div>
              
              {/* Card Payment Details */}
              {paymentSection === 'card' && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium mb-3">Card Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardChange}
                        placeholder="Name on card"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          maxLength="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* UPI Payment Details */}
              {paymentSection === 'upi' && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium mb-3">UPI Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={handleUpiChange}
                      placeholder="yourname@upi"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter your UPI ID (e.g., name@upi)</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Popular UPI Apps:</p>
                    <div className="flex space-x-3">
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <img src="https://via.placeholder.com/40" alt="GPay" className="h-8 w-8" />
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <img src="https://via.placeholder.com/40" alt="PhonePe" className="h-8 w-8" />
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-gray-200">
                        <img src="https://via.placeholder.com/40" alt="Paytm" className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium ${
                  isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
              <p className="text-sm text-orange-700">
                {formData.paymentMethod === 'cod' ? 
                  'You will pay when you receive your order' : 
                  formData.paymentMethod === 'card' ? 
                  'Your card will be charged after order confirmation' : 
                  'You will be redirected to UPI app for payment'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}