
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DifferenceService<T> {
    private showOnlyDifferencesSubject = new BehaviorSubject<boolean>(false);
    private filteredDataSubject = new BehaviorSubject<any>(null);

    showOnlyDifferences$ = this.showOnlyDifferencesSubject.asObservable();
    filteredData$ = this.filteredDataSubject.asObservable();
}