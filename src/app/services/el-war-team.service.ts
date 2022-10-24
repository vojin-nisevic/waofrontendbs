import { Injectable, OnInit } from '@angular/core';
import { AppService } from "../global/app.service";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { ElWarTeam } from "../models/el-war-team";
import { CustomError } from "../models/custom-error";

@Injectable({
  providedIn: 'root'
})
export class ElWarTeamService implements OnInit{

  private baseUrl?: string;
  teams = new Subject<ElWarTeam[]>();
  teamError = new Subject<CustomError>();

  constructor(private appService: AppService, private client: HttpClient) { }

  ngOnInit(): void {
    this.baseUrl = this.appService.getBaseUrl() + '/ewteam';
  }

  private getBaseUrl() {
    if (!this.baseUrl){
      this.baseUrl = this.appService.getBaseUrl() + '/ewteam';
    }
  }

  //fetch all teams
  fetchTeams() {
    this.getBaseUrl();
    console.log('servis')
    return this.client.get<ElWarTeam[]>(this.baseUrl!);
  }

  fetchTeamById(id: number) {
    console.log("ID: " + id);
    console.log(this.baseUrl! + "/find/")
    this.getBaseUrl();
    return this.client.get<ElWarTeam>(this.baseUrl! + "/find/" + id);
  }
}
