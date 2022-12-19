import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {MonthlyCountdownComponent} from "./components/monthly-countdown/monthly-countdown.component";
import {WeeklyCountdownComponent} from "./components/weekly-countdown/weekly-countdown.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alliance-war', component: MonthlyCountdownComponent },
  { path: 'weekly-endeavors', component: WeeklyCountdownComponent },
  { path: '**',   redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
