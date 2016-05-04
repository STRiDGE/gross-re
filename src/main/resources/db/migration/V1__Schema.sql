/*
 * Unit of measurement
 * - Kilogram, kg, kg, WEIGHT, 1000
 * - Litre, "l", "l", VOLUME, 1000
 * - "Teaspoon", " teaspoon", " teaspoons", VOLUME, 5
 */
CREATE TABLE measure-unit (
	, name NOT NULL PRIMARY KEY
	, display VARCHAR
	, display-plural
	, unit-type-id
	, amount-of-base DOUBLE
);

/*
 * Type of unit
 * - Volume, ml
 * - Weight, g
 */
CREATE TABLE unit-type (
	name VARCHAR(16)
	, base-unit VARCHAR
);

/*
 * Alternative matches when parsing unit
 * - Teaspoon : "tspn", "ts"
 */
CREATE TABLE measure-unit-match (
	name VARCHAR(128) PRIMARY KEY
	, measure-unit-id BIGINT

);

/*
 * Base product to list as recipe item.
 * - Butter
 * - Milk
 * - Yoghurt
 */
CREATE TABLE product (
	id BIGINT NOT NULL PRIMARY KEY
	, name VARCHAR(128)
	, category-id 
	, unit -- grams
	, amount -- amount of grams
	-- ADD
);

/*
 * Alternative matched when parsing products
 * - bttr -> butter
 * - mlk -> milk
 */
CREATE TABLE product-match (
	name VARCHAR(128) PRIMARY KEY
	, product-id BIGINT
);

/*
 * Specific product to list as shop stock
 * - Low fat milk -> milk
 * - Rasberry flavoured yoghurt -> yoghurt
 */
CREATE TABLE product-variant (
	id BIGINT NOT NULL PRIMARY KEY
	, brand-id BIGINT
	, name VARCHAR(128) NULL -- optionally replaces product.name
	, unit -- grams
	, amount -- amount of grams
);

/*
 * All product categories
 * - Fruit
 * - Dairy
 */
CREATE TABLE product-category (
	id BIGINT NOT NULL PRIMARY KEY
	, name VARCHAR(128)
);

/*
 * Specific shop
 * - Pak n Save New Plymouth
 */
CREATE TABLE shop (
	id BIGINT NOT NULL PRIMARY KEY
	, name VARCHAR(128)
	, location
);

/*
 * Location of a specific product in a shop
 * - Rasberry yoghurt @ Pak n Save NP in Aisle 2
 */
CREATE TABLE product-shop (
	id BIGINT NOT NULL PRIMARY KEY
	, product-variant-id
	, shop-id
	, location-id
);

/*
 * All locations in a specific shop, with sort order
 * - Pak n Save NP, Aisle 1, Sort 2
 * - Pak n Save NP, Vegestable row, Sort 1 
 */
CREATE TABLE shop-location (
	id BIGINT NOT NULL PRIMARY KEY
	, name
	, shop-id
	, sort-order
);

/*
 * Price history for a product
 */
CREATE TABLE product-price-history (
	id BIGINT NOT NULL PRIMARY KEY
	, product-variant-id
	, shop-id
	, datetime
	, price
); 


