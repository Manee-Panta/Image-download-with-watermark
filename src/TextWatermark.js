import React, { useRef, useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { Typography } from "@mui/material"

function ScreenshotComponent({ onScreenshotTaken }) {
  const takeScreenShot = async () => {
    const node = document.getElementById("content");
    if (!node) {
      console.error("Element with id 'content' not found.");
      return;
    }

    const dataURI = await htmlToImage.toSvg(node, {
      filter: (node) => node.tagName !== "F",
      imagePlaceholder:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"></svg>',
    });

    onScreenshotTaken(dataURI);
  };

  return (
    <div className="App">
      <button onClick={takeScreenShot}>Take screenshot</button>
    </div>
  );
}

function WatermarkComponent({ watermarkText, screenshotDataURI }) {
  const canvasRef = useRef(null);
  const [combinedSvg, setCombinedSvg] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = screenshotDataURI;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Add a watermark text
      ctx.fillStyle = "rgba(0, 255, 0, 1.5)";
      ctx.font = "16px Verdana";
      ctx.fillText(watermarkText, 280, img.height - 180);

      const combinedSvg = generateCombinedSvg(canvas);
      setCombinedSvg(combinedSvg);
    };
  }, [screenshotDataURI, watermarkText]);

  const generateCombinedSvg = (canvas) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const canvasImage = new Image();
    canvasImage.src = canvas.toDataURL("image/png");
    const svgImg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "image"
    );
    svgImg.setAttribute("x", "0");
    svgImg.setAttribute("y", "0");
    svgImg.setAttribute("width", canvas.width);
    svgImg.setAttribute("height", canvas.height);
    svgImg.setAttribute("href", canvasImage.src);

    svg.appendChild(svgImg);

    const svgXml = new XMLSerializer().serializeToString(svg);

    return svgXml;
  };

  const handleDownloadClick = () => {
    const blob = new Blob([combinedSvg], { type: "image/svg+xml" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "combined_image.svg";
    a.style.display = "none";
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  };

  return (
    <div>
      <h2>(Text Watermark)</h2>
      <canvas ref={canvasRef} style={{ border: "1px solid #000" }}></canvas>
      {combinedSvg && (
        <>
          <br />
          <button variant="contained" color="warning" onClick={handleDownloadClick}>
            Download Combined Image
          </button>
        </>
      )}
    </div>
  );
}

function TextWatermark() {
  const [screenshotDataURI, setScreenshotDataURI] = useState(null);
  const watermarkText = <Typography variant="body1">Manita Panta</Typography>;
  console.log(watermarkText.props.children);

  const handleScreenshotTaken = (dataURI) => {
    setScreenshotDataURI(dataURI);
  };

  return (
    <div className="App">
      <ScreenshotComponent onScreenshotTaken={handleScreenshotTaken} />
      <WatermarkComponent
        watermarkText={watermarkText.props.children}
        screenshotDataURI={screenshotDataURI}
      />
    </div>
  );
}

export default TextWatermark;
