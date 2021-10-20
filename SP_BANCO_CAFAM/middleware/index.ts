import * as samlify from 'samlify';
import * as fs from 'fs';
import * as validator from '@authenio/samlify-node-xmllint';

const binding = samlify.Constants.namespace.binding;

samlify.setSchemaValidator(validator);

const idp = samlify.IdentityProvider({
  metadata: fs.readFileSync(__dirname + '/../metadata/IDP_PROPIO.xml'),
})

const sp = samlify.ServiceProvider({
  metadata: fs.readFileSync(__dirname + '/../metadata/SP_PROPIO.xml'),
});

export const assignEntity = (req, res, next) => {

  req.idp = idp;
  req.sp = sp;

  // if (req.query && req.query.encrypted) {
  //   req.idp = oktaIdp;
  //   req.sp = sp;
  //   // req.idp = oktaIdpEnc;
  //   // req.sp = spEnc;
  // }

  return next();

};