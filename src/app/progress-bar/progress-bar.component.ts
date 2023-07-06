import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass']
})
export class ProgressBarComponent implements OnInit, OnDestroy {

  progressWidth: number = 0;
  private interval: any;

  ngOnInit() {
    this.progressWidth = 0;
    this.startProgressBar();
  }

  startProgressBar() {
    this.interval = setInterval(() => {
      const pageWidth = window.innerWidth;
      const progressBarWidth = 300;

      if (progressBarWidth >= pageWidth) {
        this.stopProgressBar();
      } else {
        this.progressWidth += 1;
      }
    }, 1000);
  }

  stopProgressBar() {
    clearInterval(this.interval);
  }

  ngOnDestroy() {
    this.stopProgressBar();
  }

}
