import jwt from 'jsonwebtoken';

export function isValidToken(token: string | null): boolean {
    if (!token) {
        return false;
      } 
      jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
          return false;
        }
      });  
    return true;
  }