import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'difference',
  standalone: true
})
export class DifferencePipe implements PipeTransform {
  transform<T>(value: T, oldValue: T, comparator: (a: T, b: T) => boolean = (a, b) => a === b,
    parser: (a: T) => string) {
    return `<span class="${comparator(value, oldValue) ? '' : 'new-value'}">${parser(value)}</span>`;
  }
}
