const multer = require('multer');

const upload = multer({
	limits: { fileSize: 2 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		if (!file.mimetype.startsWith('image/')) {
			cb(new Error('The uploaded file must be an image'));
		} else {
			cb(null, true);
		}
	},
});

module.exports = upload;
