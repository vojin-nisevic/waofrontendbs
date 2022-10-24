import { Component, OnDestroy, OnInit } from '@angular/core';
import { CustomError } from "../../models/custom-error";
import { Subscription } from "rxjs";
import { AppService } from "../../global/app.service";

@Component({
  selector: 'app-custom-error',
  templateUrl: './custom-error.component.html',
  styleUrls: ['./custom-error.component.css']
})
export class CustomErrorComponent implements OnInit, OnDestroy {

  error: CustomError | null = null;
  // error: CustomError | null = { message: "This is a test error", httpStatus: HttpStatusCode.InternalServerError,
  // status: 200, timestamp: new Date()};
  errorSubscription = new Subscription();

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.errorSubscription = this.appService.customError.subscribe( value => {
      this.error = value;
    });
  }

  cancelError() {
    this.appService.customError.next(null);
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

}
