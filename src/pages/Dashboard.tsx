import { useCalories } from "@/context/CalorieContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Apple, EggFried, Utensils, Heart, Weight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const MealSummaryCard = ({ 
  title, 
  icon, 
  calories, 
  maxCalories 
}: { 
  title: string; 
  icon: React.ReactNode; 
  calories: number;
  maxCalories: number;
}) => (
  <Card className="animate-fade-in">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold mb-1">{calories} kcal</div>
      <Progress 
        value={(calories / maxCalories) * 100} 
        className="h-2" 
      />
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user, getTotalCaloriesByDate, getTotalByMealType } = useCalories();
  const [today] = useState(format(new Date(), "yyyy-MM-dd"));
  const [totalCalories, setTotalCalories] = useState(0);
  const [mealCalories, setMealCalories] = useState({
    breakfast: 0,
    lunch: 0, 
    dinner: 0,
    snack: 0
  });
  
  useEffect(() => {
    setTotalCalories(getTotalCaloriesByDate(today));
    setMealCalories({
      breakfast: getTotalByMealType(today, 'breakfast'),
      lunch: getTotalByMealType(today, 'lunch'),
      dinner: getTotalByMealType(today, 'dinner'),
      snack: getTotalByMealType(today, 'snack')
    });
  }, [getTotalCaloriesByDate, getTotalByMealType, today]);

  const remainingCalories = user.dailyGoals.calories - totalCalories;
  const caloriePercentage = (totalCalories / user.dailyGoals.calories) * 100;
  
  // Split daily goals into approximate meal percentages
  const mealDistribution = {
    breakfast: user.dailyGoals.calories * 0.25,
    lunch: user.dailyGoals.calories * 0.35,
    dinner: user.dailyGoals.calories * 0.30,
    snack: user.dailyGoals.calories * 0.10
  };

  return (
    <Layout title={`Olá, ${user.name}`}>
      <div className="mb-8">
        <Card className="mb-6 animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Calorias diárias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Meta:</span>
              <span className="font-medium">{user.dailyGoals.calories} kcal</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Consumido:</span>
              <span className="font-medium">{totalCalories} kcal</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-muted-foreground">Restante:</span>
              <span className={`font-medium ${remainingCalories < 0 ? 'text-red-500' : 'text-green-500'}`}>
                {remainingCalories} kcal
              </span>
            </div>
            
            <Progress 
              value={caloriePercentage > 100 ? 100 : caloriePercentage} 
              
              // Usando className condicional com cn() ao invés de indicatorClassName
              className={cn("h-3", remainingCalories < 0 ? "bg-red-500" : "")}
            />
            
            <div className="text-xs text-center mt-2 text-muted-foreground">
              {caloriePercentage.toFixed(0)}% do objetivo diário
            </div>
          </CardContent>
        </Card>

        <h2 className="text-xl font-semibold mb-4">Refeições de hoje</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <MealSummaryCard 
            title="Café da manhã" 
            icon={<EggFried className="h-4 w-4 text-amber-500" />} 
            calories={mealCalories.breakfast}
            maxCalories={mealDistribution.breakfast}
          />
          
          <MealSummaryCard 
            title="Almoço" 
            icon={<Utensils className="h-4 w-4 text-blue-500" />} 
            calories={mealCalories.lunch}
            maxCalories={mealDistribution.lunch}
          />
          
          <MealSummaryCard 
            title="Jantar" 
            icon={<Utensils className="h-4 w-4 text-indigo-500" />} 
            calories={mealCalories.dinner}
            maxCalories={mealDistribution.dinner}
          />
          
          <MealSummaryCard 
            title="Lanches" 
            icon={<Apple className="h-4 w-4 text-green-500" />} 
            calories={mealCalories.snack}
            maxCalories={mealDistribution.snack}
          />
        </div>
      </div>

      <div className="mt-8">
        <Card className="animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Weight className="h-5 w-5 text-blue-500" />
              Dicas de nutrição
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Aproximadamente {totalCalories} calorias consumidas hoje. 
              {remainingCalories > 0 
                ? ` Você ainda pode consumir ${remainingCalories} calorias.` 
                : ` Você excedeu sua meta em ${Math.abs(remainingCalories)} calorias.`}
            </p>
            <p className="text-sm text-muted-foreground">
              {remainingCalories > 500 
                ? "Não esqueça de comer o suficiente para manter sua energia durante o dia." 
                : remainingCalories > 0 
                  ? "Você está indo bem no seu progresso de hoje!" 
                  : "Tente equilibrar sua ingestão amanhã para atingir suas metas."}
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;