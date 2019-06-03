import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { RepairOption } from '../Model/repairOption.model';

@Component({
  templateUrl: './repair.dialog.html'
})

export class RepairDialogComponent {

  form: FormGroup;

  options: RepairOption[] = [
    { value: 'ruotaRotta', name: 'Ruota Rotta' },
    { value: 'ruotaBucata', name: 'Ruota Bucata' },
    { value: 'motoreRotto', name: 'Motore Non si accende' },
    { value: 'altro', name: 'Altro' }
  ];

  data = {
    option: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RepairDialogComponent>
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      option: this.data ? this.data.option : ''
    })
  }

  submit(optione : HTMLInputElement) {

    console.log(optione.value);

    var val = {
      option: optione.value
    };

    this.dialogRef.close(val);
  }
}
