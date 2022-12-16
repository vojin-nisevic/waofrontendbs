import { Component, OnInit } from '@angular/core';
import { Player } from "../../models/player";
import { FrontRow } from "../../models/front-row";
import { NgForm } from "@angular/forms";
import { BackRow } from "../../models/back-row";
import { AllianceRank } from "../../models/alliance-rank";
import { MeritRank } from "../../models/merit-rank";
import { ElWarTeam } from "../../models/el-war-team";

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

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

  constructor() {
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
    console.log(size);
    // let vv = size.toString().split(',').join('');
    let vv = size.toString().replace(/[^0-9]/g, '');
    console.log('vv: ' + vv);
    this.model.marchSize = +vv;
    console.log('model: ' + this.model.marchSize);
  }

  updateKillCount(size: string) {
    console.log(size);
    // let vv = size.toString().split(',').join('');
    let vv = size.toString().replace(/[^0-9]/g, '');
    console.log('vv: ' + vv);
    this.model.killCount = +vv;
    console.log('model: ' + this.model.killCount);
  }

  frontRowUpdate(value: any){
    console.log(value);
  }

  backRowUpdate(value: any) {
    console.log(value);
  }

  /**
   * finds and insert weak entities
   * @param fRowId front row id
   * @param bRowId back row id
   */
  insertClasses(fRowId: number, bRowId: number): boolean {
    try {
      this.model.frontRow = this.fRow.find(p => p.id === fRowId);
      this.model.backRow = this.bRow.find(p => p.id === bRowId);
      return true;
    }
    catch (e) {
      return false;
    }
  }

  onSubmit(form: NgForm) {
    console.log('IN SUBMIT ' + form.controls['frontRow'].value);
    console.log('TRY FIND: ' + this.insertClasses(+form.controls['frontRow'].value, +form.controls['backRow'].value));
    console.log(this.model.backRow.name);

  }


}
