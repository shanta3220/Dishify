const API_KEY = "362e3b92b29d4dac9a86ca44aeba8f07";
const api = new SpoonacularApi(API_KEY);

const recipesHeader = document.querySelector(".recipes__header");

// Handle form submission

const formElement = document.querySelector(".ingredients-form");

formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Reset recipes section
    const recipesResults = document.querySelector(".recipes__results");
    recipesResults.innerHTML = "";
    recipesHeader.innerHTML = "";

    // Get string of selected ingredients
    const ingredientsSelected = document.querySelectorAll(".ingredients-form__checkbox:checked");

    if (ingredientsSelected.length != 0) {
        console.log(ingredientsSelected);
        renderRecipesHeader();
    }
    
    const ingredientsArray = [];
    ingredientsSelected.forEach(ingredient => {
        ingredientsArray.push(ingredient.name);
    })
    // (ALTERNATIVE) const ingredientsArray = Array.from(ingredientsSelected).map(checkbox => checkbox.name);
    
    const ingredientList = ingredientsArray.join(",");

    // Fetch recipes based on ingredients
    const recipes = await api.findByIngredients(ingredientList);

    // Render and append recipe card for each recipe
    recipes.forEach(recipe => {
        const recipeElement = renderRecipeCard(recipe);
        recipesResults.append(recipeElement);
    });
});

// Render recipes header

const renderRecipesHeader = () => {
    const title = document.createElement("h2");
    title.classList.add("recipes__title");
    title.textContent = "Your Personalized Recipe List";

    const description = document.createElement("p");
    description.classList.add("recipes__description");
    description.textContent = "Here are some mouthwatering dishes you can whip up with your ingredients:";

    recipesHeader.appendChild(title);
    recipesHeader.appendChild(description);
}

// Render recipe cards

const renderRecipeCard = (ingredient) => {
    
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    const recipeImage = document.createElement("img");
    recipeImage.classList.add("recipe-card__image");
    recipeImage.src = ingredient.image;
    recipeImage.alt = "Recipe Image";

    const recipeTitle = document.createElement("p");
    recipeTitle.classList.add("recipe-card__title")
    recipeTitle.innerText = ingredient.title;

    recipeCard.appendChild(recipeImage);
    recipeCard.appendChild(recipeTitle);
    
    return recipeCard;
}