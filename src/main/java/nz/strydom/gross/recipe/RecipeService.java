package nz.strydom.gross.recipe;

import java.util.ArrayList;
import java.util.List;

import nz.strydom.gross.recipe.domain.RecipeIngredient;

public class RecipeService implements IRecipeService {

	@Override
	public List<RecipeIngredient> scrapeIngredients(String text) {
		List<RecipeIngredient> result = new ArrayList<>();
		for (String line : breakIntoLines(text)) {
			// TODO parse
		}
		
		return result;
	}

	public Iterable<String> breakIntoLines(String text) {
		// TODO Detect and scrape off HTML
		
		List<String> result = new ArrayList<>();
		
		// For now, just do new lines
		if (text.contains("\n")) {
			for (String item : text.split("\n")) {
				result.add(item.trim());
			}
		}
		
		return result;
	}

}
