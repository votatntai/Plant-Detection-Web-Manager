import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { QuillEditorComponent } from 'ngx-quill';
import { PlantService } from '../plant.service';

@Component({
    selector: 'app-create-plant',
    templateUrl: './create-plant.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, QuillEditorComponent,
        MatSelectModule
    ],
})
export class CreatePlantComponent implements OnInit {

    selectedImages: File[] = new Array(5);
    objectURLs: (string | null)[] = new Array(5);
    imageSelected: boolean[] = [false, false, false, false, false];

    createPlantForm: UntypedFormGroup;
    copyFields: { cc: boolean; bcc: boolean } = {
        cc: false,
        bcc: false,
    };
    quillModules: any = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    };

    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<CreatePlantComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _plantService: PlantService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.createPlantForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            categoryIds: [['b39f063e-f354-4dec-9077-37d2f0bae952'], [Validators.required]],
            description: ['', [Validators.required]],
            code: ['', Validators.required],
            images: [[], [Validators.required]],
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onSelectFile(event: any, index: number) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.selectedImages[index] = event.target.files[0];
                this.objectURLs[index] = URL.createObjectURL(event.target.files[0]);
                this.imageSelected[index] = true;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onSubmit() {
        // Tạo đối tượng FormData
        const formData = new FormData();

        // Lặp qua mảng selectedImages và thêm từng tệp vào formData
        for (let i = 0; i < this.selectedImages.length; i++) {
            if (this.selectedImages[i]) {
                console.log(i);

                formData.append(`images`, this.selectedImages[i]);
            }
        }

        // Lấy các giá trị khác từ biểu mẫu và thêm vào formData
        formData.append('name', this.createPlantForm.get('name').value);
        formData.append('categoryIds', this.createPlantForm.get('categoryIds').value);
        formData.append('description', this.createPlantForm.get('description').value);
        formData.append('code', this.createPlantForm.get('code').value);

        // Gửi biểu mẫu dưới dạng multipart/form-data
        this._plantService.createPlant(formData).subscribe();
    }


    /**
     * Save and close
     */
    saveAndClose(): void {
        // Save the message as a draft
        this.saveAsDraft();

        // Close the dialog
        this.matDialogRef.close();
    }

    /**
     * Discard the message
     */
    discard(): void {
    }

    /**
     * Save the message as a draft
     */
    saveAsDraft(): void {
    }

    /**
     * Send the message
     */
    send(): void {
    }
}
