import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatInput } from "@angular/material/input";


@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatLabel, MatFormField, FormsModule, MatInput],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css'
})
export class EditPopupComponent {

  editedValue: string;
  column: string;

  constructor(
    public dialogRef: MatDialogRef<EditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { element: any, column: string }
  ) {
    this.editedValue = this.data.element[this.data.column];
    this.column = this.data.column;
  }

  save(): void {
    this.dialogRef.close(this.editedValue);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
