/*
 * Type of unit
 * - Volume, ml
 * - Weight, g
 */
CREATE TABLE unit_type (
	id VARCHAR(16) NOT NULL PRIMARY KEY
, base_unit VARCHAR(16) NOT NULL
);


/*
 * Unit of measurement
 * - Kilogram, kg, kg, WEIGHT, 1000
 * - Litre, "l", "l", VOLUME, 1000
 * - "Teaspoon", " teaspoon", " teaspoons", VOLUME, 5
 */
CREATE TABLE measure_unit (
	id VARCHAR(32) NOT NULL PRIMARY KEY
, unit_type_id VARCHAR(16) NOT NULL 
, display VARCHAR(64) NOT NULL
, display_plural VARCHAR(64) NOT NULL
, amount_of_base DOUBLE NOT NULL
, FOREIGN KEY (unit_type_id) REFERENCES unit_type (id)
);


/*
 * Alternative matches when parsing unit
 * - Teaspoon : "tspn", "ts"
 */
CREATE TABLE measure_unit_match (
	name VARCHAR(128) PRIMARY KEY
, measure_unit_id VARCHAR(32)
, FOREIGN KEY (measure_unit_id) REFERENCES measure_unit (id)
);

--
--/*
-- * Base product to list as recipe item.
-- * - Butter
-- * - Milk
-- * - Yoghurt
-- */
--CREATE TABLE product (
--	id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY
--	, name VARCHAR(128)
--	, category-id 
--	, unit -- grams
--	, amount -- amount of grams
--	-- ADD
--);
--
--/*
-- * Alternative matched when parsing products
-- * - bttr -> butter
-- * - mlk -> milk
-- */
--CREATE TABLE product-match (
--	name VARCHAR(128) PRIMARY KEY
--	, product-id BIGINT
--);
--
--/*
-- * Specific product to list as shop stock
-- * - Low fat milk -> milk
-- * - Rasberry flavoured yoghurt -> yoghurt
-- */
--CREATE TABLE product-variant (
--	id BIGINT NOT NULL PRIMARY KEY
--	, brand-id BIGINT
--	, name VARCHAR(128) NULL -- optionally replaces product.name
--	, unit -- grams
--	, amount -- amount of grams
--);
--
--/*
-- * All product categories
-- * - Fruit
-- * - Dairy
-- */
--CREATE TABLE product-category (
--	id BIGINT NOT NULL PRIMARY KEY
--	, name VARCHAR(128)
--);
--
--/*
-- * Specific shop
-- * - Pak n Save New Plymouth
-- */
--CREATE TABLE shop (
--	id BIGINT NOT NULL PRIMARY KEY
--	, name VARCHAR(128)
--	, location
--);
--
--/*
-- * Location of a specific product in a shop
-- * - Rasberry yoghurt @ Pak n Save NP in Aisle 2
-- */
--CREATE TABLE product-shop (
--	id BIGINT NOT NULL PRIMARY KEY
--	, product-variant-id
--	, shop-id
--	, location-id
--);
--
--/*
-- * All locations in a specific shop, with sort order
-- * - Pak n Save NP, Aisle 1, Sort 2
-- * - Pak n Save NP, Vegestable row, Sort 1 
-- */
--CREATE TABLE shop-location (
--	id BIGINT NOT NULL PRIMARY KEY
--	, name
--	, shop-id
--	, sort-order
--);
--
--/*
-- * Price history for a product
-- */
--CREATE TABLE product-price-history (
--	id BIGINT NOT NULL PRIMARY KEY
--	, product-variant-id
--	, shop-id
--	, datetime
--	, price
--); 


