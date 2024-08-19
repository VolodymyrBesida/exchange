import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Currencies } from 'src/app/helpers/currencies';
import { ExchangeRateService } from 'src/app/services/exchange.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;

  usdCost: number = 0;
  eurCost: number = 0;

  constructor(public dialog: MatDialog,
    private exchangeRateService: ExchangeRateService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    const usdRequest = this.exchangeRateService.getExchangeRateFrom(Currencies.USD);
    const eurRequest = this.exchangeRateService.getExchangeRateFrom(Currencies.EUR);

    forkJoin([usdRequest, eurRequest])
    .subscribe(([usdResponse, eurResponse]) => {
      this.usdCost = this.exchangeRateService.getFixedRate(usdResponse.rates?.UAH);
      this.eurCost = this.exchangeRateService.getFixedRate(eurResponse.rates?.UAH);
    })
  }
}
