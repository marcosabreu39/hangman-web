import { Utils } from './../utils/utils';
import { UploadService } from './upload.service';
import { Component, OnInit } from '@angular/core';

/**
 * Manages XML file's upload
 *
 * @Author Marcos Abreu
 */

 declare var require: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public xmlFile: string;

  public utils: Utils;

  constructor(private uploadService: UploadService) {
    this.utils = new Utils();
    this.utils.message = "Choose your XML file to upload.";
    this.utils.status = 1;
   }

  ngOnInit(): void {
  }

  /**
   * Handles a XML file uploaded
   * @param event
   */
  openFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsText(event.target.files[0]);
      reader.onload = () => {
          let file = reader.result;
          this.uploadService.uploadFile(file).subscribe(success => {
            this.utils.message = "File uploaded successfully!!!";
            this.utils.status = 1;
            console.log(success.status);
          }, fail => {
            this.utils.message = "File upload failed!!!";
            this.utils.status = 2;
            console.log(fail.status);
          });
        }

        reader.onerror = () => {
          this.utils.message = "File upload failed!!!";
            this.utils.status = 2;
        }
      }
    }
}
