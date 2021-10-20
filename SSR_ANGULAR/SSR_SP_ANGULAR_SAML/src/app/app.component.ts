import { ProfileService } from './services/saml-opt.service';
import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

const LOCALSTORAGE_TOKEN_FIELD = "auth_token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProfileService]
})

export class AppComponent implements OnInit {
  public samlOption={ encrypted: true }
  public profile={ email: null }
  public authenticated=false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public samloptService: ProfileService
  ){}

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
        this.router.navigate(['/'])
      }
    });
  }

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