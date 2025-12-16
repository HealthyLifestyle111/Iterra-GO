// Mock Base44 client - SDK removed
// Feature flag: Enable/disable Base44 authentication (currently disabled)
const ENABLE_BASE44_AUTH = false;

// Stub authentication functions
export async function isAuthenticated() { return false; }
export async function me() { return null; }
export async function logout() { return true; }
export function redirectToLogin() { /* no-op */ }

// Mock Base44 client object
export const base44 = {
  auth: {
    isAuthenticated,
    me,
    logout,
    redirectToLogin,
    updateMe: async () => ({ success: true })
  },
  entities: {
    User: {
      filter: async () => []
    },
    WellnessIntake: {
      create: async () => ({ id: 'mock-id' }),
      filter: async () => [],
      update: async () => ({ success: true })
    },
    Service: {},
    Consultation: {},
    Manifestation: {
      list: async () => [],
      create: async () => ({ id: 'mock-id' }),
      update: async () => ({ success: true }),
      delete: async () => ({ success: true })
    },
    TrainingContent: {},
    MonthlyUpdate: {},
    SpecializedIntake: {
      create: async () => ({ id: 'mock-id' })
    }
  },
  integrations: {
    Core: {
      InvokeLLM: async () => ({ result: 'Mock LLM response' }),
      SendEmail: async () => ({ success: true }),
      UploadFile: async () => ({ success: true }),
      GenerateImage: async () => ({ success: true }),
      ExtractDataFromUploadedFile: async () => ({ success: true }),
      CreateFileSignedUrl: async () => ({ url: 'mock-url' }),
      UploadPrivateFile: async () => ({ success: true })
    }
  }
};
