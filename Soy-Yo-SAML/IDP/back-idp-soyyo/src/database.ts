// file to manage the database
import {createPool} from 'mysql2/promise';

//funcion para conexion a la base de datos con metodo asincrono un solo hilo
//  Recordar al declarar esto que es asincrono
export async function connect (){
    const connection = await createPool({
        host:'localhost',
        user: 'root',
        password: 'admin',
        database: 'node_mysql_ts',
        connectionLimit: 10
    })
    return connection
}

