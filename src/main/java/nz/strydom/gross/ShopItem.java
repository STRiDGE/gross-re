package nz.strydom.gross;

import java.math.BigDecimal;

/**
 * A single item to display on the shopping list
 */
public class ShopItem {

	/**
	 * Description to show
	 */
	private String name;
	
	//private int unitCount;
	
	/**
	 * Unit it is measured in, default to nothing.  Showed together with {@link #measureAmount}.  For instance '500' and 'gram'
	 */
	// TODO Consider enum or at least lookup table
	private String measureUnit;
	
	/**
	 * The measured amount of a single unit.  Should be able to handle no measurement.
	 */
	private double measureAmount;
	
	/**
	 * Minimum amount that should be in stock.  Perhaps define the trigger of when the be friendly and when to insist.
	 */
	private double minimumAmount; 

	/* 
	 * TODO
	 * Tag a specific place to display on shopping list - Aisle number
	 * Add (maybe multiple) tags - Meat, vegetable, etc
	 * Ability to show that it should not be used when creating normal shopping list (or have a way to override the amount at least)
	 * Have a way to equate different product as the same (ie 1 2l bottle of milk is the same as 2 1l bottles).  We
	 * 	can do some of that with measureAmounts.  Sometimes it's more esoteric, for instance either a chocolate or a bag
	 * 	of lollies.  When auto-creating the shopping list it should give you a choise, or random.
	 * Should be able to compare different prices from different shops.  Add shop as tag when logging a shop experience
	 *   
	 * 
	 */
	
}
