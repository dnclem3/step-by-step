import type { Recipe } from './recipeParser'

export const testRecipe: Recipe = {
    "title": "Creamy Avocado Pea Gazpacho",
    "sourceUrl": null,
    "prep": [
      {
        "instruction": "Blanch",
        "ingredient": "peas",
        "quantity": "2 cups fresh shelled",
        "placement": "Bowl 1",
        "icon": "🟢"
      },
      {
        "instruction": "Drain",
        "ingredient": "peas",
        "quantity": "2 cups",
        "placement": "Bowl 1",
        "icon": "🟢"
      },
      {
        "instruction": "Chop",
        "ingredient": "shallot",
        "quantity": "1 medium",
        "placement": "Bowl 2",
        "icon": "🧅"
      },
      {
        "instruction": "Chop",
        "ingredient": "cucumber",
        "quantity": "1 medium",
        "placement": "Bowl 2",
        "icon": "🥒"
      },
      {
        "instruction": "Slice",
        "ingredient": "Serrano pepper",
        "quantity": "1",
        "placement": "Bowl 2",
        "icon": "🌶️"
      },
      {
        "instruction": "Squeeze",
        "ingredient": "lime juice",
        "quantity": "3 Tbsp",
        "placement": "Bowl 3",
        "icon": "🍋"
      }
    ],
    "cook": [
      {
        "instruction": "Blend all ingredients until smooth and creamy",
        "ingredients": [
          { "name": "peas", "quantity": "prepared" },
          { "name": "avocados", "quantity": "2 medium-large" },
          { "name": "cucumber", "quantity": "prepared" },
          { "name": "shallot", "quantity": "prepared" },
          { "name": "Serrano pepper", "quantity": "prepared" },
          { "name": "cilantro", "quantity": "1 cup fresh" },
          { "name": "lime juice", "quantity": "prepared" },
          { "name": "extra virgin olive oil", "quantity": "2 Tbsp" },
          { "name": "water", "quantity": "1½–2 cups" },
          { "name": "coconut milk", "quantity": "½ cup" },
          { "name": "salt & pepper", "quantity": "to taste" }
        ],
        "time": "5 minutes",
        "method": "blend",
        "icon": "🌀"
      },
      {
        "instruction": "Serve chilled or at room temperature",
        "ingredients": [],
        "time": null,
        "method": "finish",
        "icon": "✨"
      }
    ]
} 