# Calix Input Component Library

The Calix Input Component Library provides a customizable Angular input component with built-in validation and various features. This library is designed to be easily integrated into Angular applications, offering a sleek and functional input solution.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Events](#events)
- [Examples](#example)

## Installation

To install the Calix Input Component Library, use the following command:

```bash
npm install ng-calix-input
```

## Usage

1. Import `CalixInputComponentModule` into your Angular module:

    ```typescript
    import { CalixInputModule } from 'ng-calix-input';

    @NgModule({
      imports: [CalixInputModule],
      // ...
    })
    export class YourModule { }
    ```

2. Use the `calix-input` component in your templates:

    ```html
    <calix-input
      [label]="'Username'"
      [hint]="'Enter your username'"
      [type]="'text'"
      [placeholder]="'Username'"
      [required]="true"
      (valueChanged)="onValueChanged($event)"
    ></calix-input>
    ```

3. Customize the component by adjusting the available options:

   - **label** (string): Label for the input field.
   - **hint** (string): Hint text displayed below the input field.
   - **error** (string): Error message to be displayed when validation fails.
   - **type** (string): Input type (e.g., 'text', 'password').
   - **placeholder** (string): Placeholder text for the input field.
   - **required** (boolean): Indicates whether the input is required.
   - **validators** (array): Custom validators for the input.
   - **readonly** (boolean): Indicates whether the input is readonly.
   - **isFormSubmitted** (boolean): Used in a form, indicates whether the form has been submitted or not to mark input touched.
   - **infoText** (string): Additional information displayed as a tooltip.
   - **valueChanged** (EventEmitter): Event emitted when the input value changes.

4. Handle the `(valueChanged)` event to capture and respond to changes in the input value:

    ```typescript
    onValueChanged(newValue: string | number) {
      // Handle the changed value as needed
      console.log('New value:', newValue);
    }
    ```

### Example

```html
<calix-input
  [label]="'Email'"
  [hint]="'Enter your email address'"
  [type]="'email'"
  [placeholder]="'Email'"
  [required]="true"
  [validators]="[customValidator, anotherValidator]"
  (valueChanged)="onEmailChanged($event)"
></calix-input>
```

## Events

The `calix-input` component emits the following event:

- **valueChanged**: Emitted when the input value changes.

## Examples
#### with formControl
```html
<form [formGroup]="myForm">
  <calix-input
    [label]="'Email'"
    [hint]="'Enter your email address'"
    [infoText]="'info text'"
    [type]="'email'"
    [placeholder]="'Email'"
    [validators]="myForm.get('email')?.validator ? [myForm.get('email')?.validator] : []"
    [error]="setEmailErrorMessage()"
    formControlName="email"
  ></calix-input>
   <calix-input
    [label]="'Password'"
    [hint]="'Enter your password'"
    [type]="'password'"
    [placeholder]="'Password'"
    [validators]="myForm.get('password')?.validator ? [myForm.get('password')?.validator] : []"
    [error]="setPasswordErrorMessage()"
    formControlName="email"
  ></calix-input>
</form>
```
``` typescript
export class AppComponent  {
    myForm: FormGroup;
    // ...
   this.myForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
    // ...
  setEmailErrorMessage() {
    return this.myForm.get('email')?.hasError('required') ? 'You must enter a value' :
      this.myForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }
  setPasswordErrorMessage() {
    return this.myForm.get('password')?.hasError('required') ? 'You must enter a value' : '';
  }
}
```
#### with ngModel
```html
  <calix-input
    [label]="'Email'"
    [hint]="'Enter your email address'"
    [infoText]="'info text'"
    [type]="'email'"
    [placeholder]="'Email'"
    [required]="true"
    [(ngModel)]="inputValue"
  ></calix-input>

```
``` typescript
export class AppComponent  {
    inputValue: string;
    // ...
}
```
#### date type with (valueChanged)
```html
  <calix-input
    [label]="'Date'"
    [hint]="'Enter the date'"
    [infoText]="'info text'"
    [type]="'date'"
    [placeholder]="'Date'"
    (valueChanged)="onDateChanged($event)"
  ></calix-input>

```
``` typescript
export class AppComponent  {
    dateValue: string;
    // ...

    onValueChanged($event: any){
     this.dateValue = $event;
  }
}
```