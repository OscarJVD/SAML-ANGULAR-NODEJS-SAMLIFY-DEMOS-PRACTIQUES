import * as fs from 'fs';
import * as bodyParser from 'body-parser';
import { getUser, createToken, verifyToken } from './services/auth';
import { assignEntity } from './middleware';
import { Constants } from 'samlify';
import * as passport from 'passport'
const Strategy = require('passport-saml').Strategy
const path = require('path')

export default function server(app:any) {
  console.log(`hereeeeee`);

  app.use(bodyParser.urlencoded({ extended: false }));
  // for pretty print debugging
  app.set('json spaces', 2);
  // assign the session sp and idp based on the params
  app.use(assignEntity);

  app.set('view engine', 'ejs')
  app.set('views', path.resolve('views'))

  // app.get('/login/callback', (req:any, res:any, next:any) => {


  //   // passport.authenticate('saml', {
  //   //   failureRedirect: '/loginCBPageError',
  //   //   failureFlash: true
  //   // })(req, res, (err, data) => {
  //     // if (err) {
  //     //   console.log(err)
  //     //   return next(err)
  //     // }
  //   //   console.log('get req (HTTP-REdir)', req.user)

  //   console.log(req);
  //     return res.render('loginSP', { user: req.user })
  //   // })

  //   // console.log(req.user);
  // })

  // assertion consumer service endpoint (post-binding)
  app.post('/sp/acs', async (req:any, res:any) => {
    try {
      console.log(req);
      console.log(req.data);
      console.log(req.SAMLReponse);
      console.log(req.body);
      console.log(req.idp);
      const { user } = await req.sp.parseLoginResponse(req.idp, 'post', req);
      // const { extract } = await req.sp.parseLoginResponse(req.idp, 'post', req);
      console.log(`HERE2`);

      console.log(user);
      // console.log(extract.attributes[1]);
      // console.log(extract.attributes[Object.keys(extract.attributes)[1]]);
      // const { login } = extract.attributes;
      // get your system user
      const payload = getUser(user.attributes[Object.keys(user.attributes)[1]]);

      // assign req user
      req.user = { nameId: user.attributes[Object.keys(user.attributes)[0]] };

      if (payload) {
        // create session and redirect to the session page
        const token = createToken(payload);
        return res.redirect(`/?auth_token=${token}`);
      }
      throw new Error('ERR_USER_NOT_FOUND');
    } catch (e) {
      console.error('[FATAL] when parsing login response sent from okta', e);
      return res.redirect('/');
    }
  });

  // call to init a sso login with redirect binding
  app.get('/sso/redirect', async (req:any, res:any) => {
    const { id, context: redirectUrl } = await req.sp.createLoginRequest(req.idp, 'redirect');
    return res.redirect(redirectUrl);
  });

  app.get('/sso/post', async (req:any, res:any) => {
    const { id, context } = await req.sp.createLoginRequest(req.idp, 'post');

    console.log(``);

    // construct form data
    const endpoint = req.idp.entityMeta.getSingleSignOnService('post') as string;
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
    const { context: redirectUrl } = await req.sp.createLogoutRequest(req.idp, 'redirect', { logoutNameID: 'user.passify.io@gmail.com' });
    return res.redirect(redirectUrl);
  });

  // distribute the metadata
  app.get('/sp/metadata', (req, res) => {
    res.header('Content-Type', 'text/xml').send(req.sp.getMetadata());
  });

  app.get('/idp/metadata', (req, res) => {
    res.header('Content-Type', 'text/xml').send(req.idp.getMetadata());
  });

  // get user profile
  app.get('/profile', (req, res) => {
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

// app.get('/saml/login', passport.authenticate('saml'))
// passport.use(new Strategy(__dirname + '/../metadata/IDP_PROPIO.xml'))

}