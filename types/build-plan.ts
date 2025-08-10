export interface Material {
  item: string
  quantity: string
  price?: number
  store?: string
  affiliateLink?: string
  productName?: string
}

export interface BuildStep {
  stepNumber: number
  description: string
  tools: string[]
  timeEstimate: string
  safetyWarnings: string[]
}

export interface BuildPlan {
  id: string
  projectName: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  estimatedCost: number
  materials: Material[]
  tools: string[]
  steps: BuildStep[]
  safetyNotes: string[]
  style: string
  skillLevel: string
  spaceType: string
  dimensions: {
    width: number
    length: number
    height?: number
  }
  constraints?: string
  createdAt: Date
  updatedAt: Date
}

export interface BuildPlanRequest {
  spaceType: 'room' | 'wall' | 'corner' | 'balcony' | 'garage' | 'other'
  dimensions: {
    width: number
    length: number
    height?: number
  }
  projectType: 'shelf' | 'desk' | 'storage' | 'furniture' | 'decor' | 'other'
  projectSize: 'small' | 'medium' | 'large' | 'custom'
  style: 'modern' | 'rustic' | 'scandinavian' | 'industrial' | 'minimalist' | 'traditional'
  skillLevel: 'beginner' | 'intermediate' | 'advanced'
  budget: 'budget' | 'moderate' | 'premium'
  materials?: string
  constraints?: string
  availableTools?: string[]
}

export interface ProjectTemplate {
  id: string
  name: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string
  estimatedCost: number
  materials: Material[]
  tools: string[]
  steps: BuildStep[]
  imageUrl?: string
  tags: string[]
}

export interface UserBuild {
  id: string
  userId: string
  buildPlan: BuildPlan
  status: 'planned' | 'in-progress' | 'completed' | 'abandoned'
  startDate?: Date
  completionDate?: Date
  notes?: string
  photos?: string[]
  actualCost?: number
  actualTime?: string
  rating?: number
  review?: string
} 