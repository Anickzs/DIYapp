'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Hammer, 
  ShoppingCart, 
  ArrowLeft,
  Clock,
  DollarSign,
  Heart,
  Star,
  Ruler,
  Shield,
  Zap,
  Users,
  Target
} from 'lucide-react'

// Quick Builds data - this would typically come from a database
const quickBuilds = {
  'bird-house': {
    id: 'bird-house',
    name: 'Bird House',
    emoji: '🏠',
    description: 'A classic beginner project. Perfect for learning basic woodworking skills.',
    difficulty: 'Beginner',
    time: '2-3 hours',
    cost: '$15-25',
    materials: [
      { item: '1x6 pine board (8 feet)', quantity: '1 piece' },
      { item: 'Wood screws (1 1/4")', quantity: '8 pieces' },
      { item: 'Wood glue', quantity: '1 bottle' },
      { item: 'Paint or stain', quantity: '1 can' },
      { item: 'Small hinges', quantity: '2 pieces' },
      { item: 'Nail or screw for door', quantity: '1 piece' }
    ],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Pencil', 'Sandpaper', 'Paint brush'],
    image: '/api/placeholder/400/300',
    rating: 4.8,
    reviews: 127,
    category: 'Outdoor',
    steps: [
      {
        step: 1,
        title: 'Cut the wood pieces',
        description: 'Cut the 1x6 board into the following pieces: front (6" x 8"), back (6" x 8"), sides (6" x 6"), roof (7" x 8"), and floor (6" x 6").',
        time: '30 minutes',
        tools: ['Saw', 'Measuring tape', 'Pencil']
      },
      {
        step: 2,
        title: 'Drill entrance hole',
        description: 'In the front piece, drill a 1 1/4" hole 2" from the top and centered horizontally. This will be the bird entrance.',
        time: '15 minutes',
        tools: ['Drill', '1 1/4" drill bit']
      },
      {
        step: 3,
        title: 'Assemble the box',
        description: 'Glue and screw the sides to the front and back pieces. Make sure the entrance hole is at the top.',
        time: '45 minutes',
        tools: ['Wood glue', 'Drill', 'Screws']
      },
      {
        step: 4,
        title: 'Add the floor',
        description: 'Attach the floor piece to the bottom of the box. Leave a small gap for drainage.',
        time: '15 minutes',
        tools: ['Wood glue', 'Drill', 'Screws']
      },
      {
        step: 5,
        title: 'Attach the roof',
        description: 'Glue and screw the roof piece to the top of the box. Make sure it overhangs slightly for protection.',
        time: '15 minutes',
        tools: ['Wood glue', 'Drill', 'Screws']
      },
      {
        step: 6,
        title: 'Sand and finish',
        description: 'Sand all edges and surfaces smooth. Paint or stain the bird house as desired.',
        time: '30 minutes',
        tools: ['Sandpaper', 'Paint brush', 'Paint or stain']
      }
    ],
    safetyNotes: [
      'Always wear safety glasses when cutting wood',
      'Work in a well-ventilated area when painting',
      'Keep small children away from power tools',
      'Use a dust mask when sanding'
    ],
    tips: [
      'Use untreated wood to avoid harming birds',
      'Place the bird house 5-10 feet off the ground',
      'Face the entrance away from prevailing winds',
      'Clean the bird house annually'
    ]
  },
  'outdoor-bench': {
    id: 'outdoor-bench',
    name: 'Outdoor Bench',
    emoji: '🪑',
    description: 'A sturdy garden bench that will last for years. Great for outdoor spaces.',
    difficulty: 'Beginner',
    time: '4-6 hours',
    cost: '$40-60',
    materials: [
      { item: '2x4 pressure-treated lumber (8 feet)', quantity: '6 pieces' },
      { item: '2x6 pressure-treated lumber (8 feet)', quantity: '2 pieces' },
      { item: 'Deck screws (3")', quantity: '24 pieces' },
      { item: 'Wood glue', quantity: '1 bottle' },
      { item: 'Exterior paint or stain', quantity: '1 can' }
    ],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Pencil', 'Sandpaper', 'Paint brush', 'Clamps'],
    image: '/api/placeholder/400/300',
    rating: 4.6,
    reviews: 89,
    category: 'Outdoor',
    steps: [
      {
        step: 1,
        title: 'Cut the lumber',
        description: 'Cut the 2x4s into: 4 legs (18" each), 4 seat supports (48" each), 2 back supports (48" each), and 2 armrests (24" each). Cut the 2x6s into 3 seat boards (48" each).',
        time: '45 minutes',
        tools: ['Saw', 'Measuring tape', 'Pencil']
      },
      {
        step: 2,
        title: 'Build the frame',
        description: 'Create two side frames by attaching the legs to the seat supports. Use wood glue and screws.',
        time: '1 hour',
        tools: ['Wood glue', 'Drill', 'Screws', 'Clamps']
      },
      {
        step: 3,
        title: 'Attach the back',
        description: 'Connect the two side frames with the back supports. This creates the basic bench structure.',
        time: '45 minutes',
        tools: ['Wood glue', 'Drill', 'Screws']
      },
      {
        step: 4,
        title: 'Add the seat',
        description: 'Attach the three 2x6 seat boards to the seat supports. Leave small gaps between boards for drainage.',
        time: '30 minutes',
        tools: ['Wood glue', 'Drill', 'Screws']
      },
      {
        step: 5,
        title: 'Install armrests',
        description: 'Attach the armrests to the front legs and back supports for comfort and stability.',
        time: '30 minutes',
        tools: ['Wood glue', 'Drill', 'Screws']
      },
      {
        step: 6,
        title: 'Finish the bench',
        description: 'Sand all surfaces smooth and apply exterior paint or stain for weather protection.',
        time: '1 hour',
        tools: ['Sandpaper', 'Paint brush', 'Paint or stain']
      }
    ],
    safetyNotes: [
      'Wear safety glasses when cutting wood',
      'Use pressure-treated lumber for outdoor durability',
      'Work on a stable, level surface',
      'Keep tools organized and out of reach of children'
    ],
    tips: [
      'Use pressure-treated lumber to prevent rot',
      'Apply finish annually to maintain protection',
      'Place on level ground or concrete',
      'Consider adding cushions for comfort'
    ]
  },
  'wooden-toy-car': {
    id: 'wooden-toy-car',
    name: 'Wooden Toy Car',
    emoji: '🚗',
    description: 'A fun project for kids and adults alike. Learn precision cutting and sanding.',
    difficulty: 'Beginner',
    time: '1-2 hours',
    cost: '$8-15',
    materials: [
      { item: '2x4 pine lumber (12")', quantity: '1 piece' },
      { item: 'Wooden wheels (1 1/2")', quantity: '4 pieces' },
      { item: 'Wooden dowels (1/4")', quantity: '2 pieces' },
      { item: 'Wood glue', quantity: '1 bottle' },
      { item: 'Non-toxic paint', quantity: '1 set' }
    ],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Pencil', 'Sandpaper', 'Paint brush'],
    image: '/api/placeholder/400/300',
    rating: 4.9,
    reviews: 203,
    category: 'Toys',
    steps: [
      {
        step: 1,
        title: 'Cut the car body',
        description: 'Cut the 2x4 into a 6" length for the car body. Round the front end slightly for a car-like appearance.',
        time: '15 minutes',
        tools: ['Saw', 'Measuring tape', 'Pencil']
      },
      {
        step: 2,
        title: 'Drill wheel holes',
        description: 'Drill four 1/4" holes through the car body for the wheel axles. Two holes near the front, two near the back.',
        time: '20 minutes',
        tools: ['Drill', '1/4" drill bit']
      },
      {
        step: 3,
        title: 'Attach the wheels',
        description: 'Insert the wooden dowels through the holes and attach the wheels. Secure with wood glue.',
        time: '30 minutes',
        tools: ['Wood glue', 'Wheels', 'Dowels']
      },
      {
        step: 4,
        title: 'Sand the car',
        description: 'Sand all surfaces smooth, especially the edges and corners. This is important for safety.',
        time: '20 minutes',
        tools: ['Sandpaper']
      },
      {
        step: 5,
        title: 'Paint the car',
        description: 'Paint the car with non-toxic paint. Let kids help with this step!',
        time: '30 minutes',
        tools: ['Paint brush', 'Non-toxic paint']
      }
    ],
    safetyNotes: [
      'Use non-toxic materials since this is for children',
      'Sand all edges thoroughly to prevent splinters',
      'Supervise children when using the toy',
      'Use water-based, non-toxic paint'
    ],
    tips: [
      'Let children help with painting',
      'Make multiple cars in different colors',
      'Add details like headlights with paint',
      'Consider making a whole fleet of cars'
    ]
  },
  'floating-shelf': {
    id: 'floating-shelf',
    name: 'Floating Shelf',
    emoji: '📚',
    description: 'A simple shelf that looks great anywhere. Perfect first project.',
    difficulty: 'Beginner',
    time: '2-3 hours',
    cost: '$20-35',
    materials: [
      { item: '1x8 pine board (24")', quantity: '1 piece' },
      { item: '1x2 pine board (24")', quantity: '2 pieces' },
      { item: 'Wood screws (1 1/2")', quantity: '8 pieces' },
      { item: 'Wall anchors', quantity: '4 pieces' },
      { item: 'Paint or stain', quantity: '1 can' }
    ],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Pencil', 'Sandpaper', 'Paint brush', 'Level'],
    image: '/api/placeholder/400/300',
    rating: 4.7,
    reviews: 156,
    category: 'Home',
    steps: [
      {
        step: 1,
        title: 'Cut the wood',
        description: 'Cut the 1x8 board to 24" for the shelf top. Cut the 1x2 boards to 24" for the sides.',
        time: '20 minutes',
        tools: ['Saw', 'Measuring tape', 'Pencil']
      },
      {
        step: 2,
        title: 'Assemble the shelf',
        description: 'Attach the 1x2 side pieces to the bottom of the 1x8 top piece. This creates the floating effect.',
        time: '30 minutes',
        tools: ['Drill', 'Screws', 'Wood glue']
      },
      {
        step: 3,
        title: 'Drill mounting holes',
        description: 'Drill holes through the side pieces for wall mounting. Use a level to ensure they\'re straight.',
        time: '20 minutes',
        tools: ['Drill', 'Level', 'Pencil']
      },
      {
        step: 4,
        title: 'Sand and finish',
        description: 'Sand all surfaces smooth and apply paint or stain as desired.',
        time: '45 minutes',
        tools: ['Sandpaper', 'Paint brush', 'Paint or stain']
      },
      {
        step: 5,
        title: 'Mount the shelf',
        description: 'Mark the wall, install anchors, and mount the shelf using the drilled holes.',
        time: '30 minutes',
        tools: ['Level', 'Drill', 'Wall anchors', 'Screws']
      }
    ],
    safetyNotes: [
      'Use appropriate wall anchors for your wall type',
      'Check for electrical wires before drilling',
      'Use a level to ensure the shelf is straight',
      'Test the shelf with light items first'
    ],
    tips: [
      'Paint the shelf to match your room decor',
      'Make multiple shelves in different sizes',
      'Use for books, plants, or decorative items',
      'Consider adding LED strip lighting underneath'
    ]
  },
  'planter-box': {
    id: 'planter-box',
    name: 'Planter Box',
    emoji: '🌱',
    description: 'Grow your own herbs or flowers. Great for balconies and patios.',
    difficulty: 'Beginner',
    time: '3-4 hours',
    cost: '$25-40',
    materials: [
      { item: '1x6 cedar boards (8 feet)', quantity: '3 pieces' },
      { item: '1x2 cedar boards (8 feet)', quantity: '2 pieces' },
      { item: 'Wood screws (1 1/4")', quantity: '16 pieces' },
      { item: 'Landscape fabric', quantity: '1 roll' },
      { item: 'Drill bit for drainage', quantity: '1 piece' }
    ],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Pencil', 'Sandpaper', 'Staple gun'],
    image: '/api/placeholder/400/300',
    rating: 4.5,
    reviews: 94,
    category: 'Garden',
    steps: [
      {
        step: 1,
        title: 'Cut the boards',
        description: 'Cut the 1x6 boards into: 2 sides (24" each), 2 ends (12" each), and 1 bottom (24" x 12"). Cut the 1x2 boards into 4 corner supports (6" each).',
        time: '30 minutes',
        tools: ['Saw', 'Measuring tape', 'Pencil']
      },
      {
        step: 2,
        title: 'Assemble the box',
        description: 'Attach the sides to the ends using the corner supports. This creates the basic box structure.',
        time: '1 hour',
        tools: ['Drill', 'Screws', 'Wood glue']
      },
      {
        step: 3,
        title: 'Add the bottom',
        description: 'Attach the bottom piece to the box. Leave small gaps for drainage.',
        time: '30 minutes',
        tools: ['Drill', 'Screws']
      },
      {
        step: 4,
        title: 'Drill drainage holes',
        description: 'Drill several 1/4" holes in the bottom for proper drainage.',
        time: '15 minutes',
        tools: ['Drill', '1/4" drill bit']
      },
      {
        step: 5,
        title: 'Line with fabric',
        description: 'Staple landscape fabric to the inside bottom and sides to prevent soil from escaping.',
        time: '30 minutes',
        tools: ['Staple gun', 'Landscape fabric']
      },
      {
        step: 6,
        title: 'Finish the planter',
        description: 'Sand any rough edges and apply a food-safe finish if desired.',
        time: '20 minutes',
        tools: ['Sandpaper', 'Food-safe finish']
      }
    ],
    safetyNotes: [
      'Use cedar or other rot-resistant wood',
      'Wear gloves when handling landscape fabric',
      'Use food-safe finishes if growing edible plants',
      'Ensure proper drainage to prevent root rot'
    ],
    tips: [
      'Use cedar for natural rot resistance',
      'Add wheels for easy moving',
      'Consider adding a trellis for climbing plants',
      'Group multiple planters for a garden effect'
    ]
  },
  'coat-rack': {
    id: 'coat-rack',
    name: 'Coat Rack',
    emoji: '🎯',
    description: 'Organize your entryway with a custom coat rack. Simple and practical.',
    difficulty: 'Beginner',
    time: '2-3 hours',
    cost: '$15-30',
    materials: [
      { item: '1x4 pine board (24")', quantity: '1 piece' },
      { item: 'Wooden hooks', quantity: '4-6 pieces' },
      { item: 'Wood screws (1 1/2")', quantity: '8 pieces' },
      { item: 'Wall anchors', quantity: '2 pieces' },
      { item: 'Paint or stain', quantity: '1 can' }
    ],
    tools: ['Saw', 'Drill', 'Measuring tape', 'Pencil', 'Sandpaper', 'Paint brush'],
    image: '/api/placeholder/400/300',
    rating: 4.4,
    reviews: 78,
    category: 'Home',
    steps: [
      {
        step: 1,
        title: 'Cut the board',
        description: 'Cut the 1x4 board to 24" length. This will be the main rack piece.',
        time: '10 minutes',
        tools: ['Saw', 'Measuring tape', 'Pencil']
      },
      {
        step: 2,
        title: 'Mark hook positions',
        description: 'Mark evenly spaced positions for the hooks along the board. Typically 4-6 hooks work well.',
        time: '15 minutes',
        tools: ['Measuring tape', 'Pencil']
      },
      {
        step: 3,
        title: 'Attach the hooks',
        description: 'Drill pilot holes and attach the wooden hooks to the board using screws.',
        time: '30 minutes',
        tools: ['Drill', 'Screws']
      },
      {
        step: 4,
        title: 'Sand and finish',
        description: 'Sand all surfaces smooth and apply paint or stain as desired.',
        time: '45 minutes',
        tools: ['Sandpaper', 'Paint brush', 'Paint or stain']
      },
      {
        step: 5,
        title: 'Drill mounting holes',
        description: 'Drill two holes near the top of the board for wall mounting.',
        time: '15 minutes',
        tools: ['Drill', 'Pencil']
      },
      {
        step: 6,
        title: 'Mount the rack',
        description: 'Mark the wall, install anchors, and mount the coat rack securely.',
        time: '30 minutes',
        tools: ['Level', 'Drill', 'Wall anchors', 'Screws']
      }
    ],
    safetyNotes: [
      'Use appropriate wall anchors for your wall type',
      'Ensure the rack is mounted securely',
      'Check for electrical wires before drilling',
      'Test the rack with light items first'
    ],
    tips: [
      'Paint to match your entryway decor',
      'Add a shelf above for additional storage',
      'Use decorative hooks for style',
      'Consider adding a mirror or key holder'
    ]
  }
}

export default function QuickBuildPage({ params }: { params: { id: string } }) {
  const project = quickBuilds[params.id as keyof typeof quickBuilds]

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/quick-builds">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Quick Builds
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
          <Badge className="bg-green-100 text-green-800">
            <Target className="w-3 h-3 mr-1" />
            Quick Build
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/quick-builds">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Quick Builds
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto">
              <span className="text-4xl">{project.emoji}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{project.description}</p>
            
            <div className="flex justify-center items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{project.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{project.cost}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-700">{project.rating} ({project.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Favorite
              </Button>
              <Button size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Get Materials
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Materials */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Materials Needed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.materials.map((material, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-700">{material.item}</span>
                        <Badge variant="outline">{material.quantity}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Hammer className="w-5 h-5 mr-2" />
                    Tools Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {project.tools.map((tool, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Hammer className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">{tool}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Step-by-Step Instructions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.steps.map((step) => (
                      <div key={step.step} className="border-l-4 border-blue-500 pl-6">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                            <p className="text-gray-600 mb-3">{step.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {step.time}
                              </div>
                              <div className="flex items-center">
                                <Hammer className="w-4 h-4 mr-1" />
                                {step.tools.join(', ')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty:</span>
                    <Badge className={project.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {project.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{project.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Safety Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {project.safetyNotes.map((note, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{note}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Pro Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {project.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-3">Ready to Build?</h3>
                  <p className="text-blue-100 mb-4 text-sm">
                    Get all the materials and start building today!
                  </p>
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Get Shopping List
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 