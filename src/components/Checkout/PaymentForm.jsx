
import React, { useState, useContext } from 'react';
import { CartContext } from '../Cart/CartContext';

function PaymentForm({ onSubmitPayment }) {
    const { cartItems, totalCost, clearCart } = useContext(CartContext);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!termsAccepted) {
            alert("Please accept the terms and conditions to proceed.");
            return;
        }
        if (paymentMethod === 'M-PESA' && phoneNumber.trim() === '') {
            alert("Please enter your M-PESA number.");
            return;
        }

        // Assuming onSubmitPayment does some processing and you clear the cart after it's confirmed
        onSubmitPayment({
            paymentMethod,
            phoneNumber,
            total: totalCost(),
        });
        alert('Your order was received')
        clearCart();  // Clear the cart

        const formData = new FormData();
        formData.append('Payment Method', paymentMethod);
        formData.append('Phone Number', phoneNumber);
        formData.append('Total Cost', totalCost());
        formData.append('Items', JSON.stringify(cartItems.map(item => `${item.name} x ${item.quantity}`)));

        // Post form data to Formspree
        const response = await fetch('https://formspree.io/f/myyrvzqg', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Thank you for your order!');
        } else {
            alert('There was a problem with your order. Please try again.');
        }
    };

    if (cartItems.length === 0) {
        return <div style={{fontSize:'25px', color:'#007bff'}}>No items in cart. Please add some products to your cart before checking out.</div>;
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title" style={{ color: 'orange', fontSize: '30px' }}>Your Order</h5>
                {cartItems.map((item, index) => (
                    <p key={index} style={{ marginBottom: '15px' }}>{item.name} - KSh{item.price.toFixed(2)} x {item.quantity}</p>
                ))}
                <hr style={{color:'#007bff', maxHeight:'50px'}}/>
                <p style={{ marginBottom: '15px' }}>Total: KSh{totalCost().toFixed(2)}</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-check" style={{ marginBottom: '15px' }}>
                        <input className="form-check-input" type="radio" name="paymentMethod" id="payCOD"
                               onChange={() => setPaymentMethod('COD')} checked={paymentMethod === 'COD'} />
                        <label className="form-check-label" htmlFor="payCOD">
                            Pay Cash on Delivery
                        </label>
                    </div>
                    <div className="form-check" style={{ marginBottom: '15px' }}>
                        <input className="form-check-input" type="radio" name="paymentMethod" id="payMpesa"
                               onChange={() => setPaymentMethod('M-PESA')} checked={paymentMethod === 'M-PESA'} />
                        <label className="form-check-label" htmlFor="payMpesa">
                            Place order and pay using M-PESA. You will receive a confirmation message shortly thereafter.
                        </label>
                    </div>
                    {paymentMethod === 'M-PESA' && (
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label htmlFor="mpesaNumber">Confirm M-PESA Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="mpesaNumber"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="form-check" style={{ marginBottom: '15px' }}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="termsConditions"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            required
                        />
                        <label className="form-check-label" htmlFor="termsConditions">
                            I have read and agree to the website terms and conditions
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">PLACE ORDER</button>
                </form>
                <p>Your personal data will be used to process your order, support your experience throughout this website.</p>
            </div>
        </div>
    );
}

export default PaymentForm;
