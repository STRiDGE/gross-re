package nz.strydom.gross.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PriceAtStore {

	private Store store;
	public Store getStore() { return this.store; }
	public void setStore(Store store) { this.store = store; }
	
	private BigDecimal price;
	public BigDecimal getPrice() { return this.price; }
	public void setPrice(BigDecimal price) { this.price = price; }
	
	private LocalDate dateRecorded;
	public LocalDate getDateRecorded() { return this.dateRecorded; }
	public void setDateRecorded(LocalDate dateRecorded) { this.dateRecorded = dateRecorded; }
}
