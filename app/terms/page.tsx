import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Hammer, 
  ArrowLeft,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our AI Build Planner service.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  By accessing and using AI Build Planner ("the Service"), you accept and agree to be bound by 
                  the terms and provision of this agreement. If you do not agree to abide by the above, please 
                  do not use this service.
                </p>
              </CardContent>
            </Card>

            {/* Description of Service */}
            <Card>
              <CardHeader>
                <CardTitle>2. Description of Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  AI Build Planner provides AI-generated DIY project plans, including:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Custom build plans based on your specifications</li>
                  <li>• Material lists and cost estimates</li>
                  <li>• Tool requirements and alternatives</li>
                  <li>• Step-by-step instructions</li>
                  <li>• Safety guidelines and recommendations</li>
                  <li>• Affiliate links to purchase materials</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card>
              <CardHeader>
                <CardTitle>3. User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      You agree to:
                    </h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Provide accurate and complete information</li>
                      <li>• Follow all safety guidelines and instructions</li>
                      <li>• Use the service for lawful purposes only</li>
                      <li>• Respect intellectual property rights</li>
                      <li>• Not attempt to reverse engineer our systems</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-red-600" />
                      You agree not to:
                    </h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Misuse or abuse the service</li>
                      <li>• Attempt to gain unauthorized access</li>
                      <li>• Interfere with service operation</li>
                      <li>• Share account credentials</li>
                      <li>• Use automated tools to access the service</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Disclaimer */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-2" />
                  4. Safety Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 mb-4">
                  <strong>IMPORTANT:</strong> DIY projects involve inherent risks. Our plans are for informational 
                  purposes only and do not guarantee safety or success.
                </p>
                <ul className="space-y-2 text-red-700">
                  <li>• Always follow manufacturer instructions for tools and materials</li>
                  <li>• Wear appropriate safety equipment</li>
                  <li>• Work in well-ventilated areas</li>
                  <li>• Check local building codes and regulations</li>
                  <li>• Consult professionals for complex projects</li>
                  <li>• We are not liable for injuries or damages resulting from use of our plans</li>
                </ul>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle>5. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The Service and its original content, features, and functionality are owned by AI Build Planner 
                  and are protected by international copyright, trademark, patent, trade secret, and other 
                  intellectual property laws.
                </p>
                <p className="text-gray-600">
                  You may use our generated plans for personal projects, but you may not:
                </p>
                <ul className="space-y-1 text-gray-600 mt-2">
                  <li>• Resell or redistribute our plans</li>
                  <li>• Claim ownership of our AI-generated content</li>
                  <li>• Use our plans for commercial purposes without permission</li>
                </ul>
              </CardContent>
            </Card>

            {/* Privacy Policy */}
            <Card>
              <CardHeader>
                <CardTitle>6. Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                  use of the Service, to understand our practices.
                </p>
                <Button variant="outline" asChild className="mt-4">
                  <Link href="/privacy">
                    View Privacy Policy
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Affiliate Disclosure */}
            <Card>
              <CardHeader>
                <CardTitle>7. Affiliate Disclosure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We may include affiliate links to third-party retailers (such as Amazon) in our material 
                  lists and recommendations. We may earn commissions from qualifying purchases made through 
                  these links.
                </p>
                <p className="text-gray-600">
                  These affiliate relationships do not affect the price you pay, and we only recommend 
                  products we believe will be helpful for your projects.
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle>8. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  In no event shall AI Build Planner, nor its directors, employees, partners, agents, suppliers, 
                  or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                  damages, including without limitation, loss of profits, data, use, goodwill, or other 
                  intangible losses.
                </p>
                <p className="text-gray-600">
                  Our total liability to you for any claims arising from the use of our service shall not 
                  exceed the amount you paid us, if any, in the twelve months preceding the claim.
                </p>
              </CardContent>
            </Card>

            {/* Service Availability */}
            <Card>
              <CardHeader>
                <CardTitle>9. Service Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We strive to maintain high availability of our service, but we do not guarantee uninterrupted 
                  access. We may temporarily suspend or discontinue the service for maintenance, updates, or 
                  other reasons without prior notice.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle>10. Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We may terminate or suspend your access immediately, without prior notice or liability, 
                  for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="text-gray-600">
                  Upon termination, your right to use the Service will cease immediately. If you wish to 
                  terminate your account, you may simply discontinue using the Service.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle>11. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We reserve the right to modify or replace these Terms at any time. If a revision is material, 
                  we will try to provide at least 30 days notice prior to any new terms taking effect. What 
                  constitutes a material change will be determined at our sole discretion.
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle>12. Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  These Terms shall be interpreted and governed by the laws of the United States, without 
                  regard to its conflict of law provisions. Our failure to enforce any right or provision 
                  of these Terms will not be considered a waiver of those rights.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>Email: legal@aibuildplanner.com</p>
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