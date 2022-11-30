import {
  AfterContentChecked, AfterContentInit,
  AfterViewInit,
  Component, DoCheck,
  ElementRef, Input, OnChanges,
  OnDestroy,
  OnInit, SimpleChanges,
  ViewChild,
} from '@angular/core';
import { AppService } from "../../global/app.service";
import { Subscription } from "rxjs";
import { ModalMessage } from "../../models/modal-message";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy, DoCheck{

  message: ModalMessage = null;
  messageToShow: string = '';
  modalMessageSubscription = new Subscription();
  @ViewChild('btnModal', { static: false }) btn: ElementRef;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.modalMessageSubscription = this.appService.modalMessage.subscribe({
      next: value => {
        this.message = value;
      }
    });
  }

  //deletes message in global service after user confirms that he saw the message
  cancelMessage() {
    this.appService.modalMessage.next(null);
    this.message = null;
  }

  ngOnDestroy(): void {
    this.modalMessageSubscription.unsubscribe();
  }


  ngDoCheck(): void {
    if (!!this.message) {
      // console.log(this.message.message + ': do check');
      this.btn.nativeElement.click();
      this.messageToShow = this.message.message;
      this.message = null;
    }
  }

}
