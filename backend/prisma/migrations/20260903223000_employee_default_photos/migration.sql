UPDATE employees SET photo_url = '/images/employees/ricardo-vieira.webp'
WHERE name LIKE 'Ricardo%' AND (photo_url IS NULL OR photo_url = '');

UPDATE employees SET photo_url = '/images/employees/vera-ferreira.webp'
WHERE name LIKE 'Vera%' AND (photo_url IS NULL OR photo_url = '');

UPDATE employees SET photo_url = '/images/employees/eduardo-gomes.webp'
WHERE name LIKE 'Eduardo%' AND (photo_url IS NULL OR photo_url = '');
