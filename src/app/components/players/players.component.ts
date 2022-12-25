import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlayersService } from "../../services/players.service";
import { AppService } from "../../global/app.service";
import { PlayerDto } from "../../models/dto/player-dto";
import { Subject, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Player } from "../../models/player";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit, OnDestroy {

  search: boolean = false; // flag for search results. indicates whether user has tried to search
  searchString: string = ''; //to send with normal request
  searchTerm = new Subject<string>();
  searchSubscription = new Subscription();
  numberOfPlayers: number;
  currentPage: number = 0;
  players: PlayerDto[];
  dummyPlayers: PlayerDto[];
  playersPerPage: number;
  pages: number[] = [1, 2, 3];

  playerServiceSubscription: Subscription;

  constructor(private playersService: PlayersService, private appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.playersPerPage = this.appService.getPlayersPerPage();
    this.fetchNextPage(1);
    this.appService.getCodeBooks();
    this.searchSubscription = this.searchTerm
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe({
        next: value => {
          console.log('VALUE LENGTH IS: ' + value.length);
          if (value.length == 0) {
            //before loading initial data, currentPage must be reset to default value
            this.currentPage = 0;
            this.fetchNextPage(1);
          } else {
            //loading search results
            console.log('CURR PAGE ' + this.currentPage + '; PAGINATION ' + this.playersPerPage + '; SEARCH TERM: ' + value);
            this.playersService.searchPlayers(1, this.playersPerPage, value).subscribe({
              next: value => {
                this.currentPage = 1;
                this.numberOfPlayers = value['numberOfPlayers'];
                this.players = this.numberOfPlayers > 0 ? value['players'] : null;

                this.search = !!value;
                console.log('INDICATOR SEARCH: ' + this.search);
                console.log('PLAYERS FLAG: ' + !this.players);
                // console.log(value);
              },
              error: err => {
                this.appService.handleRequestError(err);
              }
            });
          }
        }
      });
  }

  // region FETCH AND PAGINATION
  /**
   * initial fetch
   */
  fetchAllPlayers(page: number) {
    // console.log('page: ' + page);

    this.playerServiceSubscription = this.playersService.searchPlayers(page, this.playersPerPage, this.searchString)
      .subscribe({
        next: value => {
          console.log(value);
          this.currentPage = 1;
          this.numberOfPlayers = value['numberOfPlayers'];
          this.players = this.numberOfPlayers > 0 ? value['players'] : null;
          this.search = !!value;
        },
        error: err => {
          console.log(err);
          this.appService.handleRequestError(err);
        }
      });

  }

  fetchNextPage(page: number) {
    // event.preventDefault();
    this.playerServiceSubscription = this.playersService.searchPlayers(page, this.playersPerPage, this.searchString)
      .subscribe({
        next: value => {
          this.currentPage = page;
          this.players = value['players'];
          this.fillArray(value['players']);
          this.numberOfPlayers = value['numberOfPlayers'];
          if (this.currentPage > 2) {
            this.pages = [page - 1, page, page + 1];
          } else {
            this.pages = [1, 2, 3];
          }
        },
        error: err => {
          this.appService.handleRequestError(err);
        }
      });
  }

  // endregion

  //region SEARCH

  onSearch(data: any) {
    let check = data.value.split(' ').join('');
    //setting minimum length for search
    if (check.length >= 2) {
      this.searchTerm.next(check);
      this.searchString = check;
    }
    //checking if user deleted entry for search
    if (check.length == 0) {
      this.searchTerm.next('');
      this.searchString = check;
    }
  }

  //endregion

  /**
   * fill array of players with null values so table always has same dimension
   * @param data
   */
  fillArray(data: PlayerDto[]) {
    if (data.length == this.playersPerPage) {
      this.dummyPlayers = [];
    } else {
      if (data.length > 0) {
        let joker: PlayerDto = {
          id: null,
          backRow: null,
          frontRow: null,
          castleLevel: null,
          originalName: null,
          currentName: null
        };
        for (let i = 0; i < this.playersPerPage - data.length; i++) {
          this.dummyPlayers.push(joker);
        }
      } else {
        this.dummyPlayers = null;
      }
    }
  }

  showDetails(id: number) {
    this.router.navigate(['/members/details/' + id])
  }

  ngOnDestroy(): void {
    this.playerServiceSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

}
