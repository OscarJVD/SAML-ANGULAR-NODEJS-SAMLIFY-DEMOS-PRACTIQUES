// en este archivo se crea el controlador para el manejo de la base de datos
import { Request, Response } from "express";
import {connect} from '../database'

import {IUsers}  from '../interfaces/IUsers'

/// para obtener los usuarios get
export async function getUsers(req : Request, res : Response){
    //consulta a la base de datos este metodo se puede modificar para obtener los usuarios
    const connection = await connect();   
    const users = await connection.query('SELECT * FROM users');
    return res.json(users[0])  ;
}

// post-user
export async function createUser(req : Request, res : Response){
    const newUser : IUsers = req.body;
    const connection = await connect();
    await connection.query('INSERT INTO users SET ?',[newUser])
    return res.json({
        message:"User created"
    });
}

//get-id
export async function getUser(req : Request, res : Response):Promise<Response>{
    const userId = req.params.userId;
    const connection = await connect();
    const result = await connection.query('SELECT * FROM users WHERE id=?',userId);
    return res.json(result[0])

}

//Delete
export async function deleteUser(req: Request, res: Response):Promise<Response>{
    const userId = req.params.userId;
    const connection = await connect();
    await connection.query('DELETE FROM users WHERE id=?',userId);
    return res.json({
        message:'Elemento eliminado'
    });
}

//Update user
export async function updateUSer(req: Request, res: Response):Promise<Response> {
    const idUser = req.params.userId;
    const data : IUsers = req.body;
    const connection = await connect();
    connection.query('UPDATE users SET ?  WHERE id= ?',[data,idUser]);
    return res.json({
        message:"Registro Actualizado"
    })
}
