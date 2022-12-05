import { Injectable } from '@angular/core';
import { CustomError } from "../models/custom-error";
import { BehaviorSubject, Subject } from "rxjs";
import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { ModalMessage } from "../models/modal-message";
import { FrontRow } from "../models/front-row";
import { BackRow } from "../models/back-row";
import { AllianceRank } from "../models/alliance-rank";
import { MeritRank } from "../models/merit-rank";
import { ElWarTeam } from "../models/el-war-team";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://localhost:8080';
  customError = new Subject<CustomError | null>();
  modalMessage = new Subject<ModalMessage | null>();
  // modalMessage = new BehaviorSubject<string>(null);
  // frontRow = new Subject<FrontRow[]>();
  // backRow = new Subject<BackRow[]>();
  // allianceRank = new Subject<AllianceRank[]>();
  // meritRank = new Subject<MeritRank[]>();
  playersPerPage: number = 10; // pagination number

  constructor(private client: HttpClient) { }

  getBaseUrl(): String {
    return this.baseUrl;
  }

  getPlayersPerPage() {
    return this.playersPerPage;
  }

  handleRequestError(err: any) {
    console.log(err);
    try {
      this.customError.next(err);
    } catch (err) {
      this.customError.next({
        message: "Internal server error, please try again later!",
        httpStatus: HttpStatusCode.InternalServerError,
        status: 500,
        timestamp: new Date()
      });
    }
  }

  //reads codebooks and stores them into local storage
  getCodeBooks(){
    let getUrl = this.baseUrl + '/ewteam';
    //FRONT ROW
    this.client.get<FrontRow[]>(getUrl + '/front-row').subscribe({
      next: value => {
        localStorage.setItem('frontRow', JSON.stringify(value));
      },
      error: err => this.handleRequestError(err)
    });
    //BACK ROW
    this.client.get<BackRow[]>(getUrl + '/back-row').subscribe({
      next: value => {
        localStorage.setItem('backRow', JSON.stringify(value));
      },
      error: err => this.handleRequestError(err)
    });
    //ALLIANCE RANK
    this.client.get<AllianceRank[]>(getUrl + '/alliance-rank').subscribe({
      next: value => {
        localStorage.setItem('allianceRank', JSON.stringify(value));
      },
      error: err => this.handleRequestError(err)
    });
    //MERIT RANK
    this.client.get<MeritRank[]>(getUrl + '/merit-rank').subscribe({
      next: value => {
        localStorage.setItem('meritRank', JSON.stringify(value));
      },
      error: err => this.handleRequestError(err)
    });
    //EW TEAM
    this.client.get<ElWarTeam[]>(getUrl).subscribe({
      next: value => {
        localStorage.setItem('elWarTeam', JSON.stringify(value));
      },
      error: err => this.handleRequestError(err)
    });
  }
}
