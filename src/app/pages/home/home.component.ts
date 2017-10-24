import { Component, OnInit, NgModule } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})

export class Home implements OnInit {

  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value1 = 500;
  vertical = false;
  dateBefore: any;
  dateAfter: any;
  nomina: any;
  comision: any;
  interes: any;
  iva: any;
  total: any;
  myDatePickerOptions: IMyDpOptions;


// Initialized to specific date (09.10.2018).
public model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor() { }

  ngOnInit() {
    this.nomina = 0;
    this.comision = 0;
    this.interes = 0;
    this.iva = 0;
    this.total = 0;
    const date = new Date();
    const dateAfter = new Date();
    dateAfter.setDate(dateAfter.getDate() + 47);
    console.log(dateAfter);
    date.setDate(date.getDate() + 48);
    console.log(date);
    this.myDatePickerOptions = {
      dateFormat: 'yyyy-mm-dd',
      showTodayBtn: true,      
      disableUntil: {
        year: dateAfter.getFullYear(),
        month: dateAfter.getMonth() + 1,
        day: dateAfter.getDate()
      },
    };
  }

  selectedValue(object) {
    console.log(object);
  }
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }

  set value(n) {
    console.log(n);
    this.value1 = Number(n);
  }
  get value(): number | null {
    console.log(this.value1);
    return this.value1 ? this.value1 : null;
  }

  onInputChange(event: any) {
    console.log(event.from);
    this.nomina = event.from;
    this.comision = this.nomina * .1;
    this.interes = this.nomina * .1;
    this.iva = this.comision * .16;
    this.total = this.nomina + this.comision + this.interes + this.iva;
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


  // tslint:disable-next-line:member-ordering
  private _tickInterval = 1;

}
