export type Plan = "Free" | "Pro" | "Business";
export type ProjectStatus = "Uploaded" | "Analyzed" | "Queued" | "Rendering" | "Completed" | "Failed";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  googleId?: string;
  avatar?: string;
  plan: Plan;
  credits: number;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id: string;
  userId: string;
  title: string;
  status: ProjectStatus;
  videoUrl: string;
  resultUrl?: string;
  editingMode: string;
  viralScore?: number;
  duration?: number;
  language?: string;
  contentType?: string;
  recommendedEditingStyle?: string;
  analysis?: {
    speakingPace: string;
    speakerCount: number;
    hookPotential: string;
    importantMoments: string[];
    recommendations: string[];
  };
  createdAt: string;
  updatedAt: string;
};

export type Render = {
  id: string;
  projectId: string;
  startedAt: string;
  finishedAt?: string;
  status: ProjectStatus;
  processingTime?: number;
};

export type Payment = {
  id: string;
  userId: string;
  amount: number;
  provider: string;
  status: string;
  transactionId: string;
  createdAt: string;
};
