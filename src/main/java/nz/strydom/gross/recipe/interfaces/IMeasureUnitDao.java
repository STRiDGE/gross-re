package nz.strydom.gross.recipe.interfaces;

import org.springframework.data.repository.CrudRepository;

import nz.strydom.gross.domain.MeasureUnit;

public interface IMeasureUnitDao extends CrudRepository<MeasureUnit, String> {
 
	// TODO add search methods
}
