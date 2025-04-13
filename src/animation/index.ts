import gsap from "gsap";

/* -------------------------------------------------------------------------- */
/*                             Preloader Animation                            */
/* -------------------------------------------------------------------------- */
export const preLoaderAnim = () => {
  gsap.to(".loader-1", {
    width: 200,
    duration: 1,
    ease: "power2.inOut",
  });
  gsap.to(".loader-2", {
    width: 300,
    delay: 0.9,
    duration: 0.5,
    ease: "power2.inOut",
  });
  gsap.to(".preloader", {
    top: "-200%",
    duration: 1,
    delay: 1.2,
    ease: "power4-inOut",
  });
  gsap.to(".loader", {
    display: "none",
    delay: 1,
    duration: 0.1,
  });
};
