import { Component, OnInit } from '@angular/core';
import { Tutor } from './models/tutor';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TutorService } from './services/tutor.service';

@Component({
    templateUrl: './tutor.component.html',
    providers: [MessageService]
})
export class TutorComponent implements OnInit {

    tutorDialog: boolean = false;

    deleteTutorDialog: boolean = false;

    deleteTutorsDialog: boolean = false;

    tutors: Tutor[] = [];

    tutor: Tutor = {};

    selectedTutors: Tutor[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private tutorService: TutorService, private messageService: MessageService) { }

    ngOnInit() {
        this.tutorService.getTutors().then(data => this.tutors = data);

        this.cols = [
            { field: 'tutor', header: 'Tutor' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.tutor = {};
        this.submitted = false;
        this.tutorDialog = true;
    }

    deleteSelectedTutors() {
        this.deleteTutorsDialog = true;
    }

    editTutor(tutor: Tutor) {
        this.tutor = { ...tutor };
        this.tutorDialog = true;
    }

    deleteTutor(tutor: Tutor) {
        this.deleteTutorDialog = true;
        this.tutor = { ...tutor };
    }

    confirmDeleteSelected() {
        this.deleteTutorsDialog = false;
        this.tutors = this.tutors.filter(val => !this.selectedTutors.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutors Deleted', life: 3000 });
        this.selectedTutors = [];
    }

    confirmDelete() {
        this.deleteTutorDialog = false;
        this.tutors = this.tutors.filter(val => val.id !== this.tutor.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Deleted', life: 3000 });
        this.tutor = {};
    }

    hideDialog() {
        this.tutorDialog = false;
        this.submitted = false;
    }

    saveTutor() {
        this.submitted = true;

        if (this.tutor.name?.trim()) {
            if (this.tutor.id) {
                // @ts-ignore
                this.tutor.inventoryStatus = this.tutor.inventoryStatus.value ? this.tutor.inventoryStatus.value : this.tutor.inventoryStatus;
                this.tutors[this.findIndexById(this.tutor.id)] = this.tutor;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Updated', life: 3000 });
            } else {
                this.tutor.id = this.createId();
                // @ts-ignore
                this.tutor.inventoryStatus = this.tutor.inventoryStatus ? this.tutor.inventoryStatus.value : 'INSTOCK';
                this.tutors.push(this.tutor);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tutor Created', life: 3000 });
            }

            this.tutors = [...this.tutors];
            this.tutorDialog = false;
            this.tutor = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.tutors.length; i++) {
            if (this.tutors[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
