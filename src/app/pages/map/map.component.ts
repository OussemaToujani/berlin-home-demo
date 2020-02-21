import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HouseService } from 'src/app/services/house.service';
import { House } from 'src/app/models/house';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  url: string;
  showMap = false;

  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.houseService.getFullHouseList().subscribe(data => this.generateURL(data));
  }

  /**
   * generate a map that shows the recieved houses
   * @param data an array of houses
   */
  private generateURL(data: House[]): void {
    this.url = environment.GOOGLE_MAPS_STATIC_MAP_API_URL +
      'center=Checkpoint+Charlie&zoom=12&size=1080x720&maptype=roadmap&markers=color:blue|label:House'
      + data.map(x => '|' + x.coords.lat + ',' + x.coords.lon).join('') + '&key=' + environment.API_KEY;
    this.showMap = true;
  }
}
