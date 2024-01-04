import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AvatarModule } from '@coreui/angular';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';

import { DefaultOptionsInterceptor } from './default-options.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { CharacterDisplayerComponent } from './components/character-displayer/character-displayer.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CreatePostComponent } from './components/posting/create-post/create-post.component';
import { FeedTabComponent } from './components/feed/feed-tab/feed-tab.component';
import { LocalizationFormatComponent } from './components/feed/localization-format/localization-format.component';
import { VideoPostComponent } from './components/posting/video-post/video-post.component';
import { CharacterTabComponent } from './components/character-tab/character-tab.component';
import { FeedFilterComponent } from './components/feed/feed-filter/feed-filter.component';
import { ReactionsCardHeaderComponent } from './components/reactions-card-header/reactions-card-header.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { ShopTopBarComponent } from './components/shop-top-bar/shop-top-bar.component';
import { ShopCardsComponent } from './components/shop-cards/shop-cards.component';
import { TextPostComponent } from './components/posting/text-post/text-post.component';
import { ImgPostComponent } from './components/posting/img-post/img-post.component';
import { VideoFormatComponent } from './components/feed/video-format/video-format.component';
import { GeolocalizationPostComponent } from './components/posting/geolocalization-post/geolocalization-post.component';
import { VipSelectPageComponent } from './pages/vip-select-page/vip-select-page.component';
import { ImageFormatComponent } from './components/feed/image-format/image-format.component';
import { VipRequestsComponent } from './pages/vip-requests/vip-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserItemComponent,
    CharacterDisplayerComponent,
    TopBarComponent,
    CreatePostComponent,
    FeedTabComponent,
    LocalizationFormatComponent,
    VideoPostComponent,
    CharacterTabComponent,
    FeedFilterComponent,
    ReactionsCardHeaderComponent,
    ShopPageComponent,
    ShopTopBarComponent,
    ShopCardsComponent,
    TextPostComponent,
    ImgPostComponent,
    VideoFormatComponent,
    GeolocalizationPostComponent,
    VipSelectPageComponent,
    ImageFormatComponent,
    VipRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    MatIconModule,
    HttpClientModule,
    AvatarModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatBadgeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultOptionsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
