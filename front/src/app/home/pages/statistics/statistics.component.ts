import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../public/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from '../../home.service';
import { MunicipalityComponent } from './municipality/municipality.component';
import { HarvestComponent } from './harvest/harvest.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MunicipalityComponent, HarvestComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  myChart: Chart | null = null;
  data: any = [];
  harvests: any = [];

  form = this.fb.group({
    harvest: [null, [Validators.required]]
  });

  constructor(private serHome: HomeService, private fb: FormBuilder){}

  ngOnInit() {
    this.getAllHarvest();
    this.crearGrafica();
  }

  crearGrafica() {
    const ctx: HTMLButtonElement | null | any = document.getElementById('miGrafica') as HTMLCanvasElement;
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.obtenerSemanas(),
        datasets: [{
          label: 'Producción de Hectáreas',
          data: this.obtenerProduccion(),
          backgroundColor: 'rgb(241, 207, 105)',
          borderColor: 'rgba(1,125,63,1)',
          borderWidth: 2,
          tension: 0.5,
          pointRadius: 5,
          pointHoverRadius: 8
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
  
    let weekFound = false;
      this.data.forEach((weeks: any) => {
        weeks.forEach((item: any) => {
          const date = new Date(item.initial_year, item.initial_month - 1, item.week);
          const weekCurrent = this.getWeekNumber(date);
    
          if (weekCurrent === currentWeek) {
            weekFound = true;
          }
    
          if (weekFound || weekCurrent > currentWeek) {
            semanasAgrupadas.push(`${item.initial_year}-${this.getMonthName(item.initial_month)}; sem: ${item.week}`);
          }
        });
      });  
    return semanasAgrupadas;
  }

  obtenerProduccion(): number[] {
    const today = new Date();
    const currentWeek = this.getWeekNumber(today);
  
    const produccionPorSemana: number[] = [];
  
    let weekFound = false;
  
    this.data.forEach((weeks: any) => {
      weeks.forEach((item: any) => {
        const date = new Date(item.initial_year, item.initial_month - 1, item.week);
        const weekCurrent = this.getWeekNumber(date);
  
        if (weekCurrent === currentWeek) {
          weekFound = true;
        }
  
        if (weekFound || weekCurrent > currentWeek) {
          produccionPorSemana.push(item.total_hectares);
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

  onChange(id: any){
    this.getWeeksService(id);
    if(this.myChart){
      this.myChart.destroy();
      this.data=[];
    }
  }

  getAllHarvest(){
    this.serHome.getAllHarvest().subscribe((res: any) => {
      this.harvests= res;
      console.log(res);
    });
  }

  getWeeksService(id: any){
    this.serHome.getWeeksService(id).subscribe((res: any) => {
      this.data=[res]
      this.crearGrafica();
    });
  }
}