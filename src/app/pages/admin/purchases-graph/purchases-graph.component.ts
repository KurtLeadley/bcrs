import { Component, OnInit } from '@angular/core';
import {HttpClient,  HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { GraphService } from '../../../services/graph.service';
import { InvoiceService } from '../../../services/invoice.service';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { pipe } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
  selector: 'app-purchases-graph',
  templateUrl: './purchases-graph.component.html',
  styleUrls: ['./purchases-graph.component.scss']
})
export class PurchasesGraphComponent implements OnInit {
  productInfo: any
  service: any
  token: string
  aggregates: any
  aggregate: any

  //for barchart
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  //chart events
  public chartClicked(e:any):void {
    console.log(e);
  }
    public chartHovered(e:any):void {
    console.log(e);
  }

   //chart columns and data
   barChartLabels:string[] = ['Password Resets', 'Spyware Removals',
  'Ram Upgrades', 'Software Installs', 'Tune Ups', 'Cleaned Keyboards',
  'Cleaned Disks', 'Total $ x 10'];

  //chart data copy before messing with it
  public barChartData:any[] = [
    {data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Units Sold'}
  ];

  constructor(public invoiceService: InvoiceService) {
    this.invoiceService.getInvoicesForGraph().subscribe( data =>{
     this.service=data
    });

    this.invoiceService.getInvoicesForGraph().subscribe( res=>{
      this.barChartData= [ res[0]['passwordCount'], res[0]['spyCount'],
      res[0]['ramCount'], res[0]['softwareCount'], res[0]['tuneCount'],
      res[0]['keyboardCount'], res[0]['diskCount'], res[0]['total']] ;
    },
    err =>{

    });
   }

  ngOnInit(): void {


  }

}
