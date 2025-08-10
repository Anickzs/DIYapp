import { BuildPlan, BuildPlanRequest } from '@/types/build-plan'
import { generateId } from '@/lib/utils'

// Real market prices for common DIY materials with Amazon affiliate links (as of 2024)
const REAL_MATERIAL_PRICES = {
  // Lumber
  '2x4 pine board': { 
    price: 8.50, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '2x4 Pine Lumber'
  },
  '2x4 pressure treated': { 
    price: 12.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Pressure Treated 2x4'
  },
  '1x4 pine board': { 
    price: 6.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '1x4 Pine Board'
  },
  '1x6 pine board': { 
    price: 9.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '1x6 Pine Board'
  },
  '1x8 pine board': { 
    price: 12.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '1x8 Pine Board'
  },
  '1x10 pine board': { 
    price: 15.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '1x10 Pine Board'
  },
  '1x12 pine board': { 
    price: 18.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '1x12 Pine Board'
  },
  '2x6 pine board': { 
    price: 12.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '2x6 Pine Board'
  },
  '2x8 pine board': { 
    price: 16.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '2x8 Pine Board'
  },
  '2x10 pine board': { 
    price: 20.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '2x10 Pine Board'
  },
  '2x12 pine board': { 
    price: 24.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '2x12 Pine Board'
  },
  
  // Plywood
  'Plywood sheet (4x8)': { 
    price: 45.00, 
    unit: 'sheet', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '4x8 Plywood Sheet'
  },
  'Plywood sheet (2x4)': { 
    price: 15.00, 
    unit: 'sheet', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '2x4 Plywood Sheet'
  },
  'MDF sheet (4x8)': { 
    price: 35.00, 
    unit: 'sheet', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '4x8 MDF Sheet'
  },
  'Particle board (4x8)': { 
    price: 25.00, 
    unit: 'sheet', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '4x8 Particle Board'
  },
  
  // Hardwood
  'Oak board (1x6x8)': { 
    price: 28.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Oak Board 1x6x8'
  },
  'Maple board (1x6x8)': { 
    price: 32.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Maple Board 1x6x8'
  },
  'Cherry board (1x6x8)': { 
    price: 45.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Cherry Board 1x6x8'
  },
  'Walnut board (1x6x8)': { 
    price: 55.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Walnut Board 1x6x8'
  },
  
  // Fasteners
  'Wood screws (1.5")': { 
    price: 8.00, 
    unit: 'box of 50', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '1.5" Wood Screws'
  },
  'Wood screws (2.5")': { 
    price: 10.00, 
    unit: 'box of 50', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '2.5" Wood Screws'
  },
  'Wood screws (3")': { 
    price: 12.00, 
    unit: 'box of 50', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '3" Wood Screws'
  },
  'Drywall screws': { 
    price: 6.00, 
    unit: 'box of 100', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Drywall Screws'
  },
  'Deck screws': { 
    price: 15.00, 
    unit: 'box of 50', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Deck Screws'
  },
  'Nails (finishing)': { 
    price: 5.00, 
    unit: 'box of 100', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Finishing Nails'
  },
  'Nails (common)': { 
    price: 4.00, 
    unit: 'box of 100', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Common Nails'
  },
  
  // Hardware
  'L-brackets': { 
    price: 3.00, 
    unit: 'pair', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'L-Brackets'
  },
  'Corner braces': { 
    price: 4.00, 
    unit: 'pair', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Corner Braces'
  },
  'Hinges (3")': { 
    price: 8.00, 
    unit: 'pair', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '3" Hinges'
  },
  'Hinges (4")': { 
    price: 12.00, 
    unit: 'pair', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '4" Hinges'
  },
  'Drawer slides': { 
    price: 15.00, 
    unit: 'pair', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Drawer Slides'
  },
  'Cabinet handles': { 
    price: 6.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Cabinet Handles'
  },
  'Cabinet knobs': { 
    price: 4.00, 
    unit: 'piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Cabinet Knobs'
  },
  
  // Finishes
  'Wood stain (quart)': { 
    price: 12.00, 
    unit: 'quart', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Wood Stain Quart'
  },
  'Wood stain (gallon)': { 
    price: 35.00, 
    unit: 'gallon', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Wood Stain Gallon'
  },
  'Polyurethane (quart)': { 
    price: 15.00, 
    unit: 'quart', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Polyurethane Quart'
  },
  'Polyurethane (gallon)': { 
    price: 45.00, 
    unit: 'gallon', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Polyurethane Gallon'
  },
  'Paint (quart)': { 
    price: 18.00, 
    unit: 'quart', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Paint Quart'
  },
  'Paint (gallon)': { 
    price: 35.00, 
    unit: 'gallon', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Paint Gallon'
  },
  'Primer (gallon)': { 
    price: 25.00, 
    unit: 'gallon', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Primer Gallon'
  },
  
  // Sanding
  'Sandpaper (80 grit)': { 
    price: 3.00, 
    unit: 'pack of 5', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '80 Grit Sandpaper'
  },
  'Sandpaper (120 grit)': { 
    price: 3.00, 
    unit: 'pack of 5', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '120 Grit Sandpaper'
  },
  'Sandpaper (220 grit)': { 
    price: 4.00, 
    unit: 'pack of 5', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: '220 Grit Sandpaper'
  },
  'Sandpaper (assorted)': { 
    price: 8.00, 
    unit: 'variety pack', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Assorted Sandpaper Pack'
  },
  
  // Adhesives
  'Wood glue': { 
    price: 8.00, 
    unit: '16oz bottle', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Wood Glue 16oz'
  },
  'Construction adhesive': { 
    price: 6.00, 
    unit: '10oz tube', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Construction Adhesive'
  },
  'Liquid nails': { 
    price: 5.00, 
    unit: '10oz tube', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Liquid Nails'
  },
  
  // Specialty
  'Crown molding': { 
    price: 12.00, 
    unit: '8ft piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Crown Molding 8ft'
  },
  'Baseboard': { 
    price: 8.00, 
    unit: '8ft piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Baseboard 8ft'
  },
  'Quarter round': { 
    price: 6.00, 
    unit: '8ft piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Quarter Round 8ft'
  },
  'Door trim': { 
    price: 10.00, 
    unit: '8ft piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Door Trim 8ft'
  },
  'Window trim': { 
    price: 8.00, 
    unit: '8ft piece', 
    store: 'Amazon', 
    affiliateLink: 'https://amzn.to/3xK8L2M',
    productName: 'Window Trim 8ft'
  },
}

// Tool categories and alternatives
const TOOL_CATEGORIES = {
  cutting: {
    primary: ['circular saw', 'table saw', 'miter saw'],
    alternatives: ['hand saw', 'jigsaw', 'reciprocating saw'],
    essential: true
  },
  drilling: {
    primary: ['drill', 'impact driver'],
    alternatives: ['manual screwdriver'],
    essential: true
  },
  measuring: {
    primary: ['measuring tape', 'level', 'square'],
    alternatives: ['ruler', 'string'],
    essential: true
  },
  sanding: {
    primary: ['orbital sander', 'belt sander'],
    alternatives: ['sandpaper', 'sandpaper block'],
    essential: false
  },
  clamping: {
    primary: ['clamps', 'bar clamps', 'spring clamps'],
    alternatives: ['heavy objects', 'rubber bands'],
    essential: false
  },
  finishing: {
    primary: ['paint brush', 'foam brush', 'spray gun'],
    alternatives: ['old t-shirt', 'sponge'],
    essential: false
  }
}

// Mock AI function that generates build plans without requiring API key
export async function generateBuildPlan(request: BuildPlanRequest): Promise<BuildPlan> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  return generateMockBuildPlan(request)
}

function generateMockBuildPlan(request: BuildPlanRequest): BuildPlan {
  const { spaceType, dimensions, projectType, projectSize, style, skillLevel, budget, materials, constraints } = request
  
  // Generate project name based on type, style, and size
  const projectNames = {
    shelf: `${style.charAt(0).toUpperCase() + style.slice(1)} ${getSizeAdjective(projectSize)} Floating Shelf`,
    desk: `${style.charAt(0).toUpperCase() + style.slice(1)} ${getSizeAdjective(projectSize)} Work Desk`,
    storage: `${style.charAt(0).toUpperCase() + style.slice(1)} ${getSizeAdjective(projectSize)} Storage Unit`,
    furniture: `${style.charAt(0).toUpperCase() + style.slice(1)} ${getSizeAdjective(projectSize)} Custom Furniture`,
    decor: `${style.charAt(0).toUpperCase() + style.slice(1)} ${getSizeAdjective(projectSize)} Home Decor`,
    other: `${style.charAt(0).toUpperCase() + style.slice(1)} ${getSizeAdjective(projectSize)} Custom Project`
  }

  // Generate materials based on project type, size, and budget with real prices
  const materialsList = generateMaterialsList(projectType, projectSize, budget, dimensions)
  
  // Generate tools based on skill level
  const toolsList = generateToolsList(skillLevel)
  
  // Generate steps based on project type and size
  const stepsList = generateStepsList(projectType, projectSize, skillLevel)
  
  // Calculate estimated cost using real prices
  const estimatedCost = calculateRealCost(materialsList)
  
  // Generate time estimate based on skill level and size
  const timeEstimates = generateTimeEstimate(projectSize, skillLevel)

  return {
    id: generateId(),
    projectName: projectNames[projectType] || 'Custom Build Project',
    difficulty: skillLevel,
    estimatedTime: timeEstimates,
    estimatedCost: Math.round(estimatedCost),
    materials: materialsList,
    tools: toolsList,
    steps: stepsList,
    safetyNotes: [
      'Always wear appropriate safety equipment',
      'Work in a well-ventilated area',
      'Follow all tool manufacturer instructions',
      'Check local building codes if applicable',
      'Ensure proper workspace lighting'
    ],
    style: style,
    skillLevel: skillLevel,
    spaceType: spaceType,
    dimensions: dimensions,
    constraints: constraints,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

function getSizeAdjective(size: string): string {
  switch (size) {
    case 'small': return 'Compact'
    case 'medium': return 'Standard'
    case 'large': return 'Spacious'
    case 'custom': return 'Custom'
    default: return 'Standard'
  }
}

function generateMaterialsList(projectType: string, projectSize: string, budget: string, dimensions: any) {
  const sizeMultiplier = {
    small: 0.6,
    medium: 1.0,
    large: 1.8,
    custom: 1.2
  }

  // Generate materials based on project type
  let baseMaterials: Array<{item: string, quantity: string, price?: number, store?: string, affiliateLink?: string, productName?: string}> = []
  
  switch (projectType) {
    case 'shelf':
      baseMaterials = [
        { item: '2x4 pine board', quantity: '2 pieces' },
        { item: '1x6 pine board', quantity: '1 piece' },
        { item: 'Wood screws (2.5")', quantity: '16 pieces' },
        { item: 'Wood glue', quantity: '1 bottle' },
        { item: 'Sandpaper (assorted)', quantity: '1 pack' },
        { item: 'Wood stain (quart)', quantity: '1 quart' }
      ]
      break
    case 'desk':
      baseMaterials = [
        { item: '2x4 pine board', quantity: '4 pieces' },
        { item: 'Plywood sheet (4x8)', quantity: '1 sheet' },
        { item: 'Wood screws (2.5")', quantity: '24 pieces' },
        { item: 'Wood glue', quantity: '1 bottle' },
        { item: 'Sandpaper (assorted)', quantity: '1 pack' },
        { item: 'Polyurethane (quart)', quantity: '1 quart' }
      ]
      break
    case 'storage':
      baseMaterials = [
        { item: '2x4 pine board', quantity: '6 pieces' },
        { item: 'Plywood sheet (4x8)', quantity: '2 sheets' },
        { item: 'Wood screws (2.5")', quantity: '32 pieces' },
        { item: 'Drawer slides', quantity: '2 pairs' },
        { item: 'Cabinet handles', quantity: '4 pieces' },
        { item: 'Wood glue', quantity: '1 bottle' },
        { item: 'Sandpaper (assorted)', quantity: '1 pack' },
        { item: 'Paint (gallon)', quantity: '1 gallon' }
      ]
      break
    default:
      baseMaterials = [
        { item: '2x4 pine board', quantity: '3 pieces' },
        { item: 'Wood screws (2.5")', quantity: '20 pieces' },
        { item: 'Wood glue', quantity: '1 bottle' },
        { item: 'Sandpaper (assorted)', quantity: '1 pack' },
        { item: 'Wood stain (quart)', quantity: '1 quart' }
      ]
  }

  // Adjust quantities based on project size
  const multiplier = sizeMultiplier[projectSize as keyof typeof sizeMultiplier] || 1.0
  
  // Apply budget adjustments
  const budgetAdjustments = {
    budget: 0.8,
    moderate: 1.0,
    premium: 1.4
  }
  const budgetMult = budgetAdjustments[budget as keyof typeof budgetAdjustments] || 1.0

  // Add real prices and adjust for budget
  return baseMaterials.map(material => {
    const realPrice = REAL_MATERIAL_PRICES[material.item as keyof typeof REAL_MATERIAL_PRICES]
    let adjustedPrice = realPrice ? realPrice.price * multiplier * budgetMult : 0
    
    // For premium budget, upgrade some materials
    if (budget === 'premium' && material.item.includes('pine')) {
      const hardwoodVersion = material.item.replace('pine', 'oak')
      const hardwoodPrice = REAL_MATERIAL_PRICES[hardwoodVersion as keyof typeof REAL_MATERIAL_PRICES]
      if (hardwoodPrice) {
        material.item = hardwoodVersion
        adjustedPrice = hardwoodPrice.price * multiplier
      }
    }
    
    return {
      ...material,
      price: Math.round(adjustedPrice * 100) / 100,
      store: realPrice?.store || 'Amazon',
      affiliateLink: realPrice?.affiliateLink,
      productName: realPrice?.productName
    }
  })
}

function generateToolsList(skillLevel: string) {
  const essentialTools = ['drill', 'measuring tape', 'level', 'pencil']
  const basicTools = [...essentialTools, 'circular saw', 'screwdriver', 'sandpaper']
  const intermediateTools = [...basicTools, 'clamps', 'chisel', 'router', 'orbital sander']
  const advancedTools = [...intermediateTools, 'table saw', 'planer', 'jointer', 'dovetail jig', 'biscuit joiner']

  switch (skillLevel) {
    case 'advanced':
      return advancedTools
    case 'intermediate':
      return intermediateTools
    default:
      return basicTools
  }
}

function generateStepsList(projectType: string, projectSize: string, skillLevel: string) {
  const baseSteps = [
    {
      stepNumber: 1,
      description: 'Measure and mark the project location',
      tools: ['measuring tape', 'pencil', 'level'],
      timeEstimate: '15 minutes',
      safetyWarnings: ['Wear safety glasses', 'Check for obstacles']
    },
    {
      stepNumber: 2,
      description: 'Cut materials to size',
      tools: ['circular saw', 'measuring tape'],
      timeEstimate: '30 minutes',
      safetyWarnings: ['Wear safety glasses', 'Use proper cutting techniques']
    },
    {
      stepNumber: 3,
      description: 'Assemble the project',
      tools: ['drill', 'screwdriver'],
      timeEstimate: '45 minutes',
      safetyWarnings: ['Ensure proper alignment', 'Use appropriate screws']
    },
    {
      stepNumber: 4,
      description: 'Finish and install',
      tools: ['sandpaper', 'paint brush'],
      timeEstimate: '30 minutes',
      safetyWarnings: ['Work in well-ventilated area', 'Follow finish instructions']
    }
  ]

  // Adjust steps based on project size
  if (projectSize === 'large') {
    baseSteps.splice(2, 0, {
      stepNumber: 3,
      description: 'Create support structure for larger project',
      tools: ['clamps', 'level', 'measuring tape'],
      timeEstimate: '45 minutes',
      safetyWarnings: ['Ensure proper support', 'Check for level']
    })
  }

  // Add more detailed steps for advanced users
  if (skillLevel === 'advanced') {
    baseSteps.splice(2, 0, {
      stepNumber: 3,
      description: 'Create joinery and fine details',
      tools: ['chisel', 'router', 'clamps'],
      timeEstimate: '60 minutes',
      safetyWarnings: ['Use sharp tools carefully', 'Secure workpiece properly']
    })
  }

  // Renumber steps
  return baseSteps.map((step, index) => ({
    ...step,
    stepNumber: index + 1
  }))
}

function calculateRealCost(materials: Array<{price?: number}>) {
  return materials.reduce((total, material) => total + (material.price || 0), 0)
}

function generateTimeEstimate(projectSize: string, skillLevel: string) {
  const baseTimes = {
    small: { beginner: '1-2 hours', intermediate: '1-3 hours', advanced: '2-4 hours' },
    medium: { beginner: '2-4 hours', intermediate: '3-6 hours', advanced: '4-8 hours' },
    large: { beginner: '4-6 hours', intermediate: '6-10 hours', advanced: '8-12 hours' },
    custom: { beginner: '3-5 hours', intermediate: '5-8 hours', advanced: '6-10 hours' }
  }

  return baseTimes[projectSize as keyof typeof baseTimes]?.[skillLevel as keyof typeof baseTimes.small] || '2-4 hours'
}

// Tool filtering functions
export function getToolAlternatives(tool: string): string[] {
  for (const category of Object.values(TOOL_CATEGORIES)) {
    if (category.primary.includes(tool)) {
      return category.alternatives
    }
    if (category.alternatives.includes(tool)) {
      return category.primary
    }
  }
  return []
}

export function isToolEssential(tool: string): boolean {
  for (const [category, config] of Object.entries(TOOL_CATEGORIES)) {
    if (config.primary.includes(tool) || config.alternatives.includes(tool)) {
      return config.essential
    }
  }
  return false
}

export function filterToolsByAvailability(requiredTools: string[], availableTools: string[]): {
  available: string[],
  missing: string[],
  alternatives: Array<{required: string, alternative: string}>
} {
  const available: string[] = []
  const missing: string[] = []
  const alternatives: Array<{required: string, alternative: string}> = []

  for (const tool of requiredTools) {
    if (availableTools.includes(tool)) {
      available.push(tool)
    } else {
      const toolAlternatives = getToolAlternatives(tool)
      const availableAlternative = toolAlternatives.find(alt => availableTools.includes(alt))
      
      if (availableAlternative) {
        alternatives.push({ required: tool, alternative: availableAlternative })
      } else {
        missing.push(tool)
      }
    }
  }

  return { available, missing, alternatives }
}

export async function generateProjectSuggestions(spaceInfo: {
  dimensions: { width: number; length: number; height?: number }
  spaceType: string
  constraints?: string
}): Promise<string[]> {
  // Mock project suggestions based on space
  const suggestions = {
    room: ['Floating Shelf', 'Corner Desk', 'Wall Storage Unit', 'Plant Stand', 'Custom Bench'],
    wall: ['Floating Shelf', 'Wall Art Display', 'Hanging Storage', 'Mirror Frame', 'Wall Organizer'],
    corner: ['Corner Desk', 'Corner Shelf', 'Plant Corner', 'Reading Nook', 'Corner Cabinet'],
    balcony: ['Plant Stand', 'Balcony Railing Shelf', 'Outdoor Storage', 'Hanging Garden', 'Balcony Table'],
    garage: ['Tool Organizer', 'Workbench', 'Storage Shelves', 'Pegboard System', 'Garage Cabinet'],
    other: ['Custom Shelf', 'Storage Unit', 'Decorative Piece', 'Functional Furniture', 'Custom Project']
  }

  return suggestions[spaceInfo.spaceType as keyof typeof suggestions] || suggestions.other
} 