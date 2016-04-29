package nz.strydom.gross.recipe.domain;

import static org.hamcrest.Matchers.closeTo;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

import org.junit.Test;


public class RecipeIngredientTest {

	@Test
	public void parse_SimpleAmounts_GetCorrectValues() {
		assertThat(RecipeIngredient.parse("500 grams flour").getAmount(), is(closeTo(500, 0)));
		assertThat(RecipeIngredient.parse("1/2 cup suger").getAmount(), is(closeTo(0.5, 0)));
		// TODO Handle units
		assertThat(RecipeIngredient.parse("1l milk").getAmount(), is(closeTo(1, 0)));
		assertThat(RecipeIngredient.parse("1/3 teaspoon salt").getAmount(), is(closeTo(0.3333, 0.0001)));
	}

}
