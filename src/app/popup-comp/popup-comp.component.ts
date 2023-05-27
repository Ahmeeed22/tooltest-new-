import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-comp',
  templateUrl: './popup-comp.component.html',
  styleUrls: ['./popup-comp.component.scss']
})
export class PopupCompComponent implements OnInit {

  constructor(public dialog: MatDialogRef<PopupCompComponent> , 
              public dialogpublic: MatDialog ,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private clipboard: Clipboard
              ) { }

  ngOnInit(): void {
  }

  copyService(){
    if (this.data) {
      this.clipboard.copy(this.data);
      // Optional: Show a success message or perform other actions
    }
  }
  close(){
            this.dialog.close()
          }

}
