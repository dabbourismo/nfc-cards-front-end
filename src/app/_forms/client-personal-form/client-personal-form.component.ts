import { ClientPersonal } from './../../_models/ClientPersonal';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NotificationDialogService } from 'src/app/services/notification-dialog.service';
import { finalize } from 'rxjs/operators';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
;
@Component({
  selector: 'app-client-personal-form',
  templateUrl: './client-personal-form.component.html',
  styleUrls: ['./client-personal-form.component.css']
})
export class ClientPersonalFormComponent implements OnInit {

  formData: FormData;
  formData2: FormData;
  public progress: number;
  public message: string;
  selectedFiles: FileList;

  @Input() clientPersonalDto: ClientPersonal
  public clientPersonalForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private notificationService: NotificationDialogService) { }

  ngOnInit(): void {
    this.clientPersonalFormCreate(this.clientPersonalDto);
  }

  //Form Values -------
  private clientPersonalFormCreate(clientPersonal: ClientPersonal) {
    this.clientPersonalForm = this.formBuilder.group({
      id: [clientPersonal.id],

      userName: [clientPersonal.username, [Validators.required]],
      password: [clientPersonal.password, [Validators.required, Validators.minLength(5)]],

      name: [clientPersonal.name, [Validators.required, Validators.maxLength(200)]],
      nameIsHidden: [clientPersonal.nameIsHidden],

      email: [clientPersonal.email, [Validators.email]],
      emailIsHidden: [clientPersonal.emailIsHidden],

      city: [clientPersonal.city],
      cityIsHidden: [clientPersonal.cityIsHidden],

      district: [clientPersonal.district],
      districtIsHidden: [clientPersonal.districtIsHidden],

      title: [clientPersonal.title],
      titleIsHidden: [clientPersonal.titleIsHidden],

      company: [clientPersonal.company],
      companyIsHidden: [clientPersonal.companyIsHidden],

      address: [clientPersonal.address],
      addressIsHidden: [clientPersonal.addressIsHidden],

      phone: [clientPersonal.phone, [Validators.pattern('^01[0125][0-9]{8}$')]],
      phoneIsHidden: [clientPersonal.phoneIsHidden],

      describeYourself: [clientPersonal.describeYourself],
      describeYourselfIsHidden: [clientPersonal.describeYourselfIsHidden],

      youtubeEmbededURL: [clientPersonal.youtubeEmbededURL, [Validators.pattern('^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$')]],
      youtubeEmbededURLIsHidden: [clientPersonal.youtubeEmbededURLIsHidden],
    });
  }

  public onSubmit(clientPersonalFormValues) {
    let clientPersonal: ClientPersonal = {
      id: clientPersonalFormValues.id,
      username: clientPersonalFormValues.userName,
      password: clientPersonalFormValues.password,

      name: clientPersonalFormValues.name,
      nameIsHidden: clientPersonalFormValues.nameIsHidden,

      email: clientPersonalFormValues.email,
      emailIsHidden: clientPersonalFormValues.emailIsHidden,

      city: clientPersonalFormValues.city,
      cityIsHidden: clientPersonalFormValues.cityIsHidden,

      district: clientPersonalFormValues.district,
      districtIsHidden: clientPersonalFormValues.districtIsHidden,

      title: clientPersonalFormValues.title,
      titleIsHidden: clientPersonalFormValues.titleIsHidden,

      company: clientPersonalFormValues.company,
      companyIsHidden: clientPersonalFormValues.companyIsHidden,

      address: clientPersonalFormValues.address,
      addressIsHidden: clientPersonalFormValues.addressIsHidden,

      phone: clientPersonalFormValues.phone,
      phoneIsHidden: clientPersonalFormValues.phoneIsHidden,

      describeYourself: clientPersonalFormValues.describeYourself,
      describeYourselfIsHidden: clientPersonalFormValues.describeYourselfIsHidden,

      youtubeEmbededURL: clientPersonalFormValues.youtubeEmbededURL,
      youtubeEmbededURLIsHidden: clientPersonalFormValues.youtubeEmbededURLIsHidden,

    }
    this.userService.clientPersonalUpdate(clientPersonal).pipe(
      finalize(() => {
        localStorage.removeItem('clientPersonalDto');
        localStorage.setItem('clientPersonalDto', JSON.stringify(clientPersonal));
        this.notificationService.success('Data updated successfully');
        this.uploadPdfFile();
        this.uploadImageFile();
      })
    ).subscribe();

  }


  public selectPdfFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    console.log(fileToUpload);
    this.formData2 = new FormData();
    this.formData2.append('file', fileToUpload, fileToUpload.name);
    // this.uploadFile();
  }


  public selectImage = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    console.log(fileToUpload);
    this.formData = new FormData();
    this.formData.append('file', fileToUpload, fileToUpload.name);
    // this.uploadFile();
  }

  public uploadPdfFile() {
    let baseUrl = `${environment.urlAddress}client/`;
    this.http.post(baseUrl + 'PdfUpload?userId=' + this.clientPersonalDto.id,
      this.formData2, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response && !this.selectedFiles) {

        }
      });
  }

  public uploadImageFile() {
    let baseUrl = `${environment.urlAddress}client/`;
    this.http.post(baseUrl + 'ProfilePicsUpload?userId=' + this.clientPersonalDto.id,
      this.formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response && !this.selectedFiles) {

        }
      });
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.clientPersonalForm.controls[controlName].hasError(errorName);
  }
}
