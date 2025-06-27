import type { Recipe } from './recipeParser'

export const mockRecipe: Recipe = {
  title: "Spinach and Feta Turkey Burgers",
  sourceUrl: "https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/",
  prep: [
    {
      instruction: "Mince the garlic",
      ingredient: "garlic",
      quantity: "2 cloves",
      placement: "Bowl 1",
      icon: "🧄"
    },
    {
      instruction: "Drain and squeeze spinach",
      ingredient: "frozen spinach",
      quantity: "10 ounces",
      placement: "Bowl 2",
      icon: "🥬"
    }
  ],
  cook: [
    {
      instruction: "Mix all ingredients in a large bowl",
      ingredients: [
        { name: "ground turkey", quantity: "1 pound" },
        { name: "spinach", quantity: "prepared" },
        { name: "feta cheese", quantity: "1/2 cup" },
        { name: "garlic", quantity: "prepared" }
      ],
      time: "2 minutes",
      method: "mix",
      icon: "🥣"
    },
    {
      instruction: "Form into 4 patties",
      ingredients: [],
      time: "5 minutes",
      method: "mix",
      icon: "🥣"
    },
    {
      instruction: "Grill the patties until cooked through",
      ingredients: [],
      time: "15 minutes",
      method: "cook",
      icon: "🔥"
    }
  ]
} 