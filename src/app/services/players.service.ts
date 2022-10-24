import { Injectable } from '@angular/core';
import { Player } from "../models/player";
import { AppService } from "../global/app.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  player: Player | null = null;
  private baseUrl?: string;

  constructor(private appService: AppService, private httpClient: HttpClient) { }

  private getBaseUrl() {
    if (!this.baseUrl){
      this.baseUrl = this.appService.getBaseUrl() + '/players';
    }
  }

  /**
   * returns player found by id
   * @param id
   */
  getPlayerById(id: number) {
    this.getBaseUrl();
    return this.httpClient.get<Player>(this.baseUrl + "/" + +id);
  }
}
