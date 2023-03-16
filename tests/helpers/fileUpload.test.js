import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name:'dlqdjdl8a',
    api_key:'321226197728239',
    api_secret:'6CDGENefPxAE98vatBV7uHMETUQ',
    secure:true
});


describe('Prueba de fileUpload', () => { 
   
    test('debe de subir el archivo correctamente a cloudinary', async() => { 
       
        const imageUrl = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob],'foto1.jpg'); 


        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        // para borrar la imagen de prueba de cloudinary obtendremos el id de la foto
        // console.log(url);
        const segments = url.split('/');
        const imageId = segments[segments.length -1].replace('.png','');


        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ]);

        // console.log({cloudResp});

    });

    test('debe de retornar null', async() => { 
       
        const file = new File([],'foto1.jpg'); 
        const url = await fileUpload( file );
        expect( url ).toBe( null );

    });

});
