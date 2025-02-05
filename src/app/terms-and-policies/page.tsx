// app/terms-and-policies/page.tsx
import Link from 'next/link'

const policies = [
  {
    title: "Terms of Service",
    description: "Our terms and conditions for using PRIZECHO services",
    href: "/terms-and-policies/terms"
  },
  {
    title: "Privacy Policy",
    description: "How we collect, use, and protect your personal information",
    href: "/terms-and-policies/privacy"
  },
  {
    title: "Payment and Refund Policy",
    description: "Information about payments, pricing, and refund processes",
    href: "/terms-and-policies/payment"
  },
  {
    title: "Cookie Policy",
    description: "How we use cookies and similar technologies",
    href: "/terms-and-policies/cookies"
  },
  {
    "title": "Wallet Policy",
    "description": "Terms and conditions for using our wallet services",
    "href": "/terms-and-policies/wallet-policy"
  },
  {
    title: "Acceptable Use Policy",
    description: "Guidelines for acceptable use of our services",
    href: "/terms-and-policies/acceptable-use"
  },
  {
    title: "Shipping and Delivery Policy",
    description: "Information about our shipping methods and delivery processes",
    href: "/terms-and-policies/shipping"
  },
  {
    title: "Return and Exchange Policy",
    description: "Our policies regarding returns and exchanges",
    href: "/terms-and-policies/returns"
  },
  {
    title: "Data Protection Policy",
    description: "How we protect and handle your personal data",
    href: "/terms-and-policies/data-protection"
  },
  {
    title: "Intellectual Property Policy",
    description: "Information about copyrights, trademarks, and intellectual property",
    href: "/terms-and-policies/intellectual-property"
  },
  {
    title: "Dispute Resolution Policy",
    description: "How we handle disputes and conflict resolution",
    href: "/terms-and-policies/dispute-resolution"
  }
]

export default function TermsAndPolicies() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms and Policies</h1>
      <p className="text-gray-600 mb-12">
        Learn about our policies, terms of service, and guidelines that help ensure a safe and trustworthy experience on PRIZECHO.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {policies.map((policy) => (
          <Link 
            key={policy.href} 
            href={policy.href}
            className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-2">{policy.title}</h2>
            <p className="text-gray-600 text-sm">{policy.description}</p>
            <div className="mt-4 text-myColor text-sm">Read more →</div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </div>
    </div>
  )
}