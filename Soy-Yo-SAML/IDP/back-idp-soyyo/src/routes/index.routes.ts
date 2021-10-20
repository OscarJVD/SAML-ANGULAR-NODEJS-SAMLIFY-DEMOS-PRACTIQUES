//para el manejo de las rutas 
import {Router} from 'express';
import {indexWelcome} from '../controllers/index.controller'
const router = Router();

//Router define las rutas del aplicativo las peticiones las maneja el enrutador que llama las funciones del controlador  
router.route('/')
    .get(indexWelcome);


export default router;
