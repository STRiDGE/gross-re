package nz.strydom.gross.recipe;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import nz.strydom.gross.domain.MeasureUnit;
import nz.strydom.gross.recipe.domain.RecipeIngredient;
import nz.strydom.gross.recipe.interfaces.IMeasureUnitDao;

@Service
public class RecipeService implements IRecipeService {

	@Autowired
	private IMeasureUnitDao measureUnitDao;
	
	@Override
	public List<RecipeIngredient> scrapeIngredients(String text) {
		List<RecipeIngredient> result = new ArrayList<>();
//		for (String line : breakIntoLines(text)) {
//			// TODO parse
//		}
		
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
	
	@Override
	public RecipeIngredient parseRecipeIngredient(String text) {
		Assert.notNull(text);
		
		RecipeIngredient ingredient = new RecipeIngredient();
		
		if (text.contains(" ")) {
			String[] tokens = text.split(" ");
			String firstToken = tokens[0];
			
			// TODO See if it would work better with a StringTokenizer.  Then we should not need to keep track of indexes, simply try to parse each token.  Maybe...
			
			if (NumberUtils.isParsable(firstToken)) {
				ingredient.setAmount(NumberUtils.createDouble(firstToken));
				
				if (tokens.length >= 2) {
					
					ingredient.setUnit(parseMeasureUnit(tokens[1]));
				}
			} else if (firstToken.matches("[^/]*/[^/]*")) {
				// Two items, split by a slash.  Most likely a 1/2 or something similar
				String[] split = firstToken.split(" */ *");
				if (split.length == 2 && NumberUtils.isDigits(split[0]) && NumberUtils.isDigits(split[1])) {
					int number1 = NumberUtils.createInteger(split[0]);
					int number2 = NumberUtils.createInteger(split[1]);
					if (number2 != 0) {
						ingredient.setAmount((double)number1 / number2);
					}
				}
				if (tokens.length >= 2) {
					ingredient.setUnit(parseMeasureUnit(tokens[1]));
				}

			} else if (firstToken.matches("^\\d*[a-zA-Z]*$")) {
				// Some numbers and some characters
				Matcher matcher = Pattern.compile("^(\\d*)([a-zA-Z]*)$").matcher(firstToken);
				if (matcher.find()) {
					ingredient.setAmount(NumberUtils.createDouble(matcher.group(1)));
					ingredient.setUnit(parseMeasureUnit(matcher.group(2)));
				}
			}
		}
		
		return ingredient;
	}
	
	public MeasureUnit parseMeasureUnit(String string) {
		String input = string.trim();
		
		ArrayList<MeasureUnit> potential = new ArrayList<>();
		
		THIS IS SILLY!  Add a DAO to make the database do the search
		for (MeasureUnit unit : this.measureUnitDao.findAll()) {
			for (String item : unit.getAllMatches()) {
				if (item.equalsIgnoreCase(input)) {
					potential.add(unit);
					break;
				}
			}
		}
		
		if (potential.size() <= 0) {
			return null;
		} else if (potential.size() > 1) {
			throw new RuntimeException("Multiple measurements matched. [" + potential.toString() + "]");
		} else {
			return potential.get(0);
		}
	} 

}
