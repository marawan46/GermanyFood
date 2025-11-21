import { useEffect } from "react";

export default function useAnimateOnScroll(deps = [], selector = "[data-animate]") {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // مهم جدًا — لتخفيف اللود
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, deps); // لاحظ، هنا بنمرر dependencies
}
