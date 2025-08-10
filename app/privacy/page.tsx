import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Hammer, 
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Database
} from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Hammer className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">At Home DIY</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2 text-blue-600" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Name and email address (when you contact us)</li>
                    <li>• Project specifications and preferences</li>
                    <li>• Usage data and analytics</li>
                    <li>• Communication history with our support team</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technical Information</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• IP address and device information</li>
                    <li>• Browser type and version</li>
                    <li>• Operating system</li>
                    <li>• Pages visited and time spent</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-green-600" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Generate personalized build plans and recommendations</li>
                  <li>• Improve our AI algorithms and service quality</li>
                  <li>• Provide customer support and respond to inquiries</li>
                  <li>• Send important updates about our service</li>
                  <li>• Analyze usage patterns to enhance user experience</li>
                  <li>• Ensure security and prevent fraud</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-purple-600" />
                  Information Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• With your explicit consent</li>
                  <li>• To comply with legal obligations</li>
                  <li>• To protect our rights and safety</li>
                  <li>• With service providers who assist in our operations (under strict confidentiality agreements)</li>
                  <li>• In connection with a business transfer or merger</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Encryption of data in transit and at rest</li>
                  <li>• Regular security assessments and updates</li>
                  <li>• Access controls and authentication</li>
                  <li>• Secure hosting and infrastructure</li>
                  <li>• Employee training on data protection</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Remember your preferences and settings</li>
                  <li>• Analyze website usage and performance</li>
                  <li>• Provide personalized content and recommendations</li>
                  <li>• Improve our service functionality</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our service may include links to third-party websites and services, including:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Amazon affiliate links for materials and tools</li>
                  <li>• Payment processors for premium subscriptions</li>
                  <li>• Analytics services to understand usage patterns</li>
                  <li>• Customer support platforms</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  These services have their own privacy policies, and we encourage you to review them.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Access your personal information</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt out of marketing communications</li>
                  <li>• Export your data in a portable format</li>
                  <li>• Lodge a complaint with supervisory authorities</li>
                </ul>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If you believe we have collected information 
                  from a child under 13, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We may update this privacy policy from time to time. We will notify you of any material 
                  changes by posting the new policy on this page and updating the "Last updated" date. 
                  Your continued use of our service after any changes constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have any questions about this privacy policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>Email: privacy@aibuildplanner.com</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Address: 123 DIY Street, Craft City, CC 12345</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 