import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { CalixInputComponent } from './calix-input.component';
import { RequiredMarkerDirective } from './directives/require-marker.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CalixInputComponent', () => {
  let component: CalixInputComponent;
  let fixture: ComponentFixture<CalixInputComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalixInputComponent, RequiredMarkerDirective],
      imports: [FormsModule, ReactiveFormsModule],
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalixInputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('#calixInput'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value on input', () => {
    const newValue = 'test';
    inputElement.nativeElement.value = newValue;
    inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
    fixture.detectChanges();

    expect(component.value).toBe(newValue);
  });

  it('should call onChange when input changes', () => {
    const spy = spyOn(component, 'onChange');
    const newValue = 'test';
    inputElement.nativeElement.value = newValue;
    inputElement.triggerEventHandler('input', { target: inputElement.nativeElement });
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(newValue);
  });

  it('should validate required input', fakeAsync(() => {
    component.required = true;
    inputElement.nativeElement.value = '';
    inputElement.triggerEventHandler('blur', {});
    fixture.detectChanges();
    tick();

    expect(component.isValid).toBe(true);
  }));


  it('should call onBlur method on input blur', () => {
    const spy = spyOn(component, 'onBlur');
    inputElement.triggerEventHandler('blur', {});
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should not display error message when there is no error', () => {
    component.error = '';
    component.isTouched = true;
    component.isBlurred = true;
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.error'));

    expect(errorElement).toBeFalsy();
  });

});
