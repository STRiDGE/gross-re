package nz.strydom;

import static org.junit.Assert.fail;

import java.math.BigDecimal;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;

import nz.strydom.gross.GrossApplication;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = GrossApplication.class)
@WebAppConfiguration
public class GrossApplicationTests {

	@Test
	public void contextLoads() {
		fail("Not implemented");
	}

}
