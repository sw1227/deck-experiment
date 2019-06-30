import React from "react";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import BasicMap from "./views/BasicMap";
import GeoJsonMap from "./views/TokyoGeoJson";
import Scenegraph from "./views/Scenegraph";


function Index() {
  return (
    <div>
      <h2>Home</h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about/">About</Link>
        </li>
        <li>
          <Link to="/geojson">GeoJSON</Link>
        </li>
        <li>
          <Link to="/scenegraph">Scenegraph</Link>
        </li>
      </ul>
    </div>
  );
}


function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={BasicMap} />
        <Route path="/geojson/" component={GeoJsonMap} />
        <Route path="/scenegraph/" component={Scenegraph} />
      </div>
    </Router>
  );
}


export default AppRouter;
