package nz.strydom.gross.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import nz.strydom.gross.domain.Product;

public interface IProductRepository extends JpaRepository<Product, String> {

	
	
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
