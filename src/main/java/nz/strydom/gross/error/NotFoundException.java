package nz.strydom.gross.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {

	public NotFoundException(final String resource, final Long id) {
		this(String.format("Could not find %s with id %d", resource, id));
	}

	public NotFoundException(final String message) {
		super(message);
	}

	public NotFoundException(final String message, final Throwable cause) {
		super(message, cause);
	}
}
