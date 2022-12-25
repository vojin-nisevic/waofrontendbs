import { Injectable, OnInit } from '@angular/core';
import { Player } from "../models/player";
import { AppService } from "../global/app.service";
import { HttpClient } from "@angular/common/http";
import { PlayerElWarDto } from "../models/dto/player-el-war-dto";
import { PlayerDto } from "../models/dto/player-dto";
import { CodeBook } from "../models/code-book";

@Injectable({
  providedIn: 'root'
})
export class PlayersService implements OnInit{

  player: Player | null = null;
  private baseUrl?: string;
  private limit: number;

  constructor(private appService: AppService, private httpClient: HttpClient) {
    this.getBaseUrl();
  }

  ngOnInit(): void {
    console.log('SERVICE ON INIT')
    // this.getBaseUrl();
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
    return this.httpClient.get<PlayerDto[]>(this.baseUrl, {
      params: {
        page: page,
        limit: limit
      }
    });
  }

  /**
   * returns player found by id
   * @param id
   */
  getPlayerById(id: number) {
    return this.httpClient.get<Player>(this.baseUrl + "/" + +id);
  }

  /**
   * returns list of players that belongs to team with id parameter
   * @param id: id of eliter war team
   */
  getPlayersByTeam(id: number) {
    return this.httpClient.get<PlayerElWarDto[]>(this.baseUrl + "/byteam/" + +id);
  }

  deletePlayer(id: number) {
    return this.httpClient.delete(this.baseUrl + "/delete/" + +id);
  }

  addPlayer(data: Player) {
    return this.httpClient.post<Player>(this.baseUrl + '/add', data);
  }

  editPlayer(data: Player, id: number) {
    return this.httpClient.put<Player>(this.baseUrl + '/edit/' + +id, data);
  }

  searchPlayers(page: number, limit: number, search: string) {
    let test = search === '' ? 'empty' : 'something else';
    //I am using CodeBook here because it is adjusted to receive HashMap
    return this.httpClient.get<CodeBook>(this.baseUrl, {
      params:
        {
          'page': page,
          'limit': limit,
          'search': search
        }
    });

  }

}
