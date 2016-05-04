package nz.strydom.gross.test;

import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import nz.strydom.gross.GrossApplication;

@ActiveProfiles("test")
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes=GrossApplication.class)
@WebAppConfiguration // Required by SpringFox
public abstract class SpringContextTestCase {
	// Empty 
}
