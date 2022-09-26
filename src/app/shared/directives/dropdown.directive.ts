import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input() backgroundColor = '#fff';

  @HostBinding('class.open') isOpen = false;

  // @HostListener('click') toggleOpen(): void {
  //   this.isOpen = !this.isOpen;
  // }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseover')
  onMouseOver(): void {
    this.backgroundColor = '#fff';
    this.isOpen = true;
  }

  @HostListener('mouseout')
  onMouseOut(): void {
    this.backgroundColor =  '#000';
    this.isOpen = false;
  }
}
