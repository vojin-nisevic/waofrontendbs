import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomErrorComponent } from "./custom-error/custom-error.component";
import { ElWarTeamDetailsComponent } from "./el-war-team-details/el-war-team-details.component";
import { ElWarTeamsComponent } from "./el-war-teams/el-war-teams.component";
import { HeaderComponent } from "./header/header.component";
import { PlayerDetailsComponent } from './player-details/player-details.component';
import { PlayersComponent } from './players/players.component';
import { ModalComponent } from './modal/modal.component';
import { PlayerAddComponent } from './player-add/player-add.component';
import { RouterLinkWithHref } from "@angular/router";
import { FormsModule, NgModel, ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    CustomErrorComponent,
    ElWarTeamDetailsComponent,
    ElWarTeamsComponent,
    HeaderComponent,
    PlayerDetailsComponent,
    PlayersComponent,
    ModalComponent,
    PlayerAddComponent,
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    FormsModule,
    ReactiveFormsModule,
  ],
    exports: [
        CustomErrorComponent,
        HeaderComponent,
        ElWarTeamsComponent,
        ElWarTeamDetailsComponent,
        PlayerDetailsComponent,
        PlayersComponent,
        ModalComponent,
    ]
})
export class ComponentsModule { }
