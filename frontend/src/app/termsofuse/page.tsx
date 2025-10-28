import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
        {/* Hero Section */}
        <div className="mb-16 md:mb-20 text-center">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            Terms of Use
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-balance">
            Please read these terms carefully before using Lumotrip services
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>Effective Date: January 1, 2025</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>Last Updated: January 1, 2025</span>
          </div>
        </div>

        <Separator className="mb-12" />

        {/* Terms Content */}
        <div className="prose prose-lg max-w-none">
          {/* Section 1 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              1. Acceptance of Terms
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              By accessing and using Lumotrip ("the Service"), you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to these Terms of Use, please do not use our
              Service.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Lumotrip reserves the right to update, change, or replace any part
              of these Terms of Use by posting updates and/or changes to our
              website. It is your responsibility to check this page periodically
              for changes.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              2. Description of Service
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Lumotrip provides an online platform for vacation planning and
              travel itinerary creation. Our Service includes, but is not
              limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed">
              <li>Personalized vacation planning tools and recommendations</li>
              <li>Itinerary creation and management features</li>
              <li>Travel destination information and guides</li>
              <li>Integration with third-party booking services</li>
              <li>Community features and user-generated content</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              3. User Accounts
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              To access certain features of the Service, you may be required to
              create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed mb-4">
              <li>
                Provide accurate, current, and complete information during
                registration
              </li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>
                Accept all responsibility for activities that occur under your
                account
              </li>
              <li>
                Notify us immediately of any unauthorized use of your account
              </li>
            </ul>
            <p className="text-foreground/80 leading-relaxed">
              You are responsible for safeguarding your account credentials and
              for any activities or actions under your account.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              4. User Conduct
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              You agree not to use the Service to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the Service or servers</li>
              <li>
                Use automated systems to access the Service without permission
              </li>
              <li>Impersonate any person or entity</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              5. Intellectual Property Rights
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              The Service and its original content, features, and functionality
              are owned by Lumotrip and are protected by international
              copyright, trademark, patent, trade secret, and other intellectual
              property laws.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, or exploit any of our content without our
              express written permission.
            </p>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              6. User-Generated Content
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              By submitting content to Lumotrip, including reviews, photos,
              itineraries, or comments, you grant us a worldwide, non-exclusive,
              royalty-free license to use, reproduce, modify, and display such
              content in connection with the Service.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              You represent and warrant that you own or have the necessary
              rights to the content you submit and that such content does not
              violate any third-party rights.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              7. Third-Party Services
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Our Service may contain links to third-party websites or services
              that are not owned or controlled by Lumotrip. We have no control
              over and assume no responsibility for the content, privacy
              policies, or practices of any third-party websites or services.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Any bookings, purchases, or transactions made through third-party
              services are solely between you and the third party. Lumotrip is
              not responsible for any issues arising from such transactions.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              8. Disclaimer of Warranties
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis
              without warranties of any kind, either express or implied.
              Lumotrip does not warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed">
              <li>
                The Service will be uninterrupted, timely, secure, or error-free
              </li>
              <li>
                The results obtained from using the Service will be accurate or
                reliable
              </li>
              <li>Any errors in the Service will be corrected</li>
              <li>
                The quality of any information obtained through the Service will
                meet your expectations
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              9. Limitation of Liability
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              To the maximum extent permitted by law, Lumotrip shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages, or any loss of profits or revenues, whether
              incurred directly or indirectly, or any loss of data, use,
              goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80 leading-relaxed">
              <li>
                Your access to or use of or inability to access or use the
                Service
              </li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>
                Unauthorized access, use, or alteration of your transmissions or
                content
              </li>
            </ul>
          </section>

          {/* Section 10 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              10. Indemnification
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Lumotrip and its
              affiliates, officers, directors, employees, and agents from and
              against any claims, liabilities, damages, losses, and expenses
              arising out of or in any way connected with your access to or use
              of the Service, your violation of these Terms, or your violation
              of any rights of another party.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              11. Termination
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              We may terminate or suspend your account and access to the Service
              immediately, without prior notice or liability, for any reason,
              including if you breach these Terms of Use.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Upon termination, your right to use the Service will immediately
              cease. All provisions of these Terms which by their nature should
              survive termination shall survive, including ownership provisions,
              warranty disclaimers, and limitations of liability.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              12. Governing Law
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              These Terms shall be governed and construed in accordance with the
              laws of the jurisdiction in which Lumotrip operates, without
              regard to its conflict of law provisions. Any disputes arising
              from these Terms or the Service shall be resolved in the courts of
              that jurisdiction.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              13. Changes to Terms
            </h3>
            <p className="text-foreground/80 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time
              at our sole discretion. If a revision is material, we will provide
              at least 30 days' notice prior to any new terms taking effect.
              What constitutes a material change will be determined at our sole
              discretion. By continuing to access or use our Service after
              revisions become effective, you agree to be bound by the revised
              terms.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
              14. Contact Information
            </h3>
            <p className="text-foreground/80 leading-relaxed mb-4">
              If you have any questions about these Terms of Use, please contact
              us:
            </p>
            <div className="bg-secondary/50 rounded-lg p-6 space-y-2">
              <p className="text-foreground font-medium">Lumotrip Support</p>
              <p className="text-foreground/80">
                Email: infolumotrip@gmail.com
              </p>
              <p className="text-foreground/80">
                Website: www.lumotrip.borrowfy.site
              </p>
            </div>
          </section>
        </div>

        <Separator className="my-12" />

        {/* Footer Note */}
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground mb-4">
            By using Lumotrip, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Use.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Return to Lumotrip
          </Link>
        </div>
      </main>
    </div>
  );
}
