import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.page.html',
  styleUrls: ['./rapport.page.scss'],
})
export class RapportPage implements OnInit {
  @ViewChild('depenseChart') depenseChartElt;
  @ViewChild('repartitionDepenseChart') repartitionDepenseChartElt;

  depenseChart: any;
  repartitionDepenseChart: any;
  colorArray: any;
  
  constructor(){
    Chart.register(...registerables);
 }

  ngOnInit() {
  }
  

  ionViewDidEnter() {
    this.createChart('depense');
    this.createChart('repartition_depense');
  }

  createChart(type: string) {
    let nativeElement = '';
    let title = '';
    let typeChart: string = '';
    let typeChartVar: any = '';
    if (type === 'depense') {
      nativeElement = this.depenseChartElt.nativeElement;
      typeChart = 'bar';
      typeChartVar = this.depenseChart;
      title = 'Evolution des dépenses du mois';
    }else if(type === 'repartition_depense') {
      nativeElement = this.repartitionDepenseChartElt.nativeElement;
      typeChart = 'radar';
      typeChartVar = this.repartitionDepenseChart;
    }
    
    // `${typeChart}`
    typeChartVar = new Chart(nativeElement, {
      // type: getProperty(ChartTypeRegistry, 'bar'),
      type: "bar",
      data: {
        labels: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
        datasets: [{
          label: title,
          data: [2.5, 2.8, 5, 6.9, 6.9, 7.5, 10, 12],
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
