import { useState } from "react";
import { useCalories } from "@/context/CalorieContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, parseISO, subDays } from "date-fns";
import { Apple, EggFried, Utensils, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FoodEntry, MealType } from "@/types";

const getMealTypeIcon = (mealType: MealType) => {
  switch (mealType) {
    case "breakfast":
      return <EggFried className="h-4 w-4 text-amber-500" />;
    case "lunch":
    case "dinner":
      return <Utensils className="h-4 w-4 text-blue-500" />;
    case "snack":
      return <Apple className="h-4 w-4 text-green-500" />;
    default:
      return <Apple className="h-4 w-4 text-green-500" />;
  }
};

const getMealTypeName = (mealType: MealType): string => {
  switch (mealType) {
    case "breakfast":
      return "Café da manhã";
    case "lunch":
      return "Almoço";
    case "dinner":
      return "Jantar";
    case "snack":
      return "Lanche";
    default:
      return "Refeição";
  }
};

const FoodLog = () => {
  const { getDailyEntries, removeFoodEntry } = useCalories();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const foodEntries = getDailyEntries(selectedDate);
  
  const groupedEntries = foodEntries.reduce((acc, entry) => {
    if (!acc[entry.mealType]) {
      acc[entry.mealType] = [];
    }
    acc[entry.mealType].push(entry);
    return acc;
  }, {} as Record<MealType, FoodEntry[]>);

  const handlePrevDay = () => {
    const prevDay = subDays(parseISO(selectedDate), 1);
    setSelectedDate(format(prevDay, "yyyy-MM-dd"));
  };

  const handleNextDay = () => {
    // Don't allow selecting future dates
    if (selectedDate < format(new Date(), "yyyy-MM-dd")) {
      const nextDay = parseISO(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setSelectedDate(format(nextDay, "yyyy-MM-dd"));
    }
  };

  const displayDate = format(parseISO(selectedDate), "EEEE, d 'de' MMMM");
  const isToday = selectedDate === format(new Date(), "yyyy-MM-dd");

  return (
    <Layout title="Registro alimentar">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={handlePrevDay} size="sm">
          Anterior
        </Button>
        <h2 className="font-medium">
          {isToday ? "Hoje" : displayDate}
        </h2>
        <Button
          variant="outline"
          onClick={handleNextDay}
          disabled={isToday}
          size="sm"
        >
          Próximo
        </Button>
      </div>

      {Object.keys(groupedEntries).length === 0 ? (
        <Card className="bg-muted/50">
          <CardContent className="pt-6 pb-6 text-center">
            <p className="text-muted-foreground mb-2">
              Nenhum alimento registrado para este dia.
            </p>
            <Button variant="link" onClick={() => window.location.href = '/add-food'}>
              Adicionar alimento
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {(["breakfast", "lunch", "dinner", "snack"] as MealType[]).map((mealType) => {
            if (!groupedEntries[mealType]?.length) return null;
            
            return (
              <Card key={mealType}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {getMealTypeIcon(mealType)}
                    {getMealTypeName(mealType)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {groupedEntries[mealType].map((entry) => (
                    <div
                      key={entry.id}
                      className="flex justify-between items-center py-2 border-b last:border-0"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{entry.name}</span>
                        <div className="text-xs text-muted-foreground">
                          {entry.time} • {entry.calories} kcal
                          {entry.protein && ` • ${entry.protein}g prot`}
                          {entry.carbs && ` • ${entry.carbs}g carb`}
                          {entry.fat && ` • ${entry.fat}g gord`}
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Remover este alimento?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Este alimento será
                              removido permanentemente do seu registro.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => removeFoodEntry(entry.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Remover
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default FoodLog;
