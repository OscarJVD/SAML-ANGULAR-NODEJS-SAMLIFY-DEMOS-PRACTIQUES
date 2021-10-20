import * as samlify from 'samlify';
import * as fs from 'fs';
import * as validator from '@authenio/samlify-node-xmllint';

const binding = samlify.Constants.namespace.binding;

samlify.setSchemaValidator(validator);

// configure okta idp
const oktaIdp = samlify.IdentityProvider({
  metadata: fs.readFileSync(__dirname + '/../metadata/COMPANY_IDP_metadata_localhost.xml'),
  wantLogoutRequestSigned: true
});

// const oktaIdpEnc = samlify.IdentityProvider({
//   metadata: fs.readFileSync(__dirname + '/../metadata/okta-enc.xml'),
//   isAssertionEncrypted: true,
//   messageSigningOrder: 'encrypt-then-sign',
//   wantLogoutRequestSigned: true,
// });

// console.log("i'm here")
// console.log(__dirname + '/../key/sign/privkey.pem')
// configure our service provider (your application)
const sp = samlify.ServiceProvider({
  entityID: 'http://localhost:3000/metadata',
  authnRequestsSigned: false,
  wantAssertionsSigned: true,
  wantMessageSigned: true,
  wantLogoutResponseSigned: true,
  wantLogoutRequestSigned: true,
  privateKey: fs.readFileSync(__dirname + '/../key/oauth0.pem'),
  // privateKeyPass: 'VHOSp5RUiBcrsjrcAuXFwU1NKCkGA8px',
  // privateKey: fs.readFileSync('./server/config/private-key.pem'),
	privateKeyPass: '',
  metadata: fs.readFileSync(__dirname + '/../metadata/COMPANY_SP_metadata_localhost.xml'),
  isAssertionEncrypted: false,
  assertionConsumerService: [{
    Binding: binding.post,
    Location: 'http://localhost:3000/sp/acs',
  }]
});

// encrypted response
// const spEnc = samlify.ServiceProvider({
//   entityID: 'http://localhost:3000/metadata?encrypted=true',
//   authnRequestsSigned: false,
//   wantAssertionsSigned: true,
//   wantMessageSigned: true,
//   wantLogoutResponseSigned: true,
//   wantLogoutRequestSigned: true,
//   privateKey: fs.readFileSync(__dirname + '/../key/sign/privkey.pem'),
//   privateKeyPass: 'VHOSp5RUiBcrsjrcAuXFwU1NKCkGA8px',
//   encPrivateKey: fs.readFileSync(__dirname + '/../key/encrypt/privkey.pem'),
//   assertionConsumerService: [{
//     Binding: binding.post,
//     Location: 'http://localhost:3000/sp/acs?encrypted=true',
//   }]
// });

export const assignEntity = (req:any, res:any, next:any) => {

  req.idp = oktaIdp;
  req.sp = sp;

  // if (req.query && req.query.encrypted) {
  //   req.idp = oktaIdp;
  //   req.sp = sp;
  //   // req.idp = oktaIdpEnc;
  //   // req.sp = spEnc;
  // }

  return next();

};