import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import { getUser, createToken, verifyToken } from './services/auth';
import { assignEntity } from './middleware';
import { Constants } from 'samlify';
const express = require('express'); // dependencia para rutas, cookies , sesiones , etc
const app = express();
const morgan = require('morgan'); // para middlewares y autenticación
const cors = require('cors')

// export default function server(app:any) {

  console.log("TEST")
  app.set('port', process.env.PORT || 3000); // Acceder a una constante PORT con puertos

  // Middlewares
  app.use(morgan('dev'));
  app.use(express.json()); // Para rutas, cookies , sesiones , etc
  app.use(cors({ origin: 'http://localhost:3000' })); // Para el error de Cors Policy


  app.use(bodyParser.urlencoded({ extended: false }));
  // for pretty print debugging
  app.set('json spaces', 2);
  // assign the session sp and idp based on the params
  app.use(assignEntity);

  // assertion consumer service endpoint (post-binding)
  app.post('/sp/acs', async (req:any, res:any) => {
    try {
      console.log(`here is the LOGIN`);
      // console.log(req);
      const { extract } = await req.sp.parseLoginResponse(req.idp, 'post', req);
      // const { login } = extract.attributes;

      // console.log(extract);
      // // console.log(login);
      // // get your system user
      // const payload = getUser(login);

      // // assign req user
      // req.user = { nameId: login };

       // console.log(extract);
      // console.log(extract.attributes[1]);
      // console.log(extract.attributes[Object.keys(extract.attributes)[1]]);
      // const { login } = extract.attributes;
      // get your system user
      const payload = getUser(extract.attributes[Object.keys(extract.attributes)[1]]);

      // assign req user
      req.user = { nameId: extract.attributes[Object.keys(extract.attributes)[0]] };

      if (payload) {
        // create session and redirect to the session page
        const token = createToken(payload);
        return res.redirect(`/?auth_token=${token}`);
      }
      throw new Error('ERR_USER_NOT_FOUND');
    } catch (e) {
      console.error('[FATAL] when parsing login response sent from okta', e);
      return res.redirect('https://www.youtube.com/watch?v=0ES9HsZq0AQ&t=627s');
    }
  });

  // call to init a sso login with redirect binding
  app.get('/sso/redirect', async (req:any, res:any) => {
      console.log(`here is the LOGIN2`);

    const { id, context: redirectUrl } = await req.sp.createLoginRequest(req.idp, 'redirect');
    return res.redirect(redirectUrl);
  });

  app.get('/sso/post', async (req:any, res:any) => {
      console.log(`here is the LOGIN3`);

    const { id, context } = await req.sp.createLoginRequest(req.idp, 'post');
    // construct form data
    const endpoint = req.idp.entityMeta.getSingleSignOnService('post');

    // console.log(endpoint);
    // console.log(context);

    const requestForm = fs
      .readFileSync('./request.html')
      .toString()
      .replace('$ENDPOINT', endpoint)
      .replace('$CONTEXT', context);

    return res.send(requestForm);
  });

  // endpoint where consuming logout response
  app.post('/sp/sso/logout', async (req:any, res:any) => {
    const { extract } = await req.sp.parseLogoutResponse(req.idp, 'post', req);
    return res.redirect('/logout');
  });

  app.get('/sp/single_logout/redirect', async (req:any, res:any) => {
    const { context: redirectUrl } = await req.sp.createLogoutRequest(req.idp, 'redirect', { logoutNameID: 'adventurejavis@gmail.com' });
    return res.redirect(redirectUrl);
  });

  // distribute the metadata
  app.get('/sp/metadata', (req:any, res:any) => {
    res.header('Content-Type', 'text/xml').send(req.sp.getMetadata());
  });

  app.get('/idp/metadata', (req:any, res:any) => {
    res.header('Content-Type', 'text/xml').send(req.idp.getMetadata());
  });

  // get user profile
  app.get('/profile', (req:any, res:any) => {
    try {
      const bearer = req.headers.authorization.replace('Bearer ', '');
      const { verified, payload } = verifyToken(bearer)
      if (verified) {
        return res.json({ profile: payload });
      }
      return res.send(401);
    } catch (e) {
      res.send(401);
    }
  });

  app.listen(app.get('port'), () => console.log(`Server on port: ${app.get('port')}`))
// }