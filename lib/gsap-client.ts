/* Client-only: ScrollTrigger при импорте трогает window. */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
gsap.registerPlugin(ScrollTrigger);

/* Меньше пересчётов при схлопывании адресной строки на мобильных. https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.config() */
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
