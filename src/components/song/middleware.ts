import { verify } from 'jsonwebtoken';
import type { Response, NextFunction } from "express";
import { RequestWithAuth } from './type';

export const verifyToken = (req: RequestWithAuth, _res: Response, next: NextFunction) => {
    const token = req?.headers['authorization']?.split(' ')[1];
    let decodedToken;   
    req.isLogged = false;

    if (!token) {
      return next();
    }

    try {
        decodedToken = verify(token, "secret");
        console.log('logeado!');
        
    } catch (err) {
        console.error(err);
        return next();
    }

    req.isLogged = true;
    next();
};

