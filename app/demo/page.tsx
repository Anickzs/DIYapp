'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Hammer, 
  ShoppingCart, 
  Zap, 
  ArrowRight,
  Loader2,
  Sparkles,
  Home,
  Target,
  Clock,
  DollarSign
} from 'lucide-react'
import { generateBuildPlan } from '@/lib/ai'
import { BuildPlan } from '@/types/build-plan'

export default function DemoPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [buildPlan, setBuildPlan] = useState<BuildPlan | null>(null)

  const generateDemoPlan = async () => {
    setIsGenerating(true)
    try {
      const plan = await generateBuildPlan({
        spaceType: 'room',
        dimensions: { width: 8, length: 10, height: 8 },
        projectType: 'shelf',
        style: 'modern',
        skillLevel: 'beginner',
        budget: 'moderate',
        materials: '2x4s, plywood, screws',
        constraints: 'Must be wall-mounted, budget under $100'
      })
      setBuildPlan(plan)
    } catch (error) {
      console.error('Error generating demo plan:', error)
    } finally {
      setIsGenerating(false)
    }
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
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Sparkles className="w-3 h-3 mr-1" />
            Demo Mode
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Demo Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              See At Home DIY in Action
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Watch how our system generates a custom build plan for a modern floating shelf
            </p>
            
            <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
              <h3 className="text-lg font-semibold mb-4">Demo Parameters:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Space:</span>
                    <span className="font-medium">8' x 10' room</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project:</span>
                    <span className="font-medium">Modern Floating Shelf</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Skill Level:</span>
                    <span className="font-medium">Beginner</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget:</span>
                    <span className="font-medium">Moderate ($50-150)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Materials:</span>
                    <span className="font-medium">2x4s, plywood, screws</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Constraint:</span>
                    <span className="font-medium">Wall-mounted, under $100</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              onClick={generateDemoPlan} 
              disabled={isGenerating}
              className="text-lg px-8 py-6"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                  Generating Build Plan...
                </>
              ) : (
                <>
                  Generate Demo Plan
                  <Zap className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </div>

          {/* Generated Plan */}
          {buildPlan && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                  Your Generated Build Plan
                </CardTitle>
                <CardDescription>
                  Here's your personalized build plan based on the demo parameters.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Target className="w-4 h-4 mr-2" />
                        Project Overview
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Project:</span>
                          <span className="font-medium">{buildPlan.projectName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Difficulty:</span>
                          <Badge className={buildPlan.difficulty === 'beginner' ? 'bg-green-100 text-green-800' : 
                                           buildPlan.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' : 
                                           'bg-red-100 text-red-800'}>
                            {buildPlan.difficulty}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Time:</span>
                          <span className="font-medium flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {buildPlan.estimatedTime}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Cost:</span>
                          <span className="font-medium flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            ${buildPlan.estimatedCost}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Materials Needed
                      </h3>
                      <div className="space-y-2">
                        {buildPlan.materials.map((material, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{material.item}</span>
                            <span className="font-medium">{material.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center">
                        <Hammer className="w-4 h-4 mr-2" />
                        Tools Required
                      </h3>
                      <div className="space-y-2">
                        {buildPlan.tools.map((tool, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Hammer className="w-3 h-3 mr-2 text-gray-500" />
                            <span>{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Step-by-Step Instructions
                  </h3>
                  <div className="space-y-4">
                    {buildPlan.steps.map((step, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium mb-1">{step.description}</p>
                            {step.tools && step.tools.length > 0 && (
                              <div className="flex items-center text-sm text-gray-600 mb-1">
                                <Hammer className="w-3 h-3 mr-1" />
                                Tools: {step.tools.join(', ')}
                              </div>
                            )}
                            {step.timeEstimate && (
                              <div className="text-sm text-gray-600 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                Time: {step.timeEstimate}
                              </div>
                            )}
                            {step.safetyWarnings && step.safetyWarnings.length > 0 && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                                <div className="font-medium mb-1">⚠️ Safety Warnings:</div>
                                <ul className="list-disc list-inside space-y-1">
                                  {step.safetyWarnings.map((warning, warningIndex) => (
                                    <li key={warningIndex}>{warning}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Safety Notes:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {buildPlan.safetyNotes.map((note, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex space-x-4">
                  <Button variant="outline" onClick={() => setBuildPlan(null)}>
                    Generate Another Plan
                  </Button>
                  <Button>
                    <ShoppingCart className="mr-2 w-4 h-4" />
                    Get Shopping List
                  </Button>
                  <Button>
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Build Plan?
            </h2>
            <p className="text-gray-600 mb-6">
              Try the full planner with your own space and requirements
            </p>
            <Button size="lg" asChild>
              <a href="/planner">
                Start Your Build Plan
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 