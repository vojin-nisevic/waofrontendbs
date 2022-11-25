import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElWarTeamsComponent } from "./components/el-war-teams/el-war-teams.component";
import { ElWarTeamDetailsComponent } from "./components/el-war-team-details/el-war-team-details.component";
import { PlayersComponent } from "./components/players/players.component";

const routes: Routes = [
  {path: 'el-war-team', component: ElWarTeamsComponent},
  {path: 'el-war-team-details/:id', component: ElWarTeamDetailsComponent},
  {path: 'members', component: PlayersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
