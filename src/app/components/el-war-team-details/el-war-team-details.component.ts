import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ElWarTeam } from "../../models/el-war-team";
import { PlayerElWarDto } from "../../models/dto/player-el-war-dto";
import { PlayersService } from "../../services/players.service";
import { ElWarTeamService } from "../../services/el-war-team.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../global/app.service";

@Component({
  selector: 'app-el-war-team-details',
  templateUrl: './el-war-team-details.component.html',
  styleUrls: ['./el-war-team-details.component.css']
})
export class ElWarTeamDetailsComponent implements OnInit {

  message: string = null; // message for modal
  deletionWarning: boolean = false; // flag for deletion message in modal
  editWarning: boolean = false; // flag for editing message in modal

  @Input() team?: ElWarTeam;
  players: PlayerElWarDto[];
  id: number;
  avgHP: number;
  minHP: number;
  maxHP: number;
  avgMarch: number;
  minMarch: number;
  maxMarch: number;
  avgAttack: number;
  minAttack: number;
  maxAttack: number;

  constructor(private playerService: PlayersService, private elWarService: ElWarTeamService,
              private activatedRoute: ActivatedRoute, private appService: AppService, private router: Router) {
  }

  ngOnInit(): void {

    //get id from route
    this.activatedRoute.paramMap.subscribe(params => {
        this.id = +params.get('id');
        // console.log("DETAILS ID: " + this.id);
        // console.log(this.activatedRoute.toString());
      }
    );

    //fetch team by id
    this.elWarService.fetchTeamById(this.id).subscribe({
      next: value => {
        this.team = value;
        // console.log(this.team);
      },
      error: err => {
        this.appService.handleRequestError(err);
      }
    });

    //fetch players by team
    // this.playerService.getPlayersByTeam(this.id).subscribe({
    //   next: value => {
    //     this.players = value;
    //     this.calculateStats();
    //     // console.log(value);
    //   },
    //   error: err => {
    //     this.appService.handleRequestError(err);
    //   }
    // });
  }

  //calculates stats for team
  calculateStats() {
    if (this.players != null) {
      let arrHP = this.players.flatMap(pl => pl.hp);
      this.avgHP = arrHP.reduce((a, b) => a + b) / arrHP.length;
      this.maxHP = arrHP.reduce((a, b) => a > b ? a : b);
      this.minHP = arrHP.reduce((a, b) => a < b ? a : b);
      let arrAttack = this.players.flatMap(pl => pl.attack);
      this.avgAttack = arrAttack.reduce((a, b) => a + b) / arrAttack.length;
      this.maxAttack = arrAttack.reduce((a, b) => a > b ? a : b);
      this.minAttack = arrAttack.reduce((a, b) => a < b ? a : b);
      let arrMarch = this.players.flatMap(pl => pl.marchSize);
      this.avgMarch = arrMarch.reduce((a, b) => a + b) / arrMarch.length;
      this.maxMarch = arrMarch.reduce((a, b) => a > b ? a : b);
      this.minMarch = arrMarch.reduce((a, b) => a < b ? a : b);
    }
  }

  onCheck(e: any){
    // console.log(e.target);
    console.log(e.target.checked);
    console.log(e.target.value);
  }

  /**
   * set flag for deletion to true
   */
  onDeleteClick() {
    // console.log('for delete');
    this.deletionWarning = true;
    this.message = 'Do you really want to delete this team?'
  }

  /**
   * set deletion flag to false
   */
  cancelDeletionWarning() {
    this.deletionWarning = false;
    this.message = null;
  }

  onEditClick() {
    console.log('EDITING');
    this.editWarning = true;
    this.message = 'Do you really want to edit this team?';
    console.log(this.message);
  }

  /**
   * set editing flag to false
   */
  cancelEditWarning() {
    this.editWarning = false;
    this.message = null;
  }

  /**
   * check flags (delete or edit) and performs an action
   */
  onConfirmAction() {
    if (this.deletionWarning) {
      this.deleteTeam();
      this.cancelDeletionWarning();
    }
    else {
      this.editTeam();
      this.cancelEditWarning();
    }
  }

  /**
   * deletes team
   * @private
   */
  private deleteTeam() {
    console.log('DELETE ACTION');
  }

  /**
   * navigates to component for team editing
   * @private
   */
  private editTeam() {
    this.message = null;
    this.router.navigate(['/el-war-team-edit/' + this.team.id]);
  }
}
