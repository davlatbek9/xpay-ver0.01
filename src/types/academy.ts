export type CourseCategory = 'pul-sirlari' | 'biznes' | 'kripto-treyding' | 'xavfsizlik';

export interface Lesson {
  id: string;
  title: string;
  category: CourseCategory;
  categoryTitle: string;
  duration: string; // e.g. "14:20"
  level: 'Boshlang\'ich' | 'O\'rta' | 'Professional';
  speaker: string;
  speakerRole: string;
  thumbnail: string;
  badgeColor: string;
  description: string;
  keyTakeaways: string[];
  notes: string;
  completed: boolean;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}
