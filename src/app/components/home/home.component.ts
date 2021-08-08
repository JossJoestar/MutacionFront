import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DnaService } from 'src/app/shared/services/dna.service';
import { HeaderService } from 'src/app/shared/services/header.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    dnas: any;
    inputDna: any;
    showListSpinner = true;

    constructor(
        private dnaService: DnaService,
        private headerService: HeaderService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit(): void {
        this.getList();
    }

    onClick() {
        if (this.inputDna != undefined && this.inputDna != '') {
            //Se muestra el spinner
            this.spinner.show();

            //Se transforma el ADN en mayusculas
            this.inputDna = this.inputDna.toUpperCase();

            //Se transforma el ADN en una matriz
            var matriz = this.inputDna.split(',');
            var adn = { dna: matriz };

            this.dnaService.queryMutation(adn).subscribe((x) => {
                this.headerService.setTitle();
                this.getList();
                Swal.fire({
                    icon: 'success',
                    title: 'Es una Mutación',
                });
            }, (error) => {
                if (error.status == 403) {
                    this.headerService.setTitle();
                    this.getList();
                    Swal.fire({
                        icon: 'error',
                        title: 'No es una Mutación',
                    });
                }
                if (error.status == 500) {
                    this.spinner.hide();
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrio un error interno'
                    })
                }
            });
        }
    }

    //Validamos que solo se puedan introducir las letras A T C G
    public inputValidator(event: any) {
        const pattern = /^[A|T|C|G|a|t|c|g|,|]*$/;
        if (!pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(
                /[^A|T|C|G|a|t|c|g|,|]/g,
                ''
            );
        }
        this.inputDna = event.target.value;
    }
    
    //Obtenemos la lista de las mutaciones
    getList() {
        if (this.showListSpinner == true) {
            this.spinner.show();
        }
        this.dnaService.getList().subscribe((x) => {
            this.dnas = x;
            this.spinner.hide();
            this.showListSpinner = false;
        }, (error) => {
            console.log(error);
            this.spinner.hide();
            this.showListSpinner = false;
        });
    }

}
