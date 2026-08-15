export type EnvironmentType =
  | "Household"
  | "Clinical"
  | "Industrial"
  | "Warehouse"
  | "Agriculture";

export type QAStatus = "APPROVED" | "PENDING" | "REJECTED";

export interface Recipe {
  id: string;
  code: string;
  title: string;
  environment: EnvironmentType;
  hardwareRig: string;
  estimatedTime: string;
  payoutRate: number;
  description: string;
  targetFps: number;
  expectedDurationSec: number;
  acceptanceRate: number;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  requiredObjects: string[];
  tags: string[];
}

export interface EpisodeSubmission {
  id: string;
  recipeId: string;
  recipeTitle: string;
  environment: EnvironmentType;
  submittedAt: string;
  durationSeconds: number;
  totalFrames: number;
  rgbSize: number; // bytes
  depthSize: number; // bytes
  kinematicsSize: number; // bytes
  totalSize: number; // bytes
  status: QAStatus;
  qaScore?: number; // 0-100
  qaReviewer?: string;
  qaFeedback?: string;
  rejectionReason?: string;
  s3Hash: string;
  rigId: string;
  teleopLatencyMs: number;
}

export interface OperatorProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  badge: string;
  payoutMethod: "Bank Transfer" | "PayPal" | "Instant Debit";
  bankAccountLast4: string;
  uploadOverWifiOnly: boolean;
  saveOriginalVideo: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  approvedRate: number;
  totalEarnings: number;
  lastActive: string;
}

export interface IngestionFileItem {
  file: File | null;
  name: string;
  expectedName: "rgb.mp4" | "depth.mp4" | "kinematics.parquet";
  requiredType: string;
  description: string;
  size: number;
  isValid: boolean;
  validationError?: string;
  previewUrl?: string;
  mockSimulated?: boolean;
}

export interface PayoutRecord {
  id: string;
  period: string;
  episodesCount: number;
  approvedCount: number;
  grossAmount: number;
  status: "PAID" | "PROCESSING" | "SCHEDULED";
  paidDate: string;
  transactionRef: string;
}
