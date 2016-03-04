package nz.strydom.gross.interfaces;

import java.util.List;

import nz.strydom.gross.domain.PriceAtStore;
import nz.strydom.gross.domain.Product;

public interface IGrossDao {

	Product getProduct(String productId);
	
	void addProduct(Product product);
	
	void removeProduct(String productId);
	
	List<Product> getAllProducts();
	
	List<PriceAtStore> getAllPricesForProduct(String productId);
	
	 
	/* TODO Add
	 * Prices of a specific product at all store 
	 * 
	 */
}
