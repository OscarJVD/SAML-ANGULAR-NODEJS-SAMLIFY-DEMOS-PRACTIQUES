import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http'; // Módulo para comunicar back con front

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    // CommonModule,
    HttpClientModule, // Módulo para comunicar back con front
    // RouterModule.forChild(routes),
    // RouterModule.forRoot(routes),
    // RouterModule
  ],
  // exports: [RouterModule],
  providers: [HttpClient],

  bootstrap: [AppComponent]
})
export class AppModule { }
