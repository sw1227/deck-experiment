import React from "react";
import DeckGL from "@deck.gl/react";
import {StaticMap} from "react-map-gl";
import {ScenegraphLayer} from "@deck.gl/mesh-layers";
import {registerLoaders} from "@loaders.gl/core";
import {GLTFScenegraphLoader} from "@luma.gl/addons";
import * as d3 from "d3";
// Read glTFdata from local file. can be specified by URL, too.
import duck from "../data/Duck.glb";


// Register the proper loader for scenegraph.gltf
registerLoaders([GLTFScenegraphLoader]);

// Read-only public access token: restricted to localhost only
const MAPBOX_TOKEN = "pk.eyJ1Ijoic3cxMjI3IiwiYSI6ImNqeGg0enlsdDA0ZHUzbm1ud3pyczh6YzcifQ.ZtOUavf1mO9ys1hb5SSDSA";

// Initial viewport settings
const initialViewState = {
  longitude: 139.5,
  latitude: 35.5,
  zoom: 11,
  pitch: 60,
  bearing: -30
};


const size = 40;
const duckPositions = d3.cross(d3.range(size), d3.range(size)).map(d => (
  {position: [139 + d[0]/size, 35 + d[1]/size]}
));


const Scenegraph = () => {
  const layers = [
    new ScenegraphLayer({
      id: "scenegraph",
      data: duckPositions,
      scenegraph: duck,
      sizeScale: 1000,
      getOrientation: [0, 0, 90],
    })
  ];

  return (
    <DeckGL
      initialViewState={initialViewState}
      controller={true}
      layers={layers}
    >
      <StaticMap
        mapboxApiAccessToken={MAPBOX_TOKEN}
        // mapStyle="mapbox://styles/sw1227/cjxhcns5a0s3n1cp7zrrcoz3s"
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </DeckGL>
  );
}


export default Scenegraph;
