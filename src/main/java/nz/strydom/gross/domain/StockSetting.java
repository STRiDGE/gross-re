package nz.strydom.gross.domain;


public class StockSetting {
	
	/**
	 * Minimum amount that should be in stock.  Perhaps define the trigger of when the be friendly and when to insist.
	 */
	private double minimumAmount; 
	public double getMinimumAmount() { return this.minimumAmount; }
	public void setMinimumAmount(double minimumAmount) { this.minimumAmount = minimumAmount; }

	/* TODO:
	 * How often is this bought?  Should be able to handle stuff only bought on grocery day, and stuff filled on as needed
	 * 
	 */
}
