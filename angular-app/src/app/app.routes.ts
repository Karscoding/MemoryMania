import { Routes } from '@angular/router';
import {AggregateDataComponent} from "./aggregate-data/aggregate-data.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  {path: '', component: AggregateDataComponent},
  {path: 'login', component: LoginComponent}
];
