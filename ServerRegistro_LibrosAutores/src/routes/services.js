import index from "../views/index_html.js";
import express from "express";
import Registro from "../schema/registro.js";


const router = express.Router();

//Metodos GET

/**
	
**/
router.get("/",async (req, res) => {
	res.send("servidor de Registro");
});

router.get("/dataRegistro",async (req, res) => {
	//Aqui estoy recogiendo los datos del servidor
	const registros_db = await Registro.find();
	console.log(registros_db);
	res.send(JSON.stringify(registros_db));
});

router.post("/add/registro/:id_libro/:id_autor", async (req, res) => {
	 try {
        const infoRegistro = req.params;
        console.log("Aqui llegan los parametros" + infoRegistro);
        const listRegistro = await Registro.find();
        if (checkRegistro(infoRegistro, listRegistro)) {
            const registro = new Registro(infoRegistro);
            console.log("Aqui se crea el Registro:" + registro);
            res.status(200).json({
                code: 200,
                message: 'Saved Registro' + await registro.save(),
                details: 'Registro registrado: ' + infoRegistro
            });
        } else {
            res.status(409).json({
                code: 409,
                message: 'El Registro ya se encuantra registrado o el number document del Autor ya se encuantra asignado',
                details: 'Registro posiblemente esta registrado: ' + JSON.stringify(infoRegistro)
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
 ** function checkRegistro:
 ** Verifica si un Registro ya se encuentra registrado en la base de datos.
 ** Return: un boleano que confirma si el Registro se encuentra o no.
 ** Parametros de entrada:
 registro: Representa los datos del registro que se quiere insertar en la DB,
 listRegistro: Listado de todos lo registros actuales en la DB.
 **/
function checkRegistro(registro, listRegistro) {
    let bolean = true;
    listRegistro.forEach(function (element) {
        if (element.id_autor == registro.id_autor && element.id_libro == registro.id_libro) {
            bolean = false;
        }
    });
    return bolean;
}


router.get("/add/registro/:id_libro/:id_autor", async (req, res) => {
     try {
        const infoRegistro = req.params;
        console.log("Aqui llegan los parametros" + infoRegistro);
        const listRegistro = await Registro.find();
        if (checkRegistro(infoRegistro, listRegistro)) {
            const registro = new Registro(infoRegistro);
            console.log("Aqui se crea el Registro:" + registro);
            res.status(200).json({
                code: 200,
                message: 'Saved Registro' + await registro.save(),
                details: 'Registro registrado: ' + infoRegistro
            });
        } else {
            res.status(409).json({
                code: 409,
                message: 'El Registro ya se encuantra registrado o el number document del Autor ya se encuantra asignado',
                details: 'Registro posiblemente esta registrado: ' + JSON.stringify(infoRegistro)
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