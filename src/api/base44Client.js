// NOTE: @base44/sdk dependency removed per requirements
// This is a stub implementation to prevent build errors
// TODO: Replace with proper backend integration

const createMockEntity = () => ({
  filter: async () => [],
  list: async () => [],
  create: async () => ({}),
  update: async () => ({}),
  delete: async () => ({})
});

const createMockClient = () => ({
  auth: {
    redirectToLogin: (url) => console.warn('base44 auth disabled:', url)
  },
  entities: {
    User: createMockEntity(),
    WellnessIntake: createMockEntity(),
    SpecializedIntake: createMockEntity(),
    Manifestation: createMockEntity(),
    Consultation: createMockEntity(),
    MonthlyUpdate: createMockEntity(),
    Service: createMockEntity(),
    TrainingContent: createMockEntity()
  },
  integrations: {
    Core: {
      InvokeLLM: async () => 'Service temporarily unavailable',
      SendEmail: async () => ({ success: false })
    }
  }
});

export const base44 = createMockClient();
