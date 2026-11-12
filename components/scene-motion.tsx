"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function animatePortrait(portrait: HTMLElement) {
  gsap.from(portrait, {
    y: 11,
    rotation: -3,
    scale: .96,
    duration: 1.25,
    ease: "power2.out",
    scrollTrigger: { trigger: portrait, start: "top 86%", toggleActions: "play none none none" },
  });
}

function animateMotif(motif: SVGSVGElement) {
  const part = motif.querySelector("[data-motif-part]");
  if (!part) return;

  const motion = gsap.timeline({
    defaults: { ease: "sine.inOut", transformOrigin: "50% 50%" },
    repeat: -1,
    paused: true,
  });

  switch (motif.dataset.motif) {
    case "haldi":
      motion.to(part, { rotation: 360, duration: 7, ease: "none" });
      break;
    case "sangeet":
      motion.to(part, { y: -7, rotation: -9, duration: .8, repeat: 1, yoyo: true });
      break;
    case "wedding":
      motion.to(part, { scale: .62, opacity: .4, duration: 1.15, repeat: 1, yoyo: true });
      break;
    case "reception":
      motion.to(part, { scaleX: .84, scaleY: 1.11, rotation: -7, transformOrigin: "50% 100%", duration: .48, repeat: 1, yoyo: true });
      break;
  }
  return motion;
}

export default function SceneMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (!root.current) return;
      const scope = root.current;
      const hero = scope.querySelector<HTMLElement>(".hero");
      if (!hero) return;
      const entrance = gsap.timeline({ defaults: { duration: 1.25, ease: "power2.out" } });
      entrance.from(".hero-title", { y: 9, opacity: .87 }, 0)
        .from(".hero-stage", { opacity: .83 }, 0);
      const layers = gsap.timeline({ scrollTrigger: {
        trigger: hero, start: "top top", end: "bottom top", scrub: .65, invalidateOnRefresh: true,
      } });
      for (const [layer, distance] of Object.entries({ sky: 16, temple: 31, mist: 36, foliage: 44, flowers: 58 })) {
        layers.to(`[data-layer="${layer}"]`, { y: () => distance * (innerWidth >= 768 ? 1 : .46), ease: "none" }, 0);
      }
      const ambient = gsap.to(".mist-drift", {
        xPercent: 5, opacity: .84, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
      });
      const loops = new Map<Element, gsap.core.Animation>([[hero, ambient]]);
      scope.querySelectorAll<SVGSVGElement>("[data-motif]").forEach((motif) => {
        const motion = animateMotif(motif);
        if (motion) loops.set(motif, motion);
      });
      const visible = new Set<Element>();
      const onVisibility = () => {
        loops.forEach((motion, element) => motion.paused(document.hidden || !visible.has(element)));
      };
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        onVisibility();
      });
      loops.forEach((_, element) => observer.observe(element));
      document.addEventListener("visibilitychange", onVisibility);
      const portrait = scope.querySelector<HTMLElement>("[data-portrait]");
      if (portrait) animatePortrait(portrait);
      scope.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: .72, y: 12, duration: .65, ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 91%", toggleActions: "play none none none" },
        });
      });
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }, root.current ?? undefined);
    return () => media.revert();
  }, { scope: root });

  return <div ref={root}>{children}</div>;
}

