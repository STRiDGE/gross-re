package nz.strydom.gross.product;

import nz.strydom.gross.domain.MeasureUnit;
import nz.strydom.gross.domain.Product;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class ProductDataLoader implements ApplicationRunner {

	private final ProductRepository repository;

	private static Logger log = LoggerFactory.getLogger(ProductDataLoader.class);

	public ProductDataLoader(final ProductRepository productRepository) {
		this.repository = productRepository;
	}

	@Override
	public void run(final ApplicationArguments args) {
		log.warn("Adding products");
		this.repository.save(new Product("Chicken", MeasureUnit.KILOGRAM, "Meat"));
		this.repository.save(new Product("Beef Steak", MeasureUnit.KILOGRAM, "Meat"));
		this.repository.save(new Product("Beef Sausage", MeasureUnit.KILOGRAM, "Meat"));
		this.repository.save(new Product("Pork", MeasureUnit.KILOGRAM, "Meat"));
		this.repository.save(new Product("Fish Fillets", MeasureUnit.KILOGRAM, "Meat"));

		this.repository.save(new Product("Bread", MeasureUnit.COUNT, "Carb"));
		this.repository.save(new Product("Spaghetti", MeasureUnit.KILOGRAM, "Carb"));
		this.repository.save(new Product("Pasta", MeasureUnit.KILOGRAM, "Carb"));

		this.repository.save(new Product("Ice Cream", MeasureUnit.LITRE, "Sweet"));

		this.repository.save(new Product("Milk", MeasureUnit.LITRE, "Dairy"));
		this.repository.save(new Product("Cheese", MeasureUnit.KILOGRAM, "Dairy"));

		this.repository.save(new Product("Eggs", MeasureUnit.KILOGRAM, "Eggs?"));

		this.repository.save(new Product("Corn Flakes", MeasureUnit.KILOGRAM, "Breakfast"));
		this.repository.save(new Product("Rice Krispies", MeasureUnit.KILOGRAM, "Breakfast"));

		this.repository.save(new Product("Mieliemeel", MeasureUnit.KILOGRAM, "Pantry"));
		this.repository.save(new Product("Oil", MeasureUnit.LITRE, "Pantry"));

		this.repository.save(new Product("Salt", MeasureUnit.KILOGRAM, "Spice"));
		this.repository.save(new Product("Mayonnaise", MeasureUnit.KILOGRAM, "Spice"));
		this.repository.save(new Product("Aioli", MeasureUnit.KILOGRAM, "Spice"));
		this.repository.save(new Product("Tomato Sauce", MeasureUnit.KILOGRAM, "Spice"));
		this.repository.save(new Product("Mustard", MeasureUnit.KILOGRAM, "Spice"));
		this.repository.save(new Product("BBQ Sauce", MeasureUnit.KILOGRAM, "Spice"));




//		this.repository.save(new Product("Bread", 1, "Carb"));

	}
}
