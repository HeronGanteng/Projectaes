"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import PageNav from "../components/PageNav";

export default function QuestionPage() {
  const router = useRouter();
  const [noClicks, setNoClicks] = useState(0);
  const [saidYes, setSaidYes] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const goToLetter = () => router.push("/");
  const goToResult = () => setSaidYes(true);
  const goBackToQuestion = () => setSaidYes(false);

  // Play sumika song when page loads (user came from "press this" so interaction happened)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const play = () => {
      audio.play().catch(() => {});
    };
    play();
  }, []);

  const handleNo = () => {
    setNoClicks((c) => c + 1);
    setYesScale((s) => Math.min(s + 0.5, 15)); // grow up to 15x, then full screen
  };

  const handleYes = () => {
    setSaidYes(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        boxSizing: "border-box",
        background: "linear-gradient(180deg, #fff5f5 0%, #ffe8ec 40%, #ffd6e0 100%)",
        animation: "questionPageIn 0.5s ease-out",
        overflow: "hidden",
      }}
    >
      <PageNav
        onPrev={saidYes ? goBackToQuestion : goToLetter}
        onNext={saidYes ? undefined : goToResult}
        nextDisabled={saidYes}
      />
      {/* Background audio - sumika song from public folder */}
      <audio
        ref={audioRef}
        src="/TV_OP_sumika_256KBPS.webm"
        loop
        autoPlay
        playsInline
        style={{ display: "none" }}
      />

      {saidYes ? (
        /* After clicking Yes: "I know you'd say yes" */
        <div
          style={{
            textAlign: "center",
            animation: "saidYesReveal 0.7s ease-out",
          }}
        >
          <p
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1.25rem, 4vw, 1.75rem)",
              color: "#333",
              margin: 0,
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            I know you&apos;d say yes
          </p>
          <span
            style={{
              display: "inline-block",
              marginTop: 16,
              fontSize: 28,
              animation: "floatHearts 1.5s ease-in-out infinite",
            }}
          >
            ♥
          </span>
        </div>
      ) : (
        <>
          <p
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(1rem, 3vw, 1.25rem)",
              color: "#444",
              marginBottom: 28,
              textAlign: "center",
              maxWidth: 360,
              lineHeight: 1.6,
            }}
          >
           So this is a small thing I wanted to give you. 
           A place to save our future travel photos.
           I’ve been lucky enough to explore a lot of the world already 
           — on my own and with my family — and as amazing as that’s been, I’ll be honest… I’m kind of bored doing it alone now.
           I’d much rather see the rest of it with you.

           So will you join me on the endavour as my partner in crime? :p
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              position: "relative",
            }}
          >
            {/* No button - stays normal size */}
            <Button
              variant="outlined"
              size="large"
              onClick={handleNo}
              sx={{
                px: 3,
                py: 1.25,
                fontSize: "1.1rem",
                borderRadius: 9999,
                borderColor: "#c1121f",
                color: "#c1121f",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#9d0208",
                  color: "#9d0208",
                  backgroundColor: "rgba(230, 57, 70, 0.08)",
                  transform: "scale(1.03)",
                },
                transition: "transform 0.2s ease",
              }}
            >
              No
            </Button>

            {/* Yes button - grows when user clicks No */}
            <Button
              variant="contained"
              size="large"
              onClick={handleYes}
              sx={{
                px: 3,
                py: 1.25,
                fontSize: "1.1rem",
                borderRadius: 9999,
                background: "linear-gradient(135deg, #e63946 0%, #c1121f 100%)",
                boxShadow: "0 4px 14px rgba(230, 57, 70, 0.4)",
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  background: "linear-gradient(135deg, #c1121f 0%, #9d0208 100%)",
                  boxShadow: "0 6px 20px rgba(230, 57, 70, 0.5)",
                  transform: `scale(${Math.min(yesScale * 1.05, 15)})`,
                },
                transform: `scale(${yesScale})`,
                transition: "transform 0.35s ease-out",
                animation: noClicks > 0 ? "none" : "floatHearts 2s ease-in-out infinite",
              }}
            >
              Yes
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
