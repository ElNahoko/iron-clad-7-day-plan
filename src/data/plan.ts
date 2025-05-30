
export interface MealItem {
  label: string;
  detail: string;
}

export interface DayPlan {
  name: string;
  meal1: MealItem[];
  meal2: MealItem[];
  workout: string[];
}

export interface ShoppingSection {
  category: string;
  items: string[];
}

export interface Plan {
  shopping: ShoppingSection[];
  days: DayPlan[];
}

export const plan: Plan = {
  shopping: [
    {
      category: 'Meats & Fish',
      items: [
        'Entrecote de boeuf (3x300g)',
        'Filets de saumon (3x200g)',
        'Cotes d\'agneau (2x200g)',
        'Filets de poulet (2x200g)',
        'Crevettes (2x150g)',
      ],
    },
    {
      category: 'Oeufs & Laitiers',
      items: ['Oeufs (12 pcs)', 'Yaourt grec 0% (4x150g)'],
    },
    {
      category: 'Glucides',
      items: [
        'Pommes de terre 1kg',
        'Patates douces 600g',
        'Riz basmati 500g',
        'Pain complet 1 baguette',
      ],
    },
    {
      category: 'Fruits & Veg',
      items: [
        'Baies melangees 500g',
        'Pommes/poires 6 pcs',
        'Legumes varies 1.6kg',
        'Avocats 4 pcs',
      ],
    },
    {
      category: 'Lipides & Seeds',
      items: [
        'Huile d\'olive',
        'Beurre de cacahuete',
        'Amandes/noix 200g',
        'Graines de chia 200g',
      ],
    },
    {
      category: 'Epices & Extras',
      items: [
        'Herbes de Provence, thym, romarin, ail',
        'Fleur de sel ou sel rose',
        'Citron (4 pcs)',
        'Sauce soja faible sel',
      ],
    },
  ],
  days: [
    {
      name: 'Lundi',
      meal1: [
        { label: 'Saumon grille', detail: '200g saumon, romarin & citron' },
        {
          label: 'Avocat & chia',
          detail: '1 avocat + 1 c.a s. graines de chia',
        },
        { label: 'Patate douce', detail: '200g rotie a l\'huile & thym' },
        { label: 'Baies melangees', detail: '100g' },
        { label: 'Creatine', detail: '5g dans 150g yaourt grec' },
      ],
      meal2: [
        { label: 'Entrecote', detail: '150g, fleur de sel' },
        { label: 'Brocolis & courgettes rotis', detail: '200g, ail & herbes' },
        { label: 'Riz basmati', detail: '150g vapeur' },
        { label: 'Pomme', detail: '1 pc' },
      ],
      workout: [
        'Developpe couche 4x8',
        'Developpe militaire 4x8',
        'Dips 3x12',
        'Elevations laterales 3x15',
      ],
    },
    {
      name: 'Mardi',
      meal1: [
        { label: 'Oeufs brouilles', detail: '2 oeufs, ail & persil' },
        { label: 'Poulet poele', detail: '150g filet de poulet' },
        { label: 'Pommes de terre vapeur', detail: '200g, romarin' },
        { label: 'Banane', detail: '1 pc' },
        { label: 'Beurre de cacahuete', detail: '1 c.a s.' },
      ],
      meal2: [
        { label: 'Cotes d\'agneau', detail: '200g grillees' },
        { label: 'Epinards sautes', detail: '200g, ail & huile d\'olive' },
        { label: 'Pain complet', detail: '2 tranches' },
        { label: 'Poire', detail: '1 pc' },
      ],
      workout: ['Marche ou velo leger (active recovery)'],
    },
    {
      name: 'Mercredi',
      meal1: [
        { label: 'Saumon poche', detail: '200g' },
        { label: 'Avocat & chia', detail: '1 avocat + graines de chia' },
        { label: 'Patate douce', detail: '150g' },
        { label: 'Baies', detail: '100g' },
        { label: 'Creatine', detail: '5g dans yaourt' },
      ],
      meal2: [
        { label: 'Crevettes poelees', detail: '150g, citron & piment' },
        { label: 'Legumes rotis', detail: '200g melange' },
        { label: 'Riz basmati', detail: '150g vapeur' },
        { label: 'Pomme', detail: '1 pc' },
      ],
      workout: [
        'Tractions ou tirage vertical 4x8',
        'Rowing a la barre 4x10',
        'Curl barre 3x12',
        'Face pulls 3x15',
      ],
    },
    {
      name: 'Jeudi',
      meal1: [
        { label: 'Oeufs mollets', detail: '3 oeufs' },
        { label: 'Poulet grille', detail: '150g' },
        { label: 'Pommes de terre', detail: '200g vapeur' },
        { label: 'Banane', detail: '1 pc' },
      ],
      meal2: [
        { label: 'Steak maigre', detail: '200g' },
        { label: 'Brocolis vapeur', detail: '200g' },
        { label: 'Pain complet', detail: '2 tranches' },
        { label: 'Poire', detail: '1 pc' },
      ],
      workout: ['Planche 3x60s', 'Crunch 3x15', 'Releves de jambes 3x15'],
    },
    {
      name: 'Vendredi',
      meal1: [
        { label: 'Saumon grille', detail: '200g' },
        { label: 'Avocat & chia', detail: '1 avocat + graines de chia' },
        { label: 'Patate douce', detail: '150g' },
        { label: 'Baies', detail: '100g' },
        { label: 'Creatine', detail: '5g' },
      ],
      meal2: [
        { label: 'Cotes d\'agneau', detail: '150g' },
        { label: 'Legumes rotis', detail: '200g' },
        { label: 'Riz basmati', detail: '150g' },
        { label: 'Pomme', detail: '1 pc' },
      ],
      workout: [
        'Squat 4x10',
        'Developpe couche 4x10',
        'Rowing 4x10',
        'Dips 4x10',
        'Curl 4x10',
      ],
    },
    {
      name: 'Samedi',
      meal1: [
        { label: 'Omelette', detail: '3 oeufs + 150g poulet' },
        { label: 'Pommes de terre', detail: '200g' },
        { label: 'Avocat', detail: '1 pc' },
      ],
      meal2: [
        { label: 'Poisson blanc', detail: '200g cabillaud' },
        { label: 'Epinards sautes', detail: '200g' },
        { label: 'Pain complet', detail: '2 tranches' },
        { label: 'Poire', detail: '1 pc' },
      ],
      workout: ['Yoga / etirements'],
    },
    {
      name: 'Dimanche',
      meal1: [
        { label: 'Oeufs + saumon fume', detail: '2 oeufs + 150g saumon fume' },
        { label: 'Patate douce', detail: '200g' },
        { label: 'Baies', detail: '100g' },
      ],
      meal2: [
        { label: 'Entrecote grillee', detail: '150g' },
        { label: 'Legumes varies', detail: '200g' },
        { label: 'Riz basmati', detail: '150g' },
        { label: 'Pomme', detail: '1 pc' },
      ],
      workout: ['Marche rapide 45min'],
    },
  ],
};
