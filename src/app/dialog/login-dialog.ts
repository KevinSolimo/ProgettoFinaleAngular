import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
    templateUrl: './loginDialog.html'
})

export class LoginDialogComponent {

    form: FormGroup;

    data = {
        username: '',
        password: ''
    };

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<LoginDialogComponent>
    ) { }


    ngOnInit() {
        this.form = this.formBuilder.group({
            username: this.data ? this.data.username : '',
            password: this.data ? this.data.password : ''
        })
    }

    submit(form) {
        
        var val = {
            username : form.value.username,
            password : form.value.password
        };

        this.dialogRef.close(val);
    }
}