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
import { FormsModule } from "@angular/forms";
import { TextToIntegerValidateDirective } from '../directives/text-to-integer-validate.directive';
import { ValidateSelectDirective } from '../directives/validate-select.directive';
import { ElWarTeamAddComponent } from './el-war-team-add/el-war-team-add.component';



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
    TextToIntegerValidateDirective,
    ValidateSelectDirective,
    ElWarTeamAddComponent,
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    FormsModule,
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
