// import { AuthConfig } from 'angular-oauth2-oidc';

// export const authConfig: AuthConfig = {

//   // Url of the Identity Provider
//   issuer: 'https://steyer-identity-server.azurewebsites.net/identity',

//   // URL of the SPA to redirect the user to after login
//   redirectUri: window.location.origin + '/index.html',

//   // The SPA's id. The SPA is registerd with this id at the auth-server
//   clientId: 'spa-demo',

//   // set the scope for the permissions the client should request
//   // The first three are defined by OIDC. The 4th is a usecase-specific one
//   scope: 'openid profile email voucher',
// }

import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url of the Identity Provider
  // https://woombatv-dev.onelogin.com/
  // https://cognito-idp.us-east-2.amazonaws.com/us-east-2_0pLhKsXnL
  // https://cognito-idp.us-east-2.amazonaws.com/us-east-2_0pLhKsXnL/.well-known/openid-configuration
  // https://oidc-testvargas.auth.us-east-2.amazoncognito.com/oauth2/authorize
  issuer: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_0pLhKsXnL',
  strictDiscoveryDocumentValidation: false,
// &
  responseType: "code",
// &state=d1915eb682a3873af5b4459793360a670d676c3f',

  // URL of the SPA to redirect the user to after login
  // https://openidconnect.net/callback
  redirectUri: window.location.origin + "/home",

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: '5iq89m609n0r209pbe71vht7qp',
  // 5iq89m609n0r209pbe71vht7qp
  // 6e8bdc40-d2b6-0139-4baf-0aea6050c319194218

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile email',

  // state: "d1915eb682a3873af5b4459793360a670d676c3f"
}