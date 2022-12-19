import {Component} from '@angular/core';
import {CountdownService} from "../../service/countdown.service";
import {map, Observable} from "rxjs";

const THIRTY_DAYS_TO_SECONDS = 2419200;
const THIRTY_MINS_TO_SECONDS = 1800;

@Component({
  selector: 'app-monthly-countdown',
  templateUrl: './monthly-countdown.component.html',
  styleUrls: ['./monthly-countdown.component.scss']
})
export class MonthlyCountdownComponent {

  $seconds: Observable<any> = this.countdownService.loadCountdownTimers()
      .pipe(
          map((data) => {
              const pastTime = Math.round(Date.now() / 1000) - data[0].monthly;
              let remainingTime = THIRTY_DAYS_TO_SECONDS - pastTime;

              if (remainingTime < 0) {
                  remainingTime = THIRTY_MINS_TO_SECONDS + remainingTime;

                  return {
                      season: false,
                      remainingTime
                  }
              }

              return {
                  season: true,
                  remainingTime
              };
          })
      );

  constructor(private countdownService: CountdownService) { }

}
