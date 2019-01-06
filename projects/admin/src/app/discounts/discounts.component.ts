import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount.service';
import { Discount } from 'src/app/model/discount';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

  discountList: Discount[];

  constructor(
    private discountService: DiscountService
  ) { }

  ngOnInit() {    
    this.discountService.getDiscounts().subscribe((discounts) => {
      this.discountList = discounts;
    });
  }

  removeDiscount(discount) {
    this.discountService.removeDiscount(discount);
  }
}
