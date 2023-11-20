import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InewItem } from '../news/Inews-items.metadata';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent implements AfterViewInit {

  @Input() items: InewItem[] = [];

  @ViewChildren('timerElement') timerElements!: QueryList<ElementRef>;

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

