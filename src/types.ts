/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProjectService = 'video_editing' | 'photo_editing' | 'full_package' | 'other';

export type InquiryStatus = 'Unread' | 'In Discussion' | 'Booked' | 'Completed';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: ProjectService;
  projectType: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  notes?: string;
}

export interface AIPlanRequest {
  projectType: string;
  tone: string;
  duration: string;
  additionalInfo: string;
}

export interface StoryboardStep {
  step: string;
  description: string;
  durationEstimate: string;
}

export interface EditingRecommendations {
  transitions: string;
  colorGrading: string;
  audioTrack: string;
  visualEffects: string;
}

export interface AIPlanResponse {
  conceptName: string;
  vibeDescription: string;
  storyboardSteps: StoryboardStep[];
  editingRecommendations: EditingRecommendations;
  estimatedPacing: string;
  estimatedPriceBracket: string;
  customQuoteNote: string;
}
