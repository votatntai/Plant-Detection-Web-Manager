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
import { ClassService } from '../class.service';

@Component({
    selector: 'app-create-class',
    templateUrl: './class-create.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, QuillEditorComponent,
        MatSelectModule
    ],
})
export class CreateClassComponent implements OnInit {

    selectedImage: File;
    objectURL: (string | null);

    createClassForm: UntypedFormGroup;
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
        public matDialogRef: MatDialogRef<CreateClassComponent>,
        private _formBuilder: UntypedFormBuilder,
        private _classService: ClassService
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
        this.createClassForm = this._formBuilder.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]],
            code: [null, [Validators.required]],
            numberOfMember: [null, Validators.required],
            thumbnail: [null, [Validators.required]],
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onSelectFile(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Chỉ lưu trữ ảnh đầu tiên trong mảng hoặc biến
                this.selectedImage = event.target.files[0];
                this.objectURL = URL.createObjectURL(event.target.files[0]);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    onSubmit() {
        // Tạo đối tượng FormData
        const formData = new FormData();

        // Lấy các giá trị khác từ biểu mẫu và thêm vào formData
        formData.append('name', this.createClassForm.get('name').value);
        formData.append('code', this.createClassForm.get('code').value);
        formData.append('description', this.createClassForm.get('description').value);
        formData.append('numberOfMember', this.createClassForm.get('numberOfMember').value);
        formData.append(`thumbnail`, this.selectedImage);

        // Gửi biểu mẫu dưới dạng multipart/form-data
        this._classService.createClass(formData).subscribe(result => {
            if (result) {
                this.matDialogRef.close();
            }
        });
    }
}
