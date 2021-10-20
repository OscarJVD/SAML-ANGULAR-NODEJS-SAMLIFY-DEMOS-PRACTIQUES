/**
 * Service Layer
 */
import * as jwt from 'jsonwebtoken';

const SECRET = 'somethingverysecret';

// this is a mock function, it should be used to interact with your database in real use case
// export function getUser(login:any) {

//   console.log(`DATOS DE LOGUEO: `);
//   console.log(login);
//   console.log(`FIN DATOS DE LOGUEO.`);

//   if (login === 'adventurejavis@gmail.com') {
//     return {
//       user_id: '21b06b08-f296-42f4-81aa-73fb5a8eac67',
//       email: login
//     };
//   }
//   return null;
// }

export function getUser(login: string) {
  if (login === 'oscar.vargas@woombatcg.com') {
    return {
      user_id: 'auth0|6114418bb6bc7e0076afeb06', // _a03852cc-bc8d-413a-9af4-45b5322e1f81 - _946bd5f52b86972e5708 - auth0|6114418bb6bc7e0076afeb06 - 6114418bb6bc7e0076afeb06 - EIA289qZp80OkBBeShGxMhXaqmViFXoO
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