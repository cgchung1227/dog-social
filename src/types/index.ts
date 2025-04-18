export interface SocialRecord {
  id: string;
  date: Date;
  target: string;
  gender: 'male' | 'female';
  age: string;
  neutered: 'yes' | 'no' | 'unknown';
  initialInteraction: string;
  interactionResult: string;
  worthMeetingAgain: boolean;
  notes?: string;
}

export type Gender = SocialRecord['gender'];
export type NeuteredStatus = SocialRecord['neutered']; 