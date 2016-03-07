package nz.strydom.gross;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import nz.strydom.demo.Item;
import nz.strydom.gross.domain.Product;
import nz.strydom.gross.interfaces.IProductRepository;

@RestController
@RequestMapping("/products")
public class ProductController {
	
	private IProductRepository productRepository;

	private static final Logger log = LoggerFactory.getLogger(ProductController.class);
	
	@Autowired
	public ProductController(IProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Product getProduct(@PathVariable String id) {
		return this.productRepository.findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Product> getAllProducts() {
		// TODO filter and paging
		log.warn("Asking for all product");
		return this.productRepository.findAll();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public Product addProduct(@RequestBody Product product) {
		product.setId(new Random().nextLong() + ""); // TODO make sensible id
		return this.productRepository.saveAndFlush(product);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public Product updateItem(@RequestBody Product product, @PathVariable String id) {
		product.setId(id);
		return this.productRepository.saveAndFlush(product);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteItem(@PathVariable String id) {
		this.productRepository.delete(id);
	}
	
}
