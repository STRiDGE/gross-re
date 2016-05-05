package nz.strydom.gross.recipe.domain;

import java.util.List;

/**
 * Collection of ShopItems.
 */
public class Recipe {

	private List<RecipeIngredient> ingredients;
	public List<RecipeIngredient> getIngredients() { return this.ingredients; } 
	public void setIngredients(List<RecipeIngredient> ingredients) { this.ingredients = ingredients; } 
	
	private String description;
	public String getDescription() { return this.description; }
	public void setDescription(String description) { this.description = description; }
	
	/**
	 * TODO 
	 * Rating?
	 * Variation?
	 * 
	 */
}
