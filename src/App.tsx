import { useEffect, useRef, useState, useContext, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PROJECTS from './data/projects';
import { AppProvider, AppContext } from './contexts/AppContext';
import { useTranslation } from './i18n/useTranslation';
import { ThemeToggle } from './components/ThemeToggle';
import { LanguageSelector } from './components/LanguageSelector';

// ============================================================
// ✏️ EDITAR AQUI: Configurações do site
// ============================================================
const WHATSAPP_NUMBER = '5519995362190'; // ✏️ EDITAR AQUI: número do WhatsApp — +55 (19) 99536-2190
const WHATSAPP_MESSAGE_PT = encodeURIComponent('Olá, Arthur! Vim pelo site do AC Studio e quero conversar sobre um projeto.');
const WHATSAPP_MESSAGE_EN = encodeURIComponent('Hi Arthur! I came from the AC Studio website and I want to talk about a project.');
const EMAIL = 'contato@acstudio.com.br'; // ✏️ EDITAR AQUI: e-mail

// Redes sociais
const SOCIAL = {
  instagram: '#', // ✏️ EDITAR AQUI: link do Instagram
  linkedin: '#',  // ✏️ EDITAR AQUI: link do LinkedIn
  github: '#',    // ✏️ EDITAR AQUI: link do GitHub
};

// Helper para URL do WhatsApp baseada no idioma
function getWhatsAppUrl(lang: 'pt' | 'en'): string {
  const message = lang === 'pt' ? WHATSAPP_MESSAGE_PT : WHATSAPP_MESSAGE_EN;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// NAVIGATION
// ============================================================
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const { lang } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['inicio', 'sobre', 'servicos', 'projetos', 'contato'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { id: 'inicio', label: t('nav.inicio') },
    { id: 'sobre', label: t('nav.sobre') },
    { id: 'servicos', label: t('nav.servicos') },
    { id: 'projetos', label: t('nav.projetos') },
    { id: 'contato', label: t('nav.contato') },
  ];

  return (
    <>
      <nav
        className={`nav-fixed ${scrolled ? 'nav-scrolled' : ''}`}
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-18">
          <a href="#inicio" className="flex items-center gap-3 group" aria-label="AC Studio — Início">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-indigo to-brand-cyan flex items-center justify-center text-white font-bold text-sm">
              AC
            </div>
            <span className="text-text-primary font-semibold text-lg hidden sm:block">AC Studio</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'text-brand-cyan'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <LanguageSelector />
            </div>
            <a
              href={getWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t('nav.iniciarProjeto')}
            </a>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <LanguageSelector />
            <button
              className="flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
            >
              <span className={`w-6 h-0.5 bg-text-primary transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-text-primary transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-text-primary transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'active' : ''}`} role="dialog" aria-modal="true">
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-medium text-text-primary hover:text-brand-cyan transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href={getWhatsAppUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-medium"
          >
            {t('nav.iniciarProjeto')}
          </a>
        </div>
      </div>
    </>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const { lang } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-eyebrow', { y: 30, opacity: 0, duration: 0.8 })
        .from('.hero-title', { y: 40, opacity: 0, duration: 1 }, '-=0.5')
        .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-ctas > *', { y: 30, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.4')
        .from('.hero-browser', { y: 60, opacity: 0, scale: 0.95, duration: 1.2, ease: 'power2.out' }, '-=0.8')
        .from('.scroll-indicator', { opacity: 0, y: 10, duration: 0.6 }, '-=0.3');

      if (browserRef.current && window.matchMedia('(min-width: 768px)').matches) {
        gsap.to(browserRef.current, {
          scale: 1.08,
          rotateX: 4,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden"
    >
      <div className="hero-glow top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="hero-eyebrow text-text-secondary text-sm md:text-base tracking-wide uppercase mb-6">
          {t('hero.eyebrow')}
        </p>

        <h1 className="hero-title heading-xl mb-6">
          {t('hero.title1')} <span className="gradient-text">{t('hero.title2')}</span>.
          <br />
          {t('hero.title3')} <span className="gradient-text">{t('hero.title4')}</span>.
        </h1>

        <p className="hero-subtitle text-text-secondary text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={getWhatsAppUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine px-8 py-4 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-semibold text-base hover:opacity-90 transition-opacity"
          >
            {t('hero.ctaPrimary')}
          </a>
          <a
            href="#projetos"
            className="px-8 py-4 rounded-full border border-white/20 text-text-primary font-medium text-base hover:border-white/40 hover:bg-white/5 transition-all"
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>

        <div ref={browserRef} className="hero-browser browser-window max-w-2xl mx-auto" style={{ perspective: '1000px' }}>
          <div className="browser-dots">
            <div className="browser-dot bg-red-500/80" />
            <div className="browser-dot bg-yellow-500/80" />
            <div className="browser-dot bg-green-500/80" />
          </div>
          <div className="p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-indigo to-brand-cyan" />
              <div className="h-3 w-24 bg-white/10 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-white/8 rounded-full" />
              <div className="h-4 w-1/2 bg-white/6 rounded-full" />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="h-20 bg-gradient-to-br from-brand-indigo/20 to-transparent rounded-lg" />
              <div className="h-20 bg-gradient-to-br from-brand-cyan/20 to-transparent rounded-lg" />
              <div className="h-20 bg-gradient-to-br from-brand-indigo/10 to-brand-cyan/10 rounded-lg" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-8 w-24 bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full opacity-60" />
              <div className="h-8 w-20 border border-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-secondary">
        <span className="text-xs uppercase tracking-wider">{t('hero.scrollIndicator')}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-60">
          <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}

// ============================================================
// MARQUEE
// ============================================================
function Marquee() {
  const { t } = useTranslation();
  const items = t('marquee.items');
  
  return (
    <div className="marquee-container border-y border-white/5 bg-bg-secondary">
      <div className="marquee-content">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-text-secondary text-lg md:text-xl font-medium px-2">
            {items}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// STATS
// ============================================================
function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0]);
  const hasAnimated = useRef(false);
  const { t } = useTranslation();

  const stats = [
    { value: 15, suffix: '+', label: t('stats.stat1.label') },
    { value: 100, suffix: '%', label: t('stats.stat2.label') },
    { value: 3, suffix: '', label: t('stats.stat3.label') },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          stats.forEach((stat, i) => {
            const duration = 1500;
            const start = Date.now();
            const animate = () => {
              const elapsed = Date.now() - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCounts((prev) => {
                const next = [...prev];
                next[i] = Math.round(stat.value * eased);
                return next;
              });
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="counter-value heading-lg gradient-text mb-2">
                {counts[i]}{stat.suffix}
              </div>
              <p className="text-text-secondary text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SOBRE — STORYTELLING (OTIMIZADO)
// ============================================================
function Sobre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();

  const chapters = t('sobre.chapters');

  // Detectar viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Mobile: animação simples de entrada
    if (window.matchMedia('(max-width: 767px)').matches) {
      const chapterEls = sectionRef.current.querySelectorAll('.story-chapter');
      chapterEls.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
      return;
    }

    // Desktop: Intersection Observer (performático)
    const chapterEls = sectionRef.current.querySelectorAll('.story-chapter');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(chapterEls).indexOf(entry.target as Element);
            if (index !== -1) {
              setActiveChapter(index);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    chapterEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Memoizar cálculo para evitar re-renders desnecessários
  const progressPercent = useMemo(
    () => ((activeChapter + 1) / chapters.length) * 100,
    [activeChapter, chapters.length]
  );

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="section-padding bg-bg-secondary relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-brand-cyan text-sm uppercase tracking-wider mb-4">{t('sobre.eyebrow')}</p>
            <h2 className="heading-lg mb-6">
              {t('sobre.title')} <span className="gradient-text">{t('sobre.titleHighlight')}</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              {t('sobre.subtitle')}
            </p>
            <div className="hidden lg:block mt-8 w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="progress-bar-fill h-full w-full bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full"
                style={{ transform: `scaleX(${progressPercent / 100})` }}
              />
            </div>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {chapters.map((chapter: any, i: number) => (
              <div
                key={i}
                className={`story-chapter transition-opacity duration-500 ${isMobile || i === activeChapter ? 'opacity-100' : 'opacity-30'}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold gradient-text">{chapter.number}</span>
                  <h3 className="heading-md">{chapter.title}</h3>
                </div>
                <p className="text-text-secondary text-lg leading-relaxed pl-16">
                  {chapter.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SERVIÇOS
// ============================================================
function Servicos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const services = t('servicos.cards');

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.service-card');
    gsap.from(cards, {
      y: 50,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <section id="servicos" ref={sectionRef} className="section-padding bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-cyan text-sm uppercase tracking-wider mb-4">{t('servicos.eyebrow')}</p>
          <h2 className="heading-lg mb-4">
            {t('servicos.title')} <span className="gradient-text">{t('servicos.titleHighlight')}</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t('servicos.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service: any, i: number) => (
            <div key={i} className="service-card glass-card p-8 group cursor-default">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:gradient-text transition-all">
                {service.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// PROJECT IMAGE — Imagem estática com fallback de iniciais
// ============================================================
function ProjectImage({ src, alt, title }: { src: string; alt: string; title: string }) {
  const [hasError, setHasError] = useState(false);

  const getInitials = (t: string) =>
    t.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-indigo/20 to-brand-cyan/10">
        <span className="text-5xl font-bold gradient-text">{getInitials(title)}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="project-preview-image"
      onError={() => setHasError(true)}
    />
  );
}

// ============================================================
// PROJETOS
// ============================================================
function Projetos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { lang } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.project-card');
    if (cards.length > 0) {
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, []);

  return (
    <section id="projetos" ref={sectionRef} className="section-padding bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-cyan text-sm uppercase tracking-wider mb-4">{t('projetos.eyebrow')}</p>
          <h2 className="heading-lg mb-4">
            {t('projetos.title')} <span className="gradient-text">{t('projetos.titleHighlight')}</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t('projetos.subtitle')}
          </p>
        </div>

        {PROJECTS.length === 0 ? (
          <div className="empty-state-border p-12 md:p-20 text-center max-w-2xl mx-auto">
            <div className="text-5xl mb-6">✨</div>
            <h3 className="heading-md mb-4 text-text-primary">
              {t('projetos.emptyState.title')}
            </h3>
            <p className="text-text-secondary text-lg mb-8">
              {t('projetos.emptyState.subtitle')}
            </p>
            <a
              href={getWhatsAppUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-block px-8 py-4 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-semibold hover:opacity-90 transition-opacity"
            >
              {t('projetos.emptyState.cta')}
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card glass-card overflow-hidden group block"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-indigo/20 to-brand-cyan/10">
                  <ProjectImage
                    src={project.imagem}
                    alt={project.titulo}
                    title={project.titulo}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-brand-cyan transition-colors">
                    {project.titulo}
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">{project.descricao}</p>
                  <span className="inline-flex items-center gap-1 text-brand-cyan text-sm font-medium">
                    {t('projetos.verProjeto')}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3m0 0H5m6 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// PROCESSO
// ============================================================
function Processo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const steps = t('processo.steps');

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    gsap.to(lineRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
      },
    });

    const stepEls = sectionRef.current.querySelectorAll('.process-step');
    stepEls.forEach((el, i) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        delay: i * 0.15,
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-cyan text-sm uppercase tracking-wider mb-4">{t('processo.eyebrow')}</p>
          <h2 className="heading-lg">
            {t('processo.title')} <span className="gradient-text">{t('processo.titleHighlight')}</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-white/5">
            <div ref={lineRef} className="timeline-line w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step: any, i: number) => (
              <div key={i} className="process-step text-center md:text-left">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-brand-indigo to-brand-cyan text-white font-bold text-sm mb-4 relative z-10">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CTA FINAL + CONTATO
// ============================================================
function Contato() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { lang } = useContext(AppContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.from(sectionRef.current.querySelectorAll('.cta-animate'), {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <section id="contato" ref={sectionRef} className="section-padding bg-bg-secondary relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-indigo/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="cta-animate heading-lg mb-6">
          {t('contato.title')} <span className="gradient-text">{t('contato.titleHighlight')}</span>?
        </h2>
        <p className="cta-animate text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('contato.subtitle')}
        </p>
        <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWhatsAppUrl(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine px-10 py-4 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            {t('contato.ctaWhatsapp')}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="px-8 py-4 rounded-full border border-white/20 text-text-primary font-medium hover:border-white/40 hover:bg-white/5 transition-all"
          >
            {EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-12 border-t border-white/5 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-indigo to-brand-cyan flex items-center justify-center text-white font-bold text-xs">
              AC
            </div>
            <div>
              <p className="text-text-primary font-medium text-sm">AC Studio — por Arthur Capozzi</p>
              <p className="text-text-secondary text-xs">{t('footer.slogan')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-secondary hover:text-brand-cyan transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-secondary hover:text-brand-cyan transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-text-secondary hover:text-brand-cyan transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-text-secondary text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// WHATSAPP FLOATING BUTTON
// ============================================================
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const { lang } = useContext(AppContext);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={getWhatsAppUrl(lang)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg whatsapp-pulse hover:scale-110 transition-transform"
      aria-label="Chamar no WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function AppContent() {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Sobre />
        <Servicos />
        <Projetos />
        <Processo />
        <Contato />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
