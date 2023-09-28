export default function checkfile (option, file){
    const options = {identificacion: 'pdf',
        domicilio: 'pdf',
        estado:'pdf',
        avatar:'png',
        producto:['jpeg','jpg','webp']}
    
        const fileType = file.mimetype.split('/')[1]
        if (options[option] === fileType){
            return(200)
        }
        else if (option === 'producto'){
            const result = options.producto.findIndex((tipe) => tipe === fileType)
            if (result >= 0){
                return(200)
            }else{
                return(400)
            }
        }
        else{
            return(400)
        }
}