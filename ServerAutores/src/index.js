console.clear();
console.log("Servidor Autores");
import path from "path";
import morgan from "morgan";
import mongoose from "mongoose";
import createExpressServer from "express";
import router  from "./routes/services.js";

//Se instancia el servidor para poder configurar
const expressApp = createExpressServer();

//connecting to db
mongoose.connect('mongodb://191.156.144.23/parcial_Libros_Autores')
	.then(db=> console.log('Db connected'))
	.catch(err=> console.log('err'));

//routes
expressApp.use('/',router);


//settings
expressApp.set('port', process.env.PORT || 4000);
expressApp.set('views', path.join('.', 'views'));
//app.set('view engine', 'ejs'); 



//middlewares
expressApp.use(morgan('dev'));
expressApp.use(createExpressServer.urlencoded({extended: false}));

expressApp.listen(expressApp.get('port'),()=>{
	 console.log(`Server on port ${expressApp.get('port')}`); 
});


