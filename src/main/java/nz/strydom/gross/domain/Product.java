package nz.strydom.gross.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Version;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
@Getter
@Setter
@NoArgsConstructor
public class Product {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;

	private @Version @JsonIgnore long version;

	private @NotBlank String name;

	/**
	 * The measured amount of a single unit.  Should be able to handle no measurement.
	 */
//	private double measureAmount;

	private @NotNull MeasureUnit measureUnit;
	private String category;



	public Product(@NotBlank final String name, final MeasureUnit measureUnit, final String category) {
		this.name = name;
		this.measureUnit = measureUnit;
		this.category = category;
	}

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
	 */

	// TODO Flavour, like ice cream ??
	
}
