import React from "react";
import "./App.css";
import Lottie from "react-lottie";
import animationData from "./lotties/sailing-ship";
import verifyDocumentData from "./lotties/document-verification";
import scanDocumentData from "./lotties/scan-document";
import sendDocumentData from "./lotties/send-document";

function App() {
  const shipOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const verifyOptions = {
    loop: true,
    autoplay: true,
    animationData: verifyDocumentData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const scanOptions = {
    loop: true,
    autoplay: true,
    animationData: scanDocumentData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const sendOptions = {
    loop: true,
    autoplay: true,
    animationData: sendDocumentData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <h1>Welcome to Secure DME. Here is what we can do:</h1>
      <div>
        <h2>Upload patient records and medical equipment information.</h2>
        <Lottie options={scanOptions} height={400} width={400} />
      </div>
      <div>
        <h2>Verify and format the uploaded information.</h2>
        <Lottie options={verifyOptions} height={400} width={400} />
      </div>
      <div>
        <h3>Securely transfer the information to your DME provider for billing.</h3>
        <Lottie options={sendOptions} height={200} width={400} />
      </div>
    </div>
  );
}

export default App;
