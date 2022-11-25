import { Injectable } from '@angular/core';
import { CustomError } from "../models/custom-error";
import { Subject } from "rxjs";
import { HttpStatusCode } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://localhost:8080';
  customError = new Subject<CustomError | null>();
  playersPerPage: number = 10; // pagination number

  constructor() { }

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
}
