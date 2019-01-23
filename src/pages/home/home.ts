import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClient } from '@angular/common/http';
import {ConfigService} from '../../app//config/config.service';
import {ChatService} from '../../app//config/chat.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  redirectCB: boolean;
  inputURL:string;
  errorMessage:string;
  constructor(public navCtrl: NavController,private iab: InAppBrowser,private http: HttpClient,private  configService: ConfigService,private chat: ChatService) {}

    ngOnInit() {
        this.chat.messages.subscribe(msg => {
            console.log(msg);
        })
    }
  getURL() {
    this.configService.getURL(this.inputURL).subscribe(
        data => {

          if(data["success"]=="false"){
            this.errorMessage = "URL Not Found";
          }
          else{
            this.iab.create(data["url"]);
          }
        },
        err => {},
        () => {}
    );
  }

    sendMessage() {
        this.chat.sendMsg("Test Message");
    }

  openWindow() {
    if(!this.inputURL){
        this.errorMessage = "Invalid URL";
    }
    else if(this.redirectCB){
      this.getURL();
    }
    else{
      this.iab.create(this.inputURL);
    }

  }
}
