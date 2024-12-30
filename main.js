const API_KEY = "667c506f3a2d431fb524d8d41932d2b8";


async function searchRecipes(keyword) {
    const recipeResults = document.getElementById("results");
    recipeResults.textContent = "Searching...";

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${keyword}&includeNutrition=false   `);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText} (Status Code: ${response.status})`);
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            recipeResults.innerHTML = data.results.map(recipe => `
                <div class="recipe">
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <button onclick="getRecipeDetails(${recipe.id})">Get Details</button>
                </div>
            `).join("");
        } else {
            recipeResults.textContent = "No recipes found.";
        }
    } catch (error) {
        recipeResults.textContent = `An error occurred: ${error.message}`;
    }
}
debugger;


async function getRecipeDetails(id) {
    const recipeResults = document.getElementById("results");
    recipeResults.textContent = "Loading recipe details...";

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText} (Status Code: ${response.status})`);
        }

        const data = await response.json();

        recipeResults.innerHTML = `
            <h2>${data.title}</h2>
            <img src="${data.image}" alt="${data.title}">
            <p>${data.summary}</p>
            <p>Ready in ${data.readyInMinutes} minutes</p>
            <p>Serves ${data.servings}</p>
            <h3>Ingredients</h3>
            <ul>
                ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join("")}
            </ul>
            <h3>Instructions</h3>
            <p>${data.instructions || "No instructions provided."}</p>
        `;
    } catch (error) {
        recipeResults.textContent = `An error occurred: ${error.message}`;
    }
}

// Add event listener for search
document.getElementById("submit").addEventListener("click", () => {
    const recipeSearch = document.getElementById("search").value.trim();

    if (recipeSearch) {
        searchRecipes(recipeSearch);
    } else {
        alert("Please enter a recipe keyword");
    }
});
