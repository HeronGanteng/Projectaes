"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import PageNav from "../components/PageNav";
import heartIcon from "../public/love_icon-removebg-preview.png";

const SITE_URL = "https://projectaes.vercel.app/";

export default function QRPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background: "linear-gradient(180deg, #fff5f5 0%, #ffe8ec 50%, #ffd6e0 100%)",
      }}
    >
      <PageNav prevDisabled nextDisabled />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: 32,
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >
        <Image
          src={heartIcon}
          alt=""
          width={56}
          height={56}
          style={{ objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.1))" }}
        />
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1.25rem",
            color: "#333",
            margin: 0,
            fontWeight: 500,
          }}
        >
          Scan to open
        </h1>
        <QRCodeSVG
          value={SITE_URL}
          size={220}
          level="M"
          bgColor="#ffffff"
          fgColor="#c1121f"
          marginSize={2}
          title="QR code to projectaes.vercel.app"
        />
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: 14,
            color: "#c1121f",
            textDecoration: "none",
          }}
        >
          {SITE_URL}
        </a>
      </div>
    </div>
  );
}
