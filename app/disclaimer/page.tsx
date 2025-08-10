import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Hammer, 
  ArrowLeft,
  AlertTriangle,
  Shield,
  Triangle,
  Info
} from 'lucide-react'

export default function DisclaimerPage() {
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Triangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Safety Disclaimer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Important information about the limitations and risks associated with DIY projects and our service.
            </p>
          </div>

          {/* Critical Warning */}
          <Card className="bg-red-50 border-red-200 mb-8">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                CRITICAL SAFETY WARNING
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700 font-semibold">
                DIY projects involve inherent risks of injury, property damage, and other hazards. 
                Our AI-generated plans are for informational purposes only and do not guarantee safety, 
                success, or compliance with local regulations.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {/* General Disclaimer */}
            <Card>
              <CardHeader>
                <CardTitle>General Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  The information provided by AI Build Planner is for general informational and educational 
                  purposes only. While we strive to provide accurate and helpful information, we make no 
                  representations or warranties of any kind, express or implied, about the completeness, 
                  accuracy, reliability, suitability, or availability of the information, products, services, 
                  or related graphics contained in our plans.
                </p>
                <p className="text-gray-600">
                  Any reliance you place on such information is therefore strictly at your own risk.
                </p>
              </CardContent>
            </Card>

            {/* No Professional Advice */}
            <Card>
              <CardHeader>
                <CardTitle>No Professional Advice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our service does not constitute professional advice, including but not limited to:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Engineering or architectural advice</li>
                  <li>• Legal or regulatory compliance guidance</li>
                  <li>• Safety or risk assessment</li>
                  <li>• Professional construction or woodworking instruction</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  For professional advice, consult qualified experts in the relevant field.
                </p>
              </CardContent>
            </Card>

            {/* Safety Risks */}
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">Safety Risks and Hazards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 mb-4">
                  DIY projects can involve various safety risks, including but not limited to:
                </p>
                <ul className="space-y-2 text-orange-700">
                  <li>• Cuts, burns, and other physical injuries</li>
                  <li>• Eye injuries from flying debris</li>
                  <li>• Hearing damage from loud tools</li>
                  <li>• Respiratory issues from dust and fumes</li>
                  <li>• Electrical shocks and fires</li>
                  <li>• Structural failures and collapses</li>
                  <li>• Property damage</li>
                </ul>
                <p className="text-orange-700 mt-4 font-semibold">
                  Always prioritize safety and use appropriate protective equipment.
                </p>
              </CardContent>
            </Card>

            {/* User Responsibility */}
            <Card>
              <CardHeader>
                <CardTitle>User Responsibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  By using our service, you acknowledge and agree that:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• You are responsible for your own safety and the safety of others</li>
                  <li>• You will follow all safety guidelines and manufacturer instructions</li>
                  <li>• You will assess your own skill level and project complexity</li>
                  <li>• You will obtain necessary permits and comply with local regulations</li>
                  <li>• You will use appropriate tools and safety equipment</li>
                  <li>• You will work in safe conditions with proper ventilation</li>
                </ul>
              </CardContent>
            </Card>

            {/* No Guarantees */}
            <Card>
              <CardHeader>
                <CardTitle>No Guarantees or Warranties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We do not guarantee:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• The accuracy or completeness of our plans</li>
                  <li>• The safety of any project or technique</li>
                  <li>• The success or outcome of your project</li>
                  <li>• Compliance with local building codes or regulations</li>
                  <li>• The availability or quality of materials or tools</li>
                  <li>• The suitability of plans for your specific situation</li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 mb-4">
                  <strong>IMPORTANT:</strong> AI Build Planner, its owners, employees, and affiliates shall 
                  not be liable for any damages, injuries, losses, or expenses arising from:
                </p>
                <ul className="space-y-2 text-red-700">
                  <li>• Use of our plans or recommendations</li>
                  <li>• Injuries sustained during DIY projects</li>
                  <li>• Property damage or destruction</li>
                  <li>• Financial losses or costs</li>
                  <li>• Emotional distress or mental anguish</li>
                  <li>• Any other damages, direct or indirect</li>
                </ul>
                <p className="text-red-700 mt-4 font-semibold">
                  You use our service entirely at your own risk.
                </p>
              </CardContent>
            </Card>

            {/* Third-Party Content */}
            <Card>
              <CardHeader>
                <CardTitle>Third-Party Content and Links</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our service may include:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Links to third-party websites and retailers</li>
                  <li>• Affiliate links to purchase materials and tools</li>
                  <li>• References to external resources and information</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  We are not responsible for the content, accuracy, or safety of third-party websites, 
                  products, or services. Use of third-party content is at your own risk.
                </p>
              </CardContent>
            </Card>

            {/* Local Regulations */}
            <Card>
              <CardHeader>
                <CardTitle>Local Regulations and Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Building codes, regulations, and requirements vary by location. Our plans may not comply 
                  with local regulations in your area. You are responsible for:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Checking local building codes and regulations</li>
                  <li>• Obtaining necessary permits and approvals</li>
                  <li>• Ensuring compliance with zoning laws</li>
                  <li>• Following safety standards and requirements</li>
                  <li>• Consulting with local authorities when needed</li>
                </ul>
              </CardContent>
            </Card>

            {/* Professional Consultation */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">When to Seek Professional Help</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 mb-4">
                  Consider consulting professionals for:
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li>• Structural modifications or load-bearing projects</li>
                  <li>• Electrical or plumbing work</li>
                  <li>• Projects requiring permits or inspections</li>
                  <li>• Complex or large-scale projects</li>
                  <li>• Projects beyond your skill level</li>
                  <li>• Safety concerns or uncertainties</li>
                </ul>
                <p className="text-blue-700 mt-4 font-semibold">
                  When in doubt, consult a qualified professional.
                </p>
              </CardContent>
            </Card>

            {/* Emergency Information */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-700 mb-4">
                  In case of emergency:
                </p>
                <ul className="space-y-2 text-red-700">
                  <li>• Call 911 for medical emergencies</li>
                  <li>• Call your local emergency services</li>
                  <li>• Seek immediate medical attention for injuries</li>
                  <li>• Contact local authorities for safety concerns</li>
                </ul>
                <p className="text-red-700 mt-4 font-semibold">
                  Always prioritize safety over project completion.
                </p>
              </CardContent>
            </Card>

            {/* Acceptance */}
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  By using our service, you acknowledge that you have read, understood, and agree to this 
                  safety disclaimer. You understand the risks involved in DIY projects and accept full 
                  responsibility for your actions and their consequences.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-gray-50 border-gray-200">
              <CardHeader>
                <CardTitle>Questions or Concerns?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you have questions about this disclaimer or safety concerns, please contact us:
                </p>
                <div className="space-y-2 text-gray-600">
                  <p>Email: safety@aibuildplanner.com</p>
                  <p>Phone: (555) 123-4567</p>
                  <p>Address: 123 DIY Street, Craft City, CC 12345</p>
                </div>
                <Button variant="outline" asChild className="mt-4">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 