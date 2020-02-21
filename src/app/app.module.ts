import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HouseListComponent } from './components/house-list/house-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from './pages/map/map.component';

const appRoutes: Routes = [
  {
    path: 'distance-filtered-list',
    component: HouseListComponent,
    data: {
      listTitle: 'Closest houses',
      houseListType: 'shortestDistance',
      listDescription: 'List of Houses ordered in ascending distance to the Sister\'s house'
    }
  },
  {
    path: 'room-filtered-list',
    component: HouseListComponent,
    data: {
      listTitle: 'Five room houses',
      houseListType: 'moreThanFiveRooms',
      listDescription: 'This list cntains the Houses that have more than 5 rooms'
    }
  },
  {
    path: 'incomplete-filtered-list',
    component: HouseListComponent,
    data: {
      listTitle: 'Incomplete Houses',
      houseListType: 'incompleteInfo',
      listDescription: 'List of Houses that have more missing info'
    }
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HouseListComponent,
    HomeComponent,
    MapComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
