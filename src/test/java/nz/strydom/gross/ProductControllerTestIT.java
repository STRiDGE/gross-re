package nz.strydom.gross;

import static org.junit.Assert.fail;

import org.junit.Test;
import org.springframework.test.context.ActiveProfiles;

import nz.strydom.gross.test.SpringContextTestCase;

@ActiveProfiles(value="integrationtest", inheritProfiles=false) // This is optional, but allows us to load a different properties file
public class ProductControllerTestIT extends SpringContextTestCase {

	@Test
	public void test() {
		fail("Not yet implemented");
	}

}
