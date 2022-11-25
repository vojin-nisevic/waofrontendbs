import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomErrorComponent } from "./custom-error/custom-error.component";
import { ElWarTeamDetailsComponent } from "./el-war-team-details/el-war-team-details.component";
import { ElWarTeamsComponent } from "./el-war-teams/el-war-teams.component";
import { HeaderComponent } from "./header/header.component";
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayersComponent } from './players/players.component';



@NgModule({
  declarations: [
    CustomErrorComponent,
    ElWarTeamDetailsComponent,
    ElWarTeamsComponent,
    HeaderComponent,
    PlayerDetailsComponent,
    PlayersComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CustomErrorComponent,
    HeaderComponent,
    ElWarTeamsComponent,
    ElWarTeamDetailsComponent,
    PlayerDetailsComponent,
    PlayersComponent,
  ]
})
export class ComponentsModule { }
