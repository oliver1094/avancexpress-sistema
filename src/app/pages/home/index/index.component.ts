import { Component, OnInit, NgModule, forwardRef, Injectable, AfterViewInit, HostListener } from '@angular/core';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ScrollSpyModule, ScrollSpyService } from 'ngx-scrollspy';
import { ClientService } from '../../../service/client.service';
import { ScrollEvent } from 'ngx-scroll-event';

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IndexComponent),
  multi: true
};
@Injectable()
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
  ]
})

export class IndexComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
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
  interesRate = .1;
  iva: any;
  total: any;
  isCupon = false;
  myDatePickerOptions: IMyDpOptions;
  isInicio = false;
  isRequisitos = false;
  isRecomp = false;
  isContact = false;
  isBeneficios = false;
  dias = 30;
  isCuponAplicado = true;
  isFirstTime = true;


  // Initialized to specific date (09.10.2018).
  public model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(private router: Router, private fb: FormBuilder, private scrollSpyService: ScrollSpyService,
    private clientService: ClientService) {
    this.form = fb.group({
      'payment_date': '',
      'before_nomina': ['', Validators.required],
      'comision': ['', Validators.required],
      'interes': ['', Validators.required],
      'iva': ['', Validators.required],
      'payment_total': ['', Validators.required],
      'cupon': '',
    });
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.nomina = 0;
    this.comision = 0;
    this.interes = 0;
    this.iva = 0;
    this.total = 0;
    const date = new Date();
    const dateAfter = new Date();
    //dateAfter.setDate(dateAfter.getDate() + 47);
    console.log(dateAfter);
    date.setDate(date.getDate() + 48);
    console.log(date);
    this.myDatePickerOptions = {
      dateFormat: 'yyyy-mm-dd',
      showTodayBtn: true,
      disableUntil: {
        year: dateAfter.getFullYear(),
        month: dateAfter.getMonth() + 1,
        day: dateAfter.getDate() - 1
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

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    this.form.controls['payment_date'].setValue(event.formatted);
    this.myDatePickerOptions = {
      dateFormat: 'yyyy-mm-dd',
      showTodayBtn: true,
    };
    console.log('asdad');
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.form.patchValue({
      payment_date: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  onChange(e: any): void {
    console.log(e.target.value);
    if (+e.target.value === 2) {
      this.dias = 45;
      this.interesRate = .15;
      this.interes = this.nomina * this.interesRate;
    } else {
      this.dias = 30;
      this.interesRate = .1;
      this.interes = this.nomina * this.interesRate;
    }
    this.total = this.nomina + this.comision + this.interes + this.iva;
  }

  onInputChange(event: any) {
    console.log(event.from);
    this.nomina = event.from;
    this.comision = this.nomina * .1;
    this.interes = this.nomina * this.interesRate;
    this.iva = (this.comision * .16) + (this.interes * .16);
    this.total = this.nomina + this.comision + this.interes + this.iva;
    this.form.controls['before_nomina'].setValue(event.from);
    this.form.controls['comision'].setValue(this.comision);
    this.form.controls['interes'].setValue(this.interes);
    this.form.controls['iva'].setValue(this.iva);
    this.form.controls['payment_total'].setValue(this.total);
    console.log(this.form.value);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  toPreRegister(): void {
    this.router.navigate(['register']);
  }

  onClick(e) {
    console.log(e.target.text);
  }

  click(e) {
    console.log('asdasdasdsadasasdasdasd');
  }

  aplyDesc() {
    console.log('click');
    console.log(this.form.value.cupon);
    this.clientService.aplyCupon(this.form.value.cupon).subscribe((res) => {
      console.log(res);
      if (res.data_cupon) {
        if (!this.isCupon && res.data_cupon[0] !== undefined) {
          console.log(res.data_cupon[0].porcentage_desc);
          const desc = res.data_cupon[0].porcentage_desc / 100;
          const descFull = this.total * desc;
          this.total = this.total - descFull;
          this.isCupon = true;
          this.isCuponAplicado = true;
          this.isFirstTime = false;
        } else {
          this.isCuponAplicado = false;
          this.isCupon = false;
        }
      } else {
        this.isCuponAplicado = false;
        this.isCupon = false;
      }
    });

  }

  public handleScroll(event: ScrollEvent) {
    console.log('scroll occurred', event.originalEvent);
    if (event.isReachingBottom) {
      console.log(`the user is reaching the bottom`);
    }
    if (event.isWindowEvent) {
      console.log(`This event is fired on Window not on an element.`);
    }

  }

  onScroll(event) {
    console.log(event);
    const scrollTop = event.path[0].scrollTop;
  }

  enterRequisitos() {
    this.isRequisitos = true;
    console.log('Track scroll enter is working!');
  }

  leaveRequisitos() {
    this.isRequisitos = false;
    console.log('Track scroll leave is working too!');
  }

  enterBeneficios() {
    this.isBeneficios = true;
    console.log('Track scroll enter is working!');
  }

  leaveBeneficios() {
    this.isBeneficios = false;
    console.log('Track scroll leave is working too!');
  }

  enterRecomp() {
    this.isRecomp = true;
    console.log('Track scroll enter is working!');
  }

  leaveRecomp() {
    this.isRecomp = false;
    console.log('Track scroll leave is working too!');
  }

  enterContact() {
    this.isContact = true;
    console.log('Track scroll enter is working!');
  }

  leaveContact() {
    this.isContact = false;
    console.log('Track scroll leave is working too!');
  }

  enterInicio() {
    this.isInicio = true;
    console.log('Track scroll enter is working!');
  }

  leaveInicio() {
    this.isInicio = false;
    console.log('Track scroll leave is working too!');
  }

  goRegister() {
    this.router.navigate(['home/register']);
  }


  // tslint:disable-next-line:member-ordering
  private _tickInterval = 1;

}
