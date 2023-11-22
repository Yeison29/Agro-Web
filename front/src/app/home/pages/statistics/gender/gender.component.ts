import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { HomeService } from '../../../home.service';

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.scss',
})
export class GenderComponent implements OnInit {
  genders: any = [];

  constructor(private serHome: HomeService) {}

  ngOnInit(): void {
    this.getAllGenders();
  }

  getAllGenders() {
    this.serHome.getGenders().subscribe((res: any) => {
      this.genders = res;
      this.chart();
    });
  }

  chart() {
    const ctx: HTMLButtonElement | null | any = document.getElementById(
      'michart2'
    ) as HTMLCanvasElement;

    const gendersAgrupadas: string[] = [];

    this.genders.forEach((gender: any) => {
      gendersAgrupadas.push(`${gender.code_gender} - ${gender.name_gender}`);
    });

    const dataAgrupadas: number[] = [];

    this.genders.forEach((gender: any) => {
      dataAgrupadas.push(gender.count);
    });

    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: gendersAgrupadas,
        datasets: [
          {
            label: 'cantidad',
            data: dataAgrupadas,
            backgroundColor: [
              'rgba(26,55,63,1)',
              'rgb(241, 20, 105)',
              'orange',
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
            text: 'Generos que se dedican a la agricultura',
          },
        },
      },
    });
  }
}
