import { Component } from '@angular/core';
import {CountdownService} from "../../service/countdown.service";
import {map, Observable} from "rxjs";

const SEVEN_DAYS_TO_SECONDS = 604800;

@Component({
  selector: 'app-weekly-countdown',
  templateUrl: './weekly-countdown.component.html',
  styleUrls: ['./weekly-countdown.component.scss']
})
export class WeeklyCountdownComponent {

  $seconds: Observable<any> = this.countdownService.loadCountdownTimers()
      .pipe(
          map((data) => {
            const pastTime = Math.round(Date.now() / 1000) - data[0].weekly;
            let remainingTime = SEVEN_DAYS_TO_SECONDS - pastTime;

            console.log(remainingTime);

            return remainingTime;
          })
      );

  constructor(private countdownService: CountdownService) { }

}
