import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import {
  forwardRef
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'calix-input',
  templateUrl: './calix-input.component.html',
  styleUrls: ['./calix-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CalixInputComponent),
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CalixInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class CalixInputComponent implements ControlValueAccessor, Validator, OnChanges {

  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() error: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() validators: any[];
  @Input() readonly: boolean = false;
  @Input() infoText?: string;
  @Input() isFormSubmitted = false;
  @Output() valueChanged = new EventEmitter<string | number>();



  private _innerValue: string | number;
  private _value: string | number;
  private _prefix: string = 'calix-';
  isTouched: boolean = false;
  isValidationInProgress: boolean = false;
  isValid: boolean = true;
  isBlurred: boolean = false;

  onChange: any = () => { };
  onTouched: any = () => { };
  
  constructor() { }

  get value(): string | number {
    return this._value;
  }

  set value(val: string | number) {
    this._value = val;
    if (this.isTouched) {
      this.validate();
    }
    this.onChange(val);
    this.onTouched();
  }

  ngOnChanges(changes: any): void {
    if (changes.label || changes.hint || changes.errorMessage) {
      this.validate();
    }
    if (changes.isFormSubmitted?.currentValue && this.isFormSubmitted) {
      this.validate();
      this.isTouched = true;
      this.isBlurred = true;
    }
  }

  writeValue(value: any): void {
    if (value !== undefined && value) {
      this._innerValue = value && value != "" ? this._prefix + value : value;
      this._value = value;
      setTimeout(() => {
        this.valueChanged.emit(this._innerValue);
        this.onChange(this._innerValue);
        this.onTouched();
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: any): void {
    this.isTouched = true;
    this._innerValue = event.target.value && event.target.value != "" ? this._prefix + event.target.value : event.target.value;
    this.valueChanged.emit(this._innerValue);
    this.onChange(this._innerValue);
    this.onTouched();
  }

  validate(control: any = null): ValidationErrors | null {
    if (!control || this.isValidationInProgress) return null;

    this.isValidationInProgress = true;
    const allValidators = this.validators ? [...this.validators] : [];
    
    if (this.required || (!allValidators.some(validator => validator === Validators.required) && this.required)) {
      allValidators.unshift(Validators.required);
    }

    if (allValidators && allValidators.length > 0) {

      const errors = allValidators
        .filter(validator => validator !== null)
        .map(validator => validator(control))
        .reduce((acc, current) => ({ ...acc, ...current }), {});

      if (errors && errors?.required) {
        this.required = true;
      }
      this.isValidationInProgress = false;
      this.isValid = Object.keys(errors).length === 0;

      return this.isValid ? null : errors;
    }

    this.isValidationInProgress = false;
    this.isValid = true;
    return null;
  }

  onBlur() {
    this.isBlurred = true;
    this.isTouched = true;
    this.onTouched();
  }

}
