import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

type SplitElement = HTMLElement & { _splitInstance?: GSAPSplitText };

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current || !text) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const el = ref.current as SplitElement;
    let targets: Element[] = [];

    const splitInstance = new GSAPSplitText(el, {
      type: splitType,
      smartWrap: true,
      autoSplit: splitType === "lines",
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char",
      reduceWhiteSpace: false,
    });
    el._splitInstance = splitInstance;

    if (splitType.includes("chars") && splitInstance.chars.length) targets = splitInstance.chars;
    if (!targets.length && splitType.includes("words") && splitInstance.words.length) targets = splitInstance.words;
    if (!targets.length && splitType.includes("lines") && splitInstance.lines.length) targets = splitInstance.lines;
    if (!targets.length) targets = splitInstance.chars || splitInstance.words || splitInstance.lines;

    const tween = gsap.fromTo(targets, { ...from }, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      onComplete: onLetterAnimationComplete,
      willChange: "transform, opacity",
      force3D: true,
    });

    return () => {
      tween.kill();
      try {
        splitInstance.revert();
      } catch {
        // no-op
      }
      el._splitInstance = undefined;
    };
  }, [text, delay, duration, ease, splitType, from, to, onLetterAnimationComplete]);

  const style: React.CSSProperties = {
    textAlign,
    overflow: "hidden",
    display: "inline-block",
    whiteSpace: "normal",
    wordWrap: "break-word",
    willChange: "transform, opacity",
  };
  const classes = `split-parent ${className}`;
  const Tag = (tag || "p") as React.ElementType;

  return (
    <Tag ref={ref} style={style} className={classes}>
      {text}
    </Tag>
  );
};

export default SplitText;
