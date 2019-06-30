import React from "react";
import DeckGL from "@deck.gl/react";
import { GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import * as d3 from "d3";
import GL from "@luma.gl/constants";

// Read data from local file. data can be specified by URL, too.
import cityPolygon from "../data/N03-19_13_190101.geojson";
import landPrice from "../data/L01-19_13.geojson";


// Read-only public access token: restricted to localhost only
const MAPBOX_TOKEN = "pk.eyJ1Ijoic3cxMjI3IiwiYSI6ImNqeGg0enlsdDA0ZHUzbm1ud3pyczh6YzcifQ.ZtOUavf1mO9ys1hb5SSDSA";

// Initial viewport settings
const initialViewState = {
  longitude: 139.6,
  latitude: 35.7,
  zoom: 10,
  pitch: 0,
  bearing: 0
};

// Color scale used by data-driven coloring
// const colorScale = d3.interpolateViridis;
const colorScale = d3.interpolateCool;


// Function Component of Deck.gl GeoJSON view
const GeoJsonMap = () => {
  // Layers: City boundary & Land price points in Tokyo
  const layers = [
    new GeoJsonLayer({
      id: "city-polygon",
      data: cityPolygon,
      filled: false,
      stroked: true,
      opacity: 1,
      lineWidthUnits: 100,
      lineWidthMinPixels: 1,
      getLineColor: [255, 160, 80],
    }),
    new GeoJsonLayer({
      id: "land-price",
      data: landPrice,
      filled: true,
      stroked: false,
      opacity: 0.8,
      getRadius: 400,
      getFillColor: f => {
        // TODO: Data-driven Normalization
        const color = d3.color(colorScale(parseInt(f.properties.L01_006)/1000000));
        return [color.r, color.g, color.b];
      },
    })
  ];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
      parameters={{
        // Additive blending
        blendFunc: [GL.SRC_ALPHA, GL.ONE, GL.ONE_MINUS_DST_ALPHA, GL.ONE],
        blendEquation: GL.FUNC_ADD
      }}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_TOKEN}
        // Style: Dark them with name_ja
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        mapStyle="mapbox://styles/sw1227/cjxhcns5a0s3n1cp7zrrcoz3s"
      />
    </DeckGL>
  );
}


export default GeoJsonMap;
