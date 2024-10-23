# Dishify

### Overview
**Dishify** is a web application that fetches data from the Spoonacular Web API. We developed this solution during the Web API Hackathon at Brainstation.

### Functionalities
- **Ingredient Fetching**: Fetches the ingredients from `./data/data.json` (personally upgraded version post-hackathon).
- **Form Rendering**: Renders the ingredients as form inputs of type checkbox based on the data in `data.json` (personally upgraded version post-hackathon).
- **Recipe Search**: Users can select ingredient checkboxes and click the form's submit button, labeled "Find Recipes." The app then iterates through the selected ingredients to map their names (e.g., `["Chicken", "Rice"]`) into an array and joins them into a single string: `"Chicken,Rice"`.
- **API Request**: This single `ingredientString` is passed to the Spoonacular Web API as a GET request along with the API key:

  ```plaintext
  https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientString}&apiKey=${apiKey}

- **Display Results**: The application displays recipe images and titles fetched from the API requests inside recipe cards.
- **Responsive Design**: The web application is designed to be responsive, ensuring a great user experience on both desktop and mobile devices.

### Future Plans
- Add more options such as a search input for a more customized recipe.
- Add an additional page for a more detailed description of the recipes since recipe cards are not yet clickable.
- Include more features such as Signup and Login for more personalized options.
