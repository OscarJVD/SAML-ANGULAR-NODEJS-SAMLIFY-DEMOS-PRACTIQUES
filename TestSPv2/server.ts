// import * as fs from 'fs';
// import * as bodyParser from 'body-parser';
// import { getUser, createToken, verifyToken } from './services/auth.js';
// import { assignEntity } from './middleware/index.js';
// import { Constants } from 'samlify';

// export default function server(app) {

//   app.use(bodyParser.urlencoded({ extended: false }));
//   // for pretty print debugging
//   app.set('json spaces', 2);
//   // assign the session sp and idp based on the params
//   app.use(assignEntity);

//   // assertion consumer service endpoint (post-binding)
//   app.post('/sp/acs', async (req, res) => {
//     try {
//       const { extract } = await req.sp.parseLoginResponse(req.idp, 'post', req);
//       const { login } = extract.attributes;
//       // get your system user
//       const payload = getUser(login);

//       // assign req user
//       req.user = { nameId: login };

//       if (payload) {
//         // create session and redirect to the session page
//         const token = createToken(payload);
//         return res.redirect(`/?auth_token=${token}`);
//       }
//       throw new Error('ERR_USER_NOT_FOUND');
//     } catch (e) {
//       console.error('[FATAL] when parsing login response sent from okta', e);
//       return res.redirect('/');
//     }
//   });

//   // call to init a sso login with redirect binding
//   app.get('/sso/redirect', async (req, res) => {
//     const { id, context: redirectUrl } = await req.sp.createLoginRequest(req.idp, 'redirect');
//     return res.redirect(redirectUrl);
//   });

//   app.get('/sso/post', async (req, res) => {
//     const { id, context } = await req.sp.createLoginRequest(req.idp, 'post');
//     // construct form data
//     const endpoint = req.idp.entityMeta.getSingleSignOnService('post');
//     const requestForm = fs
//       .readFileSync('./request.html')
//       .toString()
//       .replace('$ENDPOINT', endpoint)
//       .replace('$CONTEXT', context);

//     return res.send(requestForm);
//   });

//   // endpoint where consuming logout response
//   app.post('/sp/sso/logout', async (req, res) => {
//     const { extract } = await req.sp.parseLogoutResponse(req.idp, 'post', req);
//     return res.redirect('/logout');
//   });

//   app.get('/sp/single_logout/redirect', async (req, res) => {
//     const { context: redirectUrl } = await req.sp.createLogoutRequest(req.idp, 'redirect', { logoutNameID: 'user.passify.io@gmail.com' });
//     return res.redirect(redirectUrl);
//   });

//   // distribute the metadata
//   app.get('/sp/metadata', (req, res) => {
//     res.header('Content-Type', 'text/xml').send(req.sp.getMetadata());
//   });

//   app.get('/idp/metadata', (req, res) => {
//     res.header('Content-Type', 'text/xml').send(req.idp.getMetadata());
//   });

//   // get user profile
//   app.get('/profile', (req, res) => {
//     try {
//       const bearer = req.headers.authorization.replace('Bearer ', '');
//       const { verified, payload } = verifyToken(bearer)
//       if (verified) {
//         return res.json({ profile: payload });
//       }
//       return res.send(401);
//     } catch (e) {
//       res.send(401);
//     }
//   });

// }

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
// import { ngExpressEngine } from '@nguniversal/express-engine';
// // // Import module map for lazy loading
// // import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// app.engine('html', ngExpressEngine({
//   bootstrap: AppServerModuleNgFactory,
//   providers: [
//     provideModuleMap(LAZY_MODULE_MAP)
//   ]
// }));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});