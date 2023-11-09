import { NgClass, NgIf } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseConfirmationConfig } from '@fuse/services/confirmation/confirmation.types';

@Component({
    selector: 'fuse-confirmation-dialog',
    templateUrl: './dialog.component.html',
    styles: [
        `
            .fuse-confirmation-dialog-panel {

                @screen md {
                    @apply w-128;
                }

                .mat-mdc-dialog-container {

                    .mat-mdc-dialog-surface {
                        padding: 0 !important;
                    }
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgIf, MatButtonModule, MatDialogModule, MatIconModule, NgClass, MatInputModule, FormsModule, ReactiveFormsModule],
})
export class FuseConfirmationDialogComponent implements OnInit {

    inputForm: UntypedFormGroup;

    /**
     * Constructor
     */
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: FuseConfirmationConfig,
        private _formBuilder: UntypedFormBuilder
    ) {
    }

    ngOnInit() {
        this.inputForm = this._formBuilder.group({
            input: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    canConfirm() {
        return this.inputForm.valid;
    }

    onConfirmed() {
        if (this.data.input) {
            if (this.inputForm.valid) {
                return {
                    status: 'confirmed',
                    message: this.inputForm.controls['input'].value
                }
            }
        }
        return 'confirmed';
    }

}
