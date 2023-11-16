import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../public/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatFormFieldModule, MatSelectModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  datos = [
    [
      {
        "week": 46,
        "initial_year": 2023,
        "initial_month": 11,
        "total_hectares": 2.2
      },
      {
        "week": 47,
        "initial_year": 2023,
        "initial_month": 11,
        "total_hectares": 0.7
      },
      {
        "week": 52,
        "initial_year": 2023,
        "initial_month": 12,
        "total_hectares": 0.7
      },
      {
        "week": 1,
        "initial_year": 2024,
        "initial_month": 1,
        "total_hectares": 0.7
      },
      {
        "week": 2,
        "initial_year": 2024,
        "initial_month": 1,
        "total_hectares": 0.7
      },
      {
        "week": 3,
        "initial_year": 2024,
        "initial_month": 1,
        "total_hectares": 0.7
      }
    ]
  ];

  ngOnInit() {
    this.crearGrafica();
  }

  crearGrafica() {
    const ctx = document.getElementById('miGrafica') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.obtenerSemanas(),
        datasets: [{
          label: 'Producción de Hectáreas',
          data: this.obtenerProduccion(),
          backgroundColor: '#3c6a36',
          borderColor: 'rgba(75, 192, 192, 1)',
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
            text: 'Producción de Hectáreas por Semana'
          }
        },
        scales: {
          x: {
            type: 'category'
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  obtenerSemanas(): string[] {
    const today = new Date();
    const currentWeek = this.getWeekNumber(today);
  
    const semanasAgrupadas: string[] = [];
  
    let semanaEncontrada = false;
  
    this.datos.forEach(semanas => {
      semanas.forEach(dia => {
        const fecha = new Date(dia.initial_year, dia.initial_month - 1, dia.week);
        const semanaActual = this.getWeekNumber(fecha);
  
        if (semanaActual === currentWeek) {
          semanaEncontrada = true;
        }
  
        if (semanaEncontrada || semanaActual > currentWeek) {
          semanasAgrupadas.push(`${dia.initial_year}-${this.getMonthName(dia.initial_month)}-${dia.week}`);
        }
      });
    });
  
    return semanasAgrupadas;
  }

  obtenerProduccion(): number[] {
    const today = new Date();
    const currentWeek = this.getWeekNumber(today);
  
    const produccionPorSemana: number[] = [];
  
    let semanaEncontrada = false;
  
    this.datos.forEach(semanas => {
      semanas.forEach(dia => {
        const fecha = new Date(dia.initial_year, dia.initial_month - 1, dia.week);
        const semanaActual = this.getWeekNumber(fecha);
  
        if (semanaActual === currentWeek) {
          semanaEncontrada = true;
        }
  
        if (semanaEncontrada || semanaActual > currentWeek) {
          produccionPorSemana.push(dia.total_hectares);
        }
      });
    });
  
    return produccionPorSemana;
  }

  getWeekNumber(date: Date): number {
    const d = new Date(date.getFullYear(), 0, 1);
    const dayNum = date.getDate();
    const start = d.getDay() - 1;
    const dayOffset = (start < 4 ? start + 7 : start) + dayNum;
    return Math.floor(dayOffset / 7);
  }

  getMonthName(monthNumber: number): string {
    const months = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    return months[monthNumber - 1];
  }

  
}
