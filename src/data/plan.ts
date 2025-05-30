
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
        'Entrecôte de bœuf (3×300g)',
        'Filets de saumon (3×200g)',
        'Côtes d'agneau (2×200g)',
        'Filets de poulet (2×200g)',
        'Crevettes (2×150g)',
      ],
    },
    {
      category: 'Œufs & Laitiers',
      items: ['Œufs (12 pcs)', 'Yaourt grec 0% (4×150g)'],
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
        'Baies mélangées 500g',
        'Pommes/poires 6 pcs',
        'Légumes variés 1.6kg',
        'Avocats 4 pcs',
      ],
    },
    {
      category: 'Lipides & Seeds',
      items: [
        'Huile d'olive',
        'Beurre de cacahuète',
        'Amandes/noix 200g',
        'Graines de chia 200g',
      ],
    },
    {
      category: 'Épices & Extras',
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
        { label: 'Saumon grillé', detail: '200g saumon, romarin & citron' },
        {
          label: 'Avocat & chia',
          detail: '1 avocat + 1 c.à s. graines de chia',
        },
        { label: 'Patate douce', detail: '200g rôtie à l'huile & thym' },
        { label: 'Baies mélangées', detail: '100g' },
        { label: 'Créatine', detail: '5g dans 150g yaourt grec' },
      ],
      meal2: [
        { label: 'Entrecôte', detail: '150g, fleur de sel' },
        { label: 'Brocolis & courgettes rôtis', detail: '200g, ail & herbes' },
        { label: 'Riz basmati', detail: '150g vapeur' },
        { label: 'Pomme', detail: '1 pc' },
      ],
      workout: [
        'Développé couché 4×8',
        'Développé militaire 4×8',
        'Dips 3×12',
        'Élévations latérales 3×15',
      ],
    },
    {
      name: 'Mardi',
      meal1: [
        { label: 'Oeufs brouillés', detail: '2 œufs, ail & persil' },
        { label: 'Poulet poêlé', detail: '150g filet de poulet' },
        { label: 'Pommes de terre vapeur', detail: '200g, romarin' },
        { label: 'Banane', detail: '1 pc' },
        { label: 'Beurre de cacahuète', detail: '1 c.à s.' },
      ],
      meal2: [
        { label: 'Côtes d'agneau', detail: '200g grillées' },
        { label: 'Épinards sautés', detail: '200g, ail & huile d'olive' },
        { label: 'Pain complet', detail: '2 tranches' },
        { label: 'Poire', detail: '1 pc' },
      ],
      workout: ['Marche ou vélo léger (active recovery)'],
    },
    {
      name: 'Mercredi',
      meal1: [
        { label: 'Saumon poché', detail: '200g' },
        { label: 'Avocat & chia', detail: '1 avocat + graines de chia' },
        { label: 'Patate douce', detail: '150g' },
        { label: 'Baies', detail: '100g' },
        { label: 'Créatine', detail: '5g dans yaourt' },
      ],
      meal2: [
        { label: 'Crevettes poêlées', detail: '150g, citron & piment' },
        { label: 'Légumes rôtis', detail: '200g mélange' },
        { label: 'Riz basmati', detail: '150g vapeur' },
        { label: 'Pomme', detail: '1 pc' },
      ],
      workout: [
        'Tractions ou tirage vertical 4×8',
        'Rowing à la barre 4×10',
        'Curl barre 3×12',
        'Face pulls 3×15',
      ],
    },
    {
      name: 'Jeudi',
      meal1: [
        { label: 'Œufs mollets', detail: '3 œufs' },
        { label: 'Poulet grillé', detail: '150g' },
        { label: 'Pommes de terre', detail: '200g vapeur' },
        { label: 'Banane', detail: '1 pc' },
      ],
      meal2: [
        { label: 'Steak maigre', detail: '200g' },
        { label: 'Brocolis vapeur', detail: '200g' },
        { label: 'Pain complet', detail: '2 tranches' },
        { label: 'Poire', detail: '1 pc' },
      ],
      workout: ['Planche 3×60s', 'Crunch 3×15', 'Relevés de jambes 3×15'],
    },
    {
      name: 'Vendredi',
      meal1: [
        { label: 'Saumon grillé', detail: '200g' },
        { label: 'Avocat & chia', detail: '1 avocat + graines de chia' },
        { label: 'Patate douce', detail: '150g' },
        { label: 'Baies', detail: '100g' },
        { label: 'Créatine', detail: '5g' },
      ],
      meal2: [
        { label: 'Côtes d'agneau', detail: '150g' },
        { label: 'Légumes rôtis', detail: '200g' },
        { label: 'Riz basmati', detail: '150g' },
        { label: 'Pomme', detail: '1 pc' },
      ],
      workout: [
        'Squat 4×10',
        'Développé couché 4×10',
        'Rowing 4×10',
        'Dips 4×10',
        'Curl 4×10',
      ],
    },
    {
      name: 'Samedi',
      meal1: [
        { label: 'Omelette', detail: '3 œufs + 150g poulet' },
        { label: 'Pommes de terre', detail: '200g' },
        { label: 'Avocat', detail: '1 pc' },
      ],
      meal2: [
        { label: 'Poisson blanc', detail: '200g cabillaud' },
        { label: 'Épinards sautés', detail: '200g' },
        { label: 'Pain complet', detail: '2 tranches' },
        { label: 'Poire', detail: '1 pc' },
      ],
      workout: ['Yoga / étirements'],
    },
    {
      name: 'Dimanche',
      meal1: [
        { label: 'Œufs + saumon fumé', detail: '2 œufs + 150g saumon fumé' },
        { label: 'Patate douce', detail: '200g' },
        { label: 'Baies', detail: '100g' },
      ],
      meal2: [
        { label: 'Entrecôte grillée', detail: '150g' },
        { label: 'Légumes variés', detail: '200g' },
        { label: 'Riz basmati', detail: '150g' },
        { label: 'Pomme', detail: '1 pc' },
      ],
      workout: ['Marche rapide 45min'],
    },
  ],
};
