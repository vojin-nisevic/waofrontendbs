import { Injectable } from '@angular/core';
import { Player } from "../models/player";
import { AppService } from "../global/app.service";
import { HttpClient } from "@angular/common/http";
import { PlayerElWarDto } from "../models/dto/player-el-war-dto";
import { PlayerDto } from "../models/dto/player-dto";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  player: Player | null = null;
  private baseUrl?: string;
  private limit: number;

  constructor(private appService: AppService, private httpClient: HttpClient) {
  }

  private getBaseUrl() {
    if (!this.baseUrl) {
      this.baseUrl = this.appService.getBaseUrl() + '/players';
    }
  }

  /**
   * fetch all players
   */
  getPlayers(page: number, limit: number) {
    this.getBaseUrl();
    return this.httpClient.get<PlayerDto[]>(this.baseUrl, {params: {
        page: page,
        limit: limit
      }});
  }

  /**
   * returns player found by id
   * @param id
   */
  getPlayerById(id: number) {
    this.getBaseUrl();
    return this.httpClient.get<Player>(this.baseUrl + "/" + +id);
  }

  /**
   * returns list of players that belongs to team with id parameter
   * @param id: id of eliter war team
   */
  getPlayersByTeam(id: number) {
    this.getBaseUrl();
    return this.httpClient.get<PlayerElWarDto[]>(this.baseUrl + "/byteam/" + +id);
  }
}
