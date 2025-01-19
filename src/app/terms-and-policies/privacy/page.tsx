import React from 'react';

const PrivacyPolicy: React.FC = () => {
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
        contactInfo: {
            fontSize: '16px',
            color: '#555',
            marginTop: '20px',
        },
        strongText: {
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Privacy Policy</h1>
            <p style={styles.paragraph}><strong style={styles.strongText}>Last Updated: [Date]</strong></p>

            <h2 style={styles.subHeading}>1. Introduction</h2>
            <p style={styles.paragraph}>
                At Prizecho.com ("we," "our," "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By accessing or using our website, you agree to the terms of this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the website.
            </p>

            <h2 style={styles.subHeading}>2. Information Collection</h2>
            <h3 style={styles.subHeading}>Personal Information</h3>
            <p style={styles.paragraph}>
                We collect personal information that you voluntarily provide to us when you register on the site, place an order, subscribe to our newsletter, or fill out a form. The types of personal information we collect may include:
            </p>
            <ul style={styles.list}>
                <li>Name</li>
                <li>Email address</li>
                <li>Mailing address</li>
                <li>Phone number</li>
                <li>Payment information (e.g., credit/debit card details)</li>
            </ul>

            <h3 style={styles.subHeading}>Non-Personal Information</h3>
            <p style={styles.paragraph}>
                We also collect non-personal information automatically as you navigate through our site. This may include:
            </p>
            <ul style={styles.list}>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Access times</li>
            </ul>

            <h3 style={styles.subHeading}>Cookies and Tracking Technologies</h3>
            <p style={styles.paragraph}>
                We use cookies and similar tracking technologies to track the activity on our site and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our site.
            </p>

            <h2 style={styles.subHeading}>3. Use of Information</h2>
            <h3 style={styles.subHeading}>Personal Information</h3>
            <p style={styles.paragraph}>
                We use the personal information we collect for various purposes, including:
            </p>
            <ul style={styles.list}>
                <li>To provide and maintain our services</li>
                <li>To process transactions and send order confirmations</li>
                <li>To manage your account and provide customer support</li>
                <li>To send periodic emails with updates, promotions, or other information</li>
                <li>To improve our website and services based on the information and feedback we receive from you</li>
            </ul>

            <h3 style={styles.subHeading}>Non-Personal Information</h3>
            <p style={styles.paragraph}>
                We use non-personal information to help us improve our site and services. This information helps us understand how our users interact with the site, which pages are most popular, and other patterns of site usage.
            </p>

            <h2 style={styles.subHeading}>4. Data Sharing</h2>
            <h3 style={styles.subHeading}>Third-Party Service Providers</h3>
            <p style={styles.paragraph}>
                We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. However, we may share information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential. These third parties may include:
            </p>
            <ul style={styles.list}>
                <li>Payment processors</li>
                <li>Shipping companies</li>
                <li>Marketing and analytics service providers</li>
            </ul>

            <h3 style={styles.subHeading}>Legal Requirements</h3>
            <p style={styles.paragraph}>
                We may disclose your personal information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
            </p>

            <h2 style={styles.subHeading}>5. User Rights</h2>
            <h3 style={styles.subHeading}>Access and Correction</h3>
            <p style={styles.paragraph}>
                You have the right to access the personal information we hold about you and to request corrections if it is inaccurate or incomplete. To exercise these rights, please contact us using the information provided below.
            </p>

            <h3 style={styles.subHeading}>Data Deletion</h3>
            <p style={styles.paragraph}>
                You have the right to request the deletion of your personal information. Please note that we may need to retain certain information for legal or administrative purposes.
            </p>

            <h2 style={styles.subHeading}>6. Security Measures</h2>
            <p style={styles.paragraph}>
                We implement a variety of security measures to maintain the safety of your personal information. These measures include:
            </p>
            <ul style={styles.list}>
                <li>Secure servers and encryption</li>
                <li>Access controls and authentication procedures</li>
                <li>Regular security assessments and updates</li>
            </ul>
            <p style={styles.paragraph}>
                While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>

            <h2 style={styles.subHeading}>7. Cookies and Tracking</h2>
            <h3 style={styles.subHeading}>Types of Cookies</h3>
            <p style={styles.paragraph}>
                We use different types of cookies to enhance your experience on our site:
            </p>
            <ul style={styles.list}>
                <li><strong>Session Cookies</strong>: These cookies are temporary and expire once you close your browser.</li>
                <li><strong>Persistent Cookies</strong>: These cookies remain on your device until they expire or you delete them.</li>
            </ul>

            <h3 style={styles.subHeading}>Purpose of Cookies</h3>
            <p style={styles.paragraph}>Cookies are used for various purposes, including:</p>
            <ul style={styles.list}>
                <li><strong>Functionality</strong>: To remember your preferences and settings.</li>
                <li><strong>Performance</strong>: To analyze site performance and improve our services.</li>
                <li><strong>Advertising</strong>: To deliver relevant advertisements.</li>
            </ul>

            <h3 style={styles.subHeading}>Managing Cookies</h3>
            <p style={styles.paragraph}>
                You can manage your cookie preferences through your browser settings. However, disabling cookies may affect your experience on our site.
            </p>

            <h2 style={styles.subHeading}>8. Changes to Policy</h2>
            <p style={styles.paragraph}>
                We may update this Privacy Policy from time to time. If we make any material changes, we will notify you by email (if you have provided one) or by posting a notice on our site prior to the change becoming effective. Your continued use of our site after any changes to this Privacy Policy will constitute your acceptance of such changes.
            </p>

            <h2 style={styles.subHeading}>9. Contact Information</h2>
            <p style={styles.contactInfo}>
                If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p style={styles.contactInfo}>
                Prizecho.com<br />
                support@prizecho.com<br />
                +92 334 1818294
            </p>
        </div>
    );
};

export default PrivacyPolicy;
