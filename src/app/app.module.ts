import { GuardiaoGuard } from './service/guardiao.guard';
import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router'
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const appRouters: Routes = [

  {path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'userList', component: UsuarioComponent,  canActivate: [GuardiaoGuard]},

  /*rotas parecidas, mas condições diferentes, está especificado na tela */
  {path: 'usuarioAdd', component: UsuarioAddComponent,  canActivate: [GuardiaoGuard]},
  {path: 'usuarioAdd/:id', component: UsuarioAddComponent,  canActivate: [GuardiaoGuard]}
  /*rotas parecidas, mas condições diferentes, está especificado na tela */
];

export const routes : ModuleWithProviders = RouterModule.forRoot(appRouters);

export const optionsMask : Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionsMask),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
