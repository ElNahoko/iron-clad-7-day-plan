import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Switch,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material";
import {
  Sparkles,
  ShoppingCart,
  Dumbbell,
  CheckCircle2,
  Clock,
  Target,
} from "lucide-react";
import { plan, Region, DailyGroceryItem } from "../data/plan";

const infoBadges = [
  { icon: <Target className="w-5 h-5 text-slate-500" />, label: "7 Days" },
  {
    icon: <Clock className="w-5 h-5 text-slate-500" />,
    label: "Beginner Friendly",
  },
  {
    icon: <Dumbbell className="w-5 h-5 text-slate-500" />,
    label: "Muscle Building",
  },
];

const MacroIcon = ({
  emoji,
  value,
  title,
}: {
  emoji: string;
  value: number | string;
  title: string;
}) => (
  <Tooltip title={title} arrow>
    <span className="cursor-help select-none text-xs flex items-center gap-1">
      {emoji} {value}
    </span>
  </Tooltip>
);

// Add function to calculate total nutrition values for a meal
const calculateMealTotals = (items: any[]) => {
  return items.reduce(
    (totals, item) => {
      return {
        protein: totals.protein + (item.protein || 0),
        carbs: totals.carbs + (item.carbs || 0),
        fats: totals.fats + (item.fats || 0),
        calories: totals.calories + (item.calories || 0),
        fiber: totals.fiber + (item.fiber || 0),
      };
    },
    { protein: 0, carbs: 0, fats: 0, calories: 0, fiber: 0 }
  );
};

// Add function to calculate full day nutrition
const calculateDayTotals = (meal1Items: any[], meal2Items: any[]) => {
  const meal1Totals = calculateMealTotals(meal1Items);
  const meal2Totals = calculateMealTotals(meal2Items);

  return {
    protein: meal1Totals.protein + meal2Totals.protein,
    carbs: meal1Totals.carbs + meal2Totals.carbs,
    fats: meal1Totals.fats + meal2Totals.fats,
    calories: meal1Totals.calories + meal2Totals.calories,
    fiber: meal1Totals.fiber + meal2Totals.fiber,
  };
};

// Add reference values for daily nutrition
const dailyReferenceValues = {
  // These are example values - adjust based on specific dietary guidelines
  protein: 56, // grams for average adult
  carbs: 275, // grams based on 2000 calorie diet
  fats: 78, // grams based on 2000 calorie diet
  calories: 2000, // standard reference value
  fiber: 28, // grams based on 2000 calorie diet
};

// You could add customizable reference values based on user profile
const getUserReferenceValues = (
  weight: number,
  isActive: boolean,
  isMale: boolean
) => {
  // This is just an example calculation
  const proteinMultiplier = isActive ? 1.6 : 0.8; // g per kg
  const calorieBase = isMale ? 2200 : 1800;

  return {
    protein: Math.round(weight * proteinMultiplier),
    carbs: Math.round((calorieBase * 0.55) / 4), // 55% of calories from carbs, 4 cal per gram
    fats: Math.round((calorieBase * 0.25) / 9), // 25% of calories from fat, 9 cal per gram
    calories: calorieBase,
    fiber: 28, // generally consistent across profiles
  };
};

const calculateDailyCost = (groceries: DailyGroceryItem[], region: Region) =>
  groceries.reduce((sum, item) => sum + item.price[region], 0);

const MusclePlan: React.FC = () => {
  const [boughtItems, setBoughtItems] = useState<Set<string>>(new Set());
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());
  const [region, setRegion] = useState<Region>("FR");
  const [openPrep, setOpenPrep] = useState<boolean>(false);
  const [prepTitle, setPrepTitle] = useState<string>("");
  const [prepText, setPrepText] = useState<string>("");

  const currency = region === "FR" ? "€" : "MAD";
  const weeklyCost = plan.days.reduce(
    (sum, day) => sum + calculateDailyCost(day.dailyGroceries, region),
    0
  );

  const toggleBought = (name: string) => {
    const s = new Set(boughtItems);
    s.has(name) ? s.delete(name) : s.add(name);
    setBoughtItems(s);
  };

  const toggleCompleted = (day: string) => {
    const s = new Set(completedDays);
    s.has(day) ? s.delete(day) : s.add(day);
    setCompletedDays(s);
  };

  const handlePrep = (title: string, instruction: string) => {
    setPrepTitle(title);
    setPrepText(instruction.replace(/\n/g, "<br/>"));
    setOpenPrep(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-end items-center gap-2 mb-4">
            <span>France ({currency})</span>
            <Switch
              checked={region === "MA"}
              onChange={() => setRegion(region === "FR" ? "MA" : "FR")}
              color="success"
            />
            <span>Morocco (MAD)</span>
          </div>

          <header className="text-center mb-16">
            <Typography variant="body1" className="text-slate-600 mt-2">
            </Typography>
          </header>

          <section className="mb-16">
            <Paper
              elevation={0}
              className="p-6 bg-white/80 backdrop-blur-sm border rounded-2xl"
            >
              <Typography
                variant="body1"
                className="text-center text-slate-600 mb-4"
              >
                This plan is designed for daily grocery shopping. Each day shows
                exactly what to buy for that day's meals.
              </Typography>
              <div className="flex justify-center gap-4 text-sm text-slate-500">
                <span>
                  Total Weekly Cost: {currency}
                  {weeklyCost.toFixed(2)}
                </span>
                <span>•</span>
                <span>
                  Average Daily Cost: {currency}
                  {(weeklyCost / 7).toFixed(2)}
                </span>
              </div>
            </Paper>
          </section>

          <section>
            <Typography variant="h4" className="text-center mb-12">
              Daily Plans & Shopping Lists
            </Typography>
            <Tab.Group>
              <div className="sticky top-0 bg-white/90 backdrop-blur-sm z-10 p-3 mb-4 rounded-2xl">
                <Tab.List className="flex flex-wrap justify-center">
                  {plan.days.map((day, idx) => (
                    <Tab
                      key={idx}
                      className={({ selected }) =>
                        `px-6 py-2 m-1 rounded-lg font-medium transition ${
                          selected
                            ? "bg-indigo-600 text-white"
                            : "text-indigo-600 hover:bg-indigo-100"
                        }`
                      }
                    >
                      {day.name}
                    </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels>
                {plan.days.map((day, idx) => (
                  <Tab.Panel key={idx} className="space-y-8">
                    <div className="flex justify-center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={completedDays.has(day.name)}
                            onChange={() => toggleCompleted(day.name)}
                            sx={{ "&.Mui-checked": { color: "#059669" } }}
                          />
                        }
                        label={`Mark ${day.name} completed`}
                      />
                    </div>

                    {/* Move full day nutrition to the top for better visibility */}
                    <Paper
                      elevation={0}
                      className="p-4 rounded-2xl bg-white border-2 border-blue-300 shadow-md"
                    >
                      <div className="flex items-center mb-3 justify-center">
                        <Sparkles className="w-5 h-5 text-blue-600 mr-1" />
                        <Typography variant="h6" className="font-bold text-blue-800 uppercase">
                          Day Overview: Nutrition Targets
                        </Typography>
                      </div>

                      {(() => {
                        const dayTotals = calculateDayTotals(day.meal1, day.meal2);
                        return (
                          <div className="grid grid-cols-5 gap-2 text-center">
                            {[
                              {
                                label: "Protein",
                                value: dayTotals.protein,
                                unit: "g",
                                ref: dailyReferenceValues.protein,
                              },
                              {
                                label: "Carbs",
                                value: dayTotals.carbs,
                                unit: "g",
                                ref: dailyReferenceValues.carbs,
                              },
                              {
                                label: "Fats",
                                value: dayTotals.fats,
                                unit: "g",
                                ref: dailyReferenceValues.fats,
                              },
                              {
                                label: "Calories",
                                value: dayTotals.calories,
                                unit: "",
                                ref: dailyReferenceValues.calories,
                              },
                              {
                                label: "Fiber",
                                value: dayTotals.fiber,
                                unit: "g",
                                ref: dailyReferenceValues.fiber,
                              },
                            ].map((item, i) => (
                              <div key={i} className="flex flex-col">
                                <span className="text-xs font-semibold text-blue-900">{item.label}</span>
                                <span className="text-xl font-bold text-blue-800">
                                  {item.value.toFixed(item.label === "Calories" ? 0 : 1)}
                                  <span className="text-xs">{item.unit}</span>
                                </span>
                                <div className="w-full mt-1 mb-0.5 relative">
                                  <div className="absolute -top-4 right-0 text-xs bg-white border border-blue-200 rounded-sm px-1 text-blue-800">
                                    {Math.round((item.value / item.ref) * 100)}% of DV
                                  </div>
                                  <div className="bg-blue-100 h-1.5 w-full rounded-full">
                                    <div 
                                      className="bg-blue-500 h-1.5 rounded-full"
                                      style={{ width: `${Math.min(100, Math.round((item.value / item.ref) * 100))}%` }}
                                      title={`${Math.round((item.value / item.ref) * 100)}% of daily value`}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                      
                      {/* Add explanation of percentages */}
                      <div className="mt-4 text-xs text-blue-700 bg-blue-50 p-2 rounded-lg">
                        <strong>What are these percentages?</strong> They show how much of the recommended daily nutrition values this meal plan provides. Based on average adult needs with a 2000 calorie diet.
                      </div>
                    </Paper>

                    <Paper
                      elevation={0}
                      className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200"
                    >
                      <div className="flex items-center mb-4">
                        <ShoppingCart className="w-6 h-6 text-emerald-600 mr-2" />
                        <Typography variant="h6" className="font-bold">
                          Today's Shopping List ({currency}
                          {calculateDailyCost(
                            day.dailyGroceries,
                            region
                          ).toFixed(2)}
                          )
                        </Typography>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(
                          day.dailyGroceries.reduce((acc, item) => {
                            if (!acc[item.category]) acc[item.category] = [];
                            acc[item.category].push(item);
                            return acc;
                          }, {} as Record<string, DailyGroceryItem[]>)
                        ).map(([category, items]) => (
                          <div key={category} className="space-y-2">
                            <Chip
                              label={category}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                            {items.map((item, i) => (
                              <div key={i} className="flex items-center">
                                <Checkbox
                                  size="small"
                                  checked={boughtItems.has(
                                    `${day.name}-${item.name}`
                                  )}
                                  onChange={() =>
                                    toggleBought(`${day.name}-${item.name}`)
                                  }
                                  sx={{ "&.Mui-checked": { color: "#059669" } }}
                                />
                                <span
                                  className={`text-sm ${
                                    boughtItems.has(`${day.name}-${item.name}`)
                                      ? "line-through text-gray-400"
                                      : ""
                                  }`}
                                >
                                  {item.name} ({item.quantity}) - {currency}
                                  {item.price[region].toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </Paper>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {(["meal1", "meal2"] as const).map((key) => {
                        const items = day[key];
                        const cost = items.reduce(
                          (s, it) => s + it.price[region],
                          0
                        );
                        // Calculate total nutritional values for this meal
                        const mealTotals = calculateMealTotals(items);
                        const gradient =
                          key === "meal1"
                            ? "from-blue-400 to-blue-600"
                            : "from-purple-400 to-pink-600";
                        return (
                          <Paper
                            key={key}
                            elevation={0}
                            className={`p-6 rounded-2xl bg-white relative before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-gradient-to-b ${gradient}`}
                          >
                            <div className="flex justify-between items-center mb-4">
                              <Typography variant="h6" className="font-bold">
                                {key === "meal1" ? "Meal 1" : "Meal 2"} (≈{" "}
                                {currency}
                                {cost.toFixed(2)})
                              </Typography>
                              <Button
                                size="small"
                                onClick={() =>
                                  handlePrep(
                                    `${day.name} ${
                                      key === "meal1" ? "Meal 1" : "Meal 2"
                                    }`,
                                    items
                                      .map(
                                        (it) =>
                                          `${it.label}:\n${it.instruction}`
                                      )
                                      .join("\n\n")
                                  )
                                }
                              >
                                Prep 🛠️
                              </Button>
                            </div>

                            {/* Replace the meal total nutrition display with a more distinct design */}
                            <div className="mb-4 bg-gradient-to-r from-indigo-50 to-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm">
                              <Typography
                                variant="subtitle2"
                                className="font-bold text-indigo-800 mb-2 flex items-center"
                              >
                                <Sparkles className="w-4 h-4 mr-1" /> MEAL TOTAL NUTRITION
                              </Typography>
                              <div className="grid grid-cols-5 gap-2 text-center">
                                <div className="flex flex-col items-center bg-white rounded-lg p-2">
                                  <span className="text-xs text-gray-500 mb-1">Protein</span>
                                  <span className="font-bold text-indigo-700">{mealTotals.protein.toFixed(1)}g</span>
                                </div>
                                <div className="flex flex-col items-center bg-white rounded-lg p-2">
                                  <span className="text-xs text-gray-500 mb-1">Carbs</span>
                                  <span className="font-bold text-indigo-700">{mealTotals.carbs.toFixed(1)}g</span>
                                </div>
                                <div className="flex flex-col items-center bg-white rounded-lg p-2">
                                  <span className="text-xs text-gray-500 mb-1">Fats</span>
                                  <span className="font-bold text-indigo-700">{mealTotals.fats.toFixed(1)}g</span>
                                </div>
                                <div className="flex flex-col items-center bg-white rounded-lg p-2">
                                  <span className="text-xs text-gray-500 mb-1">Calories</span>
                                  <span className="font-bold text-indigo-700">{mealTotals.calories.toFixed(0)}</span>
                                </div>
                                <div className="flex flex-col items-center bg-white rounded-lg p-2">
                                  <span className="text-xs text-gray-500 mb-1">Fiber</span>
                                  <span className="font-bold text-indigo-700">{mealTotals.fiber.toFixed(1)}g</span>
                                </div>
                              </div>
                            </div>

                            <List dense className="space-y-2">
                              {items.map((it, m) => (
                                <ListItem key={m} disablePadding>
                                  <ListItemText
                                    primary={it.label}
                                    secondary={
                                      <>
                                        <div className="flex flex-wrap gap-2 text-xs mb-2">
                                          <MacroIcon
                                            emoji="🥩"
                                            value={it.protein}
                                            title="Protein (g)"
                                          />
                                          <MacroIcon
                                            emoji="🍚"
                                            value={it.carbs}
                                            title="Carbs (g)"
                                          />
                                          <MacroIcon
                                            emoji="🥑"
                                            value={it.fats}
                                            title="Fats (g)"
                                          />
                                          <MacroIcon
                                            emoji="🔥"
                                            value={it.calories}
                                            title="Calories"
                                          />
                                          <MacroIcon
                                            emoji="🌾"
                                            value={it.fiber}
                                            title="Fiber (g)"
                                          />
                                          <MacroIcon
                                            emoji="💶"
                                            value={it.price[region].toFixed(2)}
                                            title="Price"
                                          />
                                        </div>
                                        <Typography
                                          variant="body2"
                                          className="text-xs italic"
                                        >
                                          {it.instruction}
                                        </Typography>
                                      </>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Paper>
                        );
                      })}
                      <Paper elevation={0} className="p-6 rounded-2xl bg-white">
                        <div className="flex items-center mb-4">
                          <Dumbbell className="w-5 h-5 text-emerald-600 mr-2" />
                          <Typography variant="h6" className="font-bold">
                            Workout
                          </Typography>
                        </div>
                        <List dense>
                          {day.workout.map((ex, e) => (
                            <ListItem key={e} disablePadding>
                              <ListItemText primary={ex} />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </section>
        </div>
      </div>
      <Dialog open={openPrep} onClose={() => setOpenPrep(false)} fullWidth>
        <DialogTitle>{prepTitle}</DialogTitle>
        <DialogContent dividers>
          <div dangerouslySetInnerHTML={{ __html: prepText }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPrep(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MusclePlan;
