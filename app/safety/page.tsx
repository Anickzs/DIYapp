import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Hammer, 
  ArrowLeft,
  Shield,
  AlertTriangle,
  Eye,
  Ear,
  Hand,
  Zap,
  Flame,
  Heart
} from 'lucide-react'

export default function SafetyPage() {
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
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Safety Guidelines
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your safety is our top priority. Follow these guidelines to ensure safe and successful DIY projects.
            </p>
          </div>

          {/* Important Notice */}
          <Card className="bg-red-50 border-red-200 mb-8">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Important Safety Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">
                These safety guidelines are general recommendations. Always follow manufacturer instructions 
                for your specific tools and materials. If you're unsure about any aspect of your project, 
                consult with a professional or seek additional guidance.
              </p>
            </CardContent>
          </Card>

          {/* Essential Safety Equipment */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Essential Safety Equipment
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-blue-600" />
                    Eye Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Safety glasses or goggles for all cutting operations</li>
                    <li>• Face shield for high-speed cutting tools</li>
                    <li>• Prescription safety glasses if you wear glasses</li>
                    <li>• Replace scratched or damaged eye protection</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Ear className="w-5 h-5 mr-2 text-green-600" />
                    Hearing Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Earplugs or earmuffs for loud power tools</li>
                    <li>• Noise-canceling headphones for extended use</li>
                    <li>• Protection rated for 85+ decibels</li>
                    <li>• Comfortable fit for long work sessions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Hand className="w-5 h-5 mr-2 text-purple-600" />
                    Hand Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Work gloves for handling materials</li>
                    <li>• Cut-resistant gloves for sharp tools</li>
                    <li>• Chemical-resistant gloves for finishes</li>
                    <li>• Avoid loose gloves around rotating tools</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                    Respiratory Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Dust masks for sanding operations</li>
                    <li>• Respirator for toxic fumes and dust</li>
                    <li>• Proper fit and seal around face</li>
                    <li>• Replace filters according to manufacturer</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tool Safety */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Tool Safety Guidelines
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Power Tool Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Before Use:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Read and understand the manual</li>
                        <li>• Check for damage or loose parts</li>
                        <li>• Ensure proper blade/bit installation</li>
                        <li>• Test in a safe area first</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">During Use:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Keep both hands on the tool</li>
                        <li>• Maintain firm footing and balance</li>
                        <li>• Don't force the tool - let it do the work</li>
                        <li>• Keep bystanders at a safe distance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Hand Tool Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Keep tools sharp and in good condition</li>
                    <li>• Use the right tool for the job</li>
                    <li>• Cut away from your body</li>
                    <li>• Store tools safely when not in use</li>
                    <li>• Don't use damaged or broken tools</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Workspace Safety</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Workspace Setup:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Well-lit and ventilated area</li>
                        <li>• Clean and organized workspace</li>
                        <li>• Stable work surface</li>
                        <li>• Clear access to emergency exits</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Material Handling:</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Lift with your legs, not your back</li>
                        <li>• Get help for heavy materials</li>
                        <li>• Secure materials before cutting</li>
                        <li>• Store materials safely</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Emergency Procedures */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Emergency Procedures
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    First Aid Kit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Keep a well-stocked first aid kit in your workspace:
                  </p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Bandages and gauze</li>
                    <li>• Antiseptic wipes</li>
                    <li>• Pain relievers</li>
                    <li>• Emergency contact numbers</li>
                    <li>• Eye wash solution</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800 flex items-center">
                    <Flame className="w-5 h-5 mr-2" />
                    Fire Safety
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Keep fire extinguisher nearby</li>
                    <li>• Know how to use it</li>
                    <li>• Avoid sparks near flammable materials</li>
                    <li>• Have an evacuation plan</li>
                    <li>• Call 911 for serious emergencies</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Safety Checklist */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Pre-Project Safety Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Personal Protection:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>□ Safety glasses/goggles</li>
                      <li>□ Hearing protection</li>
                      <li>□ Appropriate gloves</li>
                      <li>□ Dust mask/respirator</li>
                      <li>□ Sturdy footwear</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Workspace:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>□ Well-lit area</li>
                      <li>□ Good ventilation</li>
                      <li>□ Clean workspace</li>
                      <li>□ Stable work surface</li>
                      <li>□ Emergency access</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Tools & Equipment:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>□ Tools in good condition</li>
                    <li>□ Proper blade/bit installation</li>
                    <li>□ Guards in place</li>
                    <li>□ Power cords undamaged</li>
                    <li>□ First aid kit accessible</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Build Safely?</CardTitle>
                <CardDescription className="text-blue-100">
                  Now that you understand the safety guidelines, you're ready to start your DIY project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/planner">
                    Start Your Build Plan
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