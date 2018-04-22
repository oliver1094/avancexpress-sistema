import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class TrafficChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }


  getData() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    return [
      {
        value: 1,
        color: '#209e91',
        highlight: colorHelper.shade('#209e91', 15),
        label: 'Pagos',
        percentage: 87,
        order: 1,
      }, {
        value: 3,
        color: '#bfc9ca',
        highlight: colorHelper.shade('#bfc9ca', 15),
        label: 'Pagos pendientes',
        percentage: 22,
        order: 4,
      }
    ];
  }
}
