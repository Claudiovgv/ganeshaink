const fs = require('fs');
const path = require('path');
const multer = require('multer');

const UPLOAD_DIR = path.join(__dirname, '../../uploads/employees');

const ALLOWED = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 800 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED[file.mimetype]) {
      const err = new Error('A foto tem de ser uma imagem (JPEG, PNG ou WebP)');
      err.status = 400;
      return cb(err);
    }
    cb(null, true);
  },
});

const DEFAULT_PHOTOS = [
  { match: /ricardo/i, url: '/images/employees/ricardo-vieira.webp' },
  { match: /vera/i, url: '/images/employees/vera-ferreira.webp' },
  { match: /eduardo/i, url: '/images/employees/eduardo-gomes.webp' },
];

function defaultPhotoUrl(name) {
  const hit = DEFAULT_PHOTOS.find((p) => p.match.test(name || ''));
  return hit ? hit.url : null;
}

function withPhotoUrl(employee) {
  if (!employee) return employee;
  return { ...employee, photoUrl: employee.photoUrl || defaultPhotoUrl(employee.name) };
}

function saveEmployeePhoto(employeeId, buffer, mimetype) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const ext = ALLOWED[mimetype] || 'jpg';
  for (const old of ['jpg', 'jpeg', 'png', 'webp', 'gif']) {
    const p = path.join(UPLOAD_DIR, `${employeeId}.${old}`);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  }
  const filename = `${employeeId}.${ext}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);
  return `/uploads/employees/${filename}`;
}

function photoUploadMiddleware(req, res, next) {
  upload.single('photo')(req, res, (err) => {
    if (!err) return next();
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'A foto é demasiado grande (máx. 800 KB)' });
    }
    return res.status(400).json({ error: err.message || 'Ficheiro inválido' });
  });
}

module.exports = { photoUploadMiddleware, saveEmployeePhoto, defaultPhotoUrl, withPhotoUrl };
