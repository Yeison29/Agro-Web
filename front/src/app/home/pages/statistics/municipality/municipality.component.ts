import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { HomeService } from '../../../home.service';

@Component({
  selector: 'app-municipality',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './municipality.component.html',
  styleUrl: './municipality.component.scss'
})
export class MunicipalityComponent implements OnInit {

  municipalities: any = [];
  myChart: Chart | null = null;

  constructor(private serHome: HomeService){}

  ngOnInit(): void {
    this.getAllHarvestMunicipality();
  }

  getAllHarvestMunicipality(){
    this.serHome.getAllHarvestMunicipality().subscribe((res: any) => {
      this.municipalities= res;
      this.chart()
    });
  }

  chart(){
    const ctx: HTMLButtonElement | null | any = document.getElementById('michart') as HTMLCanvasElement;
    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.getMunicipalities(),
        datasets: [{
          label: 'Hectareas',
          data: this.getData(),
          backgroundColor: [
            'rgba(1,125,63,1)',
            'rgb(54, 162, 235)',
            'rgb(241, 207, 105)',
            'rgb(255, 128, 0)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Cultivos más sembrados por municipios',
          },
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

  getMunicipalities(): string[] {
  
    const municipalitiesAgrupadas: string[] = [];
  
      this.municipalities.forEach((municipality: any) => {
        municipalitiesAgrupadas.push(`${municipality.name_municipality} - ${municipality.name_harvest}`)
      });  
    return municipalitiesAgrupadas;
  }

  getData(): number[] {
    const dataAgrupadas: number[] = [];
  
      this.municipalities.forEach((municipality: any) => {
       dataAgrupadas.push(municipality.total_hectares)
      });  
    return dataAgrupadas;
  }
}
