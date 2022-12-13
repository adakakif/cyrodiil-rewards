import {Component, Input, OnInit} from '@angular/core';
import {interval, map, Observable} from "rxjs";
import {Timer} from '../../models/timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  @Input()
  secondsInput!: number;
  counter!: number;

  $timerContainer: Observable<Timer> = interval(1000).pipe(
      map(() => {
        const tempSeconds = this.counter;

        const days = this.pad(Math.floor(tempSeconds / (3600 * 24)));
        const hours = this.pad(Math.floor(tempSeconds % (3600 * 24) / 3600));
        const minutes = this.pad(Math.floor(tempSeconds % 3600 / 60));
        const seconds = this.pad(Math.floor(tempSeconds % 3600 % 60));

        this.counter--;

        return {
          days,
          hours,
          minutes,
          seconds
        };
      })
  );

  ngOnInit () {
    this.counter = this.secondsInput;

  }

  //Ex: '1' to '01'
  pad (number: number) {
    return (number < 10) ? '0' + number.toString() : number.toString();

  }

}