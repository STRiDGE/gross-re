package nz.strydom.gross.recipe;

import java.util.List;

import nz.strydom.gross.recipe.domain.RecipeIngredient;

public interface IRecipeService {

	List<RecipeIngredient> scrapeIngredients(String text);
}
