package nz.strydom.gross.recipe.domain;

import static org.hamcrest.Matchers.closeTo;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.*;

import org.junit.Test;

import nz.strydom.gross.domain.MeasureUnit;


public class RecipeIngredientTest {

	@Test
	public void parse_SimpleAmounts_GetCorrectValues() {
		assertThat(RecipeIngredient.parse("500 grams flour").getAmount(), is(closeTo(500, 0)));
		assertThat(RecipeIngredient.parse("1/2 cup sugar").getAmount(), is(closeTo(0.5, 0)));
		assertThat(RecipeIngredient.parse("1l milk").getAmount(), is(closeTo(1, 0)));
		assertThat(RecipeIngredient.parse("1/3 teaspoon salt").getAmount(), is(closeTo(0.3333, 0.0001)));
	}
	
	@Test
	public void parse_SimpleUnits_GetCorrectValues() {
		assertThat(RecipeIngredient.parse("500 grams flour").getUnit(), is(MeasureUnit.GRAM));
		assertThat(RecipeIngredient.parse("1/2 cup sugar").getUnit(), is(MeasureUnit.CUP));
		assertThat(RecipeIngredient.parse("1l milk").getUnit(), is(MeasureUnit.LITRE));
		assertThat(RecipeIngredient.parse("1/3 teaspoon salt").getUnit(), is(MeasureUnit.TEASPOON));
	}

}
