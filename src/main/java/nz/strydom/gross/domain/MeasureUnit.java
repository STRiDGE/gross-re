package nz.strydom.gross.domain;


public enum MeasureUnit {
	NONE("", "", "", UnitType.OTHER, 0)
	, KILOGRAM("Kilogram", "kg", "kg", UnitType.WEIGHT, 1000)
	, GRAM("Gram", "g", "g", UnitType.WEIGHT, 1)
	, LITRE("Litre", "l", "l", UnitType.VOLUME, 1000)
	, COUNT("Count", "", "", UnitType.COUNT, 1)
	, CUP("Cups", " cup", " cups", UnitType.VOLUME, 250)
	, TEASPOON("Teaspoon", "teaspoon", "teaspoons", UnitType.VOLUME, 5)
	, TABLESPOON("Tablespoon", "tablespoon", "tablespoons", UnitType.VOLUME, 15)
	;
	
	private String description;
	public String getDescription() { return this.description; }
	
	private String display;
	public String getDisplay() { return this.display; }
	
	private UnitType unitType;
	public UnitType getUnitType() { return this.unitType; }
	
	private double amountOfBase;
	public double getAmountOfBase() { return this.amountOfBase; }
	
	private String displayPlural;
	public String getDisplayPlural() { return this.displayPlural; }

	private MeasureUnit(String description, String display, String displayPlural, UnitType unitType, double amountOfBase) {
		this.description = description;
		this.display = display;
		this.displayPlural = displayPlural;
		this.unitType = unitType;
		this.amountOfBase = amountOfBase;
	}
	
	public boolean canConvertToOtherUnit(MeasureUnit otherUnit) {
		if (otherUnit == null || otherUnit.getUnitType() == UnitType.OTHER) {
			return false;
		}
		
		return this.getUnitType() == otherUnit.getUnitType();
	}
	
}
