// Interfaces principales migradas del proyecto sleep-plus-old

export interface Customer {
  id: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  source: 'store' | 'online' | 'phone' | 'referral';
  tags: string[];
  lifetimeValue: number;
  firstPurchaseDate: string;
  lastPurchaseDate: string;
  lastContactDate: string;
  purchasedItems: string[];
  isEliteMember: boolean;
  membershipStatus: 'standard' | 'active' | 'inactive';
  totalTrades: number;
  totalCreditEarned: number;
  currentCredit: number;
  doNotCall: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  employeeId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager' | 'agent' | 'supervisor';
  storeId: string;
  phoneExtension: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'suspended';
  shift: 'morning' | 'afternoon' | 'night';
  hiredAt: string;
  commissions: {
    totalEvaluations: number;
    totalCommissionEarned: number;
    currentMonthEvaluations: number;
    currentMonthCommission: number;
  };
  performance: {
    callsToday: number;
    callsTarget: number;
    conversionsToday: number;
    conversionRate: number;
    averageCallDuration: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  code: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  managerId: string;
  hours: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday: { open: string; close: string };
    sunday: { open: string; close: string };
  };
  serviceArea: {
    zipCodes: string[];
    radius: number;
  };
  performance: {
    monthlyTarget: number;
    currentSales: number;
  };
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  customerId: string;
  plan: 'basic' | 'premium' | 'elite';
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  pricing: {
    monthly: number;
    annual: number;
    currency: string;
  };
  billing: {
    frequency: 'monthly' | 'annual';
    nextBillingDate: string;
    paymentMethod: string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    stripePriceId?: string;
    lastFour?: string;
  };
  services: {
    cleaningsTotal: number;
    cleaningsUsed: number;
    protectionActive: boolean;
    inspectionsTotal: number;
    inspectionsUsed: number;
  };
  credits: {
    accumulated: number;
    used: number;
    expiration?: string;
  };
  startDate: string;
  soldBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Evaluation {
  id: string;
  customerId: string;
  employeeId: string;
  storeId: string;
  status: 'pending' | 'approved' | 'rejected' | 'redeemed';
  type: 'mattress' | 'furniture' | 'accessories';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  estimatedValue: number;
  tradeInValue: number;
  notes: string;
  photos: string[];
  appointmentDate: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Call {
  id: string;
  customerId: string;
  employeeId: string;
  campaignId?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'no-answer' | 'busy';
  duration: number;
  outcome: 'sale' | 'appointment' | 'follow-up' | 'not-interested' | 'wrong-number';
  notes: string;
  objections: string[];
  scheduledAt: string;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  customerId: string;
  employeeId: string;
  storeId: string;
  callId?: string;
  campaignId?: string;
  amount: number;
  commission: number;
  products: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  notes: string;
  soldAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'seasonal' | 'promotional' | 'follow-up' | 'reactivation';
  status: 'draft' | 'active' | 'paused' | 'completed';
  targeting: {
    customerTiers: string[];
    lastPurchaseRange?: {
      min: number;
      max: number;
    };
    hasSubscription?: boolean;
    productTypes?: string[];
  };
  script: {
    opening: string;
    valueProps: string[];
    closing: string;
    objectionHandlers: Record<string, string>;
  };
  offer: {
    type: 'percentage' | 'fixed' | 'free-shipping';
    value: number;
    validUntil: string;
  };
  metrics: {
    totalCalls: number;
    contacted: number;
    converted: number;
    revenue: number;
  };
  assignedTo: string[];
  startDate: string;
  endDate: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Commission {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  totalSales: number;
  totalCommission: number;
  commissionRate: number;
  bonusAmount: number;
  totalEarned: number;
  saleIds: string[];
  status: 'pending' | 'paid' | 'cancelled';
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: 'sales' | 'calls' | 'evaluations' | 'special';
  requirements: {
    metric: string;
    target: number;
    timeframe: string;
  };
  reward: {
    type: 'badge' | 'bonus' | 'recognition';
    value: string | number;
  };
  unlockedBy: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Script {
  id: string;
  name: string;
  description: string;
  type: 'sales' | 'follow-up' | 'reactivation';
  segments: Array<{
    id: string;
    type: 'text' | 'variable' | 'condition';
    content: string;
    customerTier?: string[];
    branches?: Array<{
      condition: string;
      content: string;
    }>;
  }>;
  variables: Array<{
    name: string;
    type: 'string' | 'number' | 'date';
    defaultValue: string;
  }>;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos de respuesta de la API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Tipos para filtros y búsquedas
export interface FilterParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

// Tipos para formularios
export interface CreateFormData {
  [key: string]: any;
}

export interface UpdateFormData extends CreateFormData {
  id: string;
} 