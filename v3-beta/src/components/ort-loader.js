import React from "react";
import Helmet from "react-helmet";

/**
 * Load onnxruntime-web via CDN, because uncertain problem when use bundler
 */
const ORTLoader = ({ setLoad }) => {
  return (
    <>
      <Helmet
        script={[{ src: "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js" }]}
        onChangeClientState={(newState, addedTags) => {
          if (addedTags.scriptTags) {
            addedTags.scriptTags[0].onload = () => {
              console.log("onnxruntime-web loaded!");
              setLoad("loaded");
            };
          }
        }}
      />
    </>
  );
};

export default ORTLoader;
