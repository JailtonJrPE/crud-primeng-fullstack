import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tutor } from '../models/tutor';

@Injectable()
export class TutorService {

    constructor(private http: HttpClient) { }

    getTutorsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Tutor[])
            .then(data => data);
    }

    getTutors() {
        return this.http.get<any>('assets/demo/data/tutor.json')
            .toPromise()
            .then(res => res.data as Tutor[])
            .then(data => data);
    }

     getTutors2() {
        return this.http.get<any>('assets/demo/data/tutor.json')
            .toPromise()
            .then(res => res.data as Tutor[])
            .then(data => data);
    }

    getTutorsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Tutor[])
            .then(data => data);
    }

    getTutorsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Tutor[])
            .then(data => data);
    }
}
