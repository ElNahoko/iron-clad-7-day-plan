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
      {emoji} {value}
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
  const [openPrep, setOpenPrep] = useState<boolean>(false);
  const [prepTitle, setPrepTitle] = useState<string>("");
  const [prepText, setPrepText] = useState<string>("");

  const currency = region === "FR" ? "€" : "MAD";
  const weeklyCost = calculateWeeklyCost(region);

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
            {/* <Sparkles className="w-16 h-16 mx-auto text-indigo-600 animate-pulse" /> */}
            <Typography variant="h3" className="font-extrabold text-indigo-700">
              TGDAAAAR CHEEEREK
            </Typography>
            <Typography variant="body1" className="text-slate-600 mt-2">
              {/* Track your nutrition, macros & workouts—region pricing included. */}
            </Typography>
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
              {plan.shopping.map((sec, i) => (
                <Paper
                  key={i}
                  elevation={0}
                  className="p-6 bg-white/80 backdrop-blur-sm border rounded-2xl transition-transform transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <Typography variant="h6" className="font-bold mb-4">
                    {sec.category}
                  </Typography>
                  <List dense>
                    {sec.items.map((it, j) => (
                      <ListItem key={j} disablePadding>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={boughtItems.has(it.name)}
                              onChange={() => toggleBought(it.name)}
                              sx={{ "&.Mui-checked": { color: "#059669" } }}
                            />
                          }
                          label={
                            <span
                              className={
                                boughtItems.has(it.name)
                                  ? "line-through text-gray-400"
                                  : ""
                              }
                            >
                              {it.name} – {currency}
                              {it.price[region].toFixed(2)}
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {(["meal1", "meal2"] as const).map((key) => {
                        const items = day[key];
                        const cost = items.reduce(
                          (s, it) => s + it.price[region],
                          0
                        );
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
                                {key === "meal1" ? "Meal 1" : "Meal 2"} (≈{" "}
                                {currency}
                                {cost.toFixed(2)})
                              </Typography>
                              <Button
                                size="small"
                                onClick={() =>
                                  handlePrep(
                                    `${day.name} ${
                                      key === "meal1" ? "Meal 1" : "Meal 2"
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
