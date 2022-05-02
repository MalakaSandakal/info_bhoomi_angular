import { Component, OnInit, Input } from '@angular/core';
import * as $ from 'jquery'; 
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
import LayerSwitcher from 'ol-layerswitcher';
import OSM from 'ol/source/osm';
import SourceStamen from 'ol/source/Stamen';
import BingMaps from 'ol/source/BingMaps';
// import to draw
import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import Snap from 'ol/interaction/Snap';
import Modify from 'ol/interaction/Modify'
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import {Control, ZoomSlider, defaults as defaultControls} from 'ol/control';

/*
  Global variables
*/
let map: any = Map;
let draw: any = Draw;
let snap: any = Snap;
let edit: any = Modify;
let selected_geom_type: string = '';
let flag_is_polygon_mode_on: boolean = false;


@Component({
  selector: 'app-drawtools',
  templateUrl: './drawtools.component.html',
  styleUrls: ['./drawtools.component.css']
})

export class DrawtoolsComponent implements OnInit {

  layerSwitcher: any = LayerSwitcher;
  baseLayer: any = LayerGroup;
  stop_tool_icon: string = '<i class ="far fa-stop-circle"></i>'
  polygon_tool_icon: string = '<i class ="fas fa-draw-polygon"></i>';
  line_tool_icon: string = '<i class="fas fa-bezier-curve"></i>';
  point_tool_icon: string = '<i class="fas fa-map-marker-alt"></i>';
  zoomSlider:any = ZoomSlider;

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  // Openstreet Layer
  osm = new TileLayer({title:'OSM', type:'base', visible:true, source: new OSM() }as BaseLayerOptions);

  // Bingmap layer
  bingmaps = new TileLayer({ title:'BingMaps', type:'base', visible:false, source: new BingMaps({key:'AshrP2YvBPN60emxJEFYNNNtBYcUAqEJ2J0FctgznIkRgrNnOdbPdRpbht_X7eD8',imagerySet:'AerialWithLabels'})}as BaseLayerOptions);

  // Layer options
  baseMaps = new LayerGroup({ title:'Base maps', layers:[this.osm,this.bingmaps]}as GroupLayerOptions);

  // Map initializing function
  initializeMap() {
    map = new Map({
      view: new View({projection: 'EPSG:4326',center: [80.98885377363007, 6.830454104603501],zoom: 17,}),
      layers: [ this.baseMaps ],
      target: 'mymap',
      controls: defaultControls().extend([new PointTool(''),new PolygonTool(''),new LineTool('')])
    });
    
    this.layerSwitcher = new LayerSwitcher({
      reverse:true,
      groupSelectStyle:'group'
    });

    this.zoomSlider = new ZoomSlider();

    map.addControl(this.layerSwitcher);
    // this.map.addControl(this.zoomSlider);

  }


  // pointToolEnabled() {
  //   if (this.flag_is_polygon_mode_on == false) {
  //     this.point_tool_icon = this.stop_tool_icon;
  //     this.selected_geom_type = "Point";
  //     this.addInteraction(this.selected_geom_type);
  //     this.flag_is_polygon_mode_on = true;
  //   } else {
  //     this.point_tool_icon = '<i class="fas fa-map-marker-alt"></i>';
  //     this.map.removeInteraction(this.draw);
  //     this.map.removeInteraction(this.snap);
  //     this.flag_is_polygon_mode_on = false;
  //   }
  // }

  // polygonToolEnabled() {
  //   if (this.flag_is_polygon_mode_on == false) {
  //     this.polygon_tool_icon = this.stop_tool_icon;
  //     this.selected_geom_type = "Polygon";
  //     this.addInteraction(this.selected_geom_type);
  //     this.flag_is_polygon_mode_on = true;
  //   } else {
  //     this.polygon_tool_icon = '<i class ="fas fa-draw-polygon"></i>';
  //     this.map.removeInteraction(this.draw);
  //     this.map.removeInteraction(this.snap);
  //     this.flag_is_polygon_mode_on = false;
  //   }
  // }

  // lineToolEnabled() {
  //   if (this.flag_is_polygon_mode_on == false) {
  //     this.line_tool_icon = this.stop_tool_icon;
  //     this.selected_geom_type = "LineString";
  //     this.addInteraction(this.selected_geom_type);
  //     this.flag_is_polygon_mode_on = true;
  //   } else {
  //     this.line_tool_icon = '<i class="fas fa-bezier-curve"></i>';
  //     this.map.removeInteraction(this.draw);
  //     this.map.removeInteraction(this.snap);
  //     this.flag_is_polygon_mode_on = false;
  //   }
  // }

}

class PolygonTool extends Control {

  constructor(opt_options:any) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = '<i class ="fas fa-draw-polygon"></i>';

    const element = document.createElement('div');
    element.className = 'polygon-tool ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.startPolygonDraw.bind(this), false);
  }

  startPolygonDraw() {    
    selected_geom_type = '';
    selected_geom_type = 'Polygon';
    if(flag_is_polygon_mode_on==false){
      addInteraction(selected_geom_type);
      map.addInteraction(draw);
      map.addInteraction(snap);
      flag_is_polygon_mode_on=true;
    }else{
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      flag_is_polygon_mode_on=false;
    }
  }
}

class PointTool extends Control {

  constructor(opt_options:any) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-map-marker-alt"></i>';

    const element = document.createElement('div');
    element.className = 'point-tool ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.startPointDraw.bind(this), false);
  }

  startPointDraw() {    
    selected_geom_type = 'Point';
    if(flag_is_polygon_mode_on==false){
      addInteraction(selected_geom_type);
      map.addInteraction(draw);
      map.addInteraction(snap);
      flag_is_polygon_mode_on=true;
    }else{
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      flag_is_polygon_mode_on=false;
    }
  }
}

class LineTool extends Control {

  constructor(opt_options:any) {
    const options = opt_options || {};

    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-bezier-curve"></i>';

    const element = document.createElement('div');
    element.className = 'line-tool ol-unselectable ol-control';
    element.appendChild(button);

    super({
      element: element,
      target: options.target,
    });

    button.addEventListener('click', this.startLineDraw.bind(this), false);
  }

  startLineDraw() {
    selected_geom_type = 'LineString';
    if(flag_is_polygon_mode_on==false){
      addInteraction(selected_geom_type);
      map.addInteraction(draw);
      map.addInteraction(snap);
      flag_is_polygon_mode_on=true;
    }else{
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      flag_is_polygon_mode_on=false;
    }
  }
}

function addInteraction(geom_type:string){
  if (geom_type !== "") {
    console.log(geom_type);
    snap = new Snap({
      source: new VectorSource(),
    });
    draw = new Draw({
      source: new VectorSource(),
      type: selected_geom_type,
    });
    map.addInteraction(draw);
    map.addInteraction(snap);
  } else {
    return;
  }
}