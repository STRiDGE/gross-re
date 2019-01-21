package nz.strydom.gross.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * A single item to display on the shopping list.
 * 
 * Should contain:
 * Everything that describes this product
 * 
 * Should NOT contain: 
 * Price, Quantity
 */
@Entity
public class Product {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;
	private String name;

	/**
	 * The measured amount of a single unit.  Should be able to handle no measurement.
	 */
	private double measureAmount;
	private String category;

	public Long getId() { return this.id; }
	public void setId(Long id) { this.id = id; }

	public String getName() { return this.name; }
	public void setName(String name) { this.name = name; }

	/**
	 * Unit it is measured in, default to nothing.  Showed together with {@link #measureAmount}.  For instance '500' and 'gram'
	 */
//	private MeasureUnit measureUnit;
//	public MeasureUnit getMeasureUnit() { return this.measureUnit; }
//	public void setMeasureUnit(MeasureUnit measureUnit) { this.measureUnit = measureUnit; }

	public double getMeasureAmount() { return this.measureAmount; }
	public void setMeasureAmount(double measureAmount) { this.measureAmount = measureAmount; }

	public String getCategory() { return this.category; }
	public void setCategory(String category) { this.category = category; }
	
	// One-to-one mapping
//	private StockSetting stockSetting;
//	public StockSetting getStockSetting() { return this.stockSetting; }
//	public void setStockSetting(StockSetting stockSetting) { this.stockSetting = stockSetting; }
	
	/* 
	 * TODO
	 * Tag a specific place to display on shopping list - Aisle number
	 * Add (maybe multiple) tags - Meat, vegetable, etc
	 * Ability to show that it should not be used when creating normal shopping list (or have a way to override the amount at least)
	 * Have a way to equate different product as the same (ie 1 2l bottle of milk is the same as 2 1l bottles).  We
	 * 	can do some of that with measureAmounts.  Sometimes it's more esoteric, for instance either a chocolate or a bag
	 * 	of sweets.  When auto-creating the shopping list it should give you a choice, or random.
	 * Should be able to compare different prices from different shops.  Add shop as tag when logging a shop experience
	 *   
	 * 
	 */
	
}
