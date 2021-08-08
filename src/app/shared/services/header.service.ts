import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { DnaService } from './dna.service';

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    public title = new BehaviorSubject('');

    constructor(private router: Router, private _dnaService: DnaService
    ) { }

    setTitle() {
        this._dnaService.getStats().subscribe(
            (data) => this.title.next(data),
            (error) => {
                console.log(error);
            }
        );
    }
}
