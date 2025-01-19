import React from 'react';

const PaymentAndRefundPolicy: React.FC = () => {
    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.6',
            margin: '20px',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            color: '#333',
            fontSize: '28px',
            marginBottom: '10px',
        },
        subHeading: {
            color: '#555',
            fontSize: '24px',
            marginTop: '20px',
            marginBottom: '10px',
        },
        paragraph: {
            fontSize: '16px',
            color: '#555',
            marginBottom: '15px',
        },
        list: {
            marginLeft: '20px',
            fontSize: '16px',
            color: '#555',
        },
        strongText: {
            fontWeight: 'bold',
        },
        contactInfo: {
            fontSize: '16px',
            color: '#555',
            marginTop: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Payment and Refund Policy</h1>
            <p style={styles.paragraph}><strong style={styles.strongText}>Last Updated: [Date]</strong></p>

            <h2 style={styles.subHeading}>1. Introduction</h2>
            <p style={styles.paragraph}>
                This Payment and Refund Policy ("Policy") outlines the terms and conditions regarding payments, refunds, and cancellations for services and products purchased on Prizecho.com ("we," "our," "us"). By making a purchase on our website, you agree to the terms of this Policy.
            </p>

            <h2 style={styles.subHeading}>2. Payment Methods</h2>
            <p style={styles.paragraph}>We accept various payment methods to provide a convenient and secure shopping experience. The accepted payment methods include:</p>
            <ul style={styles.list}>
                <li>Credit/Debit Cards: Visa, MasterCard</li>
                <li>Online Payment Systems: Payfast</li>
                <li>Bank Transfers: Available for Pakistan only</li>
                <li>Digital Wallets: Easypaisa, JazzCash</li>
            </ul>
            <p style={styles.paragraph}>
                All payments are processed through secure and encrypted payment gateways to ensure the safety of your financial information.
            </p>

            <h2 style={styles.subHeading}>3. Payment Terms</h2>
            <ul style={styles.list}>
                <li>All prices are listed in PKR(Pakistani Rupees) and are inclusive of applicable taxes unless otherwise stated.</li>
                <li>Full payment is required at the time of purchase. Orders will not be processed until payment has been received.</li>
                <li>In the event of a payment dispute, please contact our customer service team immediately. We will work to resolve the issue as quickly as possible.</li>
            </ul>

            <h2 style={styles.subHeading}>4. Refund Conditions</h2>
            <p style={styles.paragraph}>At Prizecho, we strive to ensure customer satisfaction with every purchase. Our refund policy is outlined below:</p>
            <ul style={styles.list}>
                <li><strong style={styles.strongText}>Eligibility</strong>:  Items must be returned within 7 days of purchase, in their original condition and packaging, to qualify for a refund.</li>
                <li><strong style={styles.strongText}>Proof of Purchase</strong>: A valid proof of purchase (receipt or order number) is required for all refund requests.</li>
                <li><strong style={styles.strongText}>No Winner Applicants</strong>: If no winner is chosen by our automated systems for a product, the money will be refunded to all applicants.</li>
                <li><strong style={styles.strongText}>Non-Refundable Payments</strong>: Since the application amount is very low, refunds are not provided unless no winner is selected, as stated above.</li>
            </ul>

            <h2 style={styles.subHeading}>5. Return and Exchange Process</h2>
            <p style={styles.paragraph}>If you need to return or exchange an item, please follow these steps:</p>
            <h3 style={styles.subHeading}>Contact Customer Service</h3>
            <p style={styles.paragraph}>Notify our customer service team of your intent to return or exchange the item. Provide your order number and details of the item you wish to return or exchange.</p>

            <h3 style={styles.subHeading}>Receive Authorization</h3>
            <p style={styles.paragraph}>Our team will review your request and, if approved, provide you with return authorization and instructions.</p>

            <h3 style={styles.subHeading}>Return the Item</h3>
            <p style={styles.paragraph}>Ship the item back to us using a trackable shipping method. You are responsible for the cost of return shipping unless the item is defective or incorrect.</p>

            <h3 style={styles.subHeading}>Inspection and Refund</h3>
            <p style={styles.paragraph}>Once we receive and inspect the returned item, we will process your refund or exchange. Refunds will be issued to the original payment method within 3 working days.</p>

            <h2 style={styles.subHeading}>6. Refund Processing Time</h2>
            <p style={styles.paragraph}>Refunds will be processed within 3 working days after we receive and inspect the returned item. The time it takes for the refund to appear in your account may vary depending on your payment method and financial institution.</p>

            <h2 style={styles.subHeading}>7. Cancellations</h2>
            <p style={styles.paragraph}>Due to the very low amount required to apply for a product, cancellations are not permitted once the payment is completed. Please ensure that you are certain before proceeding with your application.</p>
            
            <h2 style={styles.subHeading}>8. Dispute Resolution</h2>
            <p style={styles.paragraph}>In the event of a payment dispute, we encourage you to contact our customer service team to resolve the issue amicably. If a resolution cannot be reached, the dispute will be handled in accordance with our <a
    href="/terms-and-policies/dispute-resolution"
    style={{ color: 'blue', textDecoration: 'underline' }}>Dispute Resolution Policy</a>, which may include mediation, arbitration, or legal action.</p>

            <h2 style={styles.subHeading}>9. Contact Information</h2>
            <p style={styles.paragraph}>If you have any questions or concerns about this Payment and Refund Policy, please contact us at:</p>
            <p style={styles.contactInfo}>Prizecho.com<br />support@prizecho.com<br />+92 334 1818294</p>
        </div>
    );
};

export default PaymentAndRefundPolicy;
