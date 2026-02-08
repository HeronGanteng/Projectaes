"use client";

import { Button, Container } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import heartIcon from "./public/love_icon-removebg-preview.png";

const LOADING_DURATION_MS = 3500; // 3.5 seconds

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, (elapsed / LOADING_DURATION_MS) * 100);
      setProgress(next);
      if (next >= 100) {
        clearInterval(interval);
        setLoadingComplete(true);
      }
    }, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        background: "linear-gradient(180deg, #fff5f5 0%, #ffe8ec 50%, #ffd6e0 100%)",
      }}
    >
      {!loadingComplete ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: 320,
          }}
        >
          {/* Heart icon above the bar */}
          <div
            style={{
              position: "relative",
              marginBottom: -8,
              zIndex: 1,
              animation: "heartBounce 0.6s ease-in-out infinite",
            }}
          >
            <Image
              src={heartIcon}
              alt=""
              width={56}
              height={56}
              style={{ objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
            />
          </div>

          {/* Capsule loading bar */}
          <div
            style={{
              width: "100%",
              height: 24,
              borderRadius: 12,
              border: "2px solid #1a1a1a",
              backgroundColor: "#fff",
              overflow: "hidden",
              position: "relative",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${progress}%`,
                backgroundColor: "#e63946",
                borderRadius: progress >= 100 ? 10 : "10px 0 0 10px",
                transition: "width 0.05s linear",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
              }}
            />
          </div>

          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              color: "#666",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Loading... {Math.round(progress)}%
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "fadeInScale 0.6s ease-out",
          }}
        >
          <Button
            variant="contained"
            size="large"
            href="#"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.25rem",
              borderRadius: 9999,
              background: "linear-gradient(135deg, #e63946 0%, #c1121f 100%)",
              boxShadow: "0 4px 14px rgba(230, 57, 70, 0.4)",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #c1121f 0%, #9d0208 100%)",
                boxShadow: "0 6px 20px rgba(230, 57, 70, 0.5)",
                transform: "scale(1.05)",
              },
              animation: "startPulse 2s ease-in-out infinite",
            }}
          >
            Start
          </Button>
        </div>
      )}
    </Container>
  );
}
