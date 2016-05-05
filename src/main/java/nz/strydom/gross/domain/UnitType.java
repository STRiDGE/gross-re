package nz.strydom.gross.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name="unit_type")
public class UnitType {
	
	@Id
	private String id;
	public String getId() { return this.id; }
	public void setId(String id) { this.id = id; }
	
	private String baseUnit;
	public String getBaseUnit() { return this.baseUnit; }
	public void setBaseUnit(String baseUnit) { this.baseUnit = baseUnit; }
	
	// TODO Investigate how to only return the strings
	private List<String> matches = new ArrayList<>();
	public List<String> getMatches() { return this.matches; }
	public void setMatches(List<String> matches) { this.matches = matches; }

}
