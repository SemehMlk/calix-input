import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Configuration, ConfigurationBuilder } from 'projects/calix-input/src/lib/comparaison-table/configuration-builder';

interface ObjectA {
  field1: string;
  field2: string;
  field3: string;
  field4: Obj
}

interface Obj{
  name: string;
  age: number;
}

interface ObjectB {
  propA: string;
  propB: string;
  propC: string;
}

interface MyObject {
  field1: string;
  field2: string;
  field3: string;
}

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
  readOnlyInputValue: string = 'Initial';
  isFormSubmitted = false;

  referenceObject: ObjectA = {
    field1: "hello",
    field2: "test",
    field3: "tata",
    field4: {
      name: "Tom",
      age: 20
    }
  }

  compared: ObjectA = {
    field1: "hello",
    field2: "test",
    field3: "toto",
    field4: {
      name: "Alex",
      age: 20
    }
  }

  conf = new ConfigurationBuilder()
    .withField("field1", "Field 1", (a: any, b: any) => a.length === b.length)
    .withField("field2", "Field 2", (a, b) => a === b)
    .withField("field3", "Field 3", (a, b) => a === b)
    .withField("field4", "Field 4", (a, b) => a.name == b.name, (a) => a.name)
    .build();

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
