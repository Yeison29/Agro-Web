import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { HomeService } from '../../../home.service';

@Component({
  selector: 'app-age',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './age.component.html',
  styleUrl: './age.component.scss',
})
export class AgeComponent implements OnInit {
  ages: any = [];

  constructor(private serHome: HomeService) {}

  ngOnInit(): void {
    this.getRangeAges();
  }

  getRangeAges() {
    this.serHome.getRangeAges().subscribe((res: any) => {
      this.ages = res;
      this.chart();
    });
  }

  chart() {
    const ctx: HTMLButtonElement | null | any = document.getElementById(
      'michart3'
    ) as HTMLCanvasElement;

    const agesAgrupadas: string[] = [];

    this.ages.forEach((age: any) => {
      agesAgrupadas.push(`${age.range_age} años`);
    });

    const dataAgrupadas: number[] = [];

    this.ages.forEach((age: any) => {
      dataAgrupadas.push(age.count);
    });

    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: agesAgrupadas,
        datasets: [
          {
            label: 'cantidad',
            data: dataAgrupadas,
            backgroundColor: [
              'rgba(1,125,63,1)',
              'rgb(54, 162, 235)',
              'rgb(241, 207, 105)',
              'rgb(255, 128, 0)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Rangos de edades que se dedican a la agricultura',
          },
        },
      },
    });
  }
}
