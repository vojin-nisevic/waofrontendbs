import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElWarTeamsComponent } from "./components/el-war-teams/el-war-teams.component";

const routes: Routes = [
  {path: 'el-war-team', component: ElWarTeamsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
