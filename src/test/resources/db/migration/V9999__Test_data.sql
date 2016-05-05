INSERT INTO unit_type (id, base_unit) VALUES
  ("Volume", "ml")
, ("Weight", "g")
, ("Count", "")
, ("Other", "")
;

INSERT INTO measure_unit(id, unit_type_id, display, display_plural, amount_of_base) VALUES
  ("None", "Other", "", "", 0)
, ("Kilogram", "Weight", "kg", "kg", 1000)
, ("Gram", "Weight", "g", "g", 1)
, ("Litre", "Volume", "l", "l", 1000)
, ("Count", "Count", "", "", 1)
, ("Cups", "Volume", " cup", " cups", 250)
, ("Teaspoon", "Volume", " teaspoon", " teaspoons", 5)
, ("Tablespoon", "Volume", " tablespoon", " tablespoon", 15)
;

INSERT INTO measure_unit_match (name, measure_unit_id) VALUES
  ("gram", "Gram")
, ("grams", "Gram")
, ("litre", "Litre")
, ("litres", "Litre")
, ("litres", "Litre")
, ("tspn", "Teaspoon")
, ("ts", "Teaspoon")
, ("tea spoon", "Teaspoon")
, ("tea-spoon", "Teaspoon")
, ("tblsp", "Tablespoon")
;
