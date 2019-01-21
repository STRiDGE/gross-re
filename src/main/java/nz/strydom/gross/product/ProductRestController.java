package nz.strydom.gross.product;

import java.util.List;

import nz.strydom.gross.domain.Product;
import nz.strydom.gross.error.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
public class ProductRestController {
	
	private ProductRepository productRepository;

	private static final Logger log = LoggerFactory.getLogger(ProductRestController.class);
	
	@Autowired
	public ProductRestController(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Product getProduct(@PathVariable Long id) {
		return this.productRepository.findById(id).orElseThrow(() -> new NotFoundException("Product", id));
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Product> getAllProducts() {
		// TODO filter and paging
		log.warn("Asking for all product");
		return this.productRepository.findAll();
	}
	
//	@RequestMapping(method = RequestMethod.POST)
//	public Product addProduct(@RequestBody Product product) {
//		product.setId(new Random().nextLong() + ""); // TODO make sensible id
//		return this.productRepository.saveAndFlush(product);
//	}
//
//	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
//	public Product updateItem(@RequestBody Product product, @PathVariable Long id) {
//		product.setId(id);
//		return this.productRepository.saveAndFlush(product);
//	}
//
//	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
//	public void deleteItem(@PathVariable String id) {
//		this.productRepository.delete(id);
//	}
	
}
