import { Controller, UploadedFile, UseInterceptors, Post, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, HttpStatus, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('file')
export class FileController {

    // @Post('upload')
    // @UseInterceptors(FileInterceptor('filers'))
    // uploadFile(@UploadedFile(
    //         new ParseFilePipe({
    //           validators: [
    //             new MaxFileSizeValidator({ maxSize: 2000000 }),
    //             new FileTypeValidator({ fileType: 'png'}) //|| { fileType: 'mp4' }), //|| new FileTypeValidator({ fileType: 'video/mp4' }),//look this up for solution
    //            //new FileTypeValidator({ fileType: 'video/mp4' }),
    //           ],
    //         }),
    // ) file: Express.Multer.File) {
    //   console.log(file);
    // }


    @Post()
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './src/resume',
            filename: (req, file, callback)=> {
                const fileName = file.originalname;
                //const extension = path.parse(file.originalname).ext;
                callback(null, `${fileName}`)
            }
        })
    }))

    fileUpload(@Res()res, @UploadedFile(

        new ParseFilePipe({
            validators: [
                new MaxFileSizeValidator({maxSize: 1000000}),
                new FileTypeValidator({fileType: 'png'}),
            ],
        }),
)
        file){
            return res.status(HttpStatus.OK).json({
                sucess: true,
                data: file.path
            });
        }
}
