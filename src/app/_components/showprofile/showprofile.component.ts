import { Client } from './../../_models/Client';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { NotificationDialogService } from 'src/app/services/notification-dialog.service';

@Component({
  selector: 'app-showprofile',
  templateUrl: './showprofile.component.html',
  styleUrls: ['./showprofile.component.css']
})
export class ShowprofileComponent implements OnInit {


  public client: Client;
  public isLoading: boolean
  constructor(private activeRoute: ActivatedRoute,
    private notificationsService: NotificationDialogService,
    private userService: UserService) { }

  ngOnInit(): void {
    let clientId = +this.activeRoute.snapshot.paramMap.get('id');

    // let link = `http://localhost:4200/showprofile/${clientId}`;
    let link = `http://adlink2019-001-site40.etempurl.com/#/showprofile/${clientId}`;
    if (clientId != 0 && clientId != null && clientId != undefined) {
      this.clientDataGet(link)
    }
    else {
      //invalid client Id
      this.notificationsService.delete('Invalid id');
    }

  }

  private clientDataGet(link: string) {
    this.isLoading = true;
    this.userService.clientGet(link)
      .pipe(
        map(response => this.handleResponse(response)),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe();
  }


  private handleResponse(response: Client) {
    if (response != null) {
      this.client = response;
      //this.client.clientPersonalDto = response.clientPersonalDto;
      let social = this.client.clientSocialDto = response.clientSocialDto;

      if (social.facebookUrlFlyOn) {
        window.location.href = social.facebookUrl.split(' ').join('')
      } else if (social.twitterUrlFlyOn) {
        window.location.href = social.twitterUrl.split(' ').join('')
      } else if (social.tikTokUrlFlyOn) {
        window.location.href = social.tikTokUrl.split(' ').join('')
      } else if (social.slapUrlFlyOn) {
        window.location.href = social.slapUrl.split(' ').join('')
      } else if (social.whatsAppUrlFlyOn) {
        window.location.href = social.whatsAppUrl.split(' ').join('')
      } else if (social.youTubeUrlFlyOn) {
        window.location.href = social.youTubeUrl.split(' ').join('')
      } else if (social.instagramUrlFlyOn) {
        window.location.href = social.instagramUrl.split(' ').join('')
      } else if (social.linkedInUrlFlyOn) {
        window.location.href = social.linkedInUrl.split(' ').join('')
      } else if (social.googleMapsUrlFlyOn) {
        window.location.href = social.googleMapsUrl.split(' ').join('')
      } else if (social.telegramUrlFLyOn) {
        window.location.href = social.telegramUrl.split(' ').join('')
      } else if (social.clubhouseUrlFlyOn) {
        window.location.href = social.clubhoseUrl.split(' ').join('')
      }

      this.notificationsService.success(`Welcome to ${response.clientPersonalDto.name} profile!`);
    }
    else {
      this.notificationsService.delete('Invalid id');
    }


  }

}


