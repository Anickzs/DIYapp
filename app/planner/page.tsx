'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Ruler, 
  Hammer, 
  ShoppingCart, 
  Zap, 
  ArrowRight,
  Loader2,
  Sparkles,
  Home,
  Palette,
  Target,
  Wrench,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { generateBuildPlan, filterToolsByAvailability, isToolEssential } from '@/lib/ai'
import { BuildPlan } from '@/types/build-plan'

const formSchema = z.object({
  spaceType: z.enum(['room', 'wall', 'corner', 'balcony', 'garage', 'other']),
  dimensions: z.object({
    width: z.number({ required_error: 'Width is required' }).min(0.1, 'Width must be at least 0.1 feet'),
    length: z.number({ required_error: 'Length is required' }).min(0.1, 'Length must be at least 0.1 feet'),
    height: z.number().min(0.1, 'Height must be at least 0.1 feet').optional(),
  }),
  projectType: z.enum(['shelf', 'desk', 'storage', 'furniture', 'decor', 'other']),
  projectSize: z.enum(['small', 'medium', 'large', 'custom']),
  style: z.enum(['modern', 'rustic', 'scandinavian', 'industrial', 'minimalist', 'traditional']),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  budget: z.enum(['budget', 'moderate', 'premium']),
  materials: z.string().optional(),
  constraints: z.string().optional(),
  availableTools: z.array(z.string()).optional(),
})

type FormData = z.infer<typeof formSchema>

const projectTypes = [
  { value: 'shelf', label: 'Floating Shelf', icon: '📚' },
  { value: 'desk', label: 'Desk/Workstation', icon: '💻' },
  { value: 'storage', label: 'Storage Solution', icon: '🗄️' },
  { value: 'furniture', label: 'Furniture', icon: '🪑' },
  { value: 'decor', label: 'Home Decor', icon: '🎨' },
  { value: 'other', label: 'Other', icon: '🔧' },
]

const projectSizes = {
  shelf: [
    { value: 'small', label: 'Small (2-3 feet)', description: 'Perfect for books or small items' },
    { value: 'medium', label: 'Medium (4-6 feet)', description: 'Great for display or storage' },
    { value: 'large', label: 'Large (8-12 feet)', description: 'Full wall coverage' },
    { value: 'custom', label: 'Custom Size', description: 'Specify your exact dimensions' },
  ],
  desk: [
    { value: 'small', label: 'Small (3-4 feet)', description: 'Compact workspace' },
    { value: 'medium', label: 'Medium (5-6 feet)', description: 'Standard desk size' },
    { value: 'large', label: 'Large (7-8 feet)', description: 'Spacious work area' },
    { value: 'custom', label: 'Custom Size', description: 'Specify your exact dimensions' },
  ],
  storage: [
    { value: 'small', label: 'Small (2-3 feet)', description: 'Compact storage solution' },
    { value: 'medium', label: 'Medium (4-5 feet)', description: 'Standard storage unit' },
    { value: 'large', label: 'Large (6-8 feet)', description: 'Large storage system' },
    { value: 'custom', label: 'Custom Size', description: 'Specify your exact dimensions' },
  ],
  furniture: [
    { value: 'small', label: 'Small (2-3 feet)', description: 'Compact furniture piece' },
    { value: 'medium', label: 'Medium (4-6 feet)', description: 'Standard furniture size' },
    { value: 'large', label: 'Large (7-10 feet)', description: 'Large furniture piece' },
    { value: 'custom', label: 'Custom Size', description: 'Specify your exact dimensions' },
  ],
  decor: [
    { value: 'small', label: 'Small (1-2 feet)', description: 'Small decorative piece' },
    { value: 'medium', label: 'Medium (3-4 feet)', description: 'Medium decorative item' },
    { value: 'large', label: 'Large (5-6 feet)', description: 'Large decorative piece' },
    { value: 'custom', label: 'Custom Size', description: 'Specify your exact dimensions' },
  ],
  other: [
    { value: 'small', label: 'Small (1-3 feet)', description: 'Small custom project' },
    { value: 'medium', label: 'Medium (4-6 feet)', description: 'Medium custom project' },
    { value: 'large', label: 'Large (7-10 feet)', description: 'Large custom project' },
    { value: 'custom', label: 'Custom Size', description: 'Specify your exact dimensions' },
  ],
}

const styles = [
  { value: 'modern', label: 'Modern', description: 'Clean lines, minimal design' },
  { value: 'rustic', label: 'Rustic', description: 'Natural wood, warm tones' },
  { value: 'scandinavian', label: 'Scandinavian', description: 'Light wood, functional design' },
  { value: 'industrial', label: 'Industrial', description: 'Metal accents, exposed hardware' },
  { value: 'minimalist', label: 'Minimalist', description: 'Simple, uncluttered design' },
  { value: 'traditional', label: 'Traditional', description: 'Classic woodworking styles' },
]

const commonTools = [
  // Essential tools
  { name: 'drill', category: 'Essential', essential: true },
  { name: 'measuring tape', category: 'Essential', essential: true },
  { name: 'level', category: 'Essential', essential: true },
  { name: 'pencil', category: 'Essential', essential: true },
  
  // Cutting tools
  { name: 'circular saw', category: 'Cutting', essential: true },
  { name: 'hand saw', category: 'Cutting', essential: false },
  { name: 'jigsaw', category: 'Cutting', essential: false },
  { name: 'table saw', category: 'Cutting', essential: false },
  { name: 'miter saw', category: 'Cutting', essential: false },
  
  // Fastening tools
  { name: 'screwdriver', category: 'Fastening', essential: false },
  { name: 'impact driver', category: 'Fastening', essential: false },
  
  // Sanding tools
  { name: 'sandpaper', category: 'Sanding', essential: false },
  { name: 'orbital sander', category: 'Sanding', essential: false },
  { name: 'belt sander', category: 'Sanding', essential: false },
  
  // Clamping tools
  { name: 'clamps', category: 'Clamping', essential: false },
  { name: 'bar clamps', category: 'Clamping', essential: false },
  { name: 'spring clamps', category: 'Clamping', essential: false },
  
  // Finishing tools
  { name: 'paint brush', category: 'Finishing', essential: false },
  { name: 'foam brush', category: 'Finishing', essential: false },
  
  // Advanced tools
  { name: 'router', category: 'Advanced', essential: false },
  { name: 'chisel', category: 'Advanced', essential: false },
  { name: 'planer', category: 'Advanced', essential: false },
  { name: 'jointer', category: 'Advanced', essential: false },
]

export default function PlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [buildPlan, setBuildPlan] = useState<BuildPlan | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [availableTools, setAvailableTools] = useState<string[]>([])
  const [toolFilterResults, setToolFilterResults] = useState<{
    available: string[]
    missing: string[]
    alternatives: Array<{required: string, alternative: string}>
  } | null>(null)
  const [useMetric, setUseMetric] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spaceType: 'room',
      dimensions: { width: undefined, length: undefined },
      projectType: 'shelf',
      projectSize: 'medium',
      style: 'modern',
      skillLevel: 'beginner',
      budget: 'moderate',
      availableTools: [],
    },
  })

  const watchProjectType = form.watch('projectType')
  const watchProjectSize = form.watch('projectSize')

  const onSubmit = async (data: FormData) => {
    setIsGenerating(true)
    try {
      // Set default height if not provided
      const dimensionsWithDefault = {
        ...data.dimensions,
        height: data.dimensions.height ?? 8 // Default to 8 feet if height is not provided
      }
      
      const plan = await generateBuildPlan({
        ...data,
        dimensions: dimensionsWithDefault,
        availableTools: availableTools
      })
      setBuildPlan(plan)
      
      // Filter tools based on availability
      const filterResults = filterToolsByAvailability(plan.tools, availableTools)
      setToolFilterResults(filterResults)
      
      setCurrentStep(3)
    } catch (error) {
      console.error('Error generating build plan:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const nextStep = async () => {
    if (currentStep === 1) {
      // Validate form before proceeding to step 2
      const isValid = await form.trigger(['dimensions.width', 'dimensions.length'])
      if (isValid) {
        setCurrentStep(currentStep + 1)
      }
    } else if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDimensionChange = (field: 'width' | 'length' | 'height', value: string) => {
    // Allow empty string
    if (value === '' || value === null || value === undefined) {
      form.setValue(`dimensions.${field}`, undefined)
      return
    }

    // Validate input format
    if (!validateFeetInput(value)) {
      return // Don't update if invalid format
    }

    // Parse the value
    const numValue = parseFeetString(value)
    if (numValue !== undefined && numValue >= 0) {
      form.setValue(`dimensions.${field}`, numValue)
    }
  }

  const handleToolToggle = (toolName: string) => {
    setAvailableTools(prev => 
      prev.includes(toolName) 
        ? prev.filter(t => t !== toolName)
        : [...prev, toolName]
    )
  }

  const getToolsByCategory = () => {
    const categories = Array.from(new Set(commonTools.map(tool => tool.category)))
    return categories.map(category => ({
      category,
      tools: commonTools.filter(tool => tool.category === category)
    }))
  }

  // Unit conversion helpers
  const feetToCm = (feet: number): number => feet * 30.48
  const cmToFeet = (cm: number): number => cm / 30.48

  // Input validation for feet measurements (allows decimals, fractions like 1/2, 1/4, etc.)
  const validateFeetInput = (value: string): boolean => {
    // Allow empty string
    if (value === '') return true
    
    // Pattern for feet measurements: numbers, decimals, fractions like 1/2, 1/4, 3/4, etc.
    const feetPattern = /^(\d+(\.\d+)?|\d+\/\d+|\d+\s+\d+\/\d+)$/
    return feetPattern.test(value)
  }

  // Convert feet string to number (handles fractions)
  const parseFeetString = (value: string): number | undefined => {
    if (value === '') return undefined
    
    // Handle mixed numbers like "5 1/2"
    const mixedMatch = value.match(/^(\d+)\s+(\d+)\/(\d+)$/)
    if (mixedMatch) {
      const whole = parseInt(mixedMatch[1])
      const numerator = parseInt(mixedMatch[2])
      const denominator = parseInt(mixedMatch[3])
      return whole + (numerator / denominator)
    }
    
    // Handle fractions like "1/2"
    const fractionMatch = value.match(/^(\d+)\/(\d+)$/)
    if (fractionMatch) {
      const numerator = parseInt(fractionMatch[1])
      const denominator = parseInt(fractionMatch[2])
      return numerator / denominator
    }
    
    // Handle decimal numbers
    const num = parseFloat(value)
    return isNaN(num) ? undefined : num
  }

  // Format number for display based on unit
  const formatDimension = (value: number | undefined, unit: 'feet' | 'cm'): string => {
    if (value === undefined) return ''
    
    if (unit === 'cm') {
      return Math.round(value).toString()
    } else {
      // For feet, try to format as mixed number if it's a common fraction
      const whole = Math.floor(value)
      const fraction = value - whole
      
      // Common fractions
      const fractions: { [key: number]: string } = {
        0.25: '1/4',
        0.5: '1/2',
        0.75: '3/4',
        0.125: '1/8',
        0.375: '3/8',
        0.625: '5/8',
        0.875: '7/8'
      }
      
      if (fraction === 0) {
        return whole.toString()
      } else if (fractions[fraction]) {
        return whole === 0 ? fractions[fraction] : `${whole} ${fractions[fraction]}`
      } else {
        return value.toFixed(2)
      }
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
            Smart Planning
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-8 text-sm">
            <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Space & Requirements
            </span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Project Details
            </span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Your Build Plan
            </span>
          </div>
        </div>

        {/* Step 1: Space & Requirements */}
        {currentStep === 1 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Home className="w-6 h-6 mr-2 text-blue-600" />
                Tell Us About Your Space
              </CardTitle>
              <CardDescription>
                Input your space dimensions and basic requirements to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="spaceType">Space Type</Label>
                <Select onValueChange={(value) => form.setValue('spaceType', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select space type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="wall">Wall</SelectItem>
                    <SelectItem value="corner">Corner</SelectItem>
                    <SelectItem value="balcony">Balcony</SelectItem>
                    <SelectItem value="garage">Garage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between mb-4">
                <Label className="text-base font-medium">Dimensions</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setUseMetric(!useMetric)}
                  className="text-xs"
                >
                  {useMetric ? 'Switch to Feet' : 'Switch to CM'}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width ({useMetric ? 'cm' : 'feet'}) *</Label>
                  <Input
                    id="width"
                    type="text"
                    placeholder={useMetric ? "Enter width in cm" : "e.g., 8.5 or 8 1/2"}
                    value={formatDimension(form.watch('dimensions.width'), useMetric ? 'cm' : 'feet')}
                    onChange={(e) => {
                      if (useMetric) {
                        // For metric, convert cm to feet for storage
                        const cmValue = parseFloat(e.target.value)
                        if (!isNaN(cmValue) && cmValue >= 0) {
                          form.setValue('dimensions.width', cmToFeet(cmValue))
                        } else if (e.target.value === '') {
                          form.setValue('dimensions.width', undefined)
                        }
                      } else {
                        handleDimensionChange('width', e.target.value)
                      }
                    }}
                  />
                  {form.formState.errors.dimensions?.width && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.dimensions.width.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="length">Length ({useMetric ? 'cm' : 'feet'}) *</Label>
                  <Input
                    id="length"
                    type="text"
                    placeholder={useMetric ? "Enter length in cm" : "e.g., 12.0 or 12"}
                    value={formatDimension(form.watch('dimensions.length'), useMetric ? 'cm' : 'feet')}
                    onChange={(e) => {
                      if (useMetric) {
                        // For metric, convert cm to feet for storage
                        const cmValue = parseFloat(e.target.value)
                        if (!isNaN(cmValue) && cmValue >= 0) {
                          form.setValue('dimensions.length', cmToFeet(cmValue))
                        } else if (e.target.value === '') {
                          form.setValue('dimensions.length', undefined)
                        }
                      } else {
                        handleDimensionChange('length', e.target.value)
                      }
                    }}
                  />
                  {form.formState.errors.dimensions?.length && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.dimensions.length.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="height">Height ({useMetric ? 'cm' : 'feet'}) - Optional</Label>
                <Input
                  id="height"
                  type="text"
                  placeholder={useMetric ? "Enter height in cm" : "e.g., 8.0 or 8 (leave blank for default)"}
                  value={formatDimension(form.watch('dimensions.height'), useMetric ? 'cm' : 'feet')}
                  onChange={(e) => {
                    if (useMetric) {
                      // For metric, convert cm to feet for storage
                      const cmValue = parseFloat(e.target.value)
                      if (!isNaN(cmValue) && cmValue >= 0) {
                        form.setValue('dimensions.height', cmToFeet(cmValue))
                      } else if (e.target.value === '') {
                        form.setValue('dimensions.height', undefined)
                      }
                    } else {
                      handleDimensionChange('height', e.target.value)
                    }
                  }}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Leave blank to use a default height of {useMetric ? '244 cm' : '8 feet'}
                </p>
                {form.formState.errors.dimensions?.height && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.dimensions.height.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="constraints">Special Constraints (Optional)</Label>
                <Textarea
                  id="constraints"
                  placeholder="e.g., Must be wall-mounted, budget under $100, no power tools available..."
                  {...form.register('constraints')}
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={nextStep} 
                  disabled={!form.watch('dimensions.width') || !form.watch('dimensions.length')}
                >
                  Next Step
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              {form.formState.errors.dimensions && (
                <div className="text-center">
                  <p className="text-sm text-red-600">
                    Please enter both width and length dimensions to continue
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-6 h-6 mr-2 text-green-600" />
                Choose Your Project
              </CardTitle>
              <CardDescription>
                Select your project type, size, and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="projectType">Project Type</Label>
                <Select onValueChange={(value) => {
                  form.setValue('projectType', value as any)
                  form.setValue('projectSize', 'medium') // Reset size when project type changes
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <span className="mr-2">{type.icon}</span>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="projectSize">Project Size</Label>
                <Select onValueChange={(value) => form.setValue('projectSize', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project size" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectSizes[watchProjectType]?.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        <div>
                          <div className="font-medium">{size.label}</div>
                          <div className="text-sm text-gray-500">{size.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="style">Style Preference</Label>
                <Select onValueChange={(value) => form.setValue('style', value as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        <div>
                          <div className="font-medium">{style.label}</div>
                          <div className="text-sm text-gray-500">{style.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="skillLevel">Skill Level</Label>
                  <Select onValueChange={(value) => form.setValue('skillLevel', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select onValueChange={(value) => form.setValue('budget', value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Budget ($20-50)</SelectItem>
                      <SelectItem value="moderate">Moderate ($50-150)</SelectItem>
                      <SelectItem value="premium">Premium ($150+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="materials">Available Materials (Optional)</Label>
                <Textarea
                  id="materials"
                  placeholder="e.g., 2x4s, plywood, screws, paint..."
                  {...form.register('materials')}
                />
              </div>

              {/* Tool Selection */}
              <div>
                <Label className="flex items-center">
                  <Wrench className="w-4 h-4 mr-2" />
                  Available Tools
                </Label>
                <p className="text-sm text-gray-600 mb-4">
                  Select the tools you have available. We'll suggest alternatives for missing tools.
                </p>
                <div className="space-y-4 max-h-64 overflow-y-auto border rounded-lg p-4">
                  {getToolsByCategory().map((category) => (
                    <div key={category.category}>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">{category.category}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {category.tools.map((tool) => (
                          <div key={tool.name} className="flex items-center space-x-2">
                            <Checkbox
                              id={tool.name}
                              checked={availableTools.includes(tool.name)}
                              onCheckedChange={() => handleToolToggle(tool.name)}
                            />
                            <Label htmlFor={tool.name} className="text-sm flex items-center">
                              {tool.name}
                              {tool.essential && (
                                <Badge variant="outline" className="ml-1 text-xs">
                                  Essential
                                </Badge>
                              )}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={prevStep}>
                  Previous Step
                </Button>
                <Button onClick={form.handleSubmit(onSubmit)} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      Generate Build Plan
                      <Zap className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Build Plan Results */}
        {currentStep === 3 && buildPlan && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                  Your Custom Build Plan
                </CardTitle>
                <CardDescription>
                  Here's your personalized build plan based on your requirements.
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
                          <span className="font-medium">{buildPlan.estimatedTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Cost:</span>
                          <span className="font-medium">${buildPlan.estimatedCost}</span>
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
                            <div>
                              <span>{material.item}</span>
                              {material.store && (
                                <span className="text-gray-500 text-xs block">{material.store}</span>
                              )}
                            </div>
                            <div className="text-right">
                              <span className="font-medium">{material.quantity}</span>
                              {material.price && (
                                <span className="text-gray-600 block">${material.price}</span>
                              )}
                              {material.affiliateLink && (
                                <a 
                                  href={material.affiliateLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 text-xs block"
                                >
                                  Buy on Amazon →
                                </a>
                              )}
                            </div>
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

                {/* Tool Availability Analysis */}
                {toolFilterResults && (
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Wrench className="w-5 h-5 mr-2" />
                      Tool Availability Analysis
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Available Tools ({toolFilterResults.available.length})
                        </h4>
                        <div className="space-y-1">
                          {toolFilterResults.available.map((tool, index) => (
                            <div key={index} className="text-sm text-green-700">✓ {tool}</div>
                          ))}
                        </div>
                      </div>

                      {toolFilterResults.alternatives.length > 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Tool Alternatives ({toolFilterResults.alternatives.length})
                          </h4>
                          <div className="space-y-1">
                            {toolFilterResults.alternatives.map((alt, index) => (
                              <div key={index} className="text-sm text-yellow-700">
                                {alt.required} → {alt.alternative}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {toolFilterResults.missing.length > 0 && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <h4 className="font-medium text-red-800 mb-2 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Missing Tools ({toolFilterResults.missing.length})
                          </h4>
                          <div className="space-y-1">
                            {toolFilterResults.missing.map((tool, index) => (
                              <div key={index} className="text-sm text-red-700">
                                ✗ {tool}
                                {isToolEssential(tool) && (
                                  <Badge variant="outline" className="ml-1 text-xs">
                                    Essential
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

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
                              <div className="text-sm text-gray-600">
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

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
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

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Start Over
                  </Button>
                  <div className="space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const materialsWithLinks = buildPlan.materials.filter(m => m.affiliateLink)
                        materialsWithLinks.forEach((material, index) => {
                          setTimeout(() => {
                            window.open(material.affiliateLink, '_blank')
                          }, index * 500) // Open links with 500ms delay
                        })
                      }}
                    >
                      <ShoppingCart className="mr-2 w-4 h-4" />
                      Get Shopping List
                    </Button>
                    <Button>
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
} 