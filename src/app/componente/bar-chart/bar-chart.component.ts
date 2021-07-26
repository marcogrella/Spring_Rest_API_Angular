import { UsuarioService } from 'src/app/service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})


export class BarChartComponent implements OnInit {


  constructor(private usuarioService : UsuarioService) { }



  ngOnInit(): void {
   this.usuarioService.carregarGrafico().subscribe (data => {

    /* nomes carrega. */
    this.lineChartLabels = data.nomes.split(",");

    /* carrega os salários */
    var arraySalarios = JSON.parse('[' + data.salarios + ']');
    console.log(arraySalarios);

    this.lineChartData = [
      { data: arraySalarios, label: 'Salários: ' },
     ];


  });


  }

  public lineChartData = [
    { data: [], label: 'Salários: ' },

  ];

  public lineChartLabels!: Label[];

  public lineChartOptions: (ChartOptions & { annotation?: any }) = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(51,107,135,0.8)',
    },
  ];

  public lineChartLegend = true;
  public lineChartType : ChartType = 'bar';
  public lineChartPlugins = [];





}
