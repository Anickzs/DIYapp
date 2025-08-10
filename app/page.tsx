import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Hammer, 
  Ruler, 
  ShoppingCart, 
  Zap, 
  Shield, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react'

export default function HomePage() {
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
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#quick-builds" className="text-gray-600 hover:text-gray-900 transition-colors">
              Quick Builds
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Button asChild>
              <Link href="/planner">
                Start Building
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Sparkles className="w-4 h-4 mr-2" />
            Smart DIY Plans
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transform Any Space Into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {" "}Custom Furniture
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Input your room size or materials → select what you want to build → get step-by-step plans, 
            shopping lists, and tool requirements. Perfect for beginners and pros alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/planner">
                Start Your Build Plan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/demo">
                See Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Anything
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From floating shelves to custom desks, our smart system generates personalized plans 
              that fit your space, skill level, and budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Ruler className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Smart Measurements</CardTitle>
                <CardDescription>
                  Input your space dimensions or available materials and get perfectly sized plans.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>AI-Generated Plans</CardTitle>
                <CardDescription>
                  Get detailed step-by-step instructions tailored to your skill level and tools.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Shopping Lists</CardTitle>
                <CardDescription>
                  Complete material lists with direct links to hardware stores and online retailers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Hammer className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Tool Requirements</CardTitle>
                <CardDescription>
                  Know exactly what tools you need, with alternatives for missing equipment.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Safety First</CardTitle>
                <CardDescription>
                  Built-in safety warnings and guidelines for every step of your project.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Community Support</CardTitle>
                <CardDescription>
                  Share your builds and get tips from our growing community of makers.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Builds Section */}
      <section id="quick-builds" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Quick Builds for Beginners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your DIY journey with these simple, fun projects. Perfect for beginners and great for kids too!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🏠</span>
                </div>
                <CardTitle className="text-center">Bird House</CardTitle>
                <CardDescription className="text-center">
                  A classic beginner project. Perfect for learning basic woodworking skills.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-medium text-green-600">Beginner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">2-3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">$15-25</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/quick-builds/bird-house">
                    View Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🪑</span>
                </div>
                <CardTitle className="text-center">Outdoor Bench</CardTitle>
                <CardDescription className="text-center">
                  A sturdy garden bench that will last for years. Great for outdoor spaces.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-medium text-green-600">Beginner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">4-6 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">$40-60</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/quick-builds/outdoor-bench">
                    View Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🚗</span>
                </div>
                <CardTitle className="text-center">Wooden Toy Car</CardTitle>
                <CardDescription className="text-center">
                  A fun project for kids and adults alike. Learn precision cutting and sanding.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-medium text-green-600">Beginner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">1-2 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">$8-15</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/quick-builds/wooden-toy-car">
                    View Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">📚</span>
                </div>
                <CardTitle className="text-center">Floating Shelf</CardTitle>
                <CardDescription className="text-center">
                  A simple shelf that looks great anywhere. Perfect first project.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-medium text-green-600">Beginner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">2-3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">$20-35</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/quick-builds/floating-shelf">
                    View Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🌱</span>
                </div>
                <CardTitle className="text-center">Planter Box</CardTitle>
                <CardDescription className="text-center">
                  Grow your own herbs or flowers. Great for balconies and patios.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-medium text-green-600">Beginner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">3-4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">$25-40</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/quick-builds/planter-box">
                    View Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">🎯</span>
                </div>
                <CardTitle className="text-center">Coat Rack</CardTitle>
                <CardDescription className="text-center">
                  Organize your entryway with a custom coat rack. Simple and practical.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-medium text-green-600">Beginner</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium">2-3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">$15-30</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" asChild>
                  <Link href="/quick-builds/coat-rack">
                    View Plan
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/planner">
                Start Your Own Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get your custom build plan in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">Input Your Space</h3>
              <p className="text-gray-600">
                Tell us your room dimensions, available materials, or space constraints. 
                We'll work with what you have.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">Choose Your Project</h3>
              <p className="text-gray-600">
                Select from our catalog or let our system suggest the perfect project for your space 
                and skill level.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Your Plan</h3>
              <p className="text-gray-600">
                Receive detailed instructions, material lists, tool requirements, 
                and shopping links - all customized for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of DIYers who are creating custom furniture and home improvements 
            with smart planning precision.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link href="/planner">
              Create Your First Build Plan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">At Home DIY</span>
              </div>
              <p className="text-gray-400">
                Making DIY accessible to everyone with smart custom build plans.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/planner" className="hover:text-white transition-colors">Build Planner</Link></li>
                <li><Link href="/quick-builds" className="hover:text-white transition-colors">Quick Builds</Link></li>
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">Safety Guidelines</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="hover:text-white transition-colors">Safety Disclaimer</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 At Home DIY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 