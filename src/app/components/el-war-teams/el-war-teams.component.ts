import { Component, OnInit } from '@angular/core';
import { ElWarTeam } from "../../models/el-war-team";
import { ElWarTeamService } from "../../services/el-war-team.service";
import { AppService } from "../../global/app.service";
import { ElWarTeamsDto } from "../../models/dto/el-war-teams-dto";
import { Router } from "@angular/router";

@Component({
  selector: 'app-el-war-teams',
  templateUrl: './el-war-teams.component.html',
  styleUrls: ['./el-war-teams.component.css']
})
export class ElWarTeamsComponent implements OnInit {

  teams: ElWarTeamsDto[] = [];
  team: ElWarTeam | null = null;
  showDetails: boolean = false;
  // teamSubscription =  new Subscription();


  constructor(private elWarService: ElWarTeamService, private appService: AppService, private router: Router) {

  }

  ngOnInit(): void {
    this.fetchTeams();
  }

  //fetch all teams
  public fetchTeams() {
    this.elWarService.fetchTeams()
      .subscribe({
        next: value => {
          // console.log(value);
          this.teams = value;
        },
        error: err => {
          this.appService.handleRequestError(err);
          // try {
          //   this.appService.customError.next(err);
          // }
          // catch (err) {
          //   this.appService.customError.next({
          //     message: "Internal server error, please try again later!",
          //     httpStatus: HttpStatusCode.InternalServerError,
          //     status: 500,
          //     timestamp: new Date()
          //   })
          // }
        }
      });
  }

  //fetch team by id
  public fetchTeamById(id: number) {
    this.elWarService.fetchTeamById(id)
      .subscribe({
        next: value => {
          this.team = value;
          this.showDetails = true;
          console.log(this.team);
        },
        error: err => {
          this.appService.handleRequestError(err);
          // try {
          //   this.appService.customError.next(err);
          //   console.log("Custom error");
          //   console.log(err);
          // }
          // catch (err) {
          //   this.appService.customError.next({
          //     message: "Internal server error, please try again later!",
          //     httpStatus: HttpStatusCode.InternalServerError,
          //     status: 500,
          //     timestamp: new Date()
          //   })
          // }
        }
      });
    // this.team = this.teams[id];
    // this.showDetails = true;

  }

  teamDetails(id: any){
    console.log()
    // let rt = this.router.navigate(['el-war-team-details/', {id: id}]);
    this.router.navigateByUrl('/el-war-team-details/'+ id);
    console.log();
  }

}
