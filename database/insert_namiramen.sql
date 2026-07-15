-- =============================================================================
-- SCRIPT DE INSERCIÓN - CATÁLOGO AMPLIADO NAMI RAMEN & SUSHI
-- Los 4 productos obligatorios están marcados con ★
-- Pegá las URLs donde dice PEGAR_URL_AQUI
-- =============================================================================

USE nami_restaurant_db_api;

SET SQL_SAFE_UPDATES = 0;
-- =============================================================================
-- 1. CATEGORÍAS
-- =============================================================================
INSERT IGNORE INTO categorias (nombre_categoria) VALUES
('Ramen'),
('Sushi & Rolls'),
('Entradas'),
('Platos Principales'),
('Bebidas'),
('Postres'),
('Combos');

-- =============================================================================
-- 2. PRODUCTOS
-- =============================================================================
INSERT INTO productos (nombre, descripcion, precio, imagen_url, id_categoria, activo) VALUES

-- ── RAMEN ────────────────────────────────────────────────────────────────────

-- ★ OBLIGATORIO
(
  'Ramen Miso',
  'Caldo de pasta miso con profundidad umami, fideos ramen frescos, tofu firme salteado, huevo marinado ajitsuke, champiñones shiitake, maíz dulce, espinaca blanqueada y nori. Terminado con aceite de sésamo.',
  6200.00,
  'https://images.pexels.com/photos/23658622/pexels-photo-23658622.jpeg',
  1, TRUE
),
(
  'Tonkotsu Nami',
  'Caldo de cerdo cocido durante 18 horas hasta lograr una textura cremosa y profunda. Incluye chashu de cerdo, huevo marinado, nori, cebollín, bambú y un toque de aceite de sésamo.',
  6500.00,
  'https://images.pexels.com/photos/34313367/pexels-photo-34313367.jpeg',
  1, TRUE
),
(
  'Spicy Tantanmen',
  'Ramen picante de inspiración Sichuan con caldo de cerdo y sésamo, carne molida de res, pasta de chili y aceite de chili. Intenso, adictivo y con un calor que va creciendo.',
  6800.00,
  'https://images.pexels.com/photos/19867361/pexels-photo-19867361.jpeg',
  1, TRUE
),
(
  'Shoyu Ramen',
  'Caldo de pollo y soya de sabor delicado y equilibrado. Con chashu de pollo, huevo marinado, nori y menma. Ideal para quienes se acercan al ramen por primera vez.',
  5500.00,
  'https://images.pexels.com/photos/37106178/pexels-photo-37106178.jpeg',
  1, TRUE
),

-- ── SUSHI & ROLLS ─────────────────────────────────────────────────────────────

-- ★ OBLIGATORIO
(
  'Nigiri de Salmón (x6)',
  'Seis piezas de nigiri con arroz para sushi sazonado con vinagre de arroz y láminas de salmón fresco de primera calidad. Acompañadas de jengibre encurtido, wasabi y salsa de soya.',
  5500.00,
  'https://images.pexels.com/photos/28992204/pexels-photo-28992204.jpeg',
  2, TRUE
),
(
  'Dragon Roll',
  'Roll de camarón tempura y pepino cubierto con láminas de aguacate, mayonesa japonesa y sriracha. Ocho piezas con presentación de escamas de dragón.',
  6200.00,
  'https://images.pexels.com/photos/6563256/pexels-photo-6563256.jpeg',
  2, TRUE
),
(
  'Spicy Tuna Roll',
  'Atún rojo fresco con pasta de wasabi, mayonesa japonesa y sriracha. Cubierto con ajonjolí tostado. Ocho piezas.',
  6500.00,
  'https://images.pexels.com/photos/15264029/pexels-photo-15264029.jpeg',
  2, TRUE
),

-- ── ENTRADAS ──────────────────────────────────────────────────────────────────
(
  'Gyoza (x6)',
  'Seis dumplings de cerdo y jengibre sellados a la plancha con base crujiente y vapor interior. Servidos con salsa ponzu.',
  3200.00,
  'https://images.pexels.com/photos/7719909/pexels-photo-7719909.jpeg',
  3, TRUE
),
(
  'Takoyaki (x6)',
  'Seis bolitas de pulpo estilo Osaka cubiertas con salsa okonomiyaki, mayonesa japonesa y katsuobushi.',
  3600.00,
  'https://images.pexels.com/photos/31302952/pexels-photo-31302952.jpeg',
  3, TRUE
),
(
  'Karaage de Pollo',
  'Trozos de pollo marinados en soya y jengibre, fritos con panko hasta lograr una costra dorada y crujiente. Con mayonesa japonesa.',
  3800.00,
  'https://images.pexels.com/photos/1860202/pexels-photo-1860202.jpeg',
  3, TRUE
),
(
  'Edamame al Vapor',
  'Vainas de soya al vapor con sal marina y aceite de sésamo. Entrada ligera, nutritiva y perfecta para compartir.',
  2200.00,
  'https://images.pexels.com/photos/29935499/pexels-photo-29935499.jpeg',
  3, TRUE
),
(
  'Kimchi Pancake',
  'Tortilla coreana crujiente de kimchi y cebollín. Servida con salsa de soya y vinagre de arroz. Sabor intenso y textura irresistible.',
  3400.00,
  'https://images.pexels.com/photos/5774156/pexels-photo-5774156.jpeg',
  3, TRUE
),

-- ── PLATOS PRINCIPALES ────────────────────────────────────────────────────────

-- ★ OBLIGATORIO
(
  'Pollo a la Naranja',
  'Trozos de pechuga rebozados y fritos, bañados en salsa agridulce de naranja con jengibre, ajo y soya. Servido sobre arroz al vapor con ajonjolí tostado y cebollín.',
  5800.00,
  'https://images.pexels.com/photos/19725443/pexels-photo-19725443.jpeg',
  4, TRUE
),

-- ★ OBLIGATORIO
(
  'Mongolian Beef',
  'Tiras de res salteadas a fuego alto en wok con salsa de soya, azúcar moreno, ajo y jengibre. Terminado con cebollín generoso y ajonjolí tostado. Servido sobre arroz blanco. Dulce, salado e intenso.',
  7200.00,
  'https://images.pexels.com/photos/26341193/pexels-photo-26341193.jpeg',
  4, TRUE
),
(
  'Bibimbap Coreano',
  'Arroz con vegetales salteados (zanahoria, espinaca, champiñón), huevo frito y pasta gochujang. Mezclá todo en el tazón antes de comer para integrar los sabores.',
  5500.00,
  'https://images.pexels.com/photos/7491952/pexels-photo-7491952.jpeg',
  4, TRUE
),
(
  'Pollo Teriyaki Don',
  'Bowl de arroz con pollo glaseado en salsa teriyaki, acompañado de ensalada de repollo y ajonjolí tostado.',
  5000.00,
  'https://images.pexels.com/photos/17308537/pexels-photo-17308537.jpeg',
  4, TRUE
),
(
  'Udon Salteado',
  'Fideos udon gruesos salteados con pollo, champiñón enoki, zanahoria, salsa de soya y aceite de sésamo.',
  5200.00,
  'https://images.pexels.com/photos/9028686/pexels-photo-9028686.jpeg',
  4, TRUE
),

-- ── BEBIDAS ───────────────────────────────────────────────────────────────────
(
  'Matcha Latte',
  'Leche vaporizada con polvo de matcha japonés de primera calidad. Disponible frío o caliente.',
  2500.00,
  'https://images.pexels.com/photos/34334882/pexels-photo-34334882.jpeg',
  5, TRUE
),
(
  'Ramune Soda',
  'Refresco japonés embotellado con el clásico sistema de canica. Sabor original limón-lima.',
  1800.00,
  'https://images.pexels.com/photos/4045205/pexels-photo-4045205.jpeg',
  5, TRUE
),

-- ── POSTRES ───────────────────────────────────────────────────────────────────
(
  'Mochi Ice Cream (x3)',
  'Tres piezas de mochi rellenas de helado. Sabores disponibles: matcha, fresa y vainilla. Suave por fuera, cremoso por dentro.',
  3000.00,
  'https://images.pexels.com/photos/37357446/pexels-photo-37357446.jpeg',
  6, TRUE
),
(
  'Taiyaki',
  'Waffle japonés en forma de pez relleno de pasta de anko (frijol rojo dulce). Crujiente por fuera y suave por dentro.',
  2800.00,
  'https://images.pexels.com/photos/30697934/pexels-photo-30697934.jpeg',
  6, TRUE
);
-- =============================================================================
-- 3. PRODUCTO_INGREDIENTES
-- =============================================================================

-- Ramen Miso
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Ramen Miso' AND i.nombre_ingrediente IN (
  'Caldo miso','Pasta miso','Fideos ramen','Tofu firme',
  'Huevo marinado ajitsuke','Champiñón shiitake','Maíz dulce',
  'Espinaca blanqueada','Nori (alga marina)','Aceite de sésamo','Cebollín'
);

-- Tonkotsu Nami
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Tonkotsu Nami' AND i.nombre_ingrediente IN (
  'Caldo de cerdo tonkotsu','Fideos ramen','Chashu de cerdo',
  'Huevo marinado ajitsuke','Nori (alga marina)','Cebollín',
  'Bambú menma','Aceite de sésamo','Salsa de soya'
);

-- Spicy Tantanmen
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Spicy Tantanmen' AND i.nombre_ingrediente IN (
  'Caldo de cerdo tonkotsu','Fideos ramen','Res wagyu','Pasta miso',
  'Aceite de chili','Aceite de sésamo','Cebollín','Ajonjolí tostado'
);

-- Shoyu Ramen
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Shoyu Ramen' AND i.nombre_ingrediente IN (
  'Caldo de pollo','Fideos ramen','Pollo teriyaki',
  'Huevo marinado ajitsuke','Nori (alga marina)','Bambú menma',
  'Salsa de soya','Cebollín'
);

-- Nigiri de Salmón
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Nigiri de Salmón (x6)' AND i.nombre_ingrediente IN (
  'Arroz para sushi','Salmón fresco','Vinagre de arroz',
  'Jengibre encurtido','Pasta de wasabi','Salsa de soya'
);

-- Dragon Roll
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Dragon Roll' AND i.nombre_ingrediente IN (
  'Arroz para sushi','Camarón','Tempura (fritura crujiente)',
  'Pepino japonés','Aguacate','Nori (alga marina)',
  'Mayonesa japonesa','Salsa sriracha'
);

-- Spicy Tuna Roll
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Spicy Tuna Roll' AND i.nombre_ingrediente IN (
  'Arroz para sushi','Atún rojo','Pasta de wasabi',
  'Mayonesa japonesa','Salsa sriracha','Nori (alga marina)','Ajonjolí tostado'
);

-- Rainbow Roll
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Rainbow Roll' AND i.nombre_ingrediente IN (
  'Arroz para sushi','Cangrejo kani','Pepino japonés','Salmón fresco',
  'Atún rojo','Aguacate','Nori (alga marina)','Mayonesa japonesa'
);

-- Gyoza
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Gyoza (x6)' AND i.nombre_ingrediente IN (
  'Chashu de cerdo','Jengibre encurtido','Cebollín',
  'Salsa ponzu','Aceite de sésamo'
);

-- Takoyaki
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Takoyaki (x6)' AND i.nombre_ingrediente IN (
  'Pulpo','Salsa okonomiyaki','Mayonesa japonesa',
  'Katsuobushi (hojuelas de bonito)','Cebollín'
);

-- Karaage
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Karaage de Pollo' AND i.nombre_ingrediente IN (
  'Pollo teriyaki','Salsa de soya','Jengibre encurtido',
  'Pan panko','Mayonesa japonesa'
);

-- Edamame
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Edamame al Vapor'
  AND i.nombre_ingrediente IN ('Aceite de sésamo','Ajonjolí tostado');

-- Kimchi Pancake
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Kimchi Pancake' AND i.nombre_ingrediente IN (
  'Kimchi','Cebollín','Salsa de soya','Vinagre de arroz'
);

-- Pollo a la Naranja
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Pollo a la Naranja' AND i.nombre_ingrediente IN (
  'Pollo teriyaki','Salsa de soya','Vinagre de arroz',
  'Jengibre encurtido','Aceite de sésamo','Ajonjolí tostado',
  'Cebollín','Arroz para sushi'
);

-- Mongolian Beef
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Mongolian Beef' AND i.nombre_ingrediente IN (
  'Res wagyu','Salsa de soya','Aceite de sésamo',
  'Jengibre encurtido','Cebollín','Ajonjolí tostado','Arroz para sushi'
);

-- Bibimbap
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Bibimbap Coreano' AND i.nombre_ingrediente IN (
  'Arroz para sushi','Zanahoria juliana','Espinaca blanqueada',
  'Champiñón shiitake','Huevo marinado ajitsuke',
  'Pasta gochujang','Aceite de sésamo','Ajonjolí tostado'
);

-- Pollo Teriyaki Don
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Pollo Teriyaki Don' AND i.nombre_ingrediente IN (
  'Arroz para sushi','Pollo teriyaki','Salsa teriyaki',
  'Lechuga iceberg','Ajonjolí tostado','Cebollín'
);

-- Udon Salteado
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Udon Salteado' AND i.nombre_ingrediente IN (
  'Fideos udon','Pollo teriyaki','Zanahoria juliana',
  'Champiñón enoki','Salsa de soya','Aceite de sésamo','Cebollín'
);

-- Bebidas
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Matcha Latte' AND i.nombre_ingrediente IN ('Aceite de sésamo');

-- Mochi Ice Cream
INSERT IGNORE INTO producto_ingredientes (id_producto, id_ingrediente)
SELECT p.id, i.id FROM productos p, ingredientes i
WHERE p.nombre = 'Mochi Ice Cream (x3)' AND i.nombre_ingrediente IN (
  'Arroz para sushi','Vinagre de arroz'
);

-- =============================================================================
-- 4. COMBOS
-- =============================================================================
INSERT INTO combos (nombre_combo, precio_especial, id_categoria, activo) VALUES
('Combo Clásico Nami',      10500.00, 7, TRUE),
('Combo Mar y Tierra',      11500.00, 7, TRUE),
('Combo Sushi + Ramen',     10200.00, 7, TRUE),
('Combo Premium Wagyu',     12000.00, 7, TRUE);

-- =============================================================================
-- 5. COMBO_PRODUCTOS
-- =============================================================================

-- Combo Clásico Nami: Ramen Miso + Pollo a la Naranja
INSERT IGNORE INTO combo_productos (id_combo, id_producto, cantidad)
SELECT c.id, p.id, 1
FROM combos c, productos p
WHERE c.nombre_combo = 'Combo Clásico Nami'
  AND p.nombre IN ('Ramen Miso','Pollo a la Naranja');

-- Combo Mar y Tierra: Nigiri de Salmón + Mongolian Beef
INSERT IGNORE INTO combo_productos (id_combo, id_producto, cantidad)
SELECT c.id, p.id, 1
FROM combos c, productos p
WHERE c.nombre_combo = 'Combo Mar y Tierra'
  AND p.nombre IN ('Nigiri de Salmón (x6)','Mongolian Beef');

-- Combo Sushi + Ramen: Nigiri de Salmón + Ramen Miso
INSERT IGNORE INTO combo_productos (id_combo, id_producto, cantidad)
SELECT c.id, p.id, 1
FROM combos c, productos p
WHERE c.nombre_combo = 'Combo Sushi + Ramen'
  AND p.nombre IN ('Nigiri de Salmón (x6)','Ramen Miso');

-- Combo Premium: Mongolian Beef + Pollo a la Naranja + Nigiri de Salmón
INSERT IGNORE INTO combo_productos (id_combo, id_producto, cantidad)
SELECT c.id, p.id, 1
FROM combos c, productos p
WHERE c.nombre_combo = 'Combo Premium Wagyu'
  AND p.nombre IN ('Mongolian Beef','Pollo a la Naranja','Nigiri de Salmón (x6)');

-- =============================================================================
-- 6. PROCESOS_PREPARACION
-- 1=Barra Sushi | 2=Cocina Caliente | 3=Estación de Emplatado
-- =============================================================================

-- Ramen → Cocina Caliente → Emplatado
INSERT IGNORE INTO procesos_preparacion (id_producto, id_estacion, orden_paso)
SELECT p.id, e.id,
  CASE e.nombre_estacion
    WHEN 'Cocina Caliente'       THEN 1
    WHEN 'Estación de Emplatado' THEN 2
  END
FROM productos p, estaciones e
WHERE p.nombre IN ('Ramen Miso','Tonkotsu Nami','Spicy Tantanmen','Shoyu Ramen')
  AND e.nombre_estacion IN ('Cocina Caliente','Estación de Emplatado');

-- Sushi → Barra Sushi → Emplatado
INSERT IGNORE INTO procesos_preparacion (id_producto, id_estacion, orden_paso)
SELECT p.id, e.id,
  CASE e.nombre_estacion
    WHEN 'Barra Sushi'           THEN 1
    WHEN 'Estación de Emplatado' THEN 2
  END
FROM productos p, estaciones e
WHERE p.nombre IN ('Nigiri de Salmón (x6)','Dragon Roll','Spicy Tuna Roll','Rainbow Roll')
  AND e.nombre_estacion IN ('Barra Sushi','Estación de Emplatado');

-- Entradas → Cocina Caliente → Emplatado
INSERT IGNORE INTO procesos_preparacion (id_producto, id_estacion, orden_paso)
SELECT p.id, e.id,
  CASE e.nombre_estacion
    WHEN 'Cocina Caliente'       THEN 1
    WHEN 'Estación de Emplatado' THEN 2
  END
FROM productos p, estaciones e
WHERE p.nombre IN ('Gyoza (x6)','Takoyaki (x6)','Karaage de Pollo',
                   'Edamame al Vapor','Kimchi Pancake')
  AND e.nombre_estacion IN ('Cocina Caliente','Estación de Emplatado');

-- Platos principales → Cocina Caliente → Emplatado
INSERT IGNORE INTO procesos_preparacion (id_producto, id_estacion, orden_paso)
SELECT p.id, e.id,
  CASE e.nombre_estacion
    WHEN 'Cocina Caliente'       THEN 1
    WHEN 'Estación de Emplatado' THEN 2
  END
FROM productos p, estaciones e
WHERE p.nombre IN ('Pollo a la Naranja','Mongolian Beef','Bibimbap Coreano',
                   'Pollo Teriyaki Don','Udon Salteado')
  AND e.nombre_estacion IN ('Cocina Caliente','Estación de Emplatado');

-- Bebidas → solo Emplatado
INSERT IGNORE INTO procesos_preparacion (id_producto, id_estacion, orden_paso)
SELECT p.id, e.id, 1 FROM productos p, estaciones e
WHERE p.nombre IN ('Matcha Latte','Té Verde Sencha','Ramune Soda')
  AND e.nombre_estacion = 'Estación de Emplatado';

-- Postres → Barra Sushi → Emplatado (montaje frío)
INSERT IGNORE INTO procesos_preparacion (id_producto, id_estacion, orden_paso)
SELECT p.id, e.id,
  CASE e.nombre_estacion
    WHEN 'Barra Sushi'           THEN 1
    WHEN 'Estación de Emplatado' THEN 2
  END
FROM productos p, estaciones e
WHERE p.nombre = 'Mochi Ice Cream (x3)'
  AND e.nombre_estacion IN ('Barra Sushi','Estación de Emplatado');

-- Taiyaki → Cocina Caliente → Emplatado
INSERT IGNORE INTO procesos_preparacion (id_producto, id_estacion, orden_paso)
SELECT p.id, e.id,
  CASE e.nombre_estacion
    WHEN 'Cocina Caliente'       THEN 1
    WHEN 'Estación de Emplatado' THEN 2
  END
FROM productos p, estaciones e
WHERE p.nombre = 'Taiyaki'
  AND e.nombre_estacion IN ('Cocina Caliente','Estación de Emplatado');

SET SQL_SAFE_UPDATES = 1;

select * from categorias order by id;
-- =============================================================================
-- VERIFICACIÓN
-- =============================================================================
SELECT 'productos'               AS tabla, COUNT(*) AS total FROM productos
UNION ALL SELECT 'combos',                COUNT(*) FROM combos
UNION ALL SELECT 'combo_productos',       COUNT(*) FROM combo_productos
UNION ALL SELECT 'producto_ingredientes', COUNT(*) FROM producto_ingredientes
UNION ALL SELECT 'procesos_preparacion',  COUNT(*) FROM procesos_preparacion;

SELECT imagen_url FROM productos where id=1;

UPDATE combo_productos SET es_principal = FALSE WHERE id_combo = 4 AND id_producto = 14;

SELECT * FROM combos;
SELECT * FROM combo_productos;
SELECT * FROM productos;
select * from ingredientes;

ALTER TABLE combo_productos 
ADD COLUMN es_principal BOOLEAN DEFAULT FALSE;

SET SQL_SAFE_UPDATES = 0;
SET SQL_SAFE_UPDATES = 1;