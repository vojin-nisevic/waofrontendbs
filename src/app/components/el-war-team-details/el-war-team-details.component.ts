import { Component, Input, OnInit } from '@angular/core';
import { ElWarTeam } from "../../models/el-war-team";

@Component({
  selector: 'app-el-war-team-details',
  templateUrl: './el-war-team-details.component.html',
  styleUrls: ['./el-war-team-details.component.css']
})
export class ElWarTeamDetailsComponent implements OnInit {

  @Input() team?: ElWarTeam;

  constructor() { }

  ngOnInit(): void {
  }

}
