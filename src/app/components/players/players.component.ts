import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayersService } from "../../services/players.service";
import { AppService } from "../../global/app.service";
import { PlayerDto } from "../../models/dto/player-dto";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {

  players: PlayerDto[];
  playersPerPage: number;

  playerServiceSubscription: Subscription;

  constructor(private playersService: PlayersService, private appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.playersPerPage = this.appService.getPlayersPerPage();
    this.fetchAllPlayers(1, this.playersPerPage);
  }

  /**
   * initial fetch
   */
  fetchAllPlayers(page: number, limit: number) {
    this.playerServiceSubscription = this.playersService.getPlayers(page, this.playersPerPage).subscribe(
      {
        next: value => {
          this.players = value;
        },
        error: err => {
          this.appService.handleRequestError(err);
        }
      }
    )
  }

  showDetails(id: number){
    this.router.navigate(['/members/details/' + id])
  }

  ngOnDestroy(): void {
    this.playerServiceSubscription.unsubscribe();
  }

}
