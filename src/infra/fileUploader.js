const multer = require('@koa/multer');
const config = require('config');

class FileUploader {
    constructor() {
        this.upload = multer({
            storage: this.storage(),
            limits: this.limits(),
            fileFilter: this.fileFilter(),
        });
    }

    storage() {
        return multer.diskStorage({
            // uploads: uploads/
            destination: config.uploads, // 文件存储路径，在配置文件中
            filename: (req, file, cb) => {
                const timestamp = Date.now();
                const fileName = `file-${timestamp}.${file.mimetype.split('/')[1]}`;
                cb(null, fileName); // 重命名文件
            },
        });
    }

    limits() {
        return { fileSize: 100 * 1024 * 1024 }; // 文件大小限制 100MB
    }

    fileFilter() {
        return (req, file, cb) => {
            // 只允许上传 png、jpg、jpeg 格式的图片
            const allowMimeType = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf'];
            if (allowMimeType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(new Error(`只允许上传 ${allowMimeType} 格式的图片！`));
            }
        };
    }
}

module.exports = new FileUploader();
