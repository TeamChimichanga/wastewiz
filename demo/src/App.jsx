/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import WasteWizLogo from "/wastewiz.svg";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import predictApi from "./api/predict-api";

const Prediction = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} alt='prediction' />;

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    const response = await predictApi.predict(selectedFile);
    console.log({ response });
  };

  useEffect(() => {
    if (prediction) {
      setPrediction(null);
    }
  }, [prediction, selectedFile]);

  useEffect(() => {
    setLoading(true);
    predictApi
      .ping()
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.error({ error });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
        <CircularProgress color='inherit' />
      </Backdrop>
    );
  }

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={WasteWizLogo} className='logo' alt='WasteWiz' />
        </a>
      </div>
      <h1>WasteWiz 🧙</h1>
      <p className='read-the-docs'>
        <b>Disclamer:</b> This is just a DEMO for the object detection and prediction model. WasteWiz is a mobile
        application with more features. You can see the source code by clicking on the logo above or see the video
        showcasing the app here: <a href='www.google.com'>video</a>.
      </p>
      <div className='card'>
        <input type='file' onChange={handleFileChange} />
        <Button onClick={handleUpload}>Detect objects</Button>
        {prediction && (
          <div>
            <h3>Prediction:</h3>
            <p>{prediction?.unique_classes.join(", ") || ""}</p>
            <Prediction data={prediction?.result_image_base64 || ""} />
            <Button onClick={() => setPrediction(null)}>Clear</Button>
          </div>
        )}
        {!prediction && selectedFile && (
          <div>
            <h3>Selected Image:</h3>
            <img src={URL.createObjectURL(selectedFile)} alt='Selected' style={{ maxWidth: "100%" }} />
          </div>
        )}
      </div>
      <p className='read-the-docs'>
        <b>WasteWiz 🧙</b> currently supports the following classes: <b>cardboard, glass, metal, paper, plastic</b>
      </p>
    </>
  );
}

export default App;
