import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/osm';
// import to draw
import Draw from'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import Snap from 'ol/interaction/Snap';

@Component({
  selector: 'app-openlayers-map',
  templateUrl: './openlayers-map.component.html',
  styleUrls: ['./openlayers-map.component.css']
})
export class OpenlayersMapComponent implements OnInit {
  
  constructor() {
    
  }

  ngOnInit(): void {} 

  ngAfterViewInit():void{

    // var map = new Map({
    //   view: new View({
    //     projection: 'EPSG:4326',
    //     center: [80.98885377363007, 6.830454104603501],
    //     zoom: 17,
    //   }),
    //   layers: [
    //     new TileLayer({
    //       source: new OSM(),
    //     }),
    //   ],
    //   target: 'mymap'
    // }); 

    // var draw:any = Draw;
    // var snap:any = Snap;

    // function addInteraction():void {
    //   const selected_geom_type:string = "Polygon";
    //   if (selected_geom_type == "Polygon") {
    //     snap = new Snap({
    //       source: new VectorSource(), 
    //     });
    //     draw = new Draw({
    //       source: new VectorSource(),
    //       type: "Polygon",
    //     });
    //     map.addInteraction(draw);
    //     map.addInteraction(snap);
    //   }else{
    //     return;
    //   }
    // } 

    // addInteraction();

  }

}
