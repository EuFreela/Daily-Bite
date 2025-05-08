export type FoodEntry = {
    id: string;
    name: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    mealType: MealType;
    date: string; // ISO date string
    time: string;
  };
  
  export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
  
  export type DailyGoals = {
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  
  export type User = {
    name: string;
    dailyGoals: DailyGoals;
  };
  