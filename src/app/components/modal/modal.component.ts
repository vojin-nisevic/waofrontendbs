import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AppService } from "../../global/app.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {

  message: string = null;
  modalMessageSubscription: Subscription;
  @ViewChild('btnModal', {static: false}) btn: ElementRef;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.modalMessageSubscription = this.appService.modalMessage.subscribe(value => {
      this.message = value;
    });

  }

  //deletes message in global service after user confirms that he saw the message
  cancelMessage(){
    this.appService.modalMessage.next(null);
  }

  ngOnDestroy(): void {
    this.modalMessageSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (!!this.message){
        this.btn.nativeElement.click();
    }
  }

}
