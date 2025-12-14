// NOTE: @base44/sdk dependency removed per requirements
// This is a stub implementation to prevent build errors
// TODO: Replace with proper backend integration

const createMockClient = () => ({
  auth: {
    redirectToLogin: (url) => console.warn('base44 auth disabled:', url)
  },
  entities: {
    User: {
      filter: async () => [],
      create: async () => ({}),
      update: async () => ({})
    }
  },
  integrations: {
    Core: {
      InvokeLLM: async () => 'Service temporarily unavailable',
      SendEmail: async () => ({ success: false })
    }
  }
});

export const base44 = createMockClient();
