class SpoonacularApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.spoonacular.com/recipes/";
    }

    async findByIngredients(ingredients) {
        try {
            const endPoint = `${this.baseUrl}findByIngredients?ingredients=${ingredients}&apiKey=${this.apiKey}`;
            const response = await axios.get(endPoint);
            return response.data;
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }
}