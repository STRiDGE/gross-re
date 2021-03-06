package nz.strydom.gross.recipe.domain;

import nz.strydom.gross.domain.MeasureUnit;

public class RecipeIngredient {

	private MeasureUnit unit;
	public MeasureUnit getUnit() { return this.unit; }
	public void setUnit(MeasureUnit unit) { this.unit = unit; }
	
	private double amount;
	public double getAmount() { return this.amount; }
	public void setAmount(double amount) { this.amount = amount; }
	
	// TODO Link to actual product
	private String productText;
	public String getProductText() { return this.productText; }
	public void setProductText(String productText) { this.productText = productText; }
	
//	private Product product;
//	public Product getProduct() { return this.product; }
//	public void setProduct(Product product) { this.product = product; }
	
	private String extraInfo = "";
	public String getExtraInfo() { return this.extraInfo; }
	public void setExtraInfo(String extraInfo) { this.extraInfo = extraInfo; }
	
	public RecipeIngredient() {
		super();
	}
	
	public RecipeIngredient(MeasureUnit unit, double amount, String productText, String extraInfo) {
		super();
		this.unit = unit;
		this.amount = amount;
		this.productText = productText;
		this.extraInfo = extraInfo;
	}
	
//	/**
//	 * @deprecated use recipe service
//	 */
//	@Deprecated
//	public static RecipeIngredient parse(String text) {
//		Assert.notNull(text);
//		
//		RecipeIngredient ingredient = new RecipeIngredient();
//		
//		if (text.contains(" ")) {
//			String[] tokens = text.split(" ");
//			String firstToken = tokens[0];
//			
//			// TODO See if it would work better with a StringTokenizer.  Then we should not need to keep track of indexes, simply try to parse each token.  Maybe...
//			
//			if (NumberUtils.isParsable(firstToken)) {
//				ingredient.amount = NumberUtils.createDouble(firstToken);
//				
//				if (tokens.length >= 2) {
//					ingredient.unit = MeasureUnit.parse(tokens[1]);
//				}
//			} else if (firstToken.matches("[^/]*/[^/]*")) {
//				// Two items, split by a slash.  Most likely a 1/2 or something similar
//				String[] split = firstToken.split(" */ *");
//				if (split.length == 2 && NumberUtils.isDigits(split[0]) && NumberUtils.isDigits(split[1])) {
//					int number1 = NumberUtils.createInteger(split[0]);
//					int number2 = NumberUtils.createInteger(split[1]);
//					if (number2 != 0) {
//						ingredient.amount = (double)number1 / number2;
//					}
//				}
//				if (tokens.length >= 2) {
//					ingredient.unit = MeasureUnit.parse(tokens[1]);
//				}
//
//			} else if (firstToken.matches("^\\d*[a-zA-Z]*$")) {
//				// Some numbers and some characters
//				Matcher matcher = Pattern.compile("^(\\d*)([a-zA-Z]*)$").matcher(firstToken);
//				if (matcher.find()) {
//					ingredient.amount = NumberUtils.createDouble(matcher.group(1));
//					ingredient.unit = MeasureUnit.parse(matcher.group(2));
//				}
//			}
//		}
//		
//		return ingredient;
//	}
	
	
}
