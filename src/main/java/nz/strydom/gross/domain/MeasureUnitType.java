package nz.strydom.gross.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="unit_type")
public class MeasureUnitType {
	
	@Id
	private String id;
	public String getId() { return this.id; }
	public void setId(String id) { this.id = id; }
	
	private String baseUnit;
	public String getBaseUnit() { return this.baseUnit; }
	public void setBaseUnit(String baseUnit) { this.baseUnit = baseUnit; }
	
	@OneToMany(mappedBy="unitType")
	private Set<MeasureUnit> measureUnits = new HashSet<>();
	public Set<MeasureUnit> getMeasureUnits() { return this.measureUnits; }
	public void setMeasureUnits(Set<MeasureUnit> measureUnits) { this.measureUnits = measureUnits; }
	
}
