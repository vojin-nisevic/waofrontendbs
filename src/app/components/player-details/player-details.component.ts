import { Component, OnInit } from '@angular/core';
import { PlayersService } from "../../services/players.service";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../../global/app.service";
import { Player } from "../../models/player";

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  isLoading: boolean;
  id: number = 0;
  deletionWarning: boolean = false;
  editWarning: boolean = false;
  player: Player | null = null;
  message: string = null;
  // player: Player | null
  //   = {
  //   originalName: "TulkasTheStrong",
  //   currentName: "NippleTwister",
  //   id: 1,
  //   meritRank: { id: 1, name: "Centurion" },
  //   castleLevel: 35,
  //   allianceRank: { id: 1, name: "R2", description: "Elite" },
  //   attack: 225,
  //   backRow: { id: 1, name: "Mages" },
  //   ewTeam: { id: 1, name: "Blue" },
  //   frontRow: { id: 1, name: "Cavalry" },
  //   hp: 200,
  //   killCount: 18958555,
  //   marchSize: 239550,
  //   timeZone: 2
  // };

  constructor(private playerService: PlayersService, private activeRoute: ActivatedRoute, private appService: AppService) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      p => {
        this.id = +p.get('id')!;
      }
    );
    this.isLoading = true;
    console.log("player details init id: " + this.id);
    this.playerService.getPlayerById(this.id)
      .subscribe({
        next: value => {
          this.player = value;
        },
        error: err => {
          this.appService.handleRequestError(err);
        }
      }).add(() => {
      this.isLoading = false;
    });
  }

  onDeleteClick() {
    this.deletionWarning = true;
    this.message = 'Do you really want to delete this player?'
  }

  cancelDeletionWarning() {
    this.deletionWarning = false;
  }

  onEditClick() {
    this.editWarning = true;
    this.message = 'Do you really want to edit this player?'
  }

  cancelEditWarning() {
    this.editWarning = false;
  }

  onConfirmAction() {
    if (this.deletionWarning) {
      this.deletionWarning = false;
      this.deleteUser();
      this.cancelDeletionWarning();
    }
    else {
      this.editWarning = false;
      this.editUser();
      this.cancelEditWarning();
    }
  }

  deleteUser() {
    this.message = null;
    console.log('deleting')
  }

  editUser() {
    this.message = null;
    console.log('editing')
  }
}
