import { Component, OnInit } from '@angular/core';
import { Player } from "../../models/player";
import { FrontRow } from "../../models/front-row";

@Component({
  selector: 'app-player-add',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

  fRow: FrontRow[];
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

  constructor() { }

  ngOnInit(): void {
    this.fRow = JSON.parse(localStorage.getItem('frontRow'));
    // console.log(this.fRow);
  }

  updateMarchSize(size: string){
    console.log(size);
    this.model.marchSize = +size;
    console.log('model: ' + this.model.marchSize);
  }

  onSubmit() {

  }
}
