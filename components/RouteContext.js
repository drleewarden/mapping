import React, { useState, createContext, useEffect } from "react";
import starterRoutes from "../data/starterRoutes";
import useSWR from "swr";

export const RouteContext = createContext();

export const RouteProvider = (props) => {
  const { data, error } = useSWR(() => "/api/route/232");
  const [points, setPoints] = useState(null);
  const [routes, setRoutes] = useState({
    activeRoutes: starterRoutes,
    cachedRoutes: [],
    data: data,
  });

  useEffect(() => {
    // Update the document title using the browser API
    setPoints(data);
  });
  return (
    <RouteContext.Provider
      value={[routes, setRoutes]}
      plotLines={[points, setPoints]}
    >
      {props.children}
    </RouteContext.Provider>
  );
};
