import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
        {/* Hero Section */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            Privacy Policy
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-balance">
            Your privacy is important to us. Learn how we collect, use, and
            protect your information
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Effective Date: January 1, 2025</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>Last Updated: January 1, 2025</span>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Privacy Content */}
        <div className="prose prose-lg max-w-none">
          {/* Section 1 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              1. Introduction
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Welcome to Lumotrip. We respect your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our vacation planning platform and services.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Please read this Privacy Policy carefully. By using Lumotrip, you
              agree to the collection and use of information in accordance with
              this policy. If you do not agree with our policies and practices,
              please do not use our Service.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              2. Information We Collect
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We collect several types of information from and about users of
              our Service:
            </p>

            <div className="mb-6">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">
                2.1 Personal Information
              </h4>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Information that identifies you as an individual, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed">
                <li>
                  Name and contact information (email address, phone number)
                </li>
                <li>Account credentials (username and password)</li>
                <li>Profile information and preferences</li>
                <li>Payment and billing information</li>
                <li>Travel preferences and history</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">
                2.2 Usage Information
              </h4>
              <p className="text-foreground/80 leading-relaxed mb-3">
                Information about how you use our Service, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed">
                <li>Search queries and itinerary details</li>
                <li>Pages visited and features used</li>
                <li>Time spent on pages and navigation patterns</li>
                <li>Interactions with other users and content</li>
                <li>Device information and browser type</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">
                2.3 Location Information
              </h4>
              <p className="text-foreground/80 leading-relaxed">
                With your permission, we may collect information about your
                location to provide personalized travel recommendations and
                improve our Service. You can control location permissions
                through your device settings.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">
                2.4 Cookies and Tracking Technologies
              </h4>
              <p className="text-foreground/80 leading-relaxed">
                We use cookies, web beacons, and similar tracking technologies
                to collect information about your browsing activities and to
                remember your preferences. You can control cookie settings
                through your browser preferences.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              3. How We Use Your Information
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed">
              <li>
                Provide, maintain, and improve our vacation planning services
              </li>
              <li>Create and manage your account</li>
              <li>Process your transactions and send related information</li>
              <li>
                Personalize your experience and provide tailored recommendations
              </li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>
                Respond to your comments, questions, and customer service
                requests
              </li>
              <li>
                Communicate with you about products, services, and promotional
                offers
              </li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>
                Detect, prevent, and address technical issues and fraudulent
                activity
              </li>
              <li>
                Comply with legal obligations and enforce our terms and policies
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              4. How We Share Your Information
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>

            <div className="mb-6">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">
                4.1 Service Providers
              </h4>
              <p className="text-foreground/80 leading-relaxed">
                We share information with third-party service providers who
                perform services on our behalf, such as payment processing, data
                analysis, email delivery, hosting services, and customer
                service.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">
                4.2 Business Partners
              </h4>
              <p className="text-foreground/80 leading-relaxed">
                We may share information with travel service providers, hotels,
                airlines, and other partners to fulfill your booking requests
                and provide you with travel services.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">
                4.3 Legal Requirements
              </h4>
              <p className="text-foreground/80 leading-relaxed">
                We may disclose your information if required to do so by law or
                in response to valid requests by public authorities, such as a
                court order or subpoena.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">
                4.4 Business Transfers
              </h4>
              <p className="text-foreground/80 leading-relaxed">
                In connection with any merger, sale of company assets,
                financing, or acquisition of all or a portion of our business,
                your information may be transferred to the acquiring entity.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-xl font-semibold text-foreground mb-3">
                4.5 With Your Consent
              </h4>
              <p className="text-foreground/80 leading-relaxed">
                We may share your information for any other purpose with your
                consent or at your direction.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              5. Data Security
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. These measures
              include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed mb-4">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication procedures</li>
              <li>Secure data storage and backup systems</li>
              <li>Employee training on data protection practices</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              However, no method of transmission over the Internet or electronic
              storage is 100% secure. While we strive to protect your personal
              information, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              6. Your Privacy Rights
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed mb-4">
              <li>
                <strong>Access:</strong> Request access to the personal
                information we hold about you
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or
                incomplete information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                information
              </li>
              <li>
                <strong>Portability:</strong> Request a copy of your information
                in a portable format
              </li>
              <li>
                <strong>Objection:</strong> Object to our processing of your
                personal information
              </li>
              <li>
                <strong>Restriction:</strong> Request restriction of processing
                your information
              </li>
              <li>
                <strong>Withdraw Consent:</strong> Withdraw consent where we
                rely on consent to process your information
              </li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              To exercise these rights, please contact us using the information
              provided in the Contact section below. We will respond to your
              request within a reasonable timeframe and in accordance with
              applicable law.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              7. Data Retention
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We retain your personal information for as long as necessary to
              fulfill the purposes outlined in this Privacy Policy, unless a
              longer retention period is required or permitted by law. The
              criteria we use to determine retention periods include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed">
              <li>The length of time you have an account with us</li>
              <li>
                Whether we have a legal obligation to retain the information
              </li>
              <li>
                Whether retention is advisable in light of our legal position
              </li>
              <li>The nature and sensitivity of the information</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              8. International Data Transfers
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Your information may be transferred to and processed in countries
              other than your country of residence. These countries may have
              data protection laws that are different from the laws of your
              country.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              When we transfer your information internationally, we take
              appropriate safeguards to ensure that your information remains
              protected in accordance with this Privacy Policy and applicable
              data protection laws.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              9. Children's Privacy
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Our Service is not intended for children under the age of 13 (or
              the applicable age of consent in your jurisdiction). We do not
              knowingly collect personal information from children under 13.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              If we become aware that we have collected personal information
              from a child under 13 without parental consent, we will take steps
              to delete that information. If you believe we have collected
              information from a child under 13, please contact us immediately.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              10. Third-Party Links and Services
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Our Service may contain links to third-party websites,
              applications, and services that are not operated by us. This
              Privacy Policy does not apply to these third-party services.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              We encourage you to review the privacy policies of any third-party
              services before providing them with your personal information. We
              are not responsible for the privacy practices of third parties.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              11. Marketing Communications
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We may send you promotional emails about our services, special
              offers, and travel recommendations. You can opt out of receiving
              marketing communications at any time by:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed mb-4">
              <li>Clicking the "unsubscribe" link in any marketing email</li>
              <li>
                Updating your communication preferences in your account settings
              </li>
              <li>Contacting us directly using the information below</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              Please note that even if you opt out of marketing communications,
              we may still send you non-promotional messages related to your
              account and our services.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              12. Changes to This Privacy Policy
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors. When we make changes, we will update the "Last Updated"
              date at the top of this policy.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              If we make material changes to this Privacy Policy, we will notify
              you by email (if you have provided your email address) or by
              posting a notice on our website prior to the changes becoming
              effective. We encourage you to review this Privacy Policy
              periodically to stay informed about how we protect your
              information.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              13. Contact Information
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="bg-secondary/50 rounded-lg p-6 space-y-2">
              <p className="text-foreground font-medium">
                Lumotrip Privacy Team
              </p>
              <p className="text-foreground/80">
                Email: infolumotrip@gmail.com
              </p>
              <p className="text-foreground/80">
                Website: www.lumotrip.borrowfy.site
              </p>
              <p className="text-foreground/80">
                Response Time: Within 30 days
              </p>
            </div>
          </section>

          {/* Section 14 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              14. California Privacy Rights
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If you are a California resident, you have additional rights under
              the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed mb-4">
              <li>
                The right to know what personal information we collect, use, and
                disclose
              </li>
              <li>
                The right to request deletion of your personal information
              </li>
              <li>
                The right to opt-out of the sale of your personal information
                (we do not sell personal information)
              </li>
              <li>
                The right to non-discrimination for exercising your privacy
                rights
              </li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              To exercise these rights, please contact us using the information
              provided above. We will verify your identity before processing
              your request.
            </p>
          </section>

          {/* Section 15 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              15. European Privacy Rights (GDPR)
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If you are located in the European Economic Area (EEA), you have
              rights under the General Data Protection Regulation (GDPR),
              including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed mb-4">
              <li>The right to access your personal data</li>
              <li>The right to rectification of inaccurate data</li>
              <li>The right to erasure ("right to be forgotten")</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
              <li>Rights related to automated decision-making and profiling</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              You also have the right to lodge a complaint with your local data
              protection authority if you believe we have not complied with
              applicable data protection laws.
            </p>
          </section>
        </div>

        <Separator className="my-12" />

        {/* Footer Note */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground mb-4">
            By using Lumotrip, you acknowledge that you have read and understood
            this Privacy Policy and agree to its terms.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Return to Lumotrip
          </Link>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}
