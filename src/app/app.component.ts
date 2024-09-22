import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditPopupComponent} from "./edit-popup/edit-popup.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { debounceTime, Subject } from 'rxjs';


export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, FormsModule,
    NgFor, NgIf, MatProgressSpinnerModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  filteredDataSource = ELEMENT_DATA;
  isLoaded = false;

  filterSubject: Subject<string> = new Subject();

  constructor(public dialog: MatDialog) {
    setTimeout(() => {
      this.isLoaded = true;
      this.filteredDataSource = [...this.dataSource];
    }, 2000);

    this.filterSubject.pipe(debounceTime(2000)).subscribe((filterText) => {
      this.filteredDataSource = this.filterData(filterText);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  filterData(filterText: string): PeriodicElement[] {
    const filterValue = filterText.toLowerCase().trim();

    if (!filterValue) {
      return this.dataSource;
    }

    return this.dataSource.filter(element => {
      return Object.keys(element).some(key => {
        const value = String((element as any)[key]).toLowerCase();
        return value.includes(filterValue);
      });
    });
  }

  openDialog(element: PeriodicElement, column: string): void {
    const dialogRef = this.dialog.open(EditPopupComponent, {
      data: { element: element, column: column }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // @ts-ignore
        element[column] = result;
      }
    });
  }
}
