import { Component, OnInit, Input } from '@angular/core';
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
import LayerSwitcher from 'ol-layerswitcher';
import OSM from 'ol/source/osm';

// import to draw
import Draw from 'ol/interaction/Draw';
import VectorSource from 'ol/source/Vector';
import Snap from 'ol/interaction/Snap';
import Modify from 'ol/interaction/Modify'

@Component({
  selector: 'app-drawtools',
  templateUrl: './drawtools.component.html',
  styleUrls: ['./drawtools.component.css']
})

export class DrawtoolsComponent implements OnInit {

  map: any = Map;
  draw: any = Draw;
  snap: any = Snap;
  edit: any = Modify;
  selected_geom_type: string = '';
  layerSwitcher: any = LayerSwitcher;
  baseLayer: any = LayerGroup;
  flag_is_polygon_mode_on: boolean = false;
  stop_tool_icon: string = '<i class ="far fa-stop-circle"></i>'
  polygon_tool_icon: string = '<i class ="fas fa-draw-polygon"></i>';
  line_tool_icon: string = '<i class="fas fa-bezier-curve"></i>';
  point_tool_icon: string = '<i class="fas fa-map-marker-alt"></i>';

  constructor() { }

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap() {
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

  pointToolEnabled() {
    if (this.flag_is_polygon_mode_on == false) {
      this.point_tool_icon = this.stop_tool_icon;
      this.selected_geom_type = "Point";
      this.addInteraction(this.selected_geom_type);
      this.flag_is_polygon_mode_on = true;
    } else {
      this.point_tool_icon = '<i class="fas fa-map-marker-alt"></i>';
      this.map.removeInteraction(this.draw);
      this.map.removeInteraction(this.snap);
      this.flag_is_polygon_mode_on = false;
    }
  }

  polygonToolEnabled() {
    if (this.flag_is_polygon_mode_on == false) {
      this.polygon_tool_icon = this.stop_tool_icon;
      this.selected_geom_type = "Polygon";
      this.addInteraction(this.selected_geom_type);
      this.flag_is_polygon_mode_on = true;
    } else {
      this.polygon_tool_icon = '<i class ="fas fa-draw-polygon"></i>';
      this.map.removeInteraction(this.draw);
      this.map.removeInteraction(this.snap);
      this.flag_is_polygon_mode_on = false;
    }
  }

  lineToolEnabled() {
    if (this.flag_is_polygon_mode_on == false) {
      this.line_tool_icon = this.stop_tool_icon;
      this.selected_geom_type = "LineSting";
      this.addInteraction(this.selected_geom_type);
      this.flag_is_polygon_mode_on = true;
    } else {
      this.line_tool_icon = '<i class="fas fa-bezier-curve"></i>';
      this.map.removeInteraction(this.draw);
      this.map.removeInteraction(this.snap);
      this.flag_is_polygon_mode_on = false;
    }
  }

  addInteraction(geom_type: string) {
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
    } else {
      return;
    }
  }

}
