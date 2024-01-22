import { NgFor, NgIf } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { DifferencePipe } from "./difference.pipe";
import { Configuration } from "./configuration-builder";


@Component({
    selector: "lnsc-comparaison-table",
    templateUrl: "./comparaison-table.component.html",
    styleUrls: ["./comparaison-table.component.scss"],
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        DifferencePipe
    ]
})

export class ComparaisonTableComponent<T extends { [key: string]: any }> implements OnInit, OnDestroy {

    @Input() referenceObject: T;
    @Input() set compared(compared: T | T[]) {
        this.comparedObjects = Array.isArray(compared) ? [...compared] : [compared];
    };
    @Input() config: Configuration;
    comparedObjects: T[] = [];

    get comparator() {
        return this.config.comparator;
    }

    get fields() {
        return Object.keys(this.referenceObject || {}) as string[];
    }

    constructor() { }

    ngOnInit(): void { }

    getComparatorForField(fieldName: string): (a: unknown, b: unknown) => boolean {
        const comparator = this.config.comparators && this.config.comparators[fieldName];
        if (comparator) {
            return (a, b) => comparator(a, b) as boolean;
        }

        return this.config.comparator || ((a, b) => false);
    }

    getParserForField(fieldName: string): (value: T) => string {
        return this.config.parsers && this.config.parsers[fieldName]
            ? this.config.parsers[fieldName]
            : (value: T) => value.toString();
    }

    getDisplayedPropNameForField(fieldName: string): string {
        return this.config.displayedPropNames && this.config.displayedPropNames[fieldName]
            ? this.config.displayedPropNames[fieldName]
            : fieldName;
    }

    ngOnDestroy(): void { }
}