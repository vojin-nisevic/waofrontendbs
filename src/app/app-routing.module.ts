import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElWarTeamsComponent } from "./components/el-war-teams/el-war-teams.component";
import { ElWarTeamDetailsComponent } from "./components/el-war-team-details/el-war-team-details.component";
import { PlayersComponent } from "./components/players/players.component";
import { PlayerDetailsComponent } from "./components/player-details/player-details.component";
import { PlayerAddComponent } from "./components/player-add/player-add.component";

const routes: Routes = [
  {path: 'el-war-team', component: ElWarTeamsComponent},
  {path: 'el-war-team-details/:id', component: ElWarTeamDetailsComponent},
  {path: 'members', component: PlayersComponent},
  {path: 'members/details/:id', component: PlayerDetailsComponent},
  {path: 'members/add', component: PlayerAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
