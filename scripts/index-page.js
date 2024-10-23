const API_KEY = "6700baee44114d20a7deb3af4ed110d9";
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

    let descriptionHeaderEl = null;
    if (ingredientsSelected.length != 0) {
        descriptionHeaderEl = renderRecipesHeader();
    }

    // geting the array of ingredients by mapping the selected checkboxes and joining them as a single string
    const ingredientsArray = Array.from(ingredientsSelected).map(checkbox => checkbox.name);
    const ingredientList = ingredientsArray.join(",");

    const recipes = await api.findByIngredients(ingredientList);

    if (descriptionHeaderEl != null) {
        descriptionHeaderEl.textContent = "Here are some mouthwatering dishes you can whip up with your ingredients:"
    }

    // Render and append recipe card for each recipe
    recipes.forEach(recipe => {
        const recipeElement = renderRecipeCard(recipe);
        recipesResults.append(recipeElement);
    });

});

// fetch ingredients from a json file
const fetchIngredientsFromJson = async () => {
    const jsonFilePath = '../data/data.json';

    try {
        // Fetch the JSON file
        const response = await fetch(jsonFilePath);

        // Check if the response is okay (status code 200)
        if (!response.ok) {
            throw new Error("fetchIngredientsFromJson: response was not ok");
        }

        // Parsing this json data as an array
        const ingredients = await response.json();

        return ingredients;

    } catch (e) {
        console.error('Error fetching or parsing the JSON:', e);
        return [];
    }
}

// Render the ingredients based on the json file
const renderIngredients = async () => {
    const ingredients = await fetchIngredientsFromJson();
    const ingredientFormBody = document.querySelector(".ingredients-form__body");
    ingredientFormBody.innerHTML = "";
    Array.from(ingredients).forEach(ingredient => createIngredientInput(ingredientFormBody, ingredient));
}
renderIngredients();

const createIngredientInput = (formBody, ingredient) => {
    // Create the label element
    const label = document.createElement("ingredients-form__label");
    label.classList.add("ingredients-form__label");

    // Create the checkbox input element
    const checkbox = Object.assign(document.createElement('input'), {
        className: 'ingredients-form__checkbox',
        type: "checkbox",
        name: getFormattedString(ingredient),
    });

    // Create a text node for the label
    const textNode = document.createTextNode(` ${ingredient}`);

    // Add the checkbox and text node to the label
    label.appendChild(checkbox);
    label.appendChild(textNode);

    // Add the label to the formbody
    formBody.appendChild(label);
}

const getFormattedString = (originalString) => {
    return originalString?.replace(/[\p{Emoji}]/gu, "").trim();
}

// Render recipes header
const renderRecipesHeader = () => {
    const title = document.createElement("h2");
    title.classList.add("recipes__title");
    title.textContent = "Your Personalized Recipe List";

    const description = document.createElement("p");
    description.classList.add("recipes__description");
    description.textContent = "Loading...";

    recipesHeader.appendChild(title);
    recipesHeader.appendChild(description);

    return description;
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