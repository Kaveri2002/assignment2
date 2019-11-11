import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  address: Object;
  establishmentAddress: Object;
  formattedEstablishmentAddress: string;
  city: string;
  state: string;
  country: string;
  street: string;
  postal_code: string;
  latitude: number;
  longitude: number;


  constructor(public zone: NgZone) { }

  getEstablishmentAddress(place) {
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.establishmentAddress = place['formatted_address'];
    this.city = this.getCity(place);
    this.state = this.getState(place);
    this.country = this.getCountry(place);
    this.street = this.getStreet(place);
    this.postal_code = this.getPostCode(place);
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();
    this.formattedEstablishmentAddress = place['formatted_address'];
    this.zone.run(() => {
      this.formattedEstablishmentAddress = place['formatted_address'];
    });
  }

  getAddrComponent(place, componentTemplate) {
    let result;
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place) {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' },
      streetNumber = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return streetNumber;
  }

  getStreet(place) {
    const COMPONENT_TEMPLATE = { route: 'long_name' },
      street = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return street;
  }

  getCity(place) {
    const COMPONENT_TEMPLATE = { locality: 'long_name' },
      city = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return city;
  }

  getState(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'long_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getDistrict(place) {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' },
      state = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return state;
  }

  getCountryShort(place) {
    const COMPONENT_TEMPLATE = { country: 'short_name' },
      countryShort = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return countryShort;
  }

  getCountry(place) {
    const COMPONENT_TEMPLATE = { country: 'long_name' },
      country = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return country;
  }

  getPostCode(place) {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' },
      postCode = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return postCode;
  }
  getLatitude(place) {
    const COMPONENT_TEMPLATE = { latitude: 'long_name' },
      latitude = this.getAddrComponent(place, COMPONENT_TEMPLATE);
    return latitude;
  }
}
