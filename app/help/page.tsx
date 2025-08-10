import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Hammer, 
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  BookOpen,
  Video,
  Mail,
  Phone
} from 'lucide-react'

export default function HelpPage() {
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
              <HelpCircle className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions and get the support you need to create amazing DIY projects.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Get instant help from our support team</p>
                <Button variant="outline" className="w-full">
                  Start Chat
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Send us a detailed message</p>
                <Button variant="outline" className="w-full">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                <p className="text-gray-600 mb-4">Browse our comprehensive guides</p>
                <Button variant="outline" className="w-full">
                  View Docs
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How accurate are the build plans?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our AI generates plans based on proven woodworking techniques and real-world measurements. 
                    All plans include safety considerations and are tested for accuracy. However, always use 
                    your judgment and follow local building codes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What if I don't have all the tools listed?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our tool filtering system shows you alternatives for missing tools. For example, if you 
                    don't have a circular saw, we'll suggest using a hand saw instead. Essential tools are 
                    clearly marked, and we provide guidance on what can be substituted.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Are the material prices accurate?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We use real Amazon prices that are updated regularly. Prices may vary by location and 
                    availability. The affiliate links we provide are to help you find the exact materials 
                    needed for your project.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I modify the plans for my specific needs?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Absolutely! Our plans are designed to be flexible. You can adjust dimensions, materials, 
                    and even combine elements from different projects. The AI will recalculate materials and 
                    costs based on your modifications.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What skill level do I need?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We offer plans for all skill levels - from complete beginners to advanced woodworkers. 
                    Each plan includes detailed step-by-step instructions, safety warnings, and tool 
                    requirements. Start with beginner projects and work your way up!
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is there a mobile app available?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our website is fully responsive and works great on mobile devices. You can access all 
                    features, generate plans, and view instructions on your phone or tablet. A dedicated 
                    mobile app is in development.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Still Need Help?</CardTitle>
              <CardDescription className="text-blue-100">
                Our support team is here to help you succeed with your DIY projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Contact Information</h4>
                  <div className="space-y-2 text-blue-100">
                    <p className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      support@aibuildplanner.com
                    </p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      (555) 123-4567
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response Times</h4>
                  <div className="space-y-2 text-blue-100">
                    <p>Email: Within 24 hours</p>
                    <p>Live Chat: Instant</p>
                    <p>Phone: 9 AM - 6 PM EST</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 