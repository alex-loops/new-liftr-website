import type { CSSProperties, ReactNode } from "react";
import type { Look } from "../data/content";
import { GlassStage } from "./GlassStage";
import { SplitText } from "./SplitText";

interface Props {
  look: Look;
  eyebrow?: string;
  title: string;
  intro: string;
  actions: ReactNode;
  /** faint editorial column grid — homepage only */
  grid?: boolean;
  /** replaces the glass sculpture (e.g. partner logos on the case study) */
  art?: ReactNode;
  /** smaller H1 for long titles */
  compact?: boolean;
}

/**
 * Hero card, spanning the site's content width.
 *   center         – type centred, sculpture rising beneath it (Home, Prove the pain)
 *   split          – type left, sculpture right (Prove the demand)
 *   split-reverse  – sculpture left, type right (Engine, Momentum)
 */
export function Hero({
  look,
  eyebrow,
  title,
  intro,
  actions,
  grid = false,
  art,
  compact = false,
}: Props) {
  const center = look.layout === "center";
  return (
    <section
      className={`liftr-hero theme-${look.theme} layout-${look.layout}${art ? " has-custom-art" : ""}${compact ? " hero-compact" : ""}`}
      data-reveal="hero"
      aria-labelledby="hero-title"
    >
      {grid && <div className="hero-rules" aria-hidden />}
      <div className="liftr-hero-copy">
        {eyebrow && (
          <p
            className="eyebrow hero-eyebrow"
            style={{ "--d": "80ms" } as CSSProperties}
          >
            <span className="eyebrow-dot" aria-hidden />
            {eyebrow}
          </p>
        )}
        <SplitText
          as="h1"
          id="hero-title"
          text={title}
          delay={eyebrow ? 160 : 80}
          stagger={38}
        />
        <p
          className="liftr-hero-intro hero-fade"
          style={{ "--d": "520ms" } as CSSProperties}
        >
          {intro}
        </p>
        <div
          className="hero-actions hero-fade"
          style={{ "--d": "640ms" } as CSSProperties}
        >
          {actions}
        </div>
      </div>
      {art ? (
        <div className="hero-art hero-art-custom">{art}</div>
      ) : (
        <div className="hero-art">
          <GlassStage
            eager
            sizes={
              center
                ? "(max-width: 640px) 120vw, 760px"
                : "(max-width: 640px) 120vw, (max-width: 1100px) 80vw, 680px"
            }
          />
        </div>
      )}
    </section>
  );
}
