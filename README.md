# Dishify

### Overview
**Dishify** is a web application that fetches data from the Spoonacular Web API. We developed this solution during the Web API Hackathon at Brainstation.

### Functionalities
- **Ingredient Fetching**: Fetches the ingredients from `./data/data.json` (upgraded version post-hackathon).
- **Dynamic Form Rendering**: Renders the ingredients as form inputs of type checkbox.
- **Recipe Search**: Users can select ingredient checkboxes and click the form's submit button, labeled "Find Recipes." The app then iterates through the selected ingredients to map their names (e.g., `["Chicken", "Rice"]`) into an array and joins them into a single string: `"Chicken, Rice"`.
- **API Request**: This single `ingredientString` is passed to the Spoonacular Web API as a GET request along with the API key:

https://api.spoonacular.com/recipes/${this.baseUrl}findByIngredients?ingredients=${ingredientString}&apiKey=${this.apiKey}

markdown

- **Display Results**: The application displays recipe images and titles fetched from the API requests inside user-friendly cards.

### Future Plans
- Add more options such as a search input for a more customized recipe.
- Add additional pages for a more detailed description of the recipes since recipes are not clickable.
- Include more features such as Signup and Login for more personalized options.
