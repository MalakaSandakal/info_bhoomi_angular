import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
import LayerSwitcher from 'ol-layerswitcher';
import { BaseLayerOptions,GroupLayerOptions } from 'ol-layerswitcher';
import OSM from 'ol/source/osm';

// import to draw
import Draw from'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import Snap from 'ol/interaction/Snap';

@Component({
  selector: 'app-drawtools',
  templateUrl: './drawtools.component.html',
  styleUrls: ['./drawtools.component.css']
})

export class DrawtoolsComponent implements OnInit {

  map:any=Map;
  draw:any=Draw;
  snap:any=Snap;
  selected_geom_type:string= '';
  layerSwitcher:any=LayerSwitcher;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(){
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
    this.layerSwitcher = new LayerSwitcher({
      tipLabel: 'Légende', // Optional label for button
      groupSelectStyle: 'children' // Can be 'children' [default], 'group' or 'none'
    });
    this.map.addControl(this.layerSwitcher)
  }



  pointToolEnabled(){
    this.map.removeInteraction(this.draw);
    this.selected_geom_type = "";
    this.selected_geom_type = "Point";
    this.addInteraction(this.selected_geom_type);    
  }

  polygonToolEnabled(){
    this.map.removeInteraction(this.draw);
    this.selected_geom_type = "";
    this.selected_geom_type = "Polygon";
    this.addInteraction(this.selected_geom_type);
  }

  lineToolEnabled(){
    this.map.removeInteraction(this.draw);
    this.selected_geom_type = "";
    this.selected_geom_type = "LineString";
    this.addInteraction(this.selected_geom_type);
  }

  addInteraction(geom_type:string){   
    if (geom_type !== "") {
      this.snap = new Snap({
        source: new VectorSource(), 
      });
      this.draw = new Draw({
        source: new VectorSource(),
        type: this.selected_geom_type,
      });
      this.map.addInteraction(this.draw);
      this.map.addInteraction(this.snap);
    }else{
      return;
    }    
  } 

}
