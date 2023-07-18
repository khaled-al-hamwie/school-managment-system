import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { diskStorage } from "multer";

const multerOptions: MulterOptions = {
    fileFilter(req, file, callback) {
        if (
            file &&
            file.originalname.match(
                /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/,
            )
        ) {
            callback(null, true);
        }
        callback(null, false);
    },
    storage: diskStorage({
        destination: "./uploads/prizes",
        filename: (req, file, callback) => {
            if (file) {
                const filename = Date.now() + "-" + file.originalname;
                callback(null, filename);
            }
        },
    }),
};

export const PrizeInterceptor = FileInterceptor("image", multerOptions);
