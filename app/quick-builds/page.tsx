'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Hammer, 
  ArrowLeft,
  Clock,
  DollarSign,
  Users,
  Star,
  Heart
} from 'lucide-react'

const quickBuilds = [
  {
    id: 'bird-house',
    name: 'Bird House',
    emoji: '🏠',
    description: 'A classic beginner project. Perfect for learning basic woodworking skills.',
    difficulty: 'Beginner',
    time: '2-3 hours',
    cost: '$15-25',
    materials: ['1x6 pine board', 'Wood screws', 'Wood glue', 'Paint or stain'],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Pencil'],
    image: '/api/placeholder/300/200',
    rating: 4.8,
    reviews: 127,
    category: 'Outdoor'
  },
  {
    id: 'outdoor-bench',
    name: 'Outdoor Bench',
    emoji: '🪑',
    description: 'A sturdy garden bench that will last for years. Great for outdoor spaces.',
    difficulty: 'Beginner',
    time: '4-6 hours',
    cost: '$40-60',
    materials: ['2x4 pine boards', '2x6 pine boards', 'Wood screws', 'Wood stain'],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Level'],
    image: '/api/placeholder/300/200',
    rating: 4.6,
    reviews: 89,
    category: 'Outdoor'
  },
  {
    id: 'toy-car',
    name: 'Wooden Toy Car',
    emoji: '🚗',
    description: 'A fun project for kids and adults alike. Learn precision cutting and sanding.',
    difficulty: 'Beginner',
    time: '1-2 hours',
    cost: '$8-15',
    materials: ['1x4 pine board', 'Wood glue', 'Sandpaper', 'Paint'],
    tools: ['Saw', 'Sandpaper', 'Paint brushes'],
    image: '/api/placeholder/300/200',
    rating: 4.9,
    reviews: 203,
    category: 'Toys'
  },
  {
    id: 'floating-shelf',
    name: 'Floating Shelf',
    emoji: '📚',
    description: 'A simple shelf that looks great anywhere. Perfect first project.',
    difficulty: 'Beginner',
    time: '2-3 hours',
    cost: '$20-35',
    materials: ['1x8 pine board', 'Wood screws', 'Wall anchors', 'Wood stain'],
    tools: ['Saw', 'Drill', 'Level', 'Measuring tape'],
    image: '/api/placeholder/300/200',
    rating: 4.7,
    reviews: 156,
    category: 'Storage'
  },
  {
    id: 'planter-box',
    name: 'Planter Box',
    emoji: '🌱',
    description: 'Grow your own herbs or flowers. Great for balconies and patios.',
    difficulty: 'Beginner',
    time: '3-4 hours',
    cost: '$25-40',
    materials: ['1x6 pine boards', 'Wood screws', 'Landscape fabric', 'Soil'],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Pencil'],
    image: '/api/placeholder/300/200',
    rating: 4.5,
    reviews: 94,
    category: 'Garden'
  },
  {
    id: 'coat-rack',
    name: 'Coat Rack',
    emoji: '🎯',
    description: 'Organize your entryway with a custom coat rack. Simple and practical.',
    difficulty: 'Beginner',
    time: '2-3 hours',
    cost: '$15-30',
    materials: ['1x4 pine board', 'Wooden pegs', 'Wood screws', 'Wood stain'],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Pencil'],
    image: '/api/placeholder/300/200',
    rating: 4.4,
    reviews: 67,
    category: 'Storage'
  }
]

export default function QuickBuildsPage() {
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
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Star className="w-3 h-3 mr-1" />
            Quick Builds
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quick Builds for Beginners
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start your DIY journey with these simple, fun projects. Perfect for beginners and great for kids too!
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {quickBuilds.map((project) => (
            <Card key={project.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">{project.emoji}</span>
                </div>
                <CardTitle className="text-center">{project.name}</CardTitle>
                <CardDescription className="text-center">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Project Stats */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {project.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-medium flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {project.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      {project.cost}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span className="font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                      {project.rating} ({project.reviews})
                    </span>
                  </div>
                </div>

                {/* Materials Preview */}
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Key Materials:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.materials.slice(0, 3).map((material, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                    {project.materials.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.materials.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                                            <Button className="flex-1" asChild>
                            <Link href={`/quick-builds/${project.id}`}>
                              View Plan
                            </Link>
                          </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Choose a quick build above or create your own custom project with our smart planner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/planner">
                Create Custom Project
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/demo">
                See How It Works
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 