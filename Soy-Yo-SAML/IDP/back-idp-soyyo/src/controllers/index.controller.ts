import {Request, Response} from 'express';
import * as samlify from 'samlify';
import * as fs from 'fs'

export function indexWelcome(req : Request, res : Response):Response{
    res.json('Welcome to the new IDP-API');
    return res;
}
