import React from 'react';

const AcceptableUsePolicy: React.FC = () => {
    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    const headingStyle = {
        fontSize: '36px',
        marginBottom: '20px',
        color: '#333',
    };

    const dateStyle = {
        fontSize: '14px',
        color: '#777',
        marginBottom: '20px',
    };

    const subheadingStyle = {
        fontSize: '24px',
        marginTop: '20px',
        marginBottom: '10px',
        color: '#444',
    };

    const textStyle = {
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#555',
    };

    const listStyle = {
        listStyleType: 'disc',
        marginLeft: '20px',
        fontSize: '16px',
        color: '#555',
    };

    const listItemStyle = {
        marginBottom: '10px',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Acceptable Use Policy</h1>
            <p style={dateStyle}><strong>Last Updated: [Date]</strong></p>

            <h2 style={subheadingStyle}>1. Introduction</h2>
            <p style={textStyle}>
                This Acceptable Use Policy ("Policy") outlines the rules and guidelines for using the services and resources provided by Prizecho.com ("we," "our," "us"). By using our services, you agree to comply with this Policy. If you do not agree with any part of this Policy, please refrain from using our services.
            </p>

            <h2 style={subheadingStyle}>2. Prohibited Activities</h2>
            <p style={textStyle}>You agree not to engage in any of the following prohibited activities while using our services:</p>

            <h3 style={subheadingStyle}>Illegal Activities</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>Using our services for any unlawful purpose or in violation of any applicable laws and regulations.</li>
                <li style={listItemStyle}>Engaging in any activity that promotes illegal activities, including but not limited to money laundering, drug trafficking, and terrorism.</li>
            </ul>

            <h3 style={subheadingStyle}>Harmful Activities</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>Uploading or distributing any viruses, malware, or other harmful software that may damage, disrupt, or compromise the security of our services or the data of our users.</li>
                <li style={listItemStyle}>Engaging in any activity that may harm or threaten the safety and well-being of others, including harassment, stalking, or bullying.</li>
            </ul>

            <h3 style={subheadingStyle}>Fraudulent Activities</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
                <li style={listItemStyle}>Engaging in any fraudulent or deceptive activities, including phishing, identity theft, and financial fraud.</li>
            </ul>

            <h3 style={subheadingStyle}>Unauthorized Access</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>Attempting to gain unauthorized access to any part of our services, servers, or networks, including attempting to bypass security measures or authentication protocols.</li>
                <li style={listItemStyle}>Using any automated systems, such as bots or scripts, to access, scrape, or extract data from our services without our prior written permission.</li>
            </ul>

            <h3 style={subheadingStyle}>Spamming and Overloading</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>Sending unsolicited messages, advertisements, or spam to other users of our services.</li>
                <li style={listItemStyle}>Conducting any activity that may cause excessive traffic or overload our servers, networks, or infrastructure.</li>
            </ul>

            <h2 style={subheadingStyle}>3. User Conduct</h2>
            <p style={textStyle}>You are expected to use our services in a respectful and responsible manner. By using our services, you agree to:</p>

            <h3 style={subheadingStyle}>Respect Privacy</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>Respect the privacy and personal information of other users. Do not collect, store, or share personal information of others without their explicit consent.</li>
            </ul>

            <h3 style={subheadingStyle}>Follow Community Guidelines</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>Adhere to any community guidelines or rules that we may establish for the use of our services. This includes respecting the opinions, beliefs, and rights of others.</li>
            </ul>

            <h3 style={subheadingStyle}>Report Violations</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>Promptly report any violations of this Policy to our support team. We take violations seriously and will investigate and address any reported issues.</li>
            </ul>

            <h2 style={subheadingStyle}>4. Consequences of Violations</h2>
            <p style={textStyle}>Violations of this Policy may result in the following consequences:</p>

            <h3 style={subheadingStyle}>Account Suspension or Termination</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>We reserve the right to suspend or terminate your account if you violate any part of this Policy. Suspended or terminated accounts may lose access to our services and any associated data.</li>
            </ul>

            <h3 style={subheadingStyle}>Legal Action</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>In the event of serious violations, we may take legal action against you, including seeking damages or pursuing criminal charges if applicable.</li>
            </ul>

            <h3 style={subheadingStyle}>Notification to Authorities</h3>
            <ul style={listStyle}>
                <li style={listItemStyle}>We may report any illegal activities or violations of this Policy to the appropriate authorities, including law enforcement agencies, and cooperate with their investigations.</li>
            </ul>

            <h2 style={subheadingStyle}>5. Changes to this Policy</h2>
            <p style={textStyle}>
                We may update this Acceptable Use Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our services after any changes to this Policy constitutes your acceptance of the revised Policy.
            </p>

            <h2 style={subheadingStyle}>6. Contact Information</h2>
            <p style={textStyle}>
                If you have any questions or concerns about this Acceptable Use Policy, please contact us at:
            </p>
            <p style={textStyle}>
                Prizecho.com<br />
                support@prizecho.com<br />
                +92 334 1818294
            </p>
        </div>
    );
};

export default AcceptableUsePolicy;
