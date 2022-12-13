import {Component, OnInit} from '@angular/core';
import {CountdownService} from "../../service/countdown.service";
import {map, Observable} from "rxjs";

const TWENTY_EIGHT_DAYS_TO_SECONDS = 2419200;

@Component({
  selector: 'app-monthly-countdown',
  templateUrl: './monthly-countdown.component.html',
  styleUrls: ['./monthly-countdown.component.scss']
})
export class MonthlyCountdownComponent implements OnInit {

  $seconds!: Observable<number>;

  constructor(private countdownService: CountdownService) { }

  ngOnInit () {
    this.$seconds = this.countdownService.loadCountdownTimers()
        .pipe(
            map((data) => {
              const pastTime = Math.round(Date.now() / 1000) - data[0].monthly;
              return TWENTY_EIGHT_DAYS_TO_SECONDS - pastTime;
            })
        );

  }
}
