<<<<<<< HEAD
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import MyNavbar from "./BootstrapComponents/MyNavbar";
import MyVerticallyCenteredModal from "./BootstrapComponents/MyVerticallyCenteredModal";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCircleDown, faCircleUp } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faCircleDown, faCircleUp);
=======
import React, { useEffect } from "react";
import GoogleMapReact from 'google-map-react';
>>>>>>> 6609a5d3a353b9f02ab1b2e94ed6d2510c4816d2

import Commit from "./api/api";
import getAllUser from "./api/api";
const AnyReactComponent = ({ text }) => <div>{text}</div>;

function App() {

  const [showForm, setShowForm] = useState(false)

  const defaultProps = { center: { lat: 45.5019, lng: -73.5674 }, zoom: 11 };

  const heatMapData = {
    positions: [
      { lat: 55.5, lng: 34.56 },
      { lat: 34.7, lng: 28.4 },
    ],
<<<<<<< HEAD
    options: { radius: 20, opacity: 0.6 },
  };
=======
    options: {
      radius: 20,
      opacity: 0.6,
    }
  }
  useEffect(() => {
    getAllUser().then((response) => {console.log(response)}).catch((err) => {console.log(err)})

  },[])
>>>>>>> 6609a5d3a353b9f02ab1b2e94ed6d2510c4816d2

  const formClickHandler = () => {
      setShowForm(true);
  };

  return (
    <>
      {<MyVerticallyCenteredModal show={showForm} onHide={() => setShowForm(false)} />}
      <MyNavbar onShow={formClickHandler} />
      {/*Important! Always set the container height explicitly */}
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyBhll2fXJ6qdqAJlBfBHv4g5y30vdM1IqY" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} heatmapLibrary={true} heatmap={heatMapData}>
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </>
  );
}

export default App;
