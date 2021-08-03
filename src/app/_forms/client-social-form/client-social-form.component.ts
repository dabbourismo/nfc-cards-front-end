import { NotificationDialogService } from './../../services/notification-dialog.service';
import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientSocial } from 'src/app/_models/ClientSocial';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-client-social-form',
  templateUrl: './client-social-form.component.html',
  styleUrls: ['./client-social-form.component.css']
})
export class ClientSocialFormComponent implements OnInit {

  @Input() clientSocialDto: ClientSocial
  public clientSocialForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationDialogService) { }

  ngOnInit(): void {
    this.clientSocialFormCreate(this.clientSocialDto);
  }

  //Form Values -------
  private clientSocialFormCreate(clientSocial: ClientSocial) {
    this.clientSocialForm = this.formBuilder.group({
      id: [clientSocial.id],
      clientPersonalId: [clientSocial.clientPersonalId],

      facebookUrl: [clientSocial.facebookUrl, [Validators.pattern('')]],
      facebookUrlFlyOn: [clientSocial.facebookUrlFlyOn],

      twitterUrl: [clientSocial.twitterUrl, [Validators.pattern('')]],
      twitterUrlFlyOn: [clientSocial.twitterUrlFlyOn],

      tikTokUrl: [clientSocial.tikTokUrl, [Validators.pattern('')]],
      tikTokUrlFlyOn: [clientSocial.tikTokUrlFlyOn],

      slapUrl: [clientSocial.slapUrl, [Validators.pattern('')]],
      slapUrlFlyOn: [clientSocial.slapUrlFlyOn],

      whatsAppUrl: [clientSocial.whatsAppUrl, [Validators.pattern('')]],
      whatsAppUrlFlyOn: [clientSocial.whatsAppUrlFlyOn],

      youTubeUrl: [clientSocial.youTubeUrl, [Validators.pattern('^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$')]],
      youTubeUrlFlyOn: [clientSocial.youTubeUrlFlyOn],

      instagramUrl: [clientSocial.instagramUrl, [Validators.pattern('')]],
      instagramUrlFlyOn: [clientSocial.instagramUrlFlyOn],

      linkedInUrl: [clientSocial.linkedInUrl, [Validators.pattern('')]],
      linkedInUrlFlyOn: [clientSocial.linkedInUrlFlyOn],

      googleMapsUrl: [clientSocial.googleMapsUrl, [Validators.pattern('/^https?\:\/\/(www\.)?google\.[a-z]+\/maps\/?\?([^&]+&)*(ll=-?[0-9]{1,2}\.[0-9]+,-?[0-9]{1,2}\.[0-9]+|q=[^&+])+($|&)/')]],
      googleMapsUrlFlyOn: [clientSocial.googleMapsUrlFlyOn],

      telegramUrl: [clientSocial.telegramUrl, [Validators.pattern('/(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/')]],
      telegramUrlFLyOn: [clientSocial.telegramUrlFLyOn],

      clubhoseUrl: [clientSocial.clubhoseUrl, [Validators.pattern('')]],
      clubhouseUrlFlyOn: [clientSocial.clubhouseUrlFlyOn],
    });
  }


  public onSubmit(clientSocialFormValues) {

    let clientSocial: ClientSocial = {
      id: clientSocialFormValues.id,
      clientPersonalId: clientSocialFormValues.clientPersonalId,

      facebookUrl: clientSocialFormValues.facebookUrl,
      facebookUrlFlyOn: clientSocialFormValues.facebookUrlFlyOn,

      twitterUrl: clientSocialFormValues.twitterUrl,
      twitterUrlFlyOn: clientSocialFormValues.twitterUrlFlyOn,

      tikTokUrl: clientSocialFormValues.tikTokUrl,
      tikTokUrlFlyOn: clientSocialFormValues.tikTokUrlFlyOn,

      slapUrl: clientSocialFormValues.slapUrl,
      slapUrlFlyOn: clientSocialFormValues.slapUrlFlyOn,

      whatsAppUrl: clientSocialFormValues.whatsAppUrl,
      whatsAppUrlFlyOn: clientSocialFormValues.whatsAppUrlFlyOn,

      youTubeUrl: clientSocialFormValues.youTubeUrl,
      youTubeUrlFlyOn: clientSocialFormValues.youTubeUrlFlyOn,

      instagramUrl: clientSocialFormValues.instagramUrl,
      instagramUrlFlyOn: clientSocialFormValues.instagramUrlFlyOn,

      linkedInUrl: clientSocialFormValues.linkedInUrl,
      linkedInUrlFlyOn: clientSocialFormValues.linkedInUrlFlyOn,

      googleMapsUrl: clientSocialFormValues.googleMapsUrl,
      googleMapsUrlFlyOn: clientSocialFormValues.googleMapsUrlFlyOn,

      telegramUrl: clientSocialFormValues.telegramUrl,
      telegramUrlFLyOn: clientSocialFormValues.telegramUrlFLyOn,

      clubhoseUrl: clientSocialFormValues.clubhoseUrl,
      clubhouseUrlFlyOn: clientSocialFormValues.clubhouseUrlFlyOn,
    }
    this.userService.clientSocialUpdate(clientSocial).pipe(
      finalize(() => {
        localStorage.removeItem('clientSocialDto');
        localStorage.setItem('clientSocialDto', JSON.stringify(clientSocial));
        this.notificationService.success('Data updated successfully');
      })
    ).subscribe();
  }


  public hasError = (controlName: string, errorName: string) => {
    return this.clientSocialForm.controls[controlName].hasError(errorName);
  }

}
