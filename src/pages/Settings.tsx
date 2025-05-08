import { useState } from "react";
import { useCalories } from "@/context/CalorieContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types";

const Settings = () => {
  const { user, updateUserGoals, updateUserName } = useCalories();
  const [formData, setFormData] = useState<User>({
    ...user,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      dailyGoals: {
        ...formData.dailyGoals,
        [name]: parseInt(value) || 0,
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserName(formData.name);
    updateUserGoals(formData.dailyGoals);
  };

  return (
    <Layout title="Configurações">
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Atualize as informações do seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Seu nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Digite seu nome"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Metas nutricionais</CardTitle>
            <CardDescription>
              Defina suas metas diárias de calorias e macronutrientes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Meta de calorias (kcal)</Label>
                <Input
                  id="calories"
                  name="calories"
                  type="number"
                  value={formData.dailyGoals.calories}
                  onChange={handleGoalChange}
                  min="0"
                />
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="protein">Proteínas (g)</Label>
                  <Input
                    id="protein"
                    name="protein"
                    type="number"
                    value={formData.dailyGoals.protein || ""}
                    onChange={handleGoalChange}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carbs">Carboidratos (g)</Label>
                  <Input
                    id="carbs"
                    name="carbs"
                    type="number"
                    value={formData.dailyGoals.carbs || ""}
                    onChange={handleGoalChange}
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fat">Gorduras (g)</Label>
                  <Input
                    id="fat"
                    name="fat"
                    type="number"
                    value={formData.dailyGoals.fat || ""}
                    onChange={handleGoalChange}
                    min="0"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          Salvar configurações
        </Button>
      </form>
    </Layout>
  );
};

export default Settings;
