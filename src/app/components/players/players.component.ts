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

  numberOfPlayers: number;
  currentPage: number = 0;
  players: PlayerDto[];
  playersPerPage: number;
  pages: number[] = [1, 2, 3];

  playerServiceSubscription: Subscription;

  constructor(private playersService: PlayersService, private appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.playersPerPage = this.appService.getPlayersPerPage();
    this.fetchAllPlayers(this.currentPage + 1);
    this.appService.getCodeBooks();
    this.numberOfPlayers = JSON.parse(localStorage.getItem('numberOfPlayers'));
  }

  /**
   * initial fetch
   */
  fetchAllPlayers(page: number) {
    console.log('page: ' + page);

    this.playerServiceSubscription = this.playersService.getPlayers(page, this.playersPerPage).subscribe(
      {
        next: value => {
          console.log('NEXT');
          this.currentPage++;
          this.players = value;
        },
        error: err => {
          this.appService.handleRequestError(err);
        }
      }
    )
  }

  fetchNextPage(page: number, event: Event) {
    event.preventDefault();
    this.playerServiceSubscription = this.playersService.getPlayers(page, this.playersPerPage).subscribe(
      {
        next: value => {
          this.currentPage = page;
          this.players = value;
          //adjust number of pages to show
          if (this.currentPage > 2) {
            this.pages = [page - 1, page, page + 1];
          } else {
            this.pages = [1, 2, 3];
          }
        },
        error: err => {
          this.appService.handleRequestError(err);
        }
      }
    )
  }

  showDetails(id: number) {
    this.router.navigate(['/members/details/' + id])
  }

  ngOnDestroy(): void {
    this.playerServiceSubscription.unsubscribe();
  }

}
