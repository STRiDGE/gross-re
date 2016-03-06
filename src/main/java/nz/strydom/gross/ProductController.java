package nz.strydom.gross;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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

	@RequestMapping(method = RequestMethod.GET)
	public List<Product> getAllProducts() {
		// TODO filter and paging
		log.warn("Asking for all product");
		return this.productRepository.findAll();
	}
	
}
