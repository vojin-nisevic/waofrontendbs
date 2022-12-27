import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayersService } from "../../services/players.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../global/app.service";
import { Player } from "../../models/player";
import { Subscription } from "rxjs";
import { ModalMessage } from "../../models/modal-message";

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit, OnDestroy {

  playerServiceSubscription = new Subscription();

  isLoading: boolean;
  id: number = 0;
  deletionWarning: boolean = false; // flag for deletion message in modal
  editWarning: boolean = false; // flag for editing message in modal
  player: Player | null = null;
  message: string = null; // message for modal
  modalMessage: ModalMessage;
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

  constructor(private playerService: PlayersService, private activeRoute: ActivatedRoute, private appService: AppService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(
      p => {
        this.id = +p.get('id')!;
      }
    );
    this.isLoading = true;
    // console.log("player details init id: " + this.id);
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

  /**
   * set flag for deletion to true
   */
  onDeleteClick() {
    // console.log('for delete');
    this.deletionWarning = true;
    this.message = 'Do you really want to delete this player?'
  }

  /**
   * set deletion flag to false
   */
  cancelDeletionWarning() {
    this.deletionWarning = false;
  }

  onEditClick() {
    this.editWarning = true;
    this.message = 'Do you really want to edit this player?'
  }

  /**
   * set editing flag to false
   */
  cancelEditWarning() {
    this.editWarning = false;
  }

  onConfirmAction() {
    if (this.deletionWarning) {
      this.deleteUser();
      this.cancelDeletionWarning();
    }
    else {
      this.editUser();
      this.cancelEditWarning();
    }
  }

  deleteUser() {
    // console.log('deleting');
    this.message = null;
    this.playerServiceSubscription = this.playerService.deletePlayer(this.player.id).subscribe(
      {
        next: value => {
          this.modalMessage = {message:'You have successfully deleted player ' + this.player.currentName};
          this.appService.modalMessage.next( this.modalMessage);
          this.router.navigate(['/members']);
        },
        error: err => {
          this.appService.handleRequestError(err);
        }
      }
    );
  }

  editUser() {
    this.message = null;
    this.router.navigate(['/members/edit/' + this.player.id]);
    console.log('editing')
  }

  ngOnDestroy(): void {
    this.playerServiceSubscription.unsubscribe();
  }
}
