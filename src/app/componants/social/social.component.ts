import { Component, OnInit } from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {SocialService} from '../../services/social.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  // Khởi tạo một user có kiểu dữ liệu là SocialUser để lấy giữ liệu đã đăng kí trên gmail
  user: SocialUser;
  isLogin: boolean; // false
  constructor(private authService: SocialAuthService,
              private social: SocialService) { }

  // khởi tạo một Observable<SocialUser>; để theo dõi thay đổi của dữ liệu
  ngOnInit(): void {
    this.authService.authState.subscribe(
      data => {
        this.isLogin = (data != null);
      }
    );
  }
  // Hàm login bằng tài khoản google
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);
        this.social.loginWithGoogle(data.idToken).subscribe(
          res => {
            console.log(res);
          }
        );
      }
    );
  }


  signOut(): void {
    this.authService.signOut();
  }
}
