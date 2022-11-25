import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayersService } from "../../services/players.service";
import { AppService } from "../../global/app.service";
import { PlayerDto } from "../../models/dto/player-dto";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {

  players: PlayerDto[];
  playersPerPage: number;

  playerServiceSubscription: Subscription;

  constructor(private playersService: PlayersService, private appService: AppService) {
  }

  ngOnInit(): void {
    console.log("init");
    this.playersPerPage = this.appService.getPlayersPerPage();
    this.fetchAllPlayers(1, this.playersPerPage);
  }

  /**
   * initial fetch
   */
  fetchAllPlayers(page: number, limit: number) {
    this.playerServiceSubscription = this.playersService.getPlayers(2, this.playersPerPage).subscribe(
      {
        next: value => {
          console.log(value);
          this.players = value;
        },
        error: err => {
          this.appService.handleRequestError(err);
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.playerServiceSubscription.unsubscribe();
  }

}
