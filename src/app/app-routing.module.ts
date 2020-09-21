import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./views/public/login/login.module').then(m => m.LoginModule), pathMatch: 'full' },
  { path: 'secure', loadChildren: () => import('./views/secure/secure.module').then(m => m.SecureModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
