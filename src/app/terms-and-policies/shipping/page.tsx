import React from 'react';

const ShippingAndDeliveryPolicy: React.FC = () => {
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
                }}>Shipping and Delivery Policy</h1>
                <p style={{ textAlign: 'center', marginBottom: '20px', fontStyle: 'italic' }}>
                    <strong>Last Updated: [Date]</strong>
                </p>

                <h2>1. Introduction</h2>
                <p>
                    This Shipping and Delivery Policy ("Policy") outlines the terms and conditions regarding the shipping and delivery of products purchased from Prizecho.com ("we," "our," "us"). By placing an order with us, you agree to the terms of this Policy. If you do not agree with these terms, please do not place an order.
                </p>

                <h2>2. Shipping Methods</h2>
                <p>We follow a standard shipping policy to ensure timely delivery for all orders.</p>
                <ul style={{ paddingLeft: '20px' }}>
                    <li><strong>Standard Shipping</strong>: Orders will be delivered within 14 business days after the winner is announced for the particular product.</li>
                </ul>
                <p>
                No additional or expedited shipping options are available.
                </p>

                <h2>3. Shipping Costs</h2>
                <p>
                Users are only required to pay the application amount for the product. All shipping costs will be fully covered by us. There are no additional charges for shipping after payment.
                </p>

                <h2>4. Order Processing</h2>
                <p>
                    We strive to process and ship all orders as quickly as possible. Orders are typically processed within 5 business days. Please note that orders placed on weekends or holidays will be processed on the next business day.
                </p>

                <h2>5. Delivery Timeframes</h2>
                <p>We offer standard shipping, and the estimated delivery time is generally between 1 to 14 business days, depending on the destination. While most orders will be delivered within a few days, please allow up to 14 business days for delivery. Factors such as location, weather, and carrier delays may affect the delivery time.</p>
                

                <h2>6. Order Tracking</h2>
                <p>
                    Once your order has been shipped, you will receive a shipping confirmation email with a tracking number. You can use this tracking number to monitor the status of your shipment on the carrier's website.
                </p>

                <h2>7. International Shipping</h2>
                <p>
                At this time, we only offer shipping within Pakistan. We do not provide international shipping to other countries.
                </p>

                <h2>8. Shipping Restrictions</h2>
                <p>
                    There may be certain restrictions on the shipping of specific products to certain destinations. These restrictions will be communicated to you at checkout or by our customer service team if applicable.
                </p>

                <h2>9. Delivery Issues</h2>
                <h3 style={{ marginTop: '10px' }}>Lost or Damaged Packages</h3>
                <p>
                    If your package is lost or damaged during transit, please contact our customer service team as soon as possible. We will work with the carrier to investigate the issue and, if necessary, arrange for a replacement or refund.
                </p>

                <h3>Incorrect Address</h3>
                <p>
                    Please ensure that the shipping address you provide is accurate and complete. We are not responsible for delays or delivery issues resulting from incorrect or incomplete addresses. If you realize that you have provided an incorrect address, please contact us immediately to update the address before the order is shipped.
                </p>

                <h3>Failed Delivery Attempts</h3>
                <p>
                    If the carrier is unable to deliver your package after multiple attempts, the package may be returned to us. In such cases, we will contact you to arrange for reshipment or a refund.
                </p>

                <h2>10. Returns and Exchanges</h2>
                <p>
                    For information on returning or exchanging items, please refer to our <a href="/terms-and-policies/returns"style={{ color: 'blue', textDecoration: 'underline' }}>Return and Exchange Policy</a>.
                </p>

                <h2>11. Contact Information</h2>
                <p>
                    If you have any questions or concerns about this Shipping and Delivery Policy, please contact us at:
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

export default ShippingAndDeliveryPolicy;
