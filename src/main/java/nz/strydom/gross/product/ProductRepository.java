package nz.strydom.gross.product;

import nz.strydom.gross.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

	
	
//	Product getProduct(String productId);
//	
//	void addProduct(Product product);
//	
//	void removeProduct(String productId);
//	
//	List<Product> getAllProducts();
//	
//	List<PriceAtStore> getAllPricesForProduct(String productId);
	
	 
	/* TODO Add
	 * Prices of a specific product at all store 
	 * 
	 */
}
