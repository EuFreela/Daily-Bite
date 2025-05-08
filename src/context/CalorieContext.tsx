import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FoodEntry, DailyGoals, User, MealType } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { Preferences } from '@capacitor/preferences';

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

// Gerar ID único
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Configuração padrão do usuário
const defaultUser: User = {
  name: 'Usuário',
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

  // Carregar dados do Preferences quando o app inicia
  useEffect(() => {
    const loadData = async () => {
      const { value: savedEntries } = await Preferences.get({ key: 'foodEntries' });
      const { value: savedUser } = await Preferences.get({ key: 'user' });

      if (savedEntries) {
        setFoodEntries(JSON.parse(savedEntries));
      }
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    loadData();
  }, []);

  // Salvar foodEntries sempre que mudam
  useEffect(() => {
    const saveFoodEntries = async () => {
      await Preferences.set({
        key: 'foodEntries',
        value: JSON.stringify(foodEntries),
      });
    };
    saveFoodEntries();
  }, [foodEntries]);

  // Salvar user sempre que muda
  useEffect(() => {
    const saveUser = async () => {
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(user),
      });
    };
    saveUser();
  }, [user]);

  // Adicionar uma nova refeição
  const addFoodEntry = (entry: Omit<FoodEntry, 'id'>) => {
    const newEntry = {
      ...entry,
      id: generateId(),
    };
    setFoodEntries((prev) => [...prev, newEntry]);
    toast({
      title: "Refeição adicionada",
      description: `${entry.name} (${entry.calories} calorias) foi adicionada ao seu diário.`,
    });
  };

  // Remover uma refeição
  const removeFoodEntry = (id: string) => {
    setFoodEntries((prev) => prev.filter((entry) => entry.id !== id));
    toast({
      title: "Refeição removida",
      description: "A refeição foi removida do seu diário.",
    });
  };

  // Atualizar metas diárias
  const updateUserGoals = (goals: DailyGoals) => {
    setUser((prev) => ({
      ...prev,
      dailyGoals: goals,
    }));
    toast({
      title: "Metas atualizadas",
      description: "Suas metas nutricionais diárias foram atualizadas.",
    });
  };

  // Atualizar nome do usuário
  const updateUserName = (name: string) => {
    setUser((prev) => ({
      ...prev,
      name,
    }));
    toast({
      title: "Perfil atualizado",
      description: `Seu nome foi alterado para ${name}.`,
    });
  };

  // Obter refeições de uma data específica
  const getDailyEntries = (date: string) => {
    return foodEntries.filter((entry) => entry.date === date);
  };

  // Calcular total de calorias de uma data
  const getTotalCaloriesByDate = (date: string) => {
    return getDailyEntries(date).reduce((total, entry) => total + entry.calories, 0);
  };

  // Calcular total por tipo de refeição para uma data
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
    throw new Error('useCalories precisa ser usado dentro de um CalorieProvider');
  }
  return context;
};
