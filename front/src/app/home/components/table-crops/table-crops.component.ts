import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormBuilder, FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ModalUpdateCropComponent } from '../modal-update-crop/modal-update-crop.component';
import { ModalDeleteCropComponent } from '../modal-delete-crop/modal-delete-crop.component';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-table-crops',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule, MatDialogModule, ModalUpdateCropComponent],
  templateUrl: './table-crops.component.html',
  styleUrl: './table-crops.component.scss'
})
export class TableCropsComponent implements OnInit {

  fatrash = faTrash;
  fapentosquare = faPenToSquare;
  contador=1;
  entriesPerPage = 10;
  searchText = '';
  currentPage: number = 1; // Variable para almacenar la página actual

  tableData: any = [];

  constructor(private fb: FormBuilder, public dialog: MatDialog, private serHome: HomeService) {}

  ngOnInit(){
    this.getAlldata();
  }

  getAlldata(){
    this.serHome.getAllCrops().subscribe((res: any) => {
      this.tableData= res;
    });
  }

  get displayedData() {
    const startIndex = (this.currentPage - 1) * this.entriesPerPage;
    const endIndex = startIndex + this.entriesPerPage;

    const filteredData = this.tableData.filter((row: any) =>
      row.hectares.toString().includes(this.searchText.toLowerCase()) ||
      row.name_harvest.toLowerCase().includes(this.searchText.toLowerCase())
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


  obtenerContador(index: number): number {
    return this.contador + index;
  }

  openModalUpdate(id: any){
    this.serHome.getOneCrops(id).subscribe((res: any) => {
      this.serHome.setCrop(res);
      const dialogRef = this.dialog.open(ModalUpdateCropComponent);
        dialogRef.afterClosed().subscribe(result => {
            if(result){
              this.getAlldata();
            }
        });
    });
  }

  totalPages(): number[] {
    return Array.from({length: Math.ceil(this.tableData.length / this.entriesPerPage)}, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  searchById(id: any, index: any){
    if(index===1){
      this.openModalUpdate(id);
    }else if(index===2){
      this.openModalDelete(id);
    }
  }

  openModalDelete(id: any){
    const dialogRef = this.dialog.open(ModalDeleteCropComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log("modalDelete");
      }
    })
  }

}
