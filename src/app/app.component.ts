import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AppComponent {
  title = "calix-input-app";
  myForm: FormGroup;
  inputValue: any;
  inputValueFromInputChanged: any;
  dateValue: any;
  isFormSubmitted = false;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      birth: ['', []]
    });

    this.myForm.valueChanges.subscribe(res => {
      console.log(this.myForm.valid)
      console.log(this.myForm.value)
    })
  }

  setErrorMessage() {
    return this.myForm.get('email')?.hasError('required') ? 'You must enter a value' :
      this.myForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  setNameMessage() {
    return this.myForm.get('name')?.hasError('required') ? 'You must enter a value' : '';
  }


  onValueChanged($event: any) {
    console.log($event)
    this.inputValueFromInputChanged = $event
  }

  onSubmit() {
    this.isFormSubmitted = true;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

}
