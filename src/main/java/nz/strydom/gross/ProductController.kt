package nz.strydom.gross

import java.util.ArrayList
import java.util.Random

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired

import nz.strydom.demo.Item
import nz.strydom.gross.domain.Product
import nz.strydom.gross.interfaces.IProductRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/products")
class ProductController
@Autowired
constructor(val productRepository: IProductRepository) {

    @GetMapping(value=["/{id}"])
    fun getProduct(@PathVariable id: String): Product {
        return this.productRepository.findById(id)
                .orElse(null) // Fix NPE
    }

    // TODO filter and paging
    val allProducts: List<Product>
        @RequestMapping(method = [RequestMethod.GET])
        get() {
            log.warn("Asking for all product")
            return this.productRepository.findAll()
        }

    @PostMapping
    fun addProduct(@RequestBody product: Product): Product {
        product.id = Random().nextLong() // TODO make sensible id
        return this.productRepository.saveAndFlush(product)
    }

    @PutMapping(value = ["/{id}"])
    fun updateItem(@RequestBody product: Product, @PathVariable id: Long): Product {
        product.id = id
        return this.productRepository.saveAndFlush(product)
    }

    @DeleteMapping(value = ["/{id}"])
    fun deleteItem(@PathVariable id: String) {
        this.productRepository.deleteById(id)
    }

    companion object {

        private val log = LoggerFactory.getLogger(ProductController::class.java)
    }

}
