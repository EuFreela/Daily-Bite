import { useState } from "react";
import { useCalories } from "@/context/CalorieContext";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { MealType } from "@/types";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
  const { addFoodEntry } = useCalories();
  const navigate = useNavigate();
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [mealType, setMealType] = useState<MealType>("breakfast");
  const [currentTime] = useState(format(new Date(), "HH:mm"));
  const [currentDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!foodName || !calories) {
      return;
    }

    addFoodEntry({
      name: foodName,
      calories: parseInt(calories),
      protein: protein ? parseInt(protein) : undefined,
      carbs: carbs ? parseInt(carbs) : undefined,
      fat: fat ? parseInt(fat) : undefined,
      mealType: mealType,
      date: currentDate,
      time: currentTime,
    });

    // Reset form or navigate
    navigate("/food-log");
  };

  return (
    <Layout title="Adicionar alimento">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="foodName">Nome do alimento</Label>
                <Input
                  id="foodName"
                  placeholder="Ex: Maçã, Arroz, Frango grelhado"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="calories">Calorias (kcal)</Label>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="protein" className="text-muted-foreground">Proteína (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="carbs" className="text-muted-foreground">Carboidratos (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fat" className="text-muted-foreground">Gorduras (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    placeholder="0"
                    min="0"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Tipo de refeição</Label>
              <RadioGroup value={mealType} onValueChange={(value) => setMealType(value as MealType)}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 p-2 border rounded-md">
                    <RadioGroupItem value="breakfast" id="breakfast" />
                    <Label htmlFor="breakfast" className="cursor-pointer">Café da manhã</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 border rounded-md">
                    <RadioGroupItem value="lunch" id="lunch" />
                    <Label htmlFor="lunch" className="cursor-pointer">Almoço</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 border rounded-md">
                    <RadioGroupItem value="dinner" id="dinner" />
                    <Label htmlFor="dinner" className="cursor-pointer">Jantar</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 border rounded-md">
                    <RadioGroupItem value="snack" id="snack" />
                    <Label htmlFor="snack" className="cursor-pointer">Lanche</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Adicionar alimento
            </Button>
          </form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default AddFood;