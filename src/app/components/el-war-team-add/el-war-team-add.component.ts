import { Component, OnDestroy, OnInit } from '@angular/core';
import { ElWarTeam } from "../../models/el-war-team";
import { PlayersService } from "../../services/players.service";
import { AppService } from "../../global/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ElWarTeamService } from "../../services/el-war-team.service";
import { NgForm } from "@angular/forms";
import { Player } from "../../models/player";

@Component({
  selector: 'app-el-war-team-add',
  templateUrl: './el-war-team-add.component.html',
  styleUrls: ['./el-war-team-add.component.css']
})
export class ElWarTeamAddComponent implements OnInit, OnDestroy {

  inTeam: boolean = true; // flag for searching players in/out of team. true for in team
  oldTeam: ElWarTeam;
  model: ElWarTeam = {id: null, name: null}; // form model
  editMode: boolean = false; // flag to distinct edit and add new mode
  elWarTeamSubscription: Subscription; // subscription for elWarTeam service
  playersSubscription: Subscription; // subscription for players per team - players service
  players: Player[]; // collection of players. there are two options, players that belongs to the team and everyone else
  playersPerPage: number; // for players pagination
  pages: number[] = [1, 2, 3]; // array to show for pagination
  currentPage: number = 0;
  numberOfPlayers: number = 0;

  constructor(private playerService: PlayersService, private appService: AppService, private router: Router,
              private activeRoute: ActivatedRoute, private elWarTeamService: ElWarTeamService) { }

  ngOnInit(): void {
    this.playersPerPage = this.appService.getPlayersPerPage();
    this.activeRoute.paramMap.subscribe(p => {
      // check if component is for editing or adding a team. if route has id it's for editing
      if (p.has('id')) {
        // edit mode
        // loading team
        this.elWarTeamSubscription = this.elWarTeamService.fetchTeamById(+p.get('id')).subscribe({
          next: value => {
            this.model = value;
            // creating data from the old team to compare before sending request to change. no change no http request
            this.oldTeam = JSON.parse(JSON.stringify(value));
            this.editMode = true;
            // initial load of players
            this.fetchNextPage(1);
          },
          error: err => {
            this.appService.handleRequestError(err);
          }
        });
      }
      else {
        this.editMode = false;
      }
    })
  }

  onSubmit(f: NgForm) {

  }

  OnCheck(event: any) {
    if (event.target.value == 'add') {
      this.inTeam = false;
    }
    else {
      this.inTeam = true;
    }
    this.fetchNextPage(1);
  }

  fetchNextPage(page: number) {
    console.log('FETCH: ' + this.inTeam + ' ' + page + ' ' + this.playersPerPage);
    this.playersSubscription = this.playerService.getPlayersByTeam(this.model.id, this.inTeam, page, this.playersPerPage)
      .subscribe({
        next: value => {
          this.currentPage = page;
          this.numberOfPlayers = value['numberOfPlayers'];
          this.players = value['players'];
          console.log(this.numberOfPlayers);
        },
        error: err => {
          this.appService.handleRequestError(err);
        }
      });
  }

  onCheckPlayer(event: Event) {

  }

  ngOnDestroy(): void {
    this.elWarTeamSubscription.unsubscribe();
    this.playersSubscription.unsubscribe();
  }


}
