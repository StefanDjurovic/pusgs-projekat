import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import Feature from 'ol/Feature';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as vector} from 'ol/source';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import {Icon, Style} from 'ol/style';
import {BingMaps} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {toLonLat} from 'ol/proj';
import {transform} from 'ol/proj';
import Point from 'ol/geom/Point';
import { MapInfo } from 'src/app/_models/MapInfo';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  @Input() enablePinDrop = true; // ova 3 inputa za prikazivanje
  @Input() locationLon: number;
  @Input() locationLat: number;
  @Input() incidents: MapInfo[];
  @Input() vehicle: MapInfo[];
  @Output() locationEmitter = new EventEmitter(); // output kad treba da se pokupi adresa
  


  map: Map


  constructor() { }

  ngAfterViewInit() {

    const markerSource = new vector();

    var markerStyle = new Style({
      image: new Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 1], // offset
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        // anchorYUnits: 'pixels',
        opacity: 0.85,
        // imgSize: [20, 20]
        // imgSize: [20, 20],
        // color: '#000000',
        src: '../../../assets/img/mapMarker.svg'
      }))
    });


    var layers = [
      new TileLayer({
          source: new BingMaps({

            key: 'AskJG9HryjPavQx4wqy6K4EtADVMpu5fyiBRRmiSnsc2VlZC_tWcB0C6MZ2W8K6W',
            //  +
            //  '&st=wt|fc:30728c;lbc:aaaaaa;loc:00888888_rd|fc:0f292f;lbc:dcdcdc;loc:0014a098;sc:0f292f_pr|fc:0f292f_rl|fc:000000_pp|lbc:ffffff;loc:00ffffff_me|fc:0f1a1d_nh|loc:00000000_is|loc:00ff0000_tr|loc:00000000_nt|lbc:30728c;loc:00000000_global|landColor:071216',

            imagerySet: ['RoadOnDemand', 'CanvasDark'],
            maxZoom: 19,
          }),
        }),
        new VectorLayer({
          source: markerSource,
          style: markerStyle,
        }),
    ];

    var center;
    if (this.locationLon && this.locationLat) {
      center = fromLonLat([this.locationLon, this.locationLat]);
    } else {
      center = fromLonLat([19.8419407, 45.2516708]);
    }

    this.map = new Map({
      target: 'map',
      layers: layers,
      view: new View({
        center: center,
        zoom: 13.75
      }),
      controls: []
    });

    function addMarker(lon, lat) {
      var iconFeatures = [];

      var iconFeature = new Feature({
        geometry: new Point(transform([lon, lat], 'EPSG:4326',
          'EPSG:3857')),
      });
      markerSource.clear();
      markerSource.addFeature(iconFeature);
    }

    if (this.enablePinDrop) {

      // disable doubleClickZoom
      var dblClickInteraction;
      this.map.getInteractions().getArray().forEach(function(interaction) {
        if (interaction instanceof DoubleClickZoom) {
          dblClickInteraction = interaction;
        }
      });
      this.map.removeInteraction(dblClickInteraction);

      // add marker
      this.map.on('dblclick', (event) => {
        var lonLat = toLonLat(event.coordinate);
        addMarker(lonLat[0], lonLat[1]);
        this.reverseGeocode(lonLat);

      });
    } 
     
    if (this.locationLat && this.locationLon) {
      addMarker(this.locationLon, this.locationLat);
    }

  }

  reverseGeocode(coords) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1] + '&name:en=*')
      .then(response => {
             return response.json();
         }).then((json) => {
             console.log(`from map - emitting`);
             
             this.locationEmitter.emit(json);
            // console.log(this);
            
         });
  }

}
