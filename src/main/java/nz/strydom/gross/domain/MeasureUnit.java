package nz.strydom.gross.domain;

import java.util.*;

import javax.persistence.*;

@Entity
@Table(name="measure_unit")
public class MeasureUnit {
//	NONE("", "", "", UnitType.OTHER, 0)
//	, KILOGRAM("Kilogram", "kg", "kg", UnitType.WEIGHT, 1000)
//	, GRAM("Gram", "g", "g", UnitType.WEIGHT, 1, "gram", "grams")
//	, LITRE("Litre", "l", "l", UnitType.VOLUME, 1000, "litre", "litres")
//	, COUNT("Count", "", "", UnitType.COUNT, 1)
//	, CUP("Cups", " cup", " cups", UnitType.VOLUME, 250, "cp")
//	, TEASPOON("Teaspoon", " teaspoon", " teaspoons", UnitType.VOLUME, 5, "tspn", "ts")
//	, TABLESPOON("Tablespoon", " tablespoon", " tablespoons", UnitType.VOLUME, 15, "tblsp")
//	;
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private String id;
	public String getId() { return this.id; }
	
	private String display;
	public String getDisplay() { return this.display; }
	
	@OneToMany()
	private UnitType unitType;
	public UnitType getUnitType() { return this.unitType; }
	
	private double amountOfBase;
	public double getAmountOfBase() { return this.amountOfBase; }
	
	private String displayPlural;
	public String getDisplayPlural() { return this.displayPlural; }
	
//	private Set<String> matches = new HashSet<>();
//	public Set<String> getMatches() { return this.matches; }

//	private MeasureUnit(String description, String display, String displayPlural, UnitType unitType, double amountOfBase, String... matches) {
//		this.name = description;
//		this.display = display;
//		this.displayPlural = displayPlural;
//		this.unitType = unitType;
//		this.amountOfBase = amountOfBase;
//		this.matches.addAll(Arrays.asList(matches));
//		this.matches.add(display.trim());
//		this.matches.add(displayPlural.trim());
//	}
	
	public boolean canConvertToOtherUnit(MeasureUnit otherUnit) {
		if (otherUnit == null || otherUnit.getUnitType().getId().equalsIgnoreCase("Other")) {
			return false;
		}
		
		return this.getUnitType() == otherUnit.getUnitType();
	}
	
	public static MeasureUnit parse(String string) {
		String input = string.trim();
		
		ArrayList<MeasureUnit> potential = new ArrayList<>();
		
		
		// TODO connect to DAO
//		for (MeasureUnit unit : MeasureUnit.values()) {
//			for (String item : unit.getMatches()) {
//				if (item.equalsIgnoreCase(input)) {
//					potential.add(unit);
//					break;
//				}
//			}
//		}
		
		if (potential.size() <= 0) {
			return null;
		} else if (potential.size() > 1) {
			throw new RuntimeException("Multiple measurements matched. [" + potential.toString() + "]");
		} else {
			return potential.get(0);
		}
	}
	
}
