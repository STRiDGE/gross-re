package nz.strydom.gross.domain;


public enum UnitType {
	/** ml */ VOLUME("ml")
	, /** g */  WEIGHT("g")
	, /** number */ COUNT("")
	, /** none */ OTHER("")
	;
	
	private String baseUnit;
	public String getBaseUnit() { return this.baseUnit; }

	private UnitType(String baseUnit) {
		this.baseUnit = baseUnit;
	}
}
