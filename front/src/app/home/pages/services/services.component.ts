import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../public/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {ReactiveFormsModule, FormBuilder, FormsModule} from '@angular/forms';
import {FooterComponent} from "../../../public/footer/footer.component";
import {FilterSearchPipe} from "../../../filter-search.pipe";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatFormFieldModule, MatSelectModule,
    ReactiveFormsModule, FooterComponent, FormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  entriesPerPage = 10;
  searchText = '';
  currentPage: number = 1; // Variable para almacenar la página actual

  tableData = [
    {numero: 1, fecha: '19/11/2023', fuente: 'Corabastos', articulo: 'Tomate', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
    {numero: 2, fecha: '20/11/2023', fuente: 'Corabastos', articulo: 'Platano', promedio: 2000, minimo: 1500, maximo: 2500},
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  get displayedData() {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;

    const filteredData = this.tableData.filter(row =>
      row.articulo.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.fuente.toLowerCase().includes(this.searchText.toLowerCase())
    );

    return filteredData.slice(startIndex, endIndex);
  }

  onEntriesPerPageChange() {
    this.currentPage = 1;
  }

  getStartIndex() {
    return (this.currentPage - 1) * this.entriesPerPage;
  }

  getEndIndex() {
    return Math.min(this.currentPage * this.entriesPerPage, this.tableData.length);
  }
}
