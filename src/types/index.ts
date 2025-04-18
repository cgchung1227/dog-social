export interface SocialRecord {
  id: string;
  date: Date;
  otherDogName: string;
  otherDogGender: 'male' | 'female';
  otherDogAge: string;
  location: string;
  interactionType: string;
  duration: number;
  result: string;
  meetAgain: boolean;
  moodBefore?: string;
  moodAfter?: string;
  notes?: string;
} 