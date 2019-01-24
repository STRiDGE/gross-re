package nz.strydom.gross.domain;


public enum MeasureUnit {
	NONE("", "")
	, GRAM("Gram", "kg")
	, KILOGRAM("Kilogram", "kg")
	, LITRE("Litre", "l")
	, COUNT("Count", "")
	;
	
	
	private String description;
	public String getDescription() { return this.description; }
	
	private String display;
	public String getDisplay() { return this.display; }

	MeasureUnit(String description, String display) {
		this.description = description;
		this.display = display;
	}

	//TODO Translate between units if possible, like gram to kilogram.  Make it reversible
	// Something like private class UnitTranslate(Unit1, Unit2, Operation, Amount)

}
