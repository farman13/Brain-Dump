import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const Auth = (req: Request, res: Response, next: NextFunction) => {

    const header = req.headers['authorization'];

    const decodetoken = jwt.verify(header as string, process.env.JWT_SECRET || "");

    if (decodetoken) {
        //@ts-ignore
        req.userId = decodetoken.id;
        next();
    }
    else {
        res.status(403).json({
            message: " You are not logged in"
        })
    }
}