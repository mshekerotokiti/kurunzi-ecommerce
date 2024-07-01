import React from 'react';
import Billing from '../Checkout/Billing';
import PaymentForm from '../Checkout/PaymentForm';

function Checkout() {
    const handleBillingSubmit = (data) => {
        console.log('Billing data submitted:', data);
    };

    const handlePaymentSubmit = (phoneNumber) => {
       // console.log('Payment initiated for phone number:', phoneNumber);
    };

    return (
        <div className="container mt-5"  style={{fontFamily:'opensans', fontSize:'20px'}}>
            <div className="row">
                <div className="col-md-6">
                    <Billing onSubmitBilling={handleBillingSubmit} />
                </div>
                <div className="col-md-6">
                    <PaymentForm onSubmitPayment={handlePaymentSubmit} />
                </div>
            </div>
        </div>
    );
}

export default Checkout;