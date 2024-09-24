const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
    //dosyanın nereye yükleneceğini belirler
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    //dosyanın adı ve uzantısını belirleri
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
});

// yapılandırılmış storage'ı kullanarak multer middleware oluşturulur
const upload = multer({ storage: storage });

module.exports = upload;
