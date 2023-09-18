import React from "react";
import QRCode from "qrcode.react";
import { Button } from "./ui/button";

interface QrCardProps {
  shortValue: string;
}

const QrCard = ({ shortValue }: QrCardProps) => {
  const link = origin + "/l/" + shortValue;

  const downloadQRCode = () => {
    const canvas = document.getElementById(
      "qr-gen"
    ) as HTMLCanvasElement | null;

    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${link}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
      console.error("Canvas element not found.");
    }
  };

  return (
    <div className="p-6 bg-background border-border rounded-xl border space-y-4 flex items-center flex-col justify-center">
      <div className="flex items-center w-full justify-between">
        <h2 className="font-bold">QR Code</h2>
        <Button variant="secondary" onClick={downloadQRCode}>
          Download PNG
        </Button>
      </div>
      <QRCode
        className="rounded-lg"
        id="qr-gen"
        value={link}
        size={290}
        level={"H"}
        includeMargin={true}
      />
    </div>
  );
};

export default QrCard;
