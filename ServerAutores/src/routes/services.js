import index from "../views/index_html.js";
import express from "express";
import Autor from "../schema/autor.js";


const router = express.Router();



router.get("/cuenta/:idcuenta/:idPersona",(req,res)=>{
	console.log(req.params);
	console.log(req.params.idcuenta);
	console.log(req.params.idPersona);
	res.send("Tu cuenta personal");
});


//Metodos GET

/**
	
**/
router.get("/",async (req, res) => {
	res.send("servidor de Autor");
});

router.get("/dataAutores",async (req, res) => {
	//Aqui estoy recogiendo los datos del servidor
	const autors_db = await Autor.find();
	console.log(autors_db);
	res.send(JSON.stringify(autors_db));
});

router.post("/add/autor/:id_autor/:number_document/:name_autor/:lastname_autor", async (req, res) => {
	 try {
        const infoAutor = req.params;
        console.log("Aqui llegan los parametros" + infoAutor);
        const listAutor = await Autor.find();
        if (checkAutor(infoAutor, listAutor)) {
            const autor = new Autor(infoAutor);
            console.log("Aqui se crea el Autor:" + autor);
            res.status(200).json({
                code: 200,
                message: 'Saved Autor' + await autor.save(),
                details: 'Autor registrado: ' + infoAutor
            });
        } else {
            res.status(409).json({
                code: 409,
                message: 'El Autor ya se encuantra registrado o el number document del Autor ya se encuantra asignado',
                details: 'Autor posiblemente esta registrado: ' + JSON.stringify(infoAutor)
            });
        }
    } catch (err) {
        console.error(err); //mostramos el error por consola para poder solucionar futuros errores
        res.status(500).send("error"); //en caso de error respondemos al cliente con un 500
        res.status(500).json({
            code: 500,
            message: 'error',
            details: 'error Servidor no disponible '
        });
    }
});


/**
 ** function checkAutor:
 ** Verifica si un Autor ya se encuentra registrado en la base de datos.
 ** Return: un boleano que confirma si el Autor se encuentra o no.
 ** Parametros de entrada:
 autor: Representa los datos del Autor que se quiere insertar en la DB,
 listAutor: Listado de todos lo Autors actuales en la DB.
 **/
function checkAutor(autor, listAutor) {
    let bolean = true;
    listAutor.forEach(function (element) {
        if (element.id_autor == autor.id_autor||element.name_autor == autor.name_autor && element.lastname_autor == autor.lastname_autor || element.number_document == autor.number_document) {
            bolean = false;
        }
    });
    return bolean;
}


router.get("/add/autor/:id_autor/:number_document/:name_autor/:lastname_autor", async (req, res) => {
	 try {
        const infoAutor = req.params;
        console.log("Aqui llegan los parametros" + infoAutor);
        const listAutor = await Autor.find();
        if (checkAutor(infoAutor, listAutor)) {
            const autor = new Autor(infoAutor);
            console.log("Aqui se crea el Autor:" + autor);
            res.status(200).json({
                code: 200,
                message: 'Saved Autor' + await autor.save(),
                details: 'Autor registrado: ' + infoAutor
            });
        } else {
            res.status(409).json({
                code: 409,
                message: 'El Autor ya se encuantra registrado o el number document del Autor ya se encuantra asignado',
                details: 'Autor posiblemente esta registrado'
            });
        }
    } catch (err) {
        console.error(err); //mostramos el error por consola para poder solucionar futuros errores
        res.status(500).send("error"); //en caso de error respondemos al cliente con un 500
        res.status(500).json({
            code: 500,
            message: 'error',
            details: 'error Servidor no disponible '
        });
    }
});

export default router;