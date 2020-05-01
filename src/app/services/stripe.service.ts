/**
 * Title: services/stripe.service.ts
 * Author: Nathaniel Liebhart
 * Description: Stripe payment service
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private http: HttpClient) {}

  // Send Stripe token & charge amount to server
  sendToken(chargeAmount: number, token: string) {
    return this.http.post(`${apiUrl}/payment`, { amount: chargeAmount, stripeToken: token });
  }
}
