import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appRequiredMarker]'
})
export class RequiredMarkerDirective implements OnChanges {
  @Input() required: boolean;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: any): void {
    if (changes.required) {
      this.updateLabel();
    }
  }

  private updateLabel(): void {
    const labelElementContainer = this.el.nativeElement.previousElementSibling;
     if(labelElementContainer && labelElementContainer.id){
      const labelElement = labelElementContainer.firstChild;

      if (labelElement && labelElement.tagName === 'LABEL' && labelElement.innerText != '') {
        if (this.required) {
          labelElement.innerHTML += ' <span>*</span>';
        } else {
          labelElement.innerHTML = labelElement.innerHTML.replace(' <span>*</span>', '');
        }
      }
     }
  }
}