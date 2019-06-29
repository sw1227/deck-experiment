import React from "react";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";


// Read-only public access token: restricted to localhost only
const MAPBOX_TOKEN = "pk.eyJ1Ijoic3cxMjI3IiwiYSI6ImNqeGg0enlsdDA0ZHUzbm1ud3pyczh6YzcifQ.ZtOUavf1mO9ys1hb5SSDSA";

// Data to be used by the LineLayer
const data = [{ sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781] }];

// Initial viewport settings
const initialViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};


// Layers can be child component or "layer" prop of <DeckGL>
const BasicMap = () => (
  <DeckGL
    initialViewState={initialViewState}
    controller={true}
  >
    <StaticMap mapboxApiAccessToken={MAPBOX_TOKEN} />
    <LineLayer id="line-layer" data={data} />
  </DeckGL>
);


export default BasicMap;
