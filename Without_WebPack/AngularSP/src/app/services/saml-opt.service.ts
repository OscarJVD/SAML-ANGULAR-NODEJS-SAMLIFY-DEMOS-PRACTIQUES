import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http'; // Comunicación F Y B
// import { Samlopt } from '../models/samlopt'; // Modelo con la estructura de nuestra tarea

@Injectable({providedIn: 'root'})

// export class SamlOptService {
// // Aqui agregamos todos los ervicios que se van a consumir desde nuestra API REST
//   // selectedSamlopt: Samlopt; // Esto guarda toda la info de la tarea que seleccionemos
//   //headers: any[];
//   //leagues: Samlopt[];
//   //leagues: [];|
//   //leagues: {};
//   // public leagues : any;
//   public leagues : any = [];
//   // public leagues : any = {};
//   samlopt: any;

//   readonly URL_API = "http://localhost:3000/api/samlopts"; // Url de nuestra API REST
//   // readonly URL_SOCCER_API = "https://api.football-data.org/v2/competitions/SA/scorers"; // Url de nuestra API REST
//  // URL_SOCCER_API: string = ""; // Url de nuestra API REST

//   constructor(private http: HttpClient, private handler: HttpBackend) { // Nos ayuda a comunicar back con front
//     this.http = new HttpClient(handler)
//     // this.selectedSamlopt = new Samlopt(); // iNICIALIZANDO VARIABLE CON UNA TAREA
//   }

//   getLeagues()
//   {
//     try{
//       const headersOpt = new HttpHeaders().set(
//         'X-Auth-Token',
//         '55dda2ea064c48909e7c2054959cd00b'
//       )

//       headersOpt.delete('Authorization')

//       return this.http.get('https://api.football-data.org/v2/competitions',{headers: headersOpt})
//     }catch(err){console.log(err)}
//   }
// }


export class ProfileService {
  // Aqui agregamos todos los ervicios que se van a consumir desde nuestra API REST
    // selectedTask: Task; // Esto guarda toda la info de la tarea que seleccionemos
    // task: Task[];
    // archived: Task[];
    // deleted: Task[];
    readonly URL_API = "http://localhost:3000/profile"; // Url de nuestra API REST

    constructor(private http: HttpClient, private handler: HttpBackend) { // Nos ayuda a comunicar back con front
      // this.selectedTask = new Task(); // iNICIALIZANDO VARIABLE CON UNA TAREA
      this.http = new HttpClient(handler)
    }

    getProfile(token:string) // Hace una petición get para obtener las tareas de esa url
    {
      const headersOpt = new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}`
      )

      return this.http.get(this.URL_API,{headers: headersOpt});
    }
  }