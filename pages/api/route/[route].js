import fetch from "isomorphic-unfetch";
import { response } from "express";

export default async (req, res) => {
  const {
    query: { route },
  } = req;

  try {
    // construct the request to WMATA
    const apiKey = process.env.WMATA_API_KEY;

    // send request to WMATA
    // note - double awaits were important
    const route_response = await fetch(
      // `https://api.wmata.com/Bus.svc/json/jRouteDetails?api_key=${apiKey}&RouteID=${route}`
      "https://hosting-stg.wsapi-stg.cloud.bom.gov.au/arcgis/rest/services/mdbwip/Storages/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&geometryPrecision=6&f=geojson&token=VP7OHmxWShL7a5scLXai0lwoM_1dezwvYO1292_sBTSDzwBaTQqMXiduONglgUp2d2OlvBlXCbL7Lkjg1Da9K3yow9DtsSpUNG_JRK8duq1mjqq3j3boKHiV3yPwfRgfO7HFE25UcQ-N2gOEE2RHC4_L5G6dyjGlzPain3x12-Q5hTXc2kWfLnHCZsSGQPa3"
    );
    const response_data = await route_response.json();

    res.json(response_data);
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
