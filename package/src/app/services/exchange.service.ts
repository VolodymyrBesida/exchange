import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRateService {
  private baseUrl = 'https://api.exchangerate-api.com/v4/latest/';
  private fixedNumbers: number = 2;

  constructor(private http: HttpClient) {}

  getExchangeRateFrom(from: string) {
    return this.http.get<any>(this.baseUrl + from.toUpperCase());
  }

  getFixedRate(rate: number) {
    return +(rate).toFixed(this.fixedNumbers);
  }
}