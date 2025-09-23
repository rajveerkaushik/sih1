// Mock data to make the application functional
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  weight: number;
  height: string;
  bmi: number;
  bloodGroup: string;
  phone: string;
  email: string;
  address: string;
  occupation: string;
  constitution: string;
  allergies: string;
  medicalHistory: string;
  lastVisit: string;
  condition: string;
  avatar?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  doshaEffect: string;
  rasa: string;
  virya: string;
  vipaka: string;
  properties: string[];
  ayurvedicNote: string;
}

export interface DietChart {
  id: string;
  patientId: string;
  title: string;
  date: string;
  status: 'Active' | 'Completed' | 'Draft';
  duration: string;
  meals: any[];
}

export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    weight: 65,
    height: '5\'4"',
    bmi: 22.4,
    bloodGroup: 'A+',
    phone: '+91 98765 43210',
    email: 'priya.sharma@email.com',
    address: 'Mumbai, Maharashtra',
    occupation: 'Software Engineer',
    constitution: 'Vata-Pitta',
    allergies: 'Dairy products, Nuts',
    medicalHistory: 'Migraine, Anxiety',
    lastVisit: '2 days ago',
    condition: 'Weight Management'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    weight: 78,
    height: '5\'8"',
    bmi: 25.2,
    bloodGroup: 'B+',
    phone: '+91 98765 43211',
    email: 'rajesh.kumar@email.com',
    address: 'Delhi, India',
    occupation: 'Business Owner',
    constitution: 'Kapha-Pitta',
    allergies: 'None',
    medicalHistory: 'Diabetes, Hypertension',
    lastVisit: '1 week ago',
    condition: 'Digestive Issues'
  },
  {
    id: '3',
    name: 'Anita Singh',
    age: 28,
    gender: 'Female',
    weight: 58,
    height: '5\'2"',
    bmi: 21.8,
    bloodGroup: 'O+',
    phone: '+91 98765 43212',
    email: 'anita.singh@email.com',
    address: 'Bangalore, Karnataka',
    occupation: 'Teacher',
    constitution: 'Vata',
    allergies: 'Gluten',
    medicalHistory: 'Anxiety, Insomnia',
    lastVisit: '3 days ago',
    condition: 'Stress & Anxiety'
  },
  {
    id: '4',
    name: 'Vikram Patel',
    age: 52,
    gender: 'Male',
    weight: 82,
    height: '5\'10"',
    bmi: 26.1,
    bloodGroup: 'AB+',
    phone: '+91 98765 43213',
    email: 'vikram.patel@email.com',
    address: 'Pune, Maharashtra',
    occupation: 'Engineer',
    constitution: 'Kapha',
    allergies: 'Shellfish',
    medicalHistory: 'Arthritis, High Cholesterol',
    lastVisit: '5 days ago',
    condition: 'Joint Pain'
  }
];

export const mockFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Basmati Rice',
    category: 'Grains',
    calories: 345,
    protein: 7.1,
    carbs: 78,
    fat: 0.6,
    fiber: 1.8,
    doshaEffect: 'Tridoshic',
    rasa: 'Sweet',
    virya: 'Cooling',
    vipaka: 'Sweet',
    properties: ['Easy to digest', 'Nourishing', 'Calming'],
    ayurvedicNote: 'Excellent for Pitta constitution, balances all doshas'
  },
  {
    id: '2',
    name: 'Turmeric',
    category: 'Spices',
    calories: 312,
    protein: 9.7,
    carbs: 67.1,
    fat: 3.2,
    fiber: 22.7,
    doshaEffect: 'Kapha+',
    rasa: 'Bitter, Pungent',
    virya: 'Heating',
    vipaka: 'Pungent',
    properties: ['Anti-inflammatory', 'Digestive', 'Blood purifier'],
    ayurvedicNote: 'Reduces Kapha, increases Pitta in excess'
  },
  {
    id: '3',
    name: 'Almonds',
    category: 'Nuts',
    calories: 576,
    protein: 21.2,
    carbs: 21.7,
    fat: 49.4,
    fiber: 12.5,
    doshaEffect: 'Vata+',
    rasa: 'Sweet',
    virya: 'Heating',
    vipaka: 'Sweet',
    properties: ['Nourishing', 'Brain tonic', 'Strengthening'],
    ayurvedicNote: 'Excellent for Vata, soak overnight for better digestion'
  },
  {
    id: '4',
    name: 'Spinach',
    category: 'Vegetables',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    doshaEffect: 'Pitta+',
    rasa: 'Sweet, Astringent',
    virya: 'Cooling',
    vipaka: 'Sweet',
    properties: ['Blood building', 'Cooling', 'Detoxifying'],
    ayurvedicNote: 'Good for Pitta, may increase Vata in excess'
  },
  {
    id: '5',
    name: 'Ginger',
    category: 'Spices',
    calories: 80,
    protein: 1.8,
    carbs: 17.8,
    fat: 0.8,
    fiber: 2,
    doshaEffect: 'Vata+',
    rasa: 'Pungent',
    virya: 'Heating',
    vipaka: 'Sweet',
    properties: ['Digestive fire enhancer', 'Anti-nausea', 'Warming'],
    ayurvedicNote: 'Universal digestive aid, use moderately in Pitta'
  },
  {
    id: '6',
    name: 'Coconut Oil',
    category: 'Oils',
    calories: 862,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    doshaEffect: 'Pitta+',
    rasa: 'Sweet',
    virya: 'Cooling',
    vipaka: 'Sweet',
    properties: ['Moisturizing', 'Cooling', 'Antimicrobial'],
    ayurvedicNote: 'Excellent for Pitta, good for all doshas in moderation'
  },
  {
    id: '7',
    name: 'Moong Dal',
    category: 'Legumes',
    calories: 347,
    protein: 24.5,
    carbs: 59.0,
    fat: 1.2,
    fiber: 16.3,
    doshaEffect: 'Tridoshic',
    rasa: 'Sweet, Astringent',
    virya: 'Cooling',
    vipaka: 'Sweet',
    properties: ['Easy to digest', 'Protein rich', 'Detoxifying'],
    ayurvedicNote: 'Best legume for all constitutions, especially during illness'
  },
  {
    id: '8',
    name: 'Ghee',
    category: 'Dairy',
    calories: 900,
    protein: 0,
    carbs: 0,
    fat: 100,
    fiber: 0,
    doshaEffect: 'Vata+',
    rasa: 'Sweet',
    virya: 'Cooling',
    vipaka: 'Sweet',
    properties: ['Nourishing', 'Digestive', 'Rejuvenating'],
    ayurvedicNote: 'Sacred food in Ayurveda, enhances digestion and immunity'
  }
];

export const mockDietCharts: DietChart[] = [
  {
    id: '1',
    patientId: '1',
    title: 'Weight Management Plan',
    date: '2024-01-15',
    status: 'Active',
    duration: '4 weeks',
    meals: []
  },
  {
    id: '2',
    patientId: '1',
    title: 'Digestive Health Focus',
    date: '2023-12-01',
    status: 'Completed',
    duration: '6 weeks',
    meals: []
  },
  {
    id: '3',
    patientId: '2',
    title: 'Diabetes Management Diet',
    date: '2024-01-10',
    status: 'Active',
    duration: '8 weeks',
    meals: []
  }
];

export const mockAppointments = [
  { id: '1', patient: 'Meera Joshi', time: '10:00 AM', type: 'Follow-up', date: 'Today' },
  { id: '2', patient: 'Arjun Gupta', time: '11:30 AM', type: 'New Consultation', date: 'Today' },
  { id: '3', patient: 'Kavya Reddy', time: '2:00 PM', type: 'Diet Review', date: 'Today' },
  { id: '4', patient: 'Sanjay Mehta', time: '3:30 PM', type: 'Progress Check', date: 'Today' },
];

export const mockStats = {
  totalPatients: 248,
  activeDietPlans: 89,
  monthlyConsultations: 156,
  successRate: 94
};