package nz.strydom

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class GrossApplication {

}

fun main(args: Array<String>) {
    SpringApplication.run(GrossApplication::class.java, *args)
}
