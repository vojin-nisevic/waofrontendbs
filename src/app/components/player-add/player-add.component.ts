import { Component, OnInit } from '@angular/core';
import { Player } from "../../models/player";
import { FrontRow } from "../../models/front-row";
import { NgForm } from "@angular/forms";
import { BackRow } from "../../models/back-row";
import { AllianceRank } from "../../models/alliance-rank";
import { MeritRank } from "../../models/merit-rank";
import { ElWarTeam } from "../../models/el-war-team";
import { AppService } from "../../global/app.service";
import { PlayersService } from "../../services/players.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

  //region VARIABLES

  fRow: FrontRow[];
  bRow: BackRow[];
  allRank: AllianceRank[];
  merRank: MeritRank[];
  elWarTeam: ElWarTeam[];
  model: Player = {
    id: null,
    originalName: '',
    currentName: '',
    marchSize: null,
    timeZone: null,
    castleLevel: null,
    killCount: null,
    hp: null,
    attack: null,
    frontRow: {
      id: null,
      name: ''
    },
    backRow: {
      id: null,
      name: ''
    },
    ewTeam: {
      id: null,
      name: ''
    },
    meritRank: {
      id: null,
      name: ''
    },
    allianceRank: {
      id: null,
      name: '',
      description: ''
    }
  };

  //endregion

  constructor(
    private appService: AppService,
    private playerService: PlayersService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.fRow = JSON.parse(localStorage.getItem('frontRow'));
    this.bRow = JSON.parse(localStorage.getItem('backRow'));
    this.allRank = JSON.parse(localStorage.getItem('allianceRank'));
    this.merRank = JSON.parse(localStorage.getItem('meritRank'));
    this.elWarTeam = JSON.parse(localStorage.getItem('elWarTeam'));
    // console.log(this.fRow);
  }

  updateMarchSize(size: string) {
    // console.log(size);
    // let vv = size.toString().split(',').join('');
    let vv = size.toString().replace(/[^0-9]/g, '');
    // console.log('vv: ' + vv);
    this.model.marchSize = +vv;
    // console.log('model: ' + this.model.marchSize);
  }

  updateKillCount(size: string) {
    // console.log(size);
    // let vv = size.toString().split(',').join('');
    let vv = size.toString().replace(/[^0-9]/g, '');
    // console.log('vv: ' + vv);
    this.model.killCount = +vv;
    // console.log('model: ' + this.model.killCount);
  }

  /**
   * finds and insert weak entities, if everything is ok returns true, otherwise false
   * @param fRowId front row id
   * @param bRowId back row id
   * @param mRank merit rank id
   * @param allRank alliance rank id
   * @param elWTeam elite war team id
   */
  insertClasses(fRowId: number, bRowId: number, mRank: number, allRank: number, elWTeam: number): boolean {
    try {
      if (this.appService.checkCodeBooks()) {
        this.model.frontRow = this.fRow.find(p => p.id === fRowId);
        this.model.backRow = this.bRow.find(p => p.id === bRowId);
        this.model.meritRank = this.merRank.find(p => p.id === mRank);
        this.model.allianceRank = this.allRank.find(p => p.id === allRank);
        this.model.ewTeam = this.elWarTeam.find(p => p.id === elWTeam);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  onSubmit(form: NgForm) {
    if (!this.insertClasses(+form.controls['frontRow'].value, +form.controls['backRow'].value,
      +form.controls['meritRank'].value, +form.controls['allyRank'].value, +form.controls['EWTeam'].value)) {
      form.controls['ogName'].setValue(''); //if, for some reason, local storage has no data form is invalid
    } else {
      this.playerService.addPlayer(this.model)
        .subscribe({
          next: value => {
            this.appService.modalMessage.next({ message: 'You have successfully added player ' + value.currentName + ' to database!' });
            this.router.navigate(['/members']);
          },
          error: err => {
            this.appService.handleRequestError(err);
          }
        });
    }
  }
}
