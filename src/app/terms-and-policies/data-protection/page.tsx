import React from 'react';

const DataProtectionPolicy: React.FC = () => {
    const containerStyle = {
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
        margin: '0 auto',
        padding: '20px',
        maxWidth: '800px',
    };

    const titleStyle = {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center' as const,
    };

    const sectionTitleStyle = {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginTop: '30px',
        color: '#333',
    };

    const subSectionTitleStyle = {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginTop: '15px',
        color: '#333',
    };

    const paragraphStyle = {
        fontSize: '1rem',
        marginBottom: '15px',
        textAlign: 'justify' as const,
    };

    const listStyle = {
        marginLeft: '20px',
        listStyleType: 'disc' as const,
    };

    const lastUpdatedStyle = {
        fontSize: '1rem',
        marginBottom: '20px',
        fontStyle: 'italic' as const,
        color: '#777',
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Data Protection Policy</h1>
            <p style={lastUpdatedStyle}><strong>Last Updated: [Date]</strong></p>

            <h2 style={sectionTitleStyle}>1. Introduction</h2>
            <p style={paragraphStyle}>
                At Prizecho.com ("we," "our," "us"), we are committed to protecting the personal data of our users ("you," "your"). This Data Protection Policy outlines how we collect, use, store, and protect your personal data in compliance with applicable data protection laws, including the General Data Protection Regulation (GDPR). By using our services, you agree to the terms of this Policy.
            </p>

            <h2 style={sectionTitleStyle}>2. Data Collection</h2>
            <h3 style={subSectionTitleStyle}>Personal Data</h3>
            <p style={paragraphStyle}>We collect personal data that you voluntarily provide to us when you:</p>
            <ul style={listStyle}>
                <li>Register for an account on our website</li>
                <li>Place an order</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact our customer service team</li>
                <li>Participate in surveys, promotions, or events</li>
            </ul>
            <p style={paragraphStyle}>The types of personal data we collect may include:</p>
            <ul style={listStyle}>
                <li>Name</li>
                <li>Email address</li>
                <li>Mailing address</li>
                <li>Phone number</li>
                <li>Payment information (e.g., credit/debit card details)</li>
                <li>Order history</li>
            </ul>

            <h3 style={subSectionTitleStyle}>Usage Data</h3>
            <p style={paragraphStyle}>We collect usage data automatically as you navigate through our website. This may include:</p>
            <ul style={listStyle}>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Access times</li>
                <li>Pages visited and actions taken on our website</li>
            </ul>

            <h3 style={subSectionTitleStyle}>Cookies and Tracking Technologies</h3>
            <p style={paragraphStyle}>
                We use cookies and similar tracking technologies to enhance your experience on our website. For more information, please refer to our <a href="/terms-and-policies/returns"style={{ color: 'blue', textDecoration: 'underline' }}>Cookie Policy</a>.
            </p>

            <h2 style={sectionTitleStyle}>3. Data Use</h2>
            <h3 style={subSectionTitleStyle}>Personal Data</h3>
            <p style={paragraphStyle}>We use the personal data we collect for the following purposes:</p>
            <ul style={listStyle}>
                <li>To provide and maintain our services</li>
                <li>To process transactions and send order confirmations</li>
                <li>To manage your account and provide customer support</li>
                <li>To send periodic emails with updates, promotions, or other information</li>
                <li>To improve our website and services based on the information and feedback we receive from you</li>
            </ul>

            <h3 style={subSectionTitleStyle}>Usage Data</h3>
            <p style={paragraphStyle}>We use usage data to:</p>
            <ul style={listStyle}>
                <li>Analyze website performance and user behavior</li>
                <li>Monitor and improve the security of our website</li>
                <li>Provide personalized content and recommendations</li>
            </ul>

            <h2 style={sectionTitleStyle}>4. Data Sharing</h2>
            <h3 style={subSectionTitleStyle}>Third-Party Service Providers</h3>
            <p style={paragraphStyle}>
                We do not sell, trade, or otherwise transfer your personal data to outside parties. However, we may share your data with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, provided that these parties agree to keep your data confidential. These third parties may include:
            </p>
            <ul style={listStyle}>
                <li>Payment processors</li>
                <li>Shipping companies</li>
                <li>Marketing and analytics service providers</li>
            </ul>

            <h3 style={subSectionTitleStyle}>Legal Requirements</h3>
            <p style={paragraphStyle}>
                We may disclose your personal data if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
            </p>

            <h2 style={sectionTitleStyle}>5. Data Storage and Security</h2>
            <p style={paragraphStyle}>
                We implement a variety of security measures to protect your personal data from unauthorized access, use, or disclosure. These measures include:
            </p>
            <ul style={listStyle}>
                <li>Secure servers and encryption</li>
                <li>Access controls and authentication procedures</li>
                <li>Regular security assessments and updates</li>
            </ul>
            <p style={paragraphStyle}>
                We store your personal data for as long as necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required or permitted by law.
            </p>

            <h2 style={sectionTitleStyle}>6. User Rights</h2>
            <h3 style={subSectionTitleStyle}>Access and Correction</h3>
            <p style={paragraphStyle}>
                You have the right to access the personal data we hold about you and to request corrections if it is inaccurate or incomplete. To exercise these rights, please contact us using the information provided below.
            </p>

            <h3 style={subSectionTitleStyle}>Data Deletion</h3>
            <p style={paragraphStyle}>
            You can delete your account by navigating to <strong>Profile {">"} Personal Info</strong> and clicking on <strong>Delete Account</strong>. Once you confirm, you will be automatically logged out, and your account will be scheduled for deletion within 30 days. During this period, you will not be able to access your account. If you change your mind, please contact us within 30 days to cancel the deletion request.
            </p>

            <h3 style={subSectionTitleStyle}>Data Portability</h3>
            <p style={paragraphStyle}>
                You have the right to request a copy of your personal data in a structured, commonly used, and machine-readable format. You may also request that we transfer your data to another data controller where technically feasible.
            </p>

            <h3 style={subSectionTitleStyle}>Objection and Restriction</h3>
            <p style={paragraphStyle}>
                You have the right to object to the processing of your personal data and to request restrictions on the processing of your data under certain circumstances.
            </p>

            <h2 style={sectionTitleStyle}>7. Data Breach Notification</h2>
            <p style={paragraphStyle}>
                In the event of a data breach that may result in a risk to your rights and freedoms, we will notify you and the relevant supervisory authority without undue delay, in accordance with applicable data protection laws.
            </p>

            <h2 style={sectionTitleStyle}>8. Changes to this Policy</h2>
            <p style={paragraphStyle}>
                We may update this Data Protection Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our services after any changes to this Policy constitutes your acceptance of the revised Policy.
            </p>

            <h2 style={sectionTitleStyle}>9. Contact Information</h2>
            <p style={paragraphStyle}>
                If you have any questions or concerns about this Data Protection Policy, or if you wish to exercise your rights, please contact us at:
            </p>
            <p style={paragraphStyle}>
                Prizecho.com<br />
                support@prizecho.com<br />
                +92 334 1818294
            </p>
        </div>
    );
};

export default DataProtectionPolicy;
