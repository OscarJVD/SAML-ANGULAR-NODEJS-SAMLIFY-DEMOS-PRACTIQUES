import {App}  from './app'

//esta funcion inicia el programa
async function main(){
    
    //instancia de la clase 
    const app = new App(3000);
    await app.listen()
}
main()
