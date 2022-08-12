import index from "../views/index_html.js";
import express from "express";
import Libro from "../schema/libro.js";


const router = express.Router();

//Metodos GET

/**
	
**/
router.get("/",async (req, res) => {
	res.send("servidor de Libro");
});

router.get("/dataLibros",async (req, res) => {
	//Aqui estoy recogiendo los datos del servidor
	const libros_db = await Libro.find();
	console.log(libros_db);
	res.send(JSON.stringify(libros_db));
});

router.post("/add/libro/:id_libro/:name_libro", async (req, res) => {
	 try {
        const infoLibro = req.params;
        console.log("Aqui llegan los parametros" + infoLibro);
        const listLibro = await Libro.find();
        if (checkLibro(infoLibro, listLibro)) {
            const libro = new Libro(infoLibro);
            console.log("Aqui se crea el Libro:" + libro);
            res.status(200).json({
                code: 200,
                message: 'Saved Libro' + await libro.save(),
                details: 'Libro registrado: ' + infoLibro
            });
        } else {
            res.status(409).json({
                code: 409,
                message: 'El Libro ya se encuantra registrado o el number document del Libro ya se encuantra asignado',
                details: 'Libro posiblemente esta registrado: ' + JSON.stringify(infoLibro)
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
 ** function checkLibro:
 ** Verifica si un Libro ya se encuentra registrado en la base de datos.
 ** Return: un boleano que confirma si el Libro se encuentra o no.
 ** Parametros de entrada:
 libro: Representa los datos del libro que se quiere insertar en la DB,
 listLibro: Listado de todos lo libros actuales en la DB.
 **/
function checkLibro(libro, listLibro) {
    let bolean = true;
    listLibro.forEach(function (element) {
        if (element.name_libro == libro.name_libro || element.id_libro == libro.id_libro) {
            bolean = false;
        }
    });
    return bolean;
}

router.get("/add/libro/:id_libro/:name_libro", async (req, res) => {
     try {
        const infoLibro = req.params;
        console.log("Aqui llegan los parametros" + infoLibro);
        const listLibro = await Libro.find();
        if (checkLibro(infoLibro, listLibro)) {
            const libro = new Libro(infoLibro);
            console.log("Aqui se crea el Libro:" + libro);
            res.status(200).json({
                code: 200,
                message: 'Saved Libro' + await libro.save(),
                details: 'Libro registrado: ' + infoLibro
            });
        } else {
            res.status(409).json({
                code: 409,
                message: 'El Libro ya se encuantra registrado o el number document del Libro ya se encuantra asignado',
                details: 'Libro posiblemente esta registrado: ' + JSON.stringify(infoLibro)
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