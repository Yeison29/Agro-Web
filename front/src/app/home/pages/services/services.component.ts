import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  datos = [
      {
        "initial_week": 45,
        "final_week": 47,
        "weeks": [
          {
            "week": 46,
            "initial_month": 11,
            "final_month": 11,
            "initial_year": 2023,
            "final_year": 2023,
            "total_hectares": 0.7
          },
          {
            "week": 47,
            "initial_month": 11,
            "final_month": 11,
            "initial_year": 2023,
            "final_year": 2023,
            "total_hectares": 0.7
          }
        ]
      },
      {
        "initial_week": 52,
        "final_week": 3,
        "weeks": [
          {
            "week": 52,
            "initial_month": 12,
            "final_month": 12,
            "initial_year": 2023,
            "final_year": 2023,
            "total_hectares": 0.7
          },
          {
            "week": 1,
            "initial_month": 1,
            "final_month": 1,
            "initial_year": 2024,
            "final_year": 2024,
            "total_hectares": 0.7
          },
          {
            "week": 2,
            "initial_month": 1,
            "final_month": 1,
            "initial_year": 2024,
            "final_year": 2024,
            "total_hectares": 0.7
          },
          {
            "week": 3,
            "initial_month": 1,
            "final_month": 1,
            "initial_year": 2024,
            "final_year": 2024,
            "total_hectares": 0.7
          }
        ]
      },
      {
        "initial_week": 44,
        "final_week": 46,
        "weeks": [
          {
            "week": 46,
            "initial_month": 11,
            "final_month": 11,
            "initial_year": 2023,
            "final_year": 2023,
            "total_hectares": 1.5
          }
        ]
      }
  ];

  ngOnInit() {
    this.crearGrafica();
  }

  crearGrafica() {
    const ctx = document.getElementById('miGrafica') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.obtenerSemanas(),
        datasets: [{
          label: 'Producción de Hectáreas',
          data: this.obtenerProduccion(),
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  obtenerSemanas(): string[] {
    const semanasAgrupadas: string[] = [];
    let cont=0;

    this.datos.forEach(grupo => {
      grupo.weeks.forEach(semana => {
        for (let i = 0; i <= this.datos.length; i++) {
          for (let j = i; j <= this.datos.length; j++) {
            if(i!=j){
              if(grupo.weeks[i].week === grupo.weeks[i+1].week){
                semanasAgrupadas.push(`${semana.initial_year}-${semana.initial_month}-${i}`);
            }
          }
        }
      }});
    });

    return semanasAgrupadas;
  }

  obtenerProduccion(): number[] {
    const produccionPorSemana: { [key: string]: number } = {};

    this.datos.forEach(grupo => {
      grupo.weeks.forEach(semana => {
        for (let i = grupo.initial_week; i <= grupo.final_week; i++) {
          const key = `${semana.initial_year}-${semana.initial_month}-${i}`;
          produccionPorSemana[key] = (produccionPorSemana[key] || 0) + semana.total_hectares;
        }
      });
    });

    return this.obtenerSemanas().map(semana => produccionPorSemana[semana] || 0);
  }
}
