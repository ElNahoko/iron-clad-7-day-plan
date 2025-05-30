// src/components/MusclePlan.tsx

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
} from "@mui/material";
import {
  Sparkles,
  ShoppingCart,
  Dumbbell,
  CheckCircle2,
  Clock,
  Target,
} from "lucide-react";
import { plan } from "../data/plan";

export const MusclePlan: React.FC = () => {
  const [boughtItems, setBoughtItems] = useState<Set<string>>(new Set());
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());

  const toggleBoughtItem = (item: string) => {
    const s = new Set(boughtItems);
    s.has(item) ? s.delete(item) : s.add(item);
    setBoughtItems(s);
  };

  const toggleCompletedDay = (dayName: string) => {
    const s = new Set(completedDays);
    s.has(dayName) ? s.delete(dayName) : s.add(dayName);
    setCompletedDays(s);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-indigo-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent ml-4">
              7-Day Muscle Building Plan
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive nutrition & workouts for optimal muscle growth.
          </p>
          <div className="flex justify-center items-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-slate-500">
              <Target className="w-5 h-5" />
              <span className="font-medium">7 Days</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Beginner Friendly</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Dumbbell className="w-5 h-5" />
              <span className="font-medium">Muscle Building</span>
            </div>
          </div>
        </div>

        {/* Shopping */}
        <section className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <ShoppingCart className="w-10 h-10 text-emerald-600 mr-3" />
            <Typography variant="h4" className="font-bold text-slate-800">
              Shopping List
            </Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.shopping.map((sec, i) => (
              <Paper
                key={i}
                elevation={0}
                className="p-6 bg-white/80 backdrop-blur-sm border rounded-2xl transition hover:shadow-xl hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <Typography variant="h6" className="font-bold">
                    {sec.category}
                  </Typography>
                </div>
                <List dense>
                  {sec.items.map((item, j) => (
                    <ListItem key={j} disablePadding>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={boughtItems.has(item)}
                            onChange={() => toggleBoughtItem(item)}
                            sx={{ "&.Mui-checked": { color: "#059669" } }}
                          />
                        }
                        label={item}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ))}
          </div>
        </section>

        {/* Daily Plans */}
        <section>
          <Typography variant="h4" className="text-center mb-12">
            Daily Plans
          </Typography>

          <Tab.Group>
            <Tab.List className="flex flex-wrap justify-center bg-white/90 backdrop-blur-sm p-3 mb-10 rounded-2xl">
              {plan.days.map((day, idx) => (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    `px-6 py-3 m-1 rounded-xl font-semibold transition ${
                      selected
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-indigo-600 hover:bg-indigo-50"
                    }`
                  }
                >
                  {day.name}
                  {completedDays.has(day.name) && (
                    <CheckCircle2 className="inline-block ml-2 w-4 h-4 text-green-500" />
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {plan.days.map((day, idx) => (
                <Tab.Panel key={idx}>
                  <div className="flex justify-center mb-8">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={completedDays.has(day.name)}
                          onChange={() => toggleCompletedDay(day.name)}
                          sx={{ "&.Mui-checked": { color: "#059669" } }}
                        />
                      }
                      label={`Mark ${day.name} as completed`}
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {(["meal1", "meal2"] as const).map((mealKey) => (
                      <Paper
                        key={mealKey}
                        elevation={0}
                        className={`p-8 rounded-2xl transition hover:shadow-xl ${
                          completedDays.has(day.name)
                            ? "opacity-60 grayscale"
                            : ""
                        } ${
                          mealKey === "meal1"
                            ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500"
                            : "bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500"
                        }`}
                      >
                        <Typography variant="h6" className="font-bold mb-4">
                          {mealKey === "meal1" ? "Meal 1" : "Meal 2"}
                        </Typography>
                        <List dense>
                          {day[mealKey].map((item, m) => (
                            <ListItem key={m} disablePadding>
                              <ListItemText
                                primary={item.label}
                                secondary={
                                  <>
                                    <div className="text-xs">{item.detail}</div>
                                    <div className="text-xs mt-1">
                                      🥩 {item.protein} g • 🍚 {item.carbs} g •
                                      🥑 {item.fats} g • 🔥 {item.calories} kcal
                                      • 🌾 {item.fiber} g
                                    </div>
                                    <div className="text-xs italic mt-1">
                                      {item.instruction}
                                    </div>
                                  </>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    ))}

                    {/* Workout */}
                    <Paper
                      elevation={0}
                      className={`p-8 rounded-2xl transition hover:shadow-xl ${
                        completedDays.has(day.name)
                          ? "opacity-60 grayscale"
                          : ""
                      } bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-emerald-500`}
                    >
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

        {/* Footer */}
        <footer className="text-center mt-20 py-12">
          <Typography
            variant="h6"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Stay consistent, stay strong! 💪
          </Typography>
          <Typography variant="body2" className="text-slate-600 mt-2">
            Your transformation starts today.
          </Typography>
        </footer>
      </div>
    </div>
  );
};

export default MusclePlan;
