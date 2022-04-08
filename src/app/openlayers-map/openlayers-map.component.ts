import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

declare const $:any;

@Component({
  selector: 'app-openlayers-map',
  templateUrl: './openlayers-map.component.html',
  styleUrls: ['./openlayers-map.component.css']
})
export class OpenlayersMapComponent implements OnInit {

  map!: Map;  

  constructor() { }

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        projection: 'EPSG:4326',
        center: [80.98885377363007, 6.830454104603501],
        zoom: 17,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'mymap'
    });
  } 

}
