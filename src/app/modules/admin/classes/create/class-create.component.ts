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
import { Label } from 'app/types/label.type';
import { LabelService } from '../../label/label.service';
import { FuseConfigService } from '@fuse/services/config';
import { FuseConfirmationService } from '@fuse/services/confirmation';

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
    labels: Label[];

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
        private _fuseConfirmationService: FuseConfirmationService,
        private _classService: ClassService,
        private _labelService: LabelService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._labelService.labels$.subscribe(labels => {
            this.labels = labels
        });

        // Create the form
        this.createClassForm = this._formBuilder.group({
            name: [null, [Validators.required]],
            description: [null, [Validators.required]],
            classLabels: [null, [Validators.required]],
            code: [null, [Validators.required]],
            numberOfMember: [null, Validators.required],
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
        var labelIds = this.createClassForm.get('classLabels').value;
        labelIds.forEach(function (labelIds, i) {
            formData.append('classLabels[' + i + '][labelId]', labelIds);
        });
        formData.append('name', this.createClassForm.get('name').value);
        formData.append('code', this.createClassForm.get('code').value);
        formData.append('description', this.createClassForm.get('description').value);
        formData.append('numberOfMember', this.createClassForm.get('numberOfMember').value);
        formData.append(`thumbnail`, this.selectedImage);

        if (this.createClassForm.valid) {
            // Gửi biểu mẫu dưới dạng multipart/form-data
            this._classService.createClass(formData).subscribe(result => {
                if (result) {
                    this.matDialogRef.close();
                }
            }, error => {
                if (error.status === 409 && error.error === 'The class code already exists') {
                    this._fuseConfirmationService.open({
                        title: 'The class code already exists',
                        message: 'The class code already exists',
                        actions: {
                            cancel: {
                                show: false
                            }
                        }
                    })
                }
                if (error.status === 409 && error.error === 'The class name already exists') {
                    this._fuseConfirmationService.open({
                        title: 'The class name already exists',
                        message: 'The class name already exists',
                        actions: {
                            cancel: {
                                show: false
                            }
                        }
                    })
                }
            });
        }
    }

}
