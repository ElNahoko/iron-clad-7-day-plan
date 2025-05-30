
import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { 
  Grid2 as Grid, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Checkbox, 
  FormControlLabel 
} from '@mui/material';
import { Sparkles, ShoppingCart } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              7-Day Muscle Building Plan
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your physique with this comprehensive nutrition and workout program
          </p>
        </div>

        {/* Shopping Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <ShoppingCart className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Shopping List</h2>
          </div>
          
          <Grid container spacing={3}>
            {plan.shopping.map((section, index) => (
              <Grid xs={12} sm={6} md={4} key={index}>
                <Paper 
                  elevation={2} 
                  className="p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <Typography variant="h6" className="font-bold text-gray-800 mb-4 text-center">
                    {section.category}
                  </Typography>
                  <List dense>
                    {section.items.map((item, itemIndex) => (
                      <ListItem key={itemIndex} className="px-0">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={boughtItems.has(item)}
                              onChange={() => toggleBoughtItem(item)}
                              className="text-indigo-600"
                            />
                          }
                          label={
                            <span 
                              className={`${
                                boughtItems.has(item) 
                                  ? 'line-through text-gray-400' 
                                  : 'text-gray-700'
                              } transition-colors duration-200`}
                            >
                              {item}
                            </span>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </section>

        {/* Daily Plans Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Daily Plans
          </h2>
          
          <Tab.Group>
            <Tab.List className="flex flex-wrap justify-center bg-white rounded-xl p-2 mb-8 shadow-lg">
              {plan.days.map((day, index) => (
                <Tab
                  key={index}
                  className={({ selected }) =>
                    `px-4 py-2 m-1 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                      selected
                        ? 'bg-indigo-700 text-white shadow-md'
                        : 'text-indigo-500 hover:bg-indigo-50 hover:text-indigo-700'
                    }`
                  }
                >
                  {day.name}
                </Tab>
              ))}
            </Tab.List>

            <Tab.Panels>
              {plan.days.map((day, dayIndex) => (
                <Tab.Panel key={dayIndex}>
                  <div className="mb-4 flex items-center justify-center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={completedDays.has(day.name)}
                          onChange={() => toggleCompletedDay(day.name)}
                          className="text-green-600"
                        />
                      }
                      label={
                        <span className="text-lg font-semibold text-gray-700">
                          Mark {day.name} as completed
                        </span>
                      }
                    />
                  </div>

                  <Grid container spacing={4}>
                    {/* Meal 1 */}
                    <Grid xs={12} md={4}>
                      <Paper 
                        elevation={3} 
                        className={`p-6 bg-gray-50 border-t-4 border-indigo-500 transition-all duration-300 hover:shadow-lg ${
                          completedDays.has(day.name) ? 'opacity-60' : ''
                        }`}
                      >
                        <Typography variant="h6" className="font-bold text-indigo-700 mb-4">
                          Meal 1
                        </Typography>
                        <List dense>
                          {day.meal1.map((meal, mealIndex) => (
                            <ListItem key={mealIndex} className="px-0">
                              <ListItemText
                                primary={
                                  <strong className="text-gray-800">{meal.label}</strong>
                                }
                                secondary={
                                  <span className="text-gray-600">{meal.detail}</span>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </Grid>

                    {/* Meal 2 */}
                    <Grid xs={12} md={4}>
                      <Paper 
                        elevation={3} 
                        className={`p-6 bg-gray-50 border-t-4 border-indigo-500 transition-all duration-300 hover:shadow-lg ${
                          completedDays.has(day.name) ? 'opacity-60' : ''
                        }`}
                      >
                        <Typography variant="h6" className="font-bold text-indigo-700 mb-4">
                          Meal 2
                        </Typography>
                        <List dense>
                          {day.meal2.map((meal, mealIndex) => (
                            <ListItem key={mealIndex} className="px-0">
                              <ListItemText
                                primary={
                                  <strong className="text-gray-800">{meal.label}</strong>
                                }
                                secondary={
                                  <span className="text-gray-600">{meal.detail}</span>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </Grid>

                    {/* Workout */}
                    <Grid xs={12} md={4}>
                      <Paper 
                        elevation={3} 
                        className={`p-6 bg-green-50 border-t-4 border-green-500 transition-all duration-300 hover:shadow-lg ${
                          completedDays.has(day.name) ? 'opacity-60' : ''
                        }`}
                      >
                        <Typography variant="h6" className="font-bold text-green-700 mb-4">
                          Workout
                        </Typography>
                        <List dense>
                          {day.workout.map((exercise, exerciseIndex) => (
                            <ListItem key={exerciseIndex} className="px-0">
                              <ListItemText
                                primary={
                                  <span className="text-gray-800 font-medium">{exercise}</span>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Paper>
                    </Grid>
                  </Grid>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 py-8">
          <p className="text-gray-500 text-sm">
            Stay consistent, stay strong! 💪 Your transformation starts today.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MusclePlan;
