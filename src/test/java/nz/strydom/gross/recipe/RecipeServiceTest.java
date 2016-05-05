package nz.strydom.gross.recipe;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.*;

import java.util.List;

import org.hamcrest.Matchers;
import org.junit.Test;

import nz.strydom.gross.domain.MeasureUnit;
import nz.strydom.gross.recipe.domain.RecipeIngredient;


public class RecipeServiceTest {

	private RecipeService recipeService = new RecipeService();
	
	@Test
	public void scrapeItems_BasicRecipeWithNumericUnitsNoDescriptions_() {
		// GIVEN
		String sourceText = "450g fish fillets\n"
				+ "100g bread crumbs\n"
				+ "0.5 cup flour\n"
				+ "1 egg\n"
				+ "3 tablespoons milk\n"
				;
		
		// WHEN
		List<RecipeIngredient> items = this.recipeService.scrapeIngredients(sourceText);
		
		// THEN
		assertThat(items, hasSize(5));
		
		RecipeIngredient item1 = new RecipeIngredient();
		item1.setAmount(450);
		//item1.setUnit(MeasureUnit.GRAM);
		item1.setProductText("bread crumbs");
		
	}

}
