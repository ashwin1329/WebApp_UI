import { Component } from '@angular/core';
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  } from '@angular/material/dialog';
  import { MatButtonModule } from '@angular/material/button';
@Component({
    selector: 'dialog-elements-example-dialog',
    templateUrl: 'dialog.elements.example.dialog.html',
    standalone: true,
    imports: [
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatButtonModule,
    ],
  })
  export class DialogElementsExampleDialog {}