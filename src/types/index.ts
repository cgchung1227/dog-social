export interface SocialRecord {
  id: string;
  date: Date;
  dogName: string;
  otherDogName: string;
  location: string;
  interactionType: string;
  duration: number;
  notes?: string;
} 