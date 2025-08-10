export const testProjects = {
  birdHouse: {
    name: 'Bird House',
    cost: '$15-25',
    time: '2-3 hours',
    difficulty: 'Beginner',
    slug: 'bird-house'
  },
  outdoorBench: {
    name: 'Outdoor Bench',
    cost: '$40-60',
    time: '4-6 hours',
    difficulty: 'Beginner',
    slug: 'outdoor-bench'
  },
  woodenToyCar: {
    name: 'Wooden Toy Car',
    cost: '$8-15',
    time: '1-2 hours',
    difficulty: 'Beginner',
    slug: 'wooden-toy-car'
  },
  floatingShelf: {
    name: 'Floating Shelf',
    cost: '$20-35',
    time: '2-3 hours',
    difficulty: 'Beginner',
    slug: 'floating-shelf'
  },
  planterBox: {
    name: 'Planter Box',
    cost: '$25-40',
    time: '3-4 hours',
    difficulty: 'Beginner',
    slug: 'planter-box'
  },
  coatRack: {
    name: 'Coat Rack',
    cost: '$15-30',
    time: '2-3 hours',
    difficulty: 'Beginner',
    slug: 'coat-rack'
  }
};

export const testFormData = {
  valid: {
    spaceType: 'room',
    width: '4',
    length: '6',
    projectType: 'shelf',
    projectSize: 'medium',
    style: 'modern',
    skillLevel: 'beginner',
    budget: 'moderate'
  },
  invalid: {
    width: '0',
    length: '-1'
  },
  withFractions: {
    spaceType: 'room',
    width: '3 1/2',
    length: '5 3/4',
    projectType: 'shelf',
    projectSize: 'medium',
    style: 'modern',
    skillLevel: 'beginner',
    budget: 'moderate'
  }
};

export const testContactData = {
  valid: {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message for e2e testing.'
  },
  invalid: {
    name: '',
    email: 'invalid-email',
    message: ''
  }
};

export const testUserData = {
  valid: {
    email: 'test@example.com',
    password: 'password123',
    confirmPassword: 'password123'
  },
  invalid: {
    email: 'invalid-email',
    password: 'short',
    confirmPassword: 'different'
  }
};
