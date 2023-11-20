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
      console.log(res);
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
          label: 'Cultivo mas sembrada en los municipios',
          data: this.getData(),
          backgroundColor: 'rgba(1,125,63,1)',
          borderColor: 'rgba(1,125,63,1)',
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
