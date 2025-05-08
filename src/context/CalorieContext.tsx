import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodEntry, DailyGoals, User, MealType } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface CalorieContextProps {
  foodEntries: FoodEntry[];
  user: User;
  addFoodEntry: (entry: Omit<FoodEntry, 'id'>) => void;
  removeFoodEntry: (id: string) => void;
  updateUserGoals: (goals: DailyGoals) => void;
  updateUserName: (name: string) => void;
  getDailyEntries: (date: string) => FoodEntry[];
  getTotalCaloriesByDate: (date: string) => number;
  getTotalByMealType: (date: string, mealType: MealType) => number;
}

const CalorieContext = createContext<CalorieContextProps | undefined>(undefined);

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Default user settings
const defaultUser: User = {
  name: 'User',
  dailyGoals: {
    calories: 2000,
    protein: 75,
    carbs: 250,
    fat: 70,
  },
};

export const CalorieProvider = ({ children }: { children: ReactNode }) => {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [user, setUser] = useState<User>(defaultUser);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('foodEntries');
    const savedUser = localStorage.getItem('user');
    
    if (savedEntries) {
      setFoodEntries(JSON.parse(savedEntries));
    }
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
  }, [foodEntries]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Add a new food entry
  const addFoodEntry = (entry: Omit<FoodEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: generateId(),
    };
    setFoodEntries([...foodEntries, newEntry]);
    toast({
      title: "Food added",
      description: `${entry.name} (${entry.calories} calories) has been added to your log.`,
    });
  };

  // Remove a food entry
  const removeFoodEntry = (id: string) => {
    setFoodEntries(foodEntries.filter((entry) => entry.id !== id));
    toast({
      title: "Entry removed",
      description: "The food entry has been removed from your log.",
    });
  };

  // Update user daily goals
  const updateUserGoals = (goals: DailyGoals) => {
    setUser({
      ...user,
      dailyGoals: goals,
    });
    toast({
      title: "Goals updated",
      description: "Your daily nutritional goals have been updated.",
    });
  };

  // Update user name
  const updateUserName = (name: string) => {
    setUser({
      ...user,
      name,
    });
    toast({
      title: "Profile updated",
      description: `Your name has been changed to ${name}.`,
    });
  };

  // Get entries for a specific date
  const getDailyEntries = (date: string) => {
    return foodEntries.filter((entry) => entry.date === date);
  };

  // Calculate total calories for a specific date
  const getTotalCaloriesByDate = (date: string) => {
    return getDailyEntries(date).reduce((total, entry) => total + entry.calories, 0);
  };

  // Calculate total calories by meal type for a specific date
  const getTotalByMealType = (date: string, mealType: MealType) => {
    return getDailyEntries(date)
      .filter((entry) => entry.mealType === mealType)
      .reduce((total, entry) => total + entry.calories, 0);
  };

  return (
    <CalorieContext.Provider
      value={{
        foodEntries,
        user,
        addFoodEntry,
        removeFoodEntry,
        updateUserGoals,
        updateUserName,
        getDailyEntries,
        getTotalCaloriesByDate,
        getTotalByMealType,
      }}
    >
      {children}
    </CalorieContext.Provider>
  );
};

export const useCalories = (): CalorieContextProps => {
  const context = useContext(CalorieContext);
  if (context === undefined) {
    throw new Error('useCalories must be used within a CalorieProvider');
  }
  return context;
};
