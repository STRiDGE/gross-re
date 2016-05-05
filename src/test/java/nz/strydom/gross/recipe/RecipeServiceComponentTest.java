package nz.strydom.gross.recipe;

import static org.hamcrest.Matchers.closeTo;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

import javax.transaction.Transactional;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import nz.strydom.gross.test.SpringContextTestCase;

@Transactional
public class RecipeServiceComponentTest extends SpringContextTestCase {

	@Autowired
	private RecipeService recipeService;
	
	@Test
	public void parse_SimpleAmounts_GetCorrectValues() {
		assertThat(this.recipeService.parseRecipeIngredient("500 grams flour").getAmount(), is(closeTo(500, 0)));
		assertThat(this.recipeService.parseRecipeIngredient("1/2 cup sugar").getAmount(), is(closeTo(0.5, 0)));
		assertThat(this.recipeService.parseRecipeIngredient("1l milk").getAmount(), is(closeTo(1, 0)));
		assertThat(this.recipeService.parseRecipeIngredient("1/3 teaspoon salt").getAmount(), is(closeTo(0.3333, 0.0001)));
	}
	
	@Test
	public void parse_SimpleUnits_GetCorrectValues() {
//		assertThat(RecipeIngredient.parse("500 grams flour").getUnit(), is(MeasureUnit.GRAM));
//		assertThat(RecipeIngredient.parse("1/2 cup sugar").getUnit(), is(MeasureUnit.CUP));
//		assertThat(RecipeIngredient.parse("1l milk").getUnit(), is(MeasureUnit.LITRE));
//		assertThat(RecipeIngredient.parse("1/3 teaspoon salt").getUnit(), is(MeasureUnit.TEASPOON));
		assertThat(this.recipeService.parseRecipeIngredient("500 grams flour").getUnit().getId(), is("Gram"));
		assertThat(this.recipeService.parseRecipeIngredient("1/2 cup sugar").getUnit().getId(), is("Cup"));
		assertThat(this.recipeService.parseRecipeIngredient("1l milk").getUnit().getId(), is("Litre"));
		assertThat(this.recipeService.parseRecipeIngredient("1/3 teaspoon salt").getUnit(), is("Teaspoon"));
	}

}
