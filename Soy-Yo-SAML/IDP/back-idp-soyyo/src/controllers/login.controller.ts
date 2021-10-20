import {Request,Response} from 'express';



export async function checkRequest(req: Request, res: Response){
    const request = req.body;
    console.log(request);
    return res.json({
        message:'Parsed XML'
    })
}
