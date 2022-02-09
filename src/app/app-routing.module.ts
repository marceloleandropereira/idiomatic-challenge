import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NamesComponent } from './names/names.component';

const routes: Routes = [
  {
    path: '**', component: NamesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
