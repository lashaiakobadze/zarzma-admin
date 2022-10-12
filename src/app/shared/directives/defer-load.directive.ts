import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Directive({
  selector: '[uiDefer]',
})
export class DeferLoadDirective implements AfterViewInit {
  @Output() uiDeferShow: EventEmitter<void> = new EventEmitter();

  @Output() uiDeferHide: EventEmitter<void> = new EventEmitter();

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  private checkForIntersection = (
    entries: IntersectionObserverEntry[]
  ): void => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (this.checkIfIntersecting(entry)) {
        this.uiDeferShow.emit();
      } else {
        this.uiDeferHide.emit();
      }
    });
  };

  private checkIfIntersecting(entry: IntersectionObserverEntry): boolean {
    return entry.isIntersecting && entry.target === this.el.nativeElement;
  }

  ngAfterViewInit(): void {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const config = {
      rootMargin: '1000px 0px 100px 0px',
      threshold: 0,
    };

    this.observer = new IntersectionObserver((entries) => {
      this.checkForIntersection(entries);
    }, config);

    this.observer.observe(this.el.nativeElement);
  }
}
