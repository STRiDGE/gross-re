package nz.strydom.gross.domain;


public enum MeasureUnit {
	NONE("", "")
	, KILOGRAM("Kilogram", "kg")
	, LITRE("Litre", "l")
	, COUNT("Count", "")
	;
	
	
	private String description;
	public String getDescription() { return this.description; }
	
	private String display;
	public String getDisplay() { return this.display; }

	private MeasureUnit(String description, String display) {
		this.description = description;
		this.display = display;
	}
}
