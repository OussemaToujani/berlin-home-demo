import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { House } from '../models/house';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { DistanceService } from './distance.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  private houseListType: string[] = ['shortestDistance', 'moreThanFiveRooms', 'incompleteInfo'];

  private houseLists: { [key: string]: Observable<House[]> } = {};
  private houseListSources: { [key: string]: BehaviorSubject<House[]> } = {};

  // Eberswalder Str. 55 10437 Berlin: the sister's address
  private latitude = 52.5418707;
  private longitutde = 13.4057378;

  private houseListSource = new BehaviorSubject<House[]>([]);
  houseList: Observable<House[]> = this.houseListSource.asObservable();

  constructor(private httpClient: HttpClient, private distanceService: DistanceService) {
    this.initialize();
    this.updateLists();
  }

  /**
   * Initialize the sources and the observables for all the type of list of houses
   */
  private initialize() {
    for (const houseListType of this.houseListType) {
      this.houseListSources[houseListType] = new BehaviorSubject<House[]>([]);
      this.houseLists[houseListType] = this.houseListSources[houseListType].asObservable();
    }
  }


  /**
   * get the houses from the houses API
   * @returns Observable<{houses: House[]}>
   */
  private getAllHouses(): Observable<{ houses: House[] }> {
    return this.httpClient.get<{houses: House[]}>(environment.HOUSES_API);
  }


  /**
   * updates the house lists using the recieved houses list
   */
  private updateLists() {
    this.getAllHouses().subscribe(data => {
      data.houses.map(house => {
          this.distanceService
          .calculateDistance(this.latitude, this.longitutde, house.coords.lat, house.coords.lon)
            .subscribe( distanceData => {
              return house.distance = distanceData.routes[0].legs[0];
            });
          });
      this.updateRoomNumberList(data.houses);
      this.updateIncompleteInfoList(data.houses);
      this.updateShortestDistanceList(data.houses);
      this.houseListSource.next( data.houses );
    });
  }

  updateShortestDistanceList(houseList: House[]) {
    this.houseListSources['shortestDistance']
      .next(houseList.filter(house => house.params && house.params.rooms && house.params.rooms > 5)
        .sort((houseA, houseB) => houseB.params.rooms - houseA.params.rooms));
  }

  /**
   * update the list of house that have more than 5 rooms and sort it
   * @param houseList raw list of houses
   */
  updateRoomNumberList(houseList: House[]) {
    this.houseListSources['moreThanFiveRooms']
      .next(houseList.filter(house => house.params && house.params.rooms && house.params.rooms > 5)
        .sort((houseA, houseB) => houseB.params.rooms - houseA.params.rooms));
  }

  /**
   * update the list of house that have missing info and sort it by street name in ascending order
   * @param houseList raw list of houses
   */
  updateIncompleteInfoList(houseList: House[]) {
    this.houseListSources['incompleteInfo']
      .next(_.sortBy(houseList.filter(house => !house.params || !house.params.rooms || !house.params.value), 'street'));
  }

  /**
   * get a list of house using a type of list
   * @param string the type of the house list that will be returned
   * @returns a list of houses observable
   */
  public getList(houseListType: string): Observable<House[]> {
    return this.houseLists[houseListType];
  }

  /**
   * get a list of house using a type of list
   * @param string the type of the house list that will be returned
   * @returns a list of houses observable
   */
  public getFullHouseList(): Observable<House[]> {
    return this.houseList;
  }
}
