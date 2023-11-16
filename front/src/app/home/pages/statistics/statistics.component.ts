import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../public/header/header.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
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
      type: 'bubble',
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
    const semanasAgrupadas: string[] = ['2002-01-01', '2002-01-08'];
    

    return semanasAgrupadas;
  }

  obtenerProduccion(): number[] {
    const produccionPorSemana: number[] = [2, 4];

    return produccionPorSemana;
  }
}