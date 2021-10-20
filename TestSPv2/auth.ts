/**
 * Service Layer
 */
import * as jwt from 'jsonwebtoken';

const SECRET = 'somethingverysecret';

// this is a mock function, it should be used to interact with your database in real use case
export function getUser(login: string) {
  if (login === 'user.passify.io@gmail.com') {
    return {
      user_id: '21b06b08-f296-42f4-81aa-73fb5a8eac67',
      email: login
    };
  }
  return null;
}

export function createToken(payload:any) {
  return jwt.sign(payload, SECRET);
}

export function verifyToken(token:any) {
  try {
    const payload = jwt.verify(token, SECRET);
    return { verified: true, payload: payload };
  } catch(err) {
    return { verified: false, payload: null };
  }
}