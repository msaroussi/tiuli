import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.html',
  styleUrls: ['./map.css']
})
export class Map implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 40.7128, lng: -74.0060 }; // New York
  zoom = 10;
  
  mapOptions: google.maps.MapOptions = {
    center: this.center,
    zoom: this.zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    fullscreenControl: true
  };

  ngOnInit(): void {
    console.log('Google Maps component initialized successfully!');
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      console.log('Map clicked at:', event.latLng.toJSON());
    }
  }
}
