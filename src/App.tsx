import { useEffect } from "react";
import { ShaderBackground } from "@/components/ui/sih";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import "./App.css";

const INSTAGRAM_URL =
  "https://www.instagram.com/le.prxbhx_?stkn=aWc0N2g2Nmh4NGdr";
const WHATSAPP_URL =
  "https://wa.me/919994005837?text=Hi%20Prabhanjaan%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.";

export default function App() {
  useEffect(() => {
    // ---- Navbar: solid background after scrolling ----
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
      if (window.scrollY > 24) navbar?.classList.add("scrolled");
      else navbar?.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ---- Mobile menu ----
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    hamburger?.addEventListener("click", () => {
      const open = navLinks?.classList.toggle("open");
      hamburger?.classList.toggle("open", !!open);
      hamburger?.setAttribute("aria-expanded", String(!!open));
    });
    navLinks?.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        navLinks?.classList.remove("open");
        hamburger?.classList.remove("open");
        hamburger?.setAttribute("aria-expanded", "false");
      })
    );

    // ---- Reveal-on-scroll ----
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("visible"));
    }

    // ---- Active nav link while scrolling ----
    const sections = ["home", "about", "works", "tools", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const setActiveLink = () => {
      const pos = window.scrollY + 140;
      let current = sections[0]?.id ?? "home";
      sections.forEach((sec) => {
        if (sec.offsetTop <= pos) current = sec.id;
      });
      navLinks?.querySelectorAll("a").forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + current);
      });
    };
    window.addEventListener("scroll", setActiveLink, { passive: true });
    setActiveLink();

    // ---- Footer year ----
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", setActiveLink);
    };
  }, []);

  return (
    <div className="shader-stage">
      {/* Animated shader background (replaces the old grid) */}
      <div className="shader-canvas-wrap" aria-hidden="true">
        <ShaderBackground className="h-full w-full" />
      </div>
      {/* Scrim keeps the bright shader from washing out the text */}
      <div className="shader-scrim" aria-hidden="true"></div>

      <div className="shader-content">
      {/* ===== NAVBAR ===== */}
      <header className="navbar" id="navbar">
        <div className="container nav-inner">
          <a href="#home" className="logo">
            le.prxbhx__
          </a>

          <nav className="nav-links" id="navLinks">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#works">Works</a>
            <a href="#tools">Tools</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="nav-actions">
            <a
              className="btn btn-ghost btn-sm"
              href="https://wa.me/919994005837?text=Hi%20Prabhanjaan%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener"
            >
              Hire Me
            </a>
            <button
              className="hamburger"
              id="hamburger"
              aria-label="Toggle menu"
              aria-expanded="false"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero" id="home">
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="container hero-inner">
          <div className="hero-copy glass">
          <div className="hero-pill reveal">
            <span className="pulse-dot"></span> Available for freelance projects
          </div>

          <p className="hero-eyebrow reveal">
            Video Editor <span className="sep">✦</span> Web Creator
          </p>

          <h1 className="hero-name reveal">
            Prabhanjaan G.T
          </h1>

          <p className="hero-tagline reveal">
            I cut stories frame by frame — and build the web homes they live in.
          </p>

          <p className="hero-quote reveal">
            “Every frame tells a story. Every pixel has a purpose.”
          </p>

          <div className="hero-cta reveal">
            <a href="#works" className="btn btn-primary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Watch My Work
            </a>
            <a href="#contact" className="btn btn-outline">
              Let's Connect
            </a>
          </div>

          <div className="hero-features reveal">
            <div className="feature">
              <span className="feature-icon">🎬</span> Story-driven edits
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span> Fast turnaround
            </div>
            <div className="feature">
              <span className="feature-icon">💻</span> Modern websites
            </div>
          </div>
          </div>

          <div className="hero-photo reveal">
            <img
              src="assets/profile.jpg"
              alt="Prabhanjaan G.T — Video Editor & Web Creator"
            />
          </div>
        </div>

        <div className="timeline-strip" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>
            Video Editing ✦ Reels &amp; Shorts ✦ Color Grading ✦ Motion Graphics ✦
            Title Design ✦ Web Creation ✦ Social Media Edits ✦{" "}
          </span>
          <span>
            Video Editing ✦ Reels &amp; Shorts ✦ Color Grading ✦ Motion Graphics ✦
            Title Design ✦ Web Creation ✦ Social Media Edits ✦{" "}
          </span>
        </div>
      </div>

      {/* ===== ABOUT ===== */}
      <section className="section" id="about">
        <div className="container">
          <p className="eyebrow reveal">About Me</p>
          <h2 className="section-title reveal">
            The editor behind the cut<span className="accent">.</span>
          </h2>

          <div className="about-grid">
            <div className="about-text glass reveal">
              <p>
                I'm <strong>Prabhanjaan</strong> — a professional video editor and web
                creator who believes attention is earned, not demanded. From punchy reels
                to full-length features, I shape raw footage into experiences people
                actually remember.
              </p>
              <p>
                Beyond the timeline, I design and build clean, fast, mobile-first
                websites — so your brand doesn't just look good on screen, it lives
                beautifully on the web too.
              </p>
              <p className="about-sign">— “Cut the noise. Keep the story.”</p>
            </div>

            <div className="services">
              <article className="service-card glass reveal">
                <div className="service-icon">🎬</div>
                <h3>Video Editing</h3>
                <p>
                  Long-form and short-form edits, paced for engagement from the very
                  first second.
                </p>
              </article>
              <article className="service-card glass reveal">
                <div className="service-icon">📱</div>
                <h3>Reels &amp; Shorts</h3>
                <p>
                  Trend-aware, hook-first edits built to stop the scroll and earn the
                  share.
                </p>
              </article>
              <article className="service-card glass reveal">
                <div className="service-icon">🖥️</div>
                <h3>Web Creation</h3>
                <p>
                  Modern, responsive websites that load fast and turn visitors into
                  clients.
                </p>
              </article>
              <article className="service-card glass reveal">
                <div className="service-icon">✨</div>
                <h3>Motion &amp; Titles</h3>
                <p>
                  Clean transitions, animated titles and lower-thirds that elevate any
                  cut.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUOTE BAND ===== */}
      <section className="quote-band">
        <div className="container">
          <div className="quote-box glass reveal">
            <p>
              “A great edit isn't measured in frames — it's measured in{" "}
              <em>feelings</em>.”
            </p>
          </div>
        </div>
      </section>

      {/* ===== WORKS ===== */}
      <section className="section" id="works">
        <ContainerScroll
          titleComponent={
            <div className="works-title-glass glass">
              <p className="eyebrow">My Works</p>
              <h2 className="section-title">
                Works that speak louder than words<span className="accent">.</span>
              </h2>
              <p className="section-sub">
                Press play — no redirects, no downloads. Just the work.
              </p>
            </div>
          }
        >
          <div className="works-grid works-grid-scroll">
            <article className="work-card glass">
              <div className="work-media">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  src="assets/ALA%20BOLELO.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="work-info">
                <div className="work-meta">
                  <span className="work-tag">Featured Edit</span>
                  <span className="work-tag work-tag-alt">Video Editing</span>
                </div>
                <h3 className="work-title">Sample 1</h3>
                <p className="work-desc">
                  A story-driven edit — cut with intent, coloured with mood, and finished
                  to make every frame count. Watch it right here on the page.
                </p>
              </div>
            </article>

            <article className="work-card glass">
              <div className="work-media">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  src="assets/HUNTER%20350.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="work-info">
                <div className="work-meta">
                  <span className="work-tag work-tag-alt">Ride Edit</span>
                </div>
                <h3 className="work-title">Sample 2</h3>
                <p className="work-desc">
                  A ride that speaks — punchy cuts synced to the thump of the Royal
                  Enfield Hunter 350.
                </p>
              </div>
            </article>

            <article className="work-card glass">
              <div className="work-media">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  src="assets/GT%20650%20KALYANI.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="work-info">
                <div className="work-meta">
                  <span className="work-tag">Cinematic</span>
                </div>
                <h3 className="work-title">Sample 3</h3>
                <p className="work-desc">
                  Two wheels, one mood — a calm, cinematic ride-cut through the roads of
                  Kalyani.
                </p>
              </div>
            </article>

            <article className="work-card glass">
              <div className="work-media">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  src="assets/MEHABOOBA.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="work-info">
                <div className="work-meta">
                  <span className="work-tag work-tag-alt">Vibe Edit</span>
                </div>
                <h3 className="work-title">Sample 4</h3>
                <p className="work-desc">
                  A smooth, groove-first edit designed to loop — strong hook, stronger
                  vibe.
                </p>
              </div>
            </article>
          </div>

          </ContainerScroll>

          <div className="container">
            <p className="works-note glass reveal">
              More edits dropping soon — follow on Instagram to see them first.
            </p>
          </div>
        </section>

      {/* ===== TOOLS ===== */}
      <section className="section" id="tools">
        <div className="container">
          <p className="eyebrow reveal">My Toolkit</p>
          <h2 className="section-title reveal">
            The tools behind the cut<span className="accent">.</span>
          </h2>
          <p className="section-sub reveal">
            Four powerhouses that keep my work sharp — fast to load, impossible to
            put down. No bloat, just results.
          </p>

          <div className="services tools-grid">
            <article className="service-card glass reveal">
              <div className="service-icon tool-logo">
                <img src="assets/capcut-logo.jpg" alt="CapCut logo" />
              </div>
              <h3>CapCut</h3>
              <p>
                The free editor behind millions of trending reels — AI captions,
                smooth transitions and one-tap templates that turn raw clips into
                scroll-stopping shorts.
              </p>
              <p className="tool-phrase">“Edit fast. Post faster.”</p>
            </article>

            <article className="service-card glass reveal">
              <div className="service-icon tool-logo">
                <img src="assets/after-effects-logo.webp" alt="Adobe After Effects logo" />
              </div>
              <h3>After Effects</h3>
              <p>
                The industry standard for motion graphics and cinematic visual
                effects — where titles, lower-thirds and visual storytelling truly
                come alive.
              </p>
              <p className="tool-phrase">“Where motion comes alive.”</p>
            </article>

            <article className="service-card glass reveal">
              <div className="service-icon tool-logo">
                <img src="assets/picsart-logo.webp" alt="Picsart logo" />
              </div>
              <h3>Picsart</h3>
              <p>
                An all-in-one photo editor and design studio — thumbnails, posters
                and social graphics, with stickers, text and cinematic filters
                built right in.
              </p>
              <p className="tool-phrase">“Design without limits.”</p>
            </article>

            <article className="service-card glass reveal">
              <div className="service-icon tool-logo">
                <img src="assets/photoroom-logo.avif" alt="PhotoRoom logo" />
              </div>
              <h3>PhotoRoom</h3>
              <p>
                Swaps backgrounds and builds clean, studio-grade shots in seconds —
                a pocket photo studio for posters, thumbnails and product visuals.
              </p>
              <p className="tool-phrase">“A studio in your pocket.”</p>
            </article>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="section contact" id="contact">
        <div className="container contact-inner glass">
          <p className="eyebrow reveal">Contact</p>
          <h2 className="section-title reveal">
            Let's make something worth watching<span className="accent">.</span>
          </h2>
          <p className="section-sub reveal">
            Have a film, a reel or a website in mind? Reach me directly on Instagram or
            WhatsApp — clients usually get a reply fast.
          </p>

          <div className="contact-buttons reveal">
            {/* Instagram */}
            <a
              className="btn btn-instagram btn-lg"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166-1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
              <span>Instagram</span>
            </a>

            {/* WhatsApp */}
            <a
              className="btn btn-whatsapp btn-lg"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="contact-info reveal">
            <a href="tel:+919994005837" className="contact-line">
              📞 +91 99940 05837
            </a>
            <span className="contact-sep">•</span>
            <a
              href="https://www.instagram.com/le.prxbhx_?stkn=aWc0N2g2Nmh4NGdr"
              target="_blank"
              rel="noopener"
              className="contact-line"
            >
              @le.prxbhx_
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © <span id="year">2026</span> <strong>Prabhanjaan</strong> — Professional
            Video Editor &amp; Web Creator
          </p>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#works">Works</a>
            <a
              href="https://www.instagram.com/le.prxbhx_?stkn=aWc0N2g2Nmh4NGdr"
              target="_blank"
              rel="noopener"
            >
              Instagram
            </a>
            <a href="https://wa.me/919994005837" target="_blank" rel="noopener">
              WhatsApp
            </a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}