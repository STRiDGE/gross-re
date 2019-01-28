package nz.strydom.gross.product;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;

import nz.strydom.GrossApplicationTest;
import nz.strydom.gross.domain.MeasureUnit;
import nz.strydom.gross.domain.Product;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

public class ProductRepositoryTest extends GrossApplicationTest {

	@Autowired
	private ProductRepository repository;

	@Test
	public void createData() {
		this.repository.save(new Product("Product", MeasureUnit.KILOGRAM, "Category"));

		Iterable<Product> products = this.repository.findAll();
		assertThat(products).hasSize(1);

		assertThat(products)
				.extracting(Product::getName, Product::getMeasureUnit, Product::getCategory)
				.contains(tuple("Product", MeasureUnit.KILOGRAM, "Category"))
		;
	}

}
