package nz.strydom.gross;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import nz.strydom.gross.domain.Product;
import nz.strydom.gross.interfaces.IProductRepository;

@RestController
@RequestMapping("/gross")
public class GrossController {
	
	private IProductRepository productRepository;

	@Autowired
	public GrossController(IProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@RequestMapping(method = RequestMethod.GET)
	public List<Product> getAllProducts() {
		// TODO filter and paging
		return this.productRepository.findAll();
	}
	
}
