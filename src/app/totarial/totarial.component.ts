import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-totarial',
  templateUrl: './totarial.component.html',
  styleUrls: ['./totarial.component.scss']
})
export class TotarialComponent implements OnInit {

  constructor(public dialog: MatDialogRef<TotarialComponent> , 
    public dialogpublic: MatDialog ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialog.close()
  }

}
