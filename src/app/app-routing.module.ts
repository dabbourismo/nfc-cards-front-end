import { ShowprofileComponent } from './_components/showprofile/showprofile.component';
import { ShellAuthGuardService } from './services/shell-auth-guard.service';
import { AuthguardService } from './services/authguard.service';
import { UserComponent } from './_components/user/user.component';
import { ShellComponent } from './_components/shell/shell.component';
import { LoginComponent } from './_components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'shell', component: ShellComponent, canActivate: [ShellAuthGuardService],
    children: [
      { path: '', component: UserComponent },
      { path: 'user', component: UserComponent },
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [AuthguardService] },
  { path: 'showprofile/:id', component: ShowprofileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
