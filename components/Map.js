import MapGL, { Marker, CanvasOverlay } from "react-map-gl";
import React, { useState, useContext, PureComponent } from "react";
import { mapboxaccesstoken } from "../mapboxaccesstoken";
import "mapbox-gl/dist/mapbox-gl.css";
import { RouteContext } from "./RouteContext";

class PolylineOverlay extends PureComponent {
  _redraw({ width, height, ctx, isDragging, project, unproject }) {
    const {
      points,
      color = "#FF482D",
      lineWidth = 3,
      renderWhileDragging = true,
    } = this.props;
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = "lighter";

    if ((renderWhileDragging || !isDragging) && points) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;
      ctx.beginPath();
      points.forEach((point) => {
        const pixel = project([point[0], point[1]]);
        ctx.lineTo(pixel[0], pixel[1]);
      });
      ctx.stroke();
    }
  }

  render() {
    return <CanvasOverlay redraw={this._redraw.bind(this)} />;
  }
}

// main map component is here
const Map = () => {
  const [routes, setRoutes] = useContext(RouteContext);
  const [points, setPoints] = useContext(RouteContext);
  const scaleControlStyle = {
    left: 20,
    bottom: 100,
  };
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: "100%",
    longitude: -122.45,
    latitude: 37.78,
    zoom: 1,
  });
  console.log("000000", points);
  const _onViewportChange = (viewport) =>
    setViewPort({ ...viewport, transitionDuration: 20 });

  return (
    <>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={mapboxaccesstoken}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={_onViewportChange}
      >
        {routes.activeRoutes.map((route) => (
          <PolylineOverlay
            points={route.direction0LatLongs}
            key={route.RouteID}
          />
        ))}
        {points.data &&
          points.data?.features.map((obj) => {
            return (
              <Marker
                latitude={obj.geometry.coordinates[1]}
                longitude={obj.geometry.coordinates[0]}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <div>You are here</div>
              </Marker>
            );
          })}
      </MapGL>
      test
      {points.data?.features[0].geometry.coordinates[1]}
    </>
  );
};

export default Map;
