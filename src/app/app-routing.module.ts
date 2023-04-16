import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ActorsComponent } from './actors/actors.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './guard/auth.guard';
import { NotAuthGuard } from './guard/not-auth.guard';

const routes: Routes = [

  {path:'' , redirectTo:'register',pathMatch:'full'},
  {path:'home' , canActivate:[AuthGuard], component:HomeComponent},
  {path:'movies' , canActivate:[AuthGuard], component:MoviesComponent},
  {path:'tv' , canActivate:[AuthGuard], component:TvShowsComponent},
  {path:'actors' , canActivate:[AuthGuard], component:ActorsComponent},
  {path:'details/:id/:mediaType' , canActivate:[AuthGuard], component:DetailsComponent},
  {path:'register' , canActivate:[NotAuthGuard] , component:RegisterComponent},
  {path:'login' , canActivate:[NotAuthGuard] , component:LoginComponent},
  {path:'**' , component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
