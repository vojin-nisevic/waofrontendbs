import { Injectable } from '@angular/core';
import { CustomError } from "../models/custom-error";
import { BehaviorSubject, map, Subject } from "rxjs";
import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { ModalMessage } from "../models/modal-message";
import { FrontRow } from "../models/front-row";
import { BackRow } from "../models/back-row";
import { AllianceRank } from "../models/alliance-rank";
import { MeritRank } from "../models/merit-rank";
import { ElWarTeam } from "../models/el-war-team";
import { ElWarTeamsDto } from "../models/dto/el-war-teams-dto";
import { CodeBook } from "../models/code-book";

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

  constructor(private client: HttpClient) {
  }

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

  getCodeBooks() {
    let getUrl = this.baseUrl + '/ewteam' + '/code-books';
    this.client.get<CodeBook[]>(getUrl)
      .subscribe({
        next: value => {
          for (const valueKey in value) {
            localStorage.setItem(valueKey, JSON.stringify(value[valueKey]));
          }
        },
        error: err => {
          this.handleRequestError(err);
        }
      });
  }

  /**
   * checking codebooks in local storage, if single one is not loaded, it loads all of them
   */
  checkCodeBooks(): boolean {
    try {
      if (!!localStorage.getItem('frontRow') || !!localStorage.getItem('backRow') || !!localStorage.getItem('allianceRank')
              || !!localStorage.getItem('meritRank') || !!localStorage.getItem('elWarTeam')) {
        this.getCodeBooks();
      }
      return true;
    }
    catch (e) {
      this.handleRequestError(e);
      return false;
    }
  }
}
