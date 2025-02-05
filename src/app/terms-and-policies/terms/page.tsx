import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f9f9f9',
            padding: '20px',
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                padding: '30px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                maxWidth: '800px',
                width: '100%',
                fontFamily: 'Arial, sans-serif',
                color: '#333',
                lineHeight: '1.6',
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: '20px',
                    color: '#222',
                }}>Terms of Service</h1>
                <p style={{ textAlign: 'center', marginBottom: '20px', fontStyle: 'italic' }}>
                    <strong>Last Updated: [Date]</strong>
                </p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to Prizecho.com ("we," "our," "us"). These Terms of Service ("Terms") govern your use of our website, mobile application, and any other services we provide (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our Services.
                </p>

                <h2>2. Eligibility</h2>
                <p>
                    You must be at least 13 years old to use our Services. By using our Services, you represent and warrant that you are at least 13 years of age and have the legal capacity to enter into these Terms.
                </p>

                <h2>3. Account Registration</h2>
                <p>
                    To access certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>

                <h2>4. User Responsibilities</h2>
                <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul>
                    <li>Use our Services in any way that violates any applicable local, state, national, or international law or regulation.</li>
                    <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our Services.</li>
                    <li>Impersonate or attempt to impersonate Prizecho, a Prizecho employee, another user, or any other person or entity.</li>
                    <li>Use our Services in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Services.</li>
                </ul>

                <h2>5. Intellectual Property</h2>
                <p>
                    The content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, images, audio clips, video clips, and software, are owned by Prizecho or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as follows:
                </p>
                <ul>
                    <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
                    <li>You may store files that are automatically cached by your web browser for display enhancement purposes.</li>
                    <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
                </ul>

                <h2>6. User-Generated Content</h2>
                <p>
                    You may submit, post, upload, publish, or otherwise make available content, including but not limited to text, images, and videos (collectively, "User-Generated Content"). By making any User-Generated Content available through our Services, you grant us a non-exclusive, transferable, sub-licensable, worldwide, royalty-free license to use, copy, modify, create derivative works based on, distribute, publicly display, and publicly perform your User-Generated Content in connection with operating and providing our Services.
                </p>

                <h2>7. Prohibited Uses</h2>
                <p>You agree not to:</p>
                <ul>
                    <li>Use our Services for any commercial purpose without our prior written consent.</li>
                    <li>Use any automated system, including but not limited to robots, spiders, or offline readers, to access our Services for any purpose without our prior written consent.</li>
                    <li>Use our Services to send unsolicited messages or advertisements.</li>
                    <li>Attempt to gain unauthorized access to any portion of our Services or any systems or networks connected to our Services.</li>
                </ul>

                <h2>8. Termination</h2>
                <p>
                    We may terminate or suspend your account and bar access to our Services immediately, without prior notice or liability, if you breach these Terms. Upon termination, your right to use our Services will immediately cease.
                </p>

                <h2>9. Disclaimer of Warranties</h2>
                <p>
                    Our Services are provided on an "as is" and "as available" basis. We disclaim all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that our Services will be uninterrupted, timely, secure, or error-free.
                </p>

                <h2>10. Limitation of Liability</h2>
                <p>
                    In no event shall Prizecho, its directors, officers, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the Services; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from the Services; (iv) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Services by any third party; (v) any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Services; and/or (vi) the defamatory, offensive, or illegal conduct of any third party.
                </p>

                <h2>11. Governing Law</h2>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions. Any dispute arising from these Terms or your use of our Services will be resolved exclusively in the federal or state courts located in Pakistan.
                </p>

                <h2>12. Changes to the Terms</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 2 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of our Services after any changes to these Terms constitutes acceptance of those changes.
                </p>

                <h2>13. Contact Information</h2>
                <p>
                    If you have any questions about these Terms, please contact us at:
                </p>
                <p>
                    Prizecho.com<br />
                    support@prizecho.com<br />
                    +92 334 1818294
                </p>
            </div>
        </div>
    );
};

export default TermsOfService;
