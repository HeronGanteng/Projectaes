"use client";

import { Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import PageNav from "./components/PageNav";
import heartIcon from "./public/love_icon-removebg-preview.png";
import backgroundLove from "./public/background-love.png";

const LOADING_DURATION_MS = 3500;
const TYPEWRITER_MS = 45;

const LETTER_TEXT = `Dear You,

I don’t know if I ever told you this properly, but you were my biggest crush about eight years ago (FR). Back then it was just one of those things you never really expect to turn into anything.

Life did its thing, time passed, and somehow the timing worked out differently this time.

I just want you to know how grateful I am that you’re here with me now. I really appreciate you choosing this, choosing us, and being part of my life the way you are. It feels easy, natural, and honestly pretty unreal in the best way.

Same people, better timing.

I’m really enraptured it’s you.
Happy Valentine’s.`;

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [view, setView] = useState<"loading" | "letter">("loading");
  const [typewriterLength, setTypewriterLength] = useState(0);
  const [showPressButton, setShowPressButton] = useState(false);

  const goToLoading = useCallback(() => setView("loading"), []);
  const goToQuestion = useCallback(() => router.push("/question"), [router]);

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
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const goToLetter = useCallback(() => {
    setView("letter");
  }, []);

  // Typewriter: only run when we're on the letter view
  useEffect(() => {
    if (view !== "letter") return;
    if (typewriterLength >= LETTER_TEXT.length) {
      setShowPressButton(true);
      return;
    }
    const t = setTimeout(() => {
      setTypewriterLength((n) => Math.min(n + 1, LETTER_TEXT.length));
    }, TYPEWRITER_MS);
    return () => clearTimeout(t);
  }, [view, typewriterLength]);

  // Letter view: background image + letter panel + typewriting + "press this" button
  if (view === "letter") {
    return (
      <div
        style={{
          minHeight: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          boxSizing: "border-box",
          animation: "letterPageIn 0.6s ease-out",
        }}
      >
        <PageNav onPrev={goToLoading} onNext={goToQuestion} />
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${backgroundLove.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.4)",
          }}
        />

        {/* Letter panel (white area in the center) */}
        <div
          style={{
            position: "relative",
            maxWidth: 420,
            width: "100%",
            padding: "32px 28px",
            backgroundColor: "rgba(255,255,255,0.92)",
            borderRadius: 8,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            border: "1px solid rgba(230, 57, 70, 0.2)",
          }}
        >
          <pre
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 15,
              lineHeight: 1.7,
              color: "#333",
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {LETTER_TEXT.slice(0, typewriterLength)}
            {typewriterLength < LETTER_TEXT.length && (
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1em",
                  backgroundColor: "#e63946",
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                  animation: "cursorBlink 0.8s step-end infinite",
                }}
              />
            )}
          </pre>

          {showPressButton && (
            <div
              style={{
                marginTop: 28,
                display: "flex",
                justifyContent: "center",
                animation: "fadeInScale 0.5s ease-out",
              }}
            >
              <Button
                component={Link}
                href="/question"
                variant="contained"
                size="medium"
                sx={{
                  px: 3,
                  py: 1.25,
                  fontSize: "1rem",
                  borderRadius: 9999,
                  background: "linear-gradient(135deg, #e63946 0%, #c1121f 100%)",
                  boxShadow: "0 4px 14px rgba(230, 57, 70, 0.35)",
                  textTransform: "none",
                  fontWeight: 600,
                  "&:hover": {
                    background: "linear-gradient(135deg, #c1121f 0%, #9d0208 100%)",
                    boxShadow: "0 6px 20px rgba(230, 57, 70, 0.45)",
                    transform: "scale(1.05)",
                  },
                  animation: "pressThisWiggle 2s ease-in-out infinite",
                }}
              >
                press this
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Loading view
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
      <PageNav prevDisabled onNext={goToLetter} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 320,
        }}
      >
        <div
          style={{
            position: "relative",
            marginBottom: -8,
            zIndex: 1,
            animation: loadingComplete ? "none" : "heartBounce 0.6s ease-in-out infinite",
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
          {loadingComplete ? "Ready!" : `Loading... ${Math.round(progress)}%`}
        </p>

        {loadingComplete && (
          <div style={{ marginTop: 24, animation: "fadeInScale 0.6s ease-out" }}>
            <Button
              variant="contained"
              size="large"
              onClick={goToLetter}
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
      </div>
    </Container>
  );
}
