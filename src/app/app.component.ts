import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'waofrontendbs';

  @ViewChild('sideBar') el: HTMLDivElement;
  @ViewChild('content') content: HTMLDivElement;

  barWidth: number = 0;
  contentWidth: number = 0;

  openSideBar() {
    this.barWidth = 250;
    this.contentWidth = 250;
  }

  closeSideBar() {
    this.barWidth = 0;
    this.contentWidth = 0;
  }
}
