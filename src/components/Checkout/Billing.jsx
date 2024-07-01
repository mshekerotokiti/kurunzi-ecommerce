import React, { useState } from 'react';

function Billing({ onSubmitBilling }) {
    const [billingInfo, setBillingInfo] = useState({
        fullName: '',
        town: '',
        phone: '',
        email: '',
    });
     
    const handleBillingChange = (e) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
    };

    const handleBillingSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://formspree.io/f/xayrkynb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billingInfo),
            });
            const data = await response.json();
            if (response.ok) {
                onSubmitBilling(data);
                alert('details submitted');
                setBillingInfo({ fullName: '', town: '', phone: '', email: '' })
            } else {
                throw new Error(data.message || 'Error submitting form');
            }
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const cardStyle = {
        backgroundColor: '#f8f9fa', // subtle grey background
        padding: '20px',
        margin:'0 20px  10px',
        borderRadius: '5px',
        
    };

    const formGroupStyle = {
        marginBottom: '20px' // adds space between form fields
    };

    return (
        <div className="card" style={cardStyle}>
            <div className="card-body">
                <h5 className="card-title" style={{color:'orange', fontSize:'30px', marginBottom:'15px'}}>Billing Information</h5>
                <form onSubmit={handleBillingSubmit}>
                    <div className="form-group" style={formGroupStyle}>
                        <input type="text" className="form-control" name="fullName" value={billingInfo.fullName} onChange={handleBillingChange} placeholder="Full Name" required />
                    </div>
                    <div className="form-group" style={formGroupStyle}>
                        <input type="text" className="form-control" name="town" value={billingInfo.town} onChange={handleBillingChange} placeholder="Town / City" required />
                    </div>
                    <div className="form-group" style={formGroupStyle}>
                        <input type="tel" className="form-control" name="phone" value={billingInfo.phone} onChange={handleBillingChange} placeholder="Phone Number" required />
                    </div>
                    <div className="form-group" style={formGroupStyle}>
                        <input type="email" className="form-control" name="email" value={billingInfo.email} onChange={handleBillingChange} placeholder="Email Address" required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Billing;