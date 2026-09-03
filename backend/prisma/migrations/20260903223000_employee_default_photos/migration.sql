UPDATE employees SET photoUrl = '/images/employees/ricardo-vieira.webp'
WHERE name LIKE 'Ricardo%' AND (photoUrl IS NULL OR photoUrl = '');

UPDATE employees SET photoUrl = '/images/employees/vera-ferreira.webp'
WHERE name LIKE 'Vera%' AND (photoUrl IS NULL OR photoUrl = '');

UPDATE employees SET photoUrl = '/images/employees/eduardo-gomes.webp'
WHERE name LIKE 'Eduardo%' AND (photoUrl IS NULL OR photoUrl = '');
