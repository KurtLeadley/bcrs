import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-picture-upload',
  templateUrl: './picture-upload.component.html',
  styleUrls: ['./picture-upload.component.scss'],
})
export class PictureUploadComponent implements OnInit {
  @Input() avatar = false;
  @Input() image: string;
  file: any = {};
  imagePreviewUrl: any = {};
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;

  constructor() {
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  ngOnInit() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== undefined
        ? this.image
        : this.avatar
        ? 'assets/img/placeholder.jpg'
        : 'assets/img/image_placeholder.jpg';
  }

  handleImageChange($event) {
    $event.preventDefault();
    const reader = new FileReader();
    const file = $event.target.files[0];
    reader.onloadend = () => {
      this.file = file;
      this.imagePreviewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  handleClick() {
    console.log(this.fileInput.nativeElement);
    this.fileInput.nativeElement.click();
  }

  handleRemove() {
    this.file = null;
    this.imagePreviewUrl =
      this.image !== undefined
        ? this.image
        : this.avatar
        ? 'assets/img/placeholder.jpg'
        : 'assets/img/image_placeholder.jpg';
    this.fileInput.nativeElement.value = null;
  }

  handleSubmit($event) {
    $event.preventDefault();
  }
}
