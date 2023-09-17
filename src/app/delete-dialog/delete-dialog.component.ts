import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit(): void {
  }

  checkData(data : number){
    this.dialogRef.close(data);
  }

}
