import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-datafigures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datafigures.component.html',
  styleUrl: './datafigures.component.scss'
})
export class DatafiguresComponent implements AfterViewInit,OnInit {

  @ViewChildren('timerElement') timerElements!: QueryList<ElementRef>;

  count: any = []

  constructor(private serHome: HomeService){}

  ngOnInit(): void {
    this.serHome.countHome().subscribe((res: any) => {
      this.count = res;
    });
  }

  ngAfterViewInit(): void {
    this.initCountTo();
  }

  initCountTo(): void {
    this.timerElements.forEach(timerElement => {
      this.countTo(timerElement.nativeElement);
    });
    if (typeof document !== 'undefined'){
      const funFactElements = document.querySelectorAll('.fun-fact');
      this.addAppearListener(funFactElements, () => {
        this.timerElements.forEach(timerElement => {
          this.countTo(timerElement.nativeElement);
        });
      });
    }
  }

  countTo(element: HTMLElement | null): void {
    const safeElement = element || document.createElement('div');
  
    const targetAttr = safeElement.getAttribute('data-to');
    const speedAttr = safeElement.getAttribute('data-speed');
  
    const target = targetAttr !== null ? +targetAttr : 0;
    const speed = speedAttr !== null ? +speedAttr : 5000; // Valor predeterminado si data-speed no está presente
    const duration = speed / 1000;
  
    let current = 0;
    const step = target / (duration * 60);
  
    const interval = setInterval(() => {
      current += step;
      safeElement.textContent = Math.round(current).toString();
  
      if (current >= target) {
        safeElement.textContent = target.toString();
        clearInterval(interval);
      }
    }, 1000 / 60);
  }
  
  addAppearListener(elements: NodeListOf<Element>, callback: () => void): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(element => observer.observe(element));
  }
}