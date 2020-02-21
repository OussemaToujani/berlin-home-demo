import { Component, OnInit, Input } from '@angular/core';
import { HouseService } from '../../services/house.service';
import {House} from '../../models/house';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.css']
})
export class HouseListComponent implements OnInit {

  @Input() listTitle: string;
  @Input() listDescription: string;
  @Input() houseListType: string;
  houseList: House[];


  constructor(private housesService: HouseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if ( this.route.root.firstChild.snapshot.data.houseListType ) {
    this.houseListType = this.route.root.firstChild.snapshot.data['houseListType'];
    }
    if ( this.route.root.firstChild.snapshot.data.houseListType ) {
      this.listTitle = this.route.root.firstChild.snapshot.data['listTitle'];
    }
    if ( this.route.root.firstChild.snapshot.data.houseListType ) {
      this.listDescription = this.route.root.firstChild.snapshot.data['listDescription'];
    }

    this.housesService.getList(this.houseListType).subscribe( houseList => this.houseList = houseList);
  }
}
