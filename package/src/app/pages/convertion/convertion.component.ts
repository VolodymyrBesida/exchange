import { CommonModule } from "@angular/common";
import { Component, ViewEncapsulation } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatChip } from "@angular/material/chips";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatListOption, MatSelectionList } from "@angular/material/list";
import { MatOption, MatSelect } from "@angular/material/select";
import { Currencies } from "src/app/helpers/currencies";
import { ExchangeRateService } from "src/app/services/exchange.service";

@Component({
    selector: 'app-convertion',
    templateUrl: './convertion.component.html',
    styleUrl: './convertion.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatCardModule,
        MatSelectionList,
        MatListOption,
        MatLabel,
        MatFormField,
        MatSelect,
        MatOption,
        MatButtonModule,
        MatInput,
        FormsModule,
        MatChip,
        CommonModule
    ]
  })

export class AppConvertionComponent {
    currencies = Currencies;
    currentDate: string | null = null;
    
    selectedFrom: string = this.currencies.UAH;
    selectedTo: string = this.currencies.UAH;

    amountToExchange: number = 0;
    exchangedResult: number | null = null;

    private rate: any = 1;
    
    constructor(private exchangeRateService: ExchangeRateService) {
        this.currentDate = this.getDate();
    }

    exchange() {
        this.toTriggered();
    }

    fromTriggered(currencyCode: string) {
        this.exchangeRateService.getExchangeRateFrom(currencyCode)
        .subscribe(resp => this.proceedExchange(this.selectedTo, resp));
    }

    toTriggered() {
        this.exchangeRateService.getExchangeRateFrom(this.selectedFrom)
        .subscribe(resp => this.proceedExchange(this.selectedTo, resp));
    }

    private proceedExchange(currencyCode: string, exchangeResponse: any) {
        this.rate = this.getRate(currencyCode, exchangeResponse.rates);
        this.exchangedResult = this.exchangeRateService.getFixedRate(this.amountToExchange * this.rate);
    }

    private getRate(currencyCode: string, exchangeResponse: any) {
        switch(currencyCode) {
            case this.currencies.UAH:
                return exchangeResponse?.UAH;
            case this.currencies.USD:
                return exchangeResponse?.USD;
            case this.currencies.EUR:
                return exchangeResponse?.EUR;
            default:
                return 1;
                        
        }
    }

    // if it will be used in different components, should create service or use moment js
    // didn't get moment js coz I'd like not to load so much libs
    private getDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        return `${day}.${month}.${year}`;
    }
}