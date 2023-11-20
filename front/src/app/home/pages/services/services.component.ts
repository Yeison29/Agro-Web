import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from '../../../public/header/header.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule, FormBuilder, FormsModule} from '@angular/forms';
import {FooterComponent} from "../../../public/footer/footer.component";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MatFormFieldModule, MatSelectModule,
    ReactiveFormsModule, FooterComponent, FormsModule, FaIconComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  faSearch = faSearch;
  entriesPerPage = 10;
  searchText = '';
  currentPage: number = 1;
  sortOrder: { [key: string]: 'asc' | 'desc' } = {};
  sortColumn: string = '';
  currentFilter: string = '';

  tableData = [
    {
      numero: 1,
      fecha: '19/11/2023',
      fuente: 'Corabastos',
      articulo: 'Tomate',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 2,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Platano',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 3,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Ahuyama',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 4,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Cebolla',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 5,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Cebollin',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 6,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Cilantro',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 7,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Papa',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 8,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Platano',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 9,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Arveja',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 10,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Frijol',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 11,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Lenteja',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 12,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Pepino',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 13,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Yuca',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 14,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Maiz',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
    {
      numero: 15,
      fecha: '20/11/2023',
      fuente: 'Corabastos',
      articulo: 'Pimenton',
      promedio: 2000,
      minimo: 1500,
      maximo: 2500
    },
  ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(){
  }

  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortOrder[column] = this.sortOrder[column] === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortOrder[column] = 'asc';
      this.sortColumn = column;
    }

    this.tableData = this.sortTableData(this.tableData, column, this.sortOrder[column]);
  }

  sortTableData(data: any[], column: string, order: 'asc' | 'desc'): any[] {
    return data.sort((a, b) => {
      const valueA = String(a[column]).toLowerCase();
      const valueB = String(b[column]).toLowerCase();

      if (order === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }

  get displayedData() {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;

    const filteredData = this.tableData.filter(row =>
      row.articulo.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.fuente.toLowerCase().includes(this.searchText.toLowerCase())
    );
    return this.sortTableData(filteredData, this.sortColumn, this.sortOrder[this.sortColumn])
      .slice(startIndex, endIndex);
  }

  getStartIndex() {
    return (this.currentPage - 1) * this.entriesPerPage;
  }

  getEndIndex() {
    return Math.min(this.currentPage * this.entriesPerPage, this.tableData.length);
  }

  totalPages(): number[] {
    return Array.from({length: Math.ceil(this.tableData.length / this.entriesPerPage)}, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  filterTableData(): any[] {
    const filteredData = this.tableData.filter(row =>
      row.articulo.toLowerCase().includes(this.searchText.toLowerCase()) ||
      row.fuente.toLowerCase().includes(this.searchText.toLowerCase())
    );
    return this.sortTableData(filteredData, this.sortColumn, this.sortOrder[this.sortColumn])
      .slice(this.getStartIndex(), this.getEndIndex());
  }

  onEntriesPerPageChange() {
    this.currentPage = 1;
    // this.applyFilterAndPagination();
  }

  // applyFilter() {
  //   this.applyFilterAndPagination();
  // }

  // applyFilterAndPagination() {
  //   const filteredData = this.filterTableData();
  //   const sortedData = this.sortTableData(filteredData, this.sortColumn, this.sortOrder[this.sortColumn]);
  //
  //   const startIndex = (this.currentPage - 1) * this.entriesPerPage;
  //   const endIndex = startIndex + this.entriesPerPage;
  //
  //   this.tableData = sortedData.slice(startIndex, endIndex);
  // }
}
