/*export type ComparatorFunction<T> = (a: T, b: T) => boolean;
export type ParserFunction<T> = (value: T) => string;

export interface Configuration<T = any> {
  comparators?: Record<string, ComparatorFunction<T> | undefined>;
  parsers?: Record<string, ParserFunction<T>>;
  displayedPropNames?: Record<string, string>;
  comparator?: ComparatorFunction<T>;
}

export class ConfigurationBuilder<T = any> {
  private config: Configuration<T> = {};

 withField(
  fieldName: string,
  displayedPropName?: string,
  comparator?: ComparatorFunction<T>,
  parser?: ParserFunction<T>
): this {
  this.config.comparators = this.config.comparators || {};
  this.config.parsers = this.config.parsers || {};
  this.config.displayedPropNames = this.config.displayedPropNames || {};

  if (fieldName) {
    this.config.comparators[fieldName] = comparator ?? this.config.comparator;
    this.config.parsers[fieldName] = parser || ((value: T) => (value !== null && value !== undefined) ? this.safeToString(value) : '');
    this.config.displayedPropNames[fieldName] = displayedPropName || fieldName;
  }

  return this;
}

  private safeToString(value: T): string {
    if (value !== null && value !== undefined) {
      const valueAsObject = value || {};
      if (typeof valueAsObject.toString === 'function') {
        return valueAsObject.toString();
      }
    }
    return '';
  }

  withComparators(comparators: Record<string, ComparatorFunction<T>>): this {
    this.config.comparators = comparators;
    return this;
  }

  withParsers(parsers: Record<string, (value: T) => string>): this {
    this.config.parsers = parsers;
    return this;
  }

  withDisplayedPropNames(displayedPropNames: Record<string, string>): this {
    this.config.displayedPropNames = displayedPropNames;
    return this;
  }

  withComparator(comparator: ComparatorFunction<T>): this {
    this.config.comparator = comparator;
    return this;
  }

  build(): Configuration {
    return this.config;
  }
}*/

export type ComparatorFunction<T> = (a: T, b: T) => boolean;
export type ParserFunction<T> = (value: T) => string;

export interface Configuration<T = Record<string, unknown>> {
  comparators?: Record<string, ComparatorFunction<T[keyof T]> | undefined>;
  parsers?: Record<string, ParserFunction<T[keyof T]>>;
  displayedPropNames?: Record<string, string>;
  comparator?: ComparatorFunction<T[keyof T]>;
}

export class ConfigurationBuilder<T = Record<string, any>> {
  private config: Configuration<T> = {};

  withField<K extends keyof T>(
    fieldName: K,
    displayedPropName?: string,
    comparator?: ComparatorFunction<T[K]>,
    parser?: ParserFunction<T[K]>
  ): this {
    this.config.comparators = this.config.comparators || {};
    this.config.parsers = this.config.parsers || {};
    this.config.displayedPropNames = this.config.displayedPropNames || {};
  
    if (fieldName) {
      const comparatorToAdd = comparator ?? this.config.comparator as ComparatorFunction<T[K]>;
      const parserToAdd = parser || ((value: T[K]) => (value !== null && value !== undefined) ? this.safeToString(value) : '') as ParserFunction<T[K]>;
  
      this.config.comparators[fieldName as string] = comparatorToAdd as ComparatorFunction<T[keyof T]>;
      this.config.parsers[fieldName as string] = parserToAdd as ParserFunction<T[keyof T]>;
      this.config.displayedPropNames[fieldName as string] = displayedPropName || fieldName as string;
    }
  
    return this;
  }

  private safeToString(value: any): string {
    if (value !== null && value !== undefined) {
      const valueAsObject = value || {};
      if (typeof valueAsObject.toString === 'function') {
        return valueAsObject.toString();
      }
    }
    return '';
  }

  withComparators(comparators: Record<string, ComparatorFunction<T[keyof T]>>): this {
    this.config.comparators = comparators;
    return this;
  }

  withParsers(parsers: Record<string, ParserFunction<T[keyof T]>>): this {
    this.config.parsers = parsers;
    return this;
  }

  withDisplayedPropNames(displayedPropNames: Record<string, string>): this {
    this.config.displayedPropNames = displayedPropNames;
    return this;
  }

  withComparator(comparator: ComparatorFunction<T[keyof T]>): this {
    this.config.comparator = comparator;
    return this;
  }

  build(): Configuration<T> {
    return this.config;
  }
}