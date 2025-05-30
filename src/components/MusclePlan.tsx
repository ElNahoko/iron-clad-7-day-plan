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
} from "@mui/material";
import {
  Sparkles,
  ShoppingCart,
  Dumbbell,
  CheckCircle2,
  Clock,
  Target,
} from "lucide-react";
import { plan, Region } from "../data/plan";

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
      <span>{emoji}</span> {value}
    </span>
  </Tooltip>
);

const calculateWeeklyCost = (region: Region) =>
  plan.days.reduce(
    (sum, day) =>
      sum +
      day.meal1
        .concat(day.meal2)
        .reduce((s, item) => s + item.price[region], 0),
    0
  );

const MusclePlan: React.FC = () => {
  const [boughtItems, setBoughtItems] = useState<Set<string>>(new Set());
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());
  const [region, setRegion] = useState<Region>("FR");
  const currency = region === "FR" ? "€" : "MAD";
  const weeklyCost = calculateWeeklyCost(region);

  const toggleBought = (name: string) => {
    const s = new Set(boughtItems);
    s.has(name) ? s.delete(name) : s.add(name);
    setBoughtItems(s);
  };

  const toggleCompleted = (dayName: string) => {
    const s = new Set(completedDays);
    s.has(dayName) ? s.delete(dayName) : s.add(dayName);
    setCompletedDays(s);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Region Toggle */}
        <div className="flex justify-end items-center gap-2 mb-4">
          <span>France ({currency})</span>
          <Switch
            checked={region === "MA"}
            onChange={() => setRegion(region === "FR" ? "MA" : "FR")}
            color="success"
          />
          <span>Morocco (MAD)</span>
        </div>

        {/* Header */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-16 h-16 text-indigo-600 animate-pulse" />
          </div>
          <Typography variant="h3" className="font-extrabold text-indigo-700">
            Iron Clad 7-Day Plan
          </Typography>
          <Typography variant="body1" className="text-slate-600 mt-2">
            Track your nutrition, macros, and workouts—region pricing included.
          </Typography>
          <div className="flex justify-center items-center gap-6 mt-6">
            {infoBadges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Tooltip title={badge.label} arrow>
                  <span>{badge.icon}</span>
                </Tooltip>
                <span className="text-slate-500 font-medium">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </header>

        {/* Shopping List */}
        <section className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <ShoppingCart className="w-10 h-10 text-emerald-600 mr-3" />
            <Typography variant="h4" className="font-bold text-slate-800">
              Shopping List
            </Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.shopping.map((section, i) => (
              <Paper
                key={i}
                elevation={0}
                className="p-6 bg-white/80 backdrop-blur-sm border rounded-2xl transition hover:shadow-xl hover:scale-105"
              >
                <Typography variant="h6" className="font-bold mb-4">
                  {section.category}
                </Typography>
                <List dense>
                  {section.items.map((item, j) => (
                    <ListItem key={j} disablePadding>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={boughtItems.has(item.name)}
                            onChange={() => toggleBought(item.name)}
                            sx={{ "&.Mui-checked": { color: "#059669" } }}
                          />
                        }
                        label={
                          <span
                            className={`transition-all duration-300 ${
                              boughtItems.has(item.name)
                                ? "line-through opacity-50"
                                : "opacity-100"
                            }`}
                          >
                            {item.name} – {currency}
                            {item.price[region].toFixed(2)}
                          </span>
                        }
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
            Daily Plans (≈ {currency}
            {weeklyCost.toFixed(2)}/week)
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
                <Tab.Panel key={idx} className="animate-fade-in">
                  <div className="flex justify-center mb-8">
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

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {(["meal1", "meal2"] as const).map((key) => {
                      const items = day[key];
                      const sectionCost = items.reduce(
                        (sum, it) => sum + it.price[region],
                        0
                      );
                      return (
                        <Paper
                          key={key}
                          elevation={0}
                          className={`p-8 rounded-2xl transition hover:shadow-xl ${
                            completedDays.has(day.name)
                              ? "opacity-60 grayscale"
                              : ""
                          } ${
                            key === "meal1"
                              ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500"
                              : "bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500"
                          }`}
                        >
                          <Typography variant="h6" className="font-bold mb-4">
                            {key === "meal1" ? "Meal 1" : "Meal 2"} (≈{" "}
                            {currency}
                            {sectionCost.toFixed(2)})
                          </Typography>
                          <List dense>
                            {items.map((it, m) => (
                              <ListItem key={m} disablePadding>
                                <ListItemText
                                  primary={it.label}
                                  secondary={
                                    <>
                                      <div className="flex flex-wrap gap-2 text-xs mb-1">
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
                                        className="italic text-xs"
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

                    {/* Workout */}
                    <Paper
                      elevation={0}
                      className={`p-8 rounded-2xl transition hover:shadow-xl bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-emerald-500 ${
                        completedDays.has(day.name)
                          ? "opacity-60 grayscale"
                          : ""
                      }`}
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
            {/* Stay consistent, stay strong! 💪 */}
          </Typography>
          <Typography variant="body2" className="text-slate-600 mt-2">
            {/* Your transformation starts today. */}
          </Typography>
        </footer>
      </div>
    </div>
  );
};

export default MusclePlan;
