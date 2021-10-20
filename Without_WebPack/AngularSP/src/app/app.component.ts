import { ProfileService } from './services/saml-opt.service';
// import { SamlOpt } from './models/saml-opt';
import { Component, OnInit
  // ,Injectable
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

const LOCALSTORAGE_TOKEN_FIELD = "auth_token";

// @Injectable({providedIn: 'root'})

// export class SamlOption {
//   encrypted: boolean;

//   constructor(encrypted = true)
//   {
//       this.encrypted = encrypted;
//   }
// }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers: [SamlOpt]
  providers: [ProfileService]
})

// @Injectable({
//   providedIn: 'root'
// })


export class AppComponent implements OnInit {
  public samlOption={ encrypted: true }
  public profile={ email: null }
  public authenticated=false

  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
    public samloptService: ProfileService
    // public samlOption={ encrypted: true }
    // public samlOption: SamlOpt
  ){
    // console.log(this.samlOption);
    // this.samlOption = samlOption
  }

  ngOnInit():any {
    // this.getProfile();

    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_FIELD);
    // if the token is already stored in localstoarge, call the service to verify if it's expired
    // if anything wrong, go back to the login scene
    if (token) {
      // verify the current auth token
      return this.samloptService.getProfile(token).subscribe((res:any) => {
        console.log(res);
        if(res.profile){
          this.authenticated = true;
          this.profile = res.profile
        }else{
          this.authenticated = false;
          this.profile.email = null;
        }
      });
    }

    this.activatedRoute.queryParams.subscribe(params => {
      const auth_token= params['token']

      if (auth_token) {
        window.localStorage.setItem(LOCALSTORAGE_TOKEN_FIELD, auth_token);

         this.samloptService.getProfile(auth_token).subscribe((res:any) => {
           console.log(res);
          if(res.profile){
            this.authenticated = true;
            this.profile = res.profile
          }else{
            this.authenticated = false;
            this.profile.email = null;
          }
        });

         // remove the auth_token part in
        // this.router.history.replace('/');
        this.router.navigate(['/'])
      }
    });

    // const params = parse(props.location.search);
    // if (params.auth_token) {
    //   window.localStorage.setItem(LOCALSTORAGE_TOKEN_FIELD, params.auth_token);
    //   this.samloptService.getProfile(params.auth_token);
    //   // remove the auth_token part in
    //   props.history.replace("/");
    // }
  }

  // getProfile = async (token: string) => {
  //   try {
  //     // const { data } = await axios.get<string>("http://localhost:3000/profile", {
  //     //   headers: { Authorization: `Bearer ${token}` },
  //     // });

  //     this.authenticated = true;
  //     this.profile = data.profile;
  //   } catch (e) {
  //     this.authenticated = false;
  //     this.profile.email = null;
  //     window.localStorage.removeItem(LOCALSTORAGE_TOKEN_FIELD);
  //   }
  // };

  parseQuery(){
    console.log("--------->>>", this.samlOption);
    const query = this.samlOption.encrypted ? "?encrypted=true" : "";
    return query;
  };

  initRedirectRequest(){
    window.location.href = `http://localhost:3000/sso/redirect${this.parseQuery()}`;
  };

  initPostRequest = () => {
    window.location.href = `http://localhost:3000/sso/post${this.parseQuery()}`;
  };

  viewSpMetadata = () => {
    window.open(`http://localhost:3000/sp/metadata${this.parseQuery()}`);
  };

  viewIdpMetadata = () => {
    window.open(`http://localhost:3000/idp/metadata${this.parseQuery()}`);
  };

  logout = () => {
    window.localStorage.removeItem(LOCALSTORAGE_TOKEN_FIELD);
    this.authenticated = false;
    this.profile.email = null
  };

  toggleEncrypted = () => {
    this.samlOption.encrypted = !this.samlOption.encrypted
  };
}