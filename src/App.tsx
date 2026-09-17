import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PROJECTS from './data/projects';

// ============================================================
// ✏️ EDITAR AQUI: Configurações do site
// ============================================================
const WHATSAPP_NUMBER = '5511999999999'; // ✏️ EDITAR AQUI: número do WhatsApp
const WHATSAPP_MESSAGE = encodeURIComponent('Olá, Arthur! Vim pelo site do AC Studio e quero conversar sobre um projeto.');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
const EMAIL = 'contato@acstudio.com.br'; // ✏️ EDITAR AQUI: e-mail

// Redes sociais
const SOCIAL = {
  instagram: '#', // ✏️ EDITAR AQUI: link do Instagram
  linkedin: '#',  // ✏️ EDITAR AQUI: link do LinkedIn
  github: '#',    // ✏️ EDITAR AQUI: link do GitHub
};

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// NAVIGATION
// ============================================================
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
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
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'contato', label: 'Contato' },
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

          <div className="hidden md:flex items-center gap-8">
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
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Iniciar projeto
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`w-6 h-0.5 bg-text-primary transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-text-primary transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-text-primary transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
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
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-medium"
          >
            Iniciar projeto
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
          Desenvolvimento · Design · Inteligência Artificial
        </p>

        <h1 className="hero-title heading-xl mb-6">
          Inteligência para <span className="gradient-text">criar</span>.
          <br />
          Dedicação para <span className="gradient-text">transformar</span>.
        </h1>

        <p className="hero-subtitle text-text-secondary text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Sites, lojas virtuais e experiências digitais que aproximam sua empresa de quem precisa conhecê-la — com estratégia, design e IA aplicada com revisão humana.
        </p>

        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine px-8 py-4 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Iniciar um projeto
          </a>
          <a
            href="#projetos"
            className="px-8 py-4 rounded-full border border-white/20 text-text-primary font-medium text-base hover:border-white/40 hover:bg-white/5 transition-all"
          >
            Ver projetos
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
        <span className="text-xs uppercase tracking-wider">Role para explorar</span>
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
  const items = 'Sites · E-commerce · Blogs · Landing pages · Identidade visual · IA com revisão humana · ';
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

  const stats = [
    { value: 15, suffix: '+', label: 'projetos construídos' },
    { value: 100, suffix: '%', label: 'dos entregáveis com revisão humana' },
    { value: 3, suffix: '', label: 'pilares: estratégia, design e tecnologia' },
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
// SOBRE — STORYTELLING
// ============================================================
function Sobre() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      number: '01',
      title: 'Onde tudo começou',
      text: 'O AC Studio nasceu de uma percepção simples: em um mundo hiperconectado, muitas empresas ainda têm uma presença digital fraca, distante do valor que realmente entregam. Antes de atender clientes, foram 15+ projetos pessoais — cada um uma oportunidade de aprender, testar ideias e transformar conceitos em experiências digitais concretas.',
    },
    {
      number: '02',
      title: 'O desafio',
      text: 'Bons produtos, bons serviços e boas histórias que o digital não consegue contar. Um site desatualizado ou uma experiência confusa fazem uma marca perder credibilidade e oportunidades — mesmo quando existe qualidade por trás dela.',
    },
    {
      number: '03',
      title: 'A virada',
      text: 'A inteligência artificial acelerou tudo: mais velocidade, mais ideias, projetos sofisticados mais acessíveis. Mas a verdadeira virada é usá-la com responsabilidade — sem aceitar resultado automático, sem perder o olhar humano.',
    },
    {
      number: '04',
      title: 'O que nos move',
      text: 'Cada projeto começa com escuta, entendimento e parceria. Preguiça não é uma opção: curiosidade para aprender, disciplina para executar e responsabilidade para revisar cada resultado.',
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

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

    const totalHeight = chapters.length;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${totalHeight * 60}vh`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const chapterIndex = Math.min(
          Math.floor(progress * totalHeight),
          totalHeight - 1
        );
        setActiveChapter(chapterIndex);
      },
    });
  }, []);

  const progressPercent = ((activeChapter + 1) / chapters.length) * 100;

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="section-padding bg-bg-secondary relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-brand-cyan text-sm uppercase tracking-wider mb-4">Nossa história</p>
            <h2 className="heading-lg mb-6">
              A história por trás do <span className="gradient-text">AC Studio</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Ajudar empresas a ocupar seu espaço no digital com mais clareza, personalidade e confiança — transformando ideias e negócios em marcas percebidas, compreendidas e lembradas.
            </p>
            <div className="hidden lg:block mt-8 w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-indigo to-brand-cyan rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {chapters.map((chapter, i) => (
              <div
                key={i}
                className={`story-chapter transition-opacity duration-500 ${i === activeChapter ? 'opacity-100' : 'opacity-30'}`}
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

  const services = [
    { icon: '🌐', title: 'Sites profissionais', desc: 'Presença digital moderna, rápida e coerente com a sua marca.' },
    { icon: '🛒', title: 'Lojas virtuais', desc: 'E-commerce pensado para vender, do catálogo ao checkout.' },
    { icon: '📝', title: 'Blogs e conteúdo', desc: 'Estrutura pronta para publicar e ser encontrado no Google.' },
    { icon: '🚀', title: 'Páginas de lançamento', desc: 'Landing pages focadas em uma única ação: converter.' },
    { icon: '🎨', title: 'Identidade visual', desc: 'Marca, cores e tipografia em um sistema visual consistente.' },
    { icon: '🤖', title: 'IA aplicada com critério', desc: 'Produtividade e personalização, sempre com revisão humana.' },
  ];

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
          <p className="text-brand-cyan text-sm uppercase tracking-wider mb-4">O que fazemos</p>
          <h2 className="heading-lg mb-4">
            Soluções digitais <span className="gradient-text">completas</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Do primeiro esboço à entrega final, cada projeto é pensado para gerar resultado real.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
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
// PROJETOS
// ============================================================
function Projetos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

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

  const handleImgError = (index: number) => {
    setImgErrors((prev) => new Set(prev).add(index));
  };

  const getInitials = (title: string) => {
    return title.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <section id="projetos" ref={sectionRef} className="section-padding bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-cyan text-sm uppercase tracking-wider mb-4">Portfólio</p>
          <h2 className="heading-lg mb-4">
            Projetos <span className="gradient-text">recentes</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Cada projeto é uma parceria. Conheça alguns dos trabalhos que ajudamos a construir.
          </p>
        </div>

        {PROJECTS.length === 0 ? (
          <div className="empty-state-border p-12 md:p-20 text-center max-w-2xl mx-auto">
            <div className="text-5xl mb-6">✨</div>
            <h3 className="heading-md mb-4 text-text-primary">
              Os primeiros projetos estão em construção.
            </h3>
            <p className="text-text-secondary text-lg mb-8">
              Estamos preparando cases incríveis para mostrar aqui. Enquanto isso, que tal ser o próximo?
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-block px-8 py-4 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Quero ser o próximo — falar com o Arthur
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
                  {imgErrors.has(i) ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-indigo/30 to-brand-cyan/20">
                      <span className="text-4xl font-bold text-white/60">{getInitials(project.titulo)}</span>
                    </div>
                  ) : (
                    <img
                      src={project.imagem}
                      alt={project.titulo}
                      loading="lazy"
                      className="project-card-img w-full h-full object-cover"
                      onError={() => handleImgError(i)}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                    Ver projeto
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

  const steps = [
    { num: '01', title: 'Escuta', desc: 'Entender o negócio, o público e o objetivo.' },
    { num: '02', title: 'Estratégia', desc: 'Definir escopo, estrutura e mensagens.' },
    { num: '03', title: 'Criação', desc: 'Design + desenvolvimento + IA.' },
    { num: '04', title: 'Revisão humana', desc: 'Cada detalhe analisado, testado e ajustado antes da entrega.' },
  ];

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
          <p className="text-brand-cyan text-sm uppercase tracking-wider mb-4">Como trabalhamos</p>
          <h2 className="heading-lg">
            Nosso <span className="gradient-text">processo</span>
          </h2>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-white/5">
            <div ref={lineRef} className="timeline-line w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => (
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
          Sua empresa tem um potencial único. Vamos construir uma presença digital que o mundo consiga <span className="gradient-text">enxergar</span>?
        </h2>
        <p className="cta-animate text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Cada projeto começa com escuta e parceria. Construir, junto com cada empresa, uma presença digital à altura do seu potencial.
        </p>
        <div className="cta-animate flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine px-10 py-4 rounded-full bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Chamar no WhatsApp
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
              <p className="text-text-secondary text-xs">Inteligência para criar. Dedicação para transformar.</p>
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
            © 2026 AC Studio — por Arthur Capozzi. Feito com IA, design e revisão humana.
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

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={WHATSAPP_URL}
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
export default function App() {
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
