// src/pages/SaplingChallenge.jsx
import React, { useState, useEffect, useRef } from "react";

const SaplingChallenge = () => {
  const [model, setModel] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState("📚 Checking libraries...");
  const [modelStatus, setModelStatus] = useState("⏳ Waiting for libraries...");
  const [imagePreview, setImagePreview] = useState("");
  const [result, setResult] = useState("");
  const [predictButtonDisabled, setPredictButtonDisabled] = useState(true);

  const fileInputRef = useRef(null);
  const imagePreviewRef = useRef(null);
  const modelURL = "https://teachablemachine.withgoogle.com/models/2Vu69SrNV/";

  const loadScript = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  };

  const loadLibraries = async () => {
    try {
      setLibraryStatus("📦 Loading TensorFlow.js...");
      await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js");
      setLibraryStatus("🤖 Loading Teachable Machine...");
      await loadScript("https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js");
      setLibraryStatus("✅ Libraries loaded!");
      await loadModel();
    } catch (err) {
      console.error(err);
      setLibraryStatus("❌ Failed to load libraries");
      setModelStatus("❌ Cannot proceed without libraries");
    }
  };

  const loadModel = async () => {
    try {
      setModelStatus("🔗 Loading AI model...");
      const loadedModel = await window.tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
      setModel(loadedModel);
      setIsModelLoaded(true);
      setModelStatus("✅ AI model loaded!");
      setPredictButtonDisabled(false);
    } catch (err) {
      console.error(err);
      setModelStatus("❌ Failed to load AI model");
    }
  };

  const handleImageUpload = (e) => {
    setResult("");
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handlePredict = async () => {
    if (!imagePreview || !isModelLoaded || !model) return;

    setResult("🔍 Analyzing...");
    try {
      const predictions = await model.predict(imagePreviewRef.current);
      const top = predictions.reduce((a, b) => (a.probability > b.probability ? a : b));
      if (top.className === "Planting a sapling" && top.probability > 0.7) {
        setResult(`✅ Success! Confidence: ${Math.round(top.probability * 100)}%`);
      } else {
        setResult("❌ Not recognized as planting a sapling.");
      }
    } catch (err) {
      console.error(err);
      setResult("❌ Prediction error");
    }
  };

  useEffect(() => {
    loadLibraries();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#2e7d32", marginBottom: "10px" }}>🌱 Verify Sapling Planting</h2>
      <p style={{ marginBottom: "15px", fontSize: "14px" }}>Upload a photo of your planted sapling</p>

      <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
      <br />
      <button
        onClick={handlePredict}
        disabled={predictButtonDisabled}
        style={{
          marginTop: "10px",
          padding: "8px 16px",
          background: predictButtonDisabled ? "#ccc" : "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: predictButtonDisabled ? "not-allowed" : "pointer",
        }}
      >
        Verify
      </button>

      {imagePreview && (
        <img
          ref={imagePreviewRef}
          src={imagePreview}
          alt="Preview"
          style={{ marginTop: "15px", maxWidth: "100%", borderRadius: "5px" }}
        />
      )}

      <div style={{ marginTop: "10px", fontWeight: "bold", color: result.includes("Success") ? "green" : "red" }}>
        {result}
      </div>

      <div style={{ marginTop: "10px", fontSize: "12px", color: libraryStatus.includes("✅") ? "green" : "black" }}>
        {libraryStatus}
      </div>
      <div style={{ marginTop: "5px", fontSize: "12px", color: modelStatus.includes("✅") ? "green" : "black" }}>
        {modelStatus}
      </div>
    </div>
  );
};

export default SaplingChallenge;
