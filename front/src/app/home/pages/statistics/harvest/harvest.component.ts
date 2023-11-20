import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { HomeService } from '../../../home.service';

@Component({
  selector: 'app-harvest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './harvest.component.html',
  styleUrl: './harvest.component.scss'
})
export class HarvestComponent implements OnInit {

  harvests: any = [];
  myChart: Chart | null = null;

  constructor(private serHome: HomeService){}

  ngOnInit(): void {
    this.getAllHarvests()
  }

  getAllHarvests(){
    this.serHome.getAllHarvests().subscribe((res: any) => {
      this.harvests= res;
      console.log(res);
      this.chart()
    });
  }

  chart(){
    const ctx: HTMLButtonElement | null | any = document.getElementById('michart1') as HTMLCanvasElement;
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.getHarvests(),
        datasets: [{
          label: 'Cultivos más sembrados actualmente',
          data: this.getData(),
          backgroundColor: 'rgb(241, 207, 105)',
          borderColor: 'rgb(241, 207, 105)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

  getHarvests(): string[] {
  
    const harvestsAgrupadas: string[] = [];
  
      this.harvests.forEach((harvest: any) => {
        harvestsAgrupadas.push(`${harvest.code_harvest} - ${harvest.name_harvest}`)
      });  
    return harvestsAgrupadas;
  }

  getData(): number[] {
    const dataAgrupadas: number[] = [];
  
      this.harvests.forEach((municipality: any) => {
       dataAgrupadas.push(municipality.hectares)
      });  
    return dataAgrupadas;
  }

}
