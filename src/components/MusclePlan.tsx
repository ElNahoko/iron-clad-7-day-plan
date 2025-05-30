
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Checkbox, 
  FormControlLabel 
} from '@mui/material';
import { Sparkles, ShoppingCart, Dumbbell, CheckCircle2, Clock, Target } from 'lucide-react';
import { plan } from '../data/plan';

const MusclePlan: React.FC = () => {
  // State for shopping list items (bought status)
  const [boughtItems, setBoughtItems] = useState<Set<string>>(new Set());
  
  // State for completed day plans
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());

  const toggleBoughtItem = (item: string) => {
    const newBoughtItems = new Set(boughtItems);
    if (newBoughtItems.has(item)) {
      newBoughtItems.delete(item);
    } else {
      newBoughtItems.add(item);
    }
    setBoughtItems(newBoughtItems);
  };

  const toggleCompletedDay = (dayName: string) => {
    const newCompletedDays = new Set(completedDays);
    if (newCompletedDays.has(dayName)) {
      newCompletedDays.delete(dayName);
    } else {
      newCompletedDays.add(dayName);
    }
    setCompletedDays(newCompletedDays);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-indigo-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent ml-4">
              7-Day Muscle Building Plan
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transform your physique with this comprehensive nutrition and workout program designed for optimal muscle growth
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

        {/* Enhanced Shopping Section */}
        <section className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <ShoppingCart className="w-10 h-10 text-emerald-600 mr-3" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <h2 className="text-4xl font-bold text-slate-800">Shopping List</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.shopping.map((section, index) => (
              <div key={index} className="group">
                <Paper 
                  elevation={0} 
                  className="p-6 h-full bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:bg-white group-hover:border-indigo-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="h6" className="font-bold text-slate-800 text-lg">
                      {section.category}
                    </Typography>
                    <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <List dense className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} className="px-0 py-1">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={boughtItems.has(item)}
                              onChange={() => toggleBoughtItem(item)}
                              className="text-emerald-600"
                              sx={{
                                '&.Mui-checked': {
                                  color: '#059669',
                                },
                              }}
                            />
                          }
                          label={
                            <span 
                              className={`${
                                boughtItems.has(item) 
                                  ? 'line-through text-slate-400' 
                                  : 'text-slate-700'
                              } transition-all duration-300 text-sm font-medium`}
                            >
                              {item}
                            </span>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced Daily Plans Section */}
        <section>
          <h2 className="text-4xl font-bold text-slate-800 mb-12 text-center">
            Daily Plans
          </h2>
          
          <Tab.Group>
            <Tab.List className="flex flex-wrap justify-center bg-white/90 backdrop-blur-sm rounded-2xl p-3 mb-10 shadow-lg border border-slate-200/50">
              {plan.days.map((day, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    `px-6 py-3 m-1 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                      selected
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                        : 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:scale-102'
                    }`
                  }
                >
                  <div className="flex items-center gap-2">
                    {completedDays.has(day.name) && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                    {day.name}
                  </div>
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              {plan.days.map((day, dayIndex) => (
                <Tab.Panel key={dayIndex} className="animate-fade-in">
                  <div className="mb-8 flex items-center justify-center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={completedDays.has(day.name)}
                          onChange={() => toggleCompletedDay(day.name)}
                          sx={{
                            '&.Mui-checked': {
                              color: '#059669',
                            },
                          }}
                        />
                      }
                      label={
                        <span className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Mark {day.name} as completed
                        </span>
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Enhanced Meal 1 */}
                    <div className="group">
                      <Paper 
                        elevation={0} 
                        className={`p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-2xl transition-all duration-500 hover:shadow-xl hover:scale-105 ${
                          completedDays.has(day.name) ? 'opacity-60 grayscale' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <Typography variant="h6" className="font-bold text-blue-700">
                            Meal 1
                          </Typography>
                        </div>
                        <List dense className="space-y-3">
                          {day.meal1.map((meal, mealIndex) => (
                            <ListItem key={mealIndex} className="px-0 py-2 bg-white/50 rounded-lg">
                              <ListItemText
                                primary={
                                  <strong className="text-slate-800 text-sm">{meal.label}</strong>
                                }
                                secondary={
                                  <span className="text-slate-600 text-xs">{meal.detail}</span>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </div>

                    {/* Enhanced Meal 2 */}
                    <div className="group">
                      <Paper 
                        elevation={0} 
                        className={`p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-500 rounded-2xl transition-all duration-500 hover:shadow-xl hover:scale-105 ${
                          completedDays.has(day.name) ? 'opacity-60 grayscale' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <Typography variant="h6" className="font-bold text-purple-700">
                            Meal 2
                          </Typography>
                        </div>
                        <List dense className="space-y-3">
                          {day.meal2.map((meal, mealIndex) => (
                            <ListItem key={mealIndex} className="px-0 py-2 bg-white/50 rounded-lg">
                              <ListItemText
                                primary={
                                  <strong className="text-slate-800 text-sm">{meal.label}</strong>
                                }
                                secondary={
                                  <span className="text-slate-600 text-xs">{meal.detail}</span>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </div>

                    {/* Enhanced Workout */}
                    <div className="group">
                      <Paper 
                        elevation={0} 
                        className={`p-8 bg-gradient-to-br from-emerald-50 to-green-50 border-l-4 border-emerald-500 rounded-2xl transition-all duration-500 hover:shadow-xl hover:scale-105 ${
                          completedDays.has(day.name) ? 'opacity-60 grayscale' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <Dumbbell className="w-5 h-5 text-emerald-600" />
                          <Typography variant="h6" className="font-bold text-emerald-700">
                            Workout
                          </Typography>
                        </div>
                        <List dense className="space-y-3">
                          {day.workout.map((exercise, exerciseIndex) => (
                            <ListItem key={exerciseIndex} className="px-0 py-2 bg-white/50 rounded-lg">
                              <ListItemText
                                primary={
                                  <span className="text-slate-800 font-medium text-sm flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                    {exercise}
                                  </span>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </section>

        {/* Enhanced Footer */}
        <footer className="text-center mt-20 py-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            <p className="text-lg font-semibold mb-2">
              Stay consistent, stay strong! 💪
            </p>
            <p className="text-slate-600">
              Your transformation starts today.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MusclePlan;
