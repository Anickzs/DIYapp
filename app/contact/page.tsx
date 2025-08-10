import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Hammer, 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare
} from 'lucide-react'

export default function ContactPage() {
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
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions about our AI Build Planner? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your project or question..."
                      rows={6}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-600">support@aibuildplanner.com</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-600">(555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Fri 9 AM - 6 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Office</h3>
                      <p className="text-gray-600">123 DIY Street</p>
                      <p className="text-gray-600">Craft City, CC 12345</p>
                      <p className="text-sm text-gray-500">By appointment only</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Business Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-medium">10:00 AM - 4:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Check out our comprehensive help center for instant answers to common questions.
                  </p>
                  <Button variant="secondary" asChild className="w-full">
                    <Link href="/help">
                      Visit Help Center
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Common Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I get started?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Simply visit our build planner, input your space dimensions, choose your project type, 
                    and let our AI generate a custom plan for you.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is the service free?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We offer both free and premium plans. Basic build plans are free, while advanced features 
                    and unlimited plans require a subscription.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I cancel my subscription?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time. You'll continue to have access until 
                    the end of your billing period.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We offer a 30-day money-back guarantee for all paid subscriptions. If you're not satisfied, 
                    contact us for a full refund.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 