// Extensión de las interfaces existentes para incluir campos de Stripe
// Mapeo de estados entre sistemas
export const SUBSCRIPTION_STATUS_MAP = {
    // Stripe -> Sistema Local
    fromStripe: {
        'active': 'active',
        'past_due': 'active', // Pero marcar para seguimiento
        'unpaid': 'paused',
        'canceled': 'cancelled',
        'incomplete': 'pending',
        'incomplete_expired': 'cancelled',
        'trialing': 'active',
        'paused': 'paused'
    },
    // Sistema Local -> Stripe
    toStripe: {
        'active': 'active',
        'paused': 'paused',
        'cancelled': 'canceled',
        'pending': 'incomplete'
    }
};
// Configuración de productos y precios
export const STRIPE_PRODUCTS = {
    basic: {
        id: '', // Se llenará con el ID real de Stripe
        name: 'Sleep+ Basic',
        description: 'Plan básico de protección de colchón',
        metadata: {
            plan: 'basic',
            cleanings: '4',
            inspections: '1',
            protection: 'false'
        }
    },
    premium: {
        id: '', // Se llenará con el ID real de Stripe
        name: 'Sleep+ Premium',
        description: 'Plan premium con protección completa',
        metadata: {
            plan: 'premium',
            cleanings: '8',
            inspections: '2',
            protection: 'true'
        }
    },
    elite: {
        id: '', // Se llenará con el ID real de Stripe
        name: 'Sleep+ Elite',
        description: 'Plan elite con máxima protección y Trade & Sleep',
        metadata: {
            plan: 'elite',
            cleanings: '12',
            inspections: '4',
            protection: 'true',
            tradeAndSleep: 'true'
        }
    }
};
// IDs de precios en Stripe (se llenarán con los IDs reales)
export const STRIPE_PRICE_IDS = {
    basic_monthly: '',
    basic_annual: '',
    premium_monthly: '',
    premium_annual: '',
    elite_monthly: '',
    elite_annual: ''
};
// Helper para obtener el price ID correcto
export const getStripePriceId = (plan, frequency) => {
    const key = `${plan}_${frequency}`;
    return STRIPE_PRICE_IDS[key];
};
