import multer from "multer";

const guardar = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,'./public/img')
    },
    filename: (req, file, cb) =>{
        if(file !==null){
            const ext = file.originalname.split('.').pop();
            cb(null, Date.now()+'.'+ext)
        }
    }
});

const filtro = (rec,file,cb) =>{
    if(file &&(file.mimetype) === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)

    }
    else{
        cb(null,false)
    }
}

export const subirImage = multer({
    storage: guardar, fileFilter:filtro
})