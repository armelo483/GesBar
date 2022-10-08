import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.page.html',
  styleUrls: ['./rapport.page.scss'],
})
export class RapportPage implements OnInit {
  @ViewChild('depenseChart') depenseChartElt;
  @ViewChild('repartitionDepenseChart') repartitionDepenseChartElt;

  depenseChart: any;
  type: string;
  repartitionDepenseChart: any;
  colorArray: any;
  typeChart:  keyof ChartTypeRegistry;
  
  constructor(private crudService: CrudService){
    Chart.register(...registerables);
 }

  ngOnInit() {
  }
  

  ionViewDidEnter() {

    this.createChart('depense');
    // this.createChart('repartition_depense');
  }

 async  createChart(type: string) {
    let nativeElement;
    let title = '';
    let dataObj: {labels: any[], data: any[]} = {labels:[], data:[]}; // label here is the datetime for the time being for expenses
    let typeChartVar: any = '';
    this.type = type;
    if (type === 'depense') { 

      nativeElement = this.depenseChartElt.nativeElement;
      this.typeChart = 'bar';
      typeChartVar = this.depenseChart;
      let depenses = await this.crudService.read('lignedepense');
      depenses = depenses.filter(Boolean); 
      depenses.forEach(depense => {
        dataObj.labels.push(formatDate(depense.date, 'dd/MM/yyyy h:mm:ss a', 'fr-FR'));
        dataObj.data.push(depense.montant);
        console.log(dataObj);
      });
       
      title = 'Evolution des dépenses du mois';
      
    }else if(type === 'repartition_depense') {
      nativeElement = this.repartitionDepenseChartElt.nativeElement;
      this.typeChart = 'radar';
      typeChartVar = this.repartitionDepenseChart;
    }
    
    typeChartVar = new Chart(nativeElement, {
      type: this.typeChart,
      data: {
        labels: [...dataObj.labels],
        datasets: [{
          label: title,
          data: [...dataObj.data],
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
