import express, {Application} from 'express';
import morgan from 'morgan';

//Routes
import IndexRoutes from './routes/index.routes'
import UserRoutes from './routes/users.routes'

// servidor
export class App{
    private app : Application; //este app es de tipo application alcance unicamente en la clase
    
    // al darle private a port le da alcance a toda la clase
    constructor (private port? : number | string) {
        this.app = express();
        this.settings();
        this.middlewares()
        this.routes()
    }

    middlewares() {
        // mostrrar por consola mensajes de desarrollo
        this.app.use(morgan('dev'))
        //este middleware permite extraer el json o el formato que se traiga si solo se recibe json se quita el objeto interno y se pone json
        this.app.use(express.json())
    }

    //usar las rutas iniciales
    routes(){
        this.app.use(IndexRoutes)
        this.app.use('/posts',UserRoutes)
    }

    //metodo que se encarga de definir el puerto, pasan el port lo usa sino use una variable de entorno llamada PORT, sino use el 3000
    settings(){
        this.app.set('port',this.port || process.env.PORT|| 3000);
    }

    //obtiene el puerto de la configuracion previa
    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log("Listenging on port" , this.port);
    }
}