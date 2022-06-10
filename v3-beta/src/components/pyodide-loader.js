import React from "react";
import Helmet from "react-helmet";

/**
 * Load pyodide v0.20.0 via CDN
 */
const PyodideLoader = ({ setLoad }) => {
  return (
    <>
      <Helmet
        script={[{ src: "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/pyodide.js" }]}
        onChangeClientState={(newState, addedTags) => {
          if (addedTags.scriptTags) {
            addedTags.scriptTags[0].onload = () => {
              console.log("pyodide loaded!");
              setLoad("loaded");
            };
          } else if (loadPyodide) {
            // if something goes wrong e.g addedTags === null
            console.log("pyodide loaded!");
            setLoad("loaded");
          }
        }}
      />
    </>
  );
};

export default PyodideLoader;
