"use client";

interface PageNavProps {
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

export default function PageNav({
  onPrev,
  onNext,
  prevDisabled = false,
  nextDisabled = false,
}: PageNavProps) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 1000,
        display: "flex",
        gap: 8,
        alignItems: "center",
      }}
    >
      <button
        type="button"
        onClick={onPrev}
        disabled={prevDisabled}
        aria-label="Previous page"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "2px solid rgba(230, 57, 70, 0.6)",
          background: prevDisabled ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.9)",
          color: prevDisabled ? "#999" : "#c1121f",
          cursor: prevDisabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!prevDisabled) {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        }}
      >
        ←
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        aria-label="Next page"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "2px solid rgba(230, 57, 70, 0.6)",
          background: nextDisabled ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.9)",
          color: nextDisabled ? "#999" : "#c1121f",
          cursor: nextDisabled ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          if (!nextDisabled) {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.12)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        }}
      >
        →
      </button>
    </nav>
  );
}
