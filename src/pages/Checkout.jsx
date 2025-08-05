import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import {
    FiArrowLeft,
    FiCreditCard,
    FiDollarSign,
    FiSmartphone,
    FiLoader,
    FiAlertCircle
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';

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
    const [isProcessing, setIsProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'number') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            if (formattedValue.length > 19) return;
        }

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

    const validateForm = () => {
        const newErrors = {};

        // Shipping info validation
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';

        // Payment method validation
        if (formData.paymentMethod === 'card') {
            if (!cardDetails.number.replace(/\s/g, '').match(/^\d{16}$/)) {
                newErrors.cardNumber = 'Enter a valid 16-digit card number';
            }
            if (!cardDetails.name.trim()) newErrors.cardName = 'Cardholder name is required';
            if (!cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) {
                newErrors.cardExpiry = 'Enter valid expiry (MM/YY)';
            }
            if (!cardDetails.cvv.match(/^\d{3}$/)) {
                newErrors.cardCvv = 'Enter valid 3-digit CVV';
            }
        }

        if (formData.paymentMethod === 'upi' && !upiId.match(/^[\w.-]+@\w+$/)) {
            newErrors.upiId = 'Enter a valid UPI ID';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // In the handleSubmit function:
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsProcessing(true);

        try {
            // Prepare payment details based on selected method
            let paymentDetails = null;
            if (formData.paymentMethod === 'card') {
                paymentDetails = {
                    type: 'card',
                    lastFour: cardDetails.number.replace(/\s/g, '').slice(-4),
                    cardName: cardDetails.name
                };
            } else if (formData.paymentMethod === 'upi') {
                paymentDetails = {
                    type: 'upi',
                    upiId: upiId
                };
            } else {
                paymentDetails = {
                    type: 'cod'
                };
            }

            const order = await checkout({
                shippingAddress: {
                    name: formData.name,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip
                },
                paymentMethod: formData.paymentMethod,
                paymentDetails: paymentDetails
            });

            clearCart();
            toast.success('Order placed successfully!');
            navigate('/order-success');
        } catch (error) {
            toast.error('Failed to process order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-orange-600 hover:text-orange-700 mb-6 transition-colors"
            >
                <FiArrowLeft className="mr-1" /> Back to Cart
            </button>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                    required
                                />
                                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                        required
                                    />
                                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                        required
                                    />
                                    {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code*</label>
                                    <input
                                        type="text"
                                        name="zip"
                                        value={formData.zip}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border ${errors.zip ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                        required
                                    />
                                    {errors.zip && <p className="mt-1 text-sm text-red-600">{errors.zip}</p>}
                                </div>
                            </div>

                            <div className="pt-4">
                                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                                <div className="space-y-3">
                                    <label className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === 'cod'}
                                            onChange={handleChange}
                                            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <FiDollarSign className="text-gray-500 mr-2" />
                                                <span className="font-medium">Cash on Delivery</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Pay when you receive your order</p>
                                        </div>
                                    </label>

                                    <label className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={formData.paymentMethod === 'card'}
                                            onChange={handleChange}
                                            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <FiCreditCard className="text-gray-500 mr-2" />
                                                <span className="font-medium">Credit/Debit Card</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Pay securely with your card</p>

                                            {formData.paymentMethod === 'card' && (
                                                <div className="mt-4 space-y-3">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                                        <input
                                                            type="text"
                                                            name="number"
                                                            value={cardDetails.number}
                                                            onChange={handleCardChange}
                                                            placeholder="1234 5678 9012 3456"
                                                            className={`w-full px-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                                        />
                                                        {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={cardDetails.name}
                                                            onChange={handleCardChange}
                                                            placeholder="Name on card"
                                                            className={`w-full px-4 py-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                                        />
                                                        {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
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
                                                                className={`w-full px-4 py-2 border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                                            />
                                                            {errors.cardExpiry && <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>}
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
                                                                className={`w-full px-4 py-2 border ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                                            />
                                                            {errors.cardCvv && <p className="mt-1 text-sm text-red-600">{errors.cardCvv}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </label>

                                    <label className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer ${formData.paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="upi"
                                            checked={formData.paymentMethod === 'upi'}
                                            onChange={handleChange}
                                            className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <FiSmartphone className="text-gray-500 mr-2" />
                                                <span className="font-medium">UPI Payment</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Pay instantly via UPI apps</p>

                                            {formData.paymentMethod === 'upi' && (
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                                                    <input
                                                        type="text"
                                                        value={upiId}
                                                        onChange={handleUpiChange}
                                                        placeholder="yourname@upi"
                                                        className={`w-full px-4 py-2 border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-orange-500 focus:border-orange-500`}
                                                    />
                                                    {errors.upiId && <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>}
                                                    <p className="text-xs text-gray-500 mt-1">Enter your UPI ID (e.g., name@upi)</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isProcessing}
                                    className={`w-full flex justify-center items-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isProcessing ? (
                                        <>
                                            <FiLoader className="animate-spin mr-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        'Place Order'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <p className="text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}

                            <div className="border-t border-gray-200 pt-3 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2">
                                    <span>Total</span>
                                    <span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
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