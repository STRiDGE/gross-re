package nz.strydom.gross.product;

import nz.strydom.gross.config.WebSocketConfiguration;
import nz.strydom.gross.domain.Product;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.hateoas.EntityLinks;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
@RepositoryEventHandler(Product.class)
public class ProductEventHandler {

	private final SimpMessagingTemplate websocket;
	private final EntityLinks entityLinks;
	private final String MESSAGE_PREFIX = WebSocketConfiguration.MESSAGE_PREFIX;

	public ProductEventHandler(
			final SimpMessagingTemplate websocket,
			final EntityLinks entityLinks
	) {
		this.websocket = websocket;
		this.entityLinks = entityLinks;
	}

	@HandleAfterCreate
	public void newProduct(Product product) {
		this.websocket.convertAndSend(MESSAGE_PREFIX + "/newProduct", getPath(product));
	}

	@HandleAfterDelete
	public void deleteProduct(Product product) {
		this.websocket.convertAndSend(MESSAGE_PREFIX + "/deleteProduct", getPath(product));
	}

	@HandleAfterSave
	public void updateProduct(Product product) {
		this.websocket.convertAndSend(MESSAGE_PREFIX + "/updateProduct", getPath(product));
	}

	private String getPath(final Product product) {
		return this.entityLinks.linkForSingleResource(product.getClass(), product.getId()).toUri().getPath();
	}
}
