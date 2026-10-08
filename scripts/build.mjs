// Gerador do site Outro Primo (estático, v2 - Padrão Safra & Consultoria Independente). Uso: node scripts/build.mjs
// ───────────────────────────────────────────────────────────────────────────
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = (process.env.SITE_URL || 'https://www.outroprimo.com.br').replace(/\/$/, '');
const WHATSAPP = process.env.WHATSAPP || '5546991164045';
const EMAIL = process.env.EMAIL || 'outroprimo.empresa@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/maycoln-primo-878b0b4a';
const SHOW_SELO = true; // selo ANBIMA (profissional certificado)
const NOME = 'Outro Primo';
const ANO = new Date().getFullYear();
const HOJE = new Date().toISOString().slice(0, 10);
const WA = (t) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');

// ── Ícones de traço fino e elegante (SVG inline) ───────────────────────────
const ICONS = {
  dollar: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  sliders: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  award: '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  sparkle: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
};

const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${Object.entries(ICONS)
  .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`)
  .join('')}</defs></svg>`;
const ic = (n, c = '') => `<svg class="ic ${c}" aria-hidden="true" focusable="false"><use href="#i-${n}"/></svg>`;

// ── Design System: Referência Safra + Toque Acolhedor e Responsivo ─────────
const CSS = `
:root{
  --bg:#FFFFFF;--bg2:#F8F9FA;--bg3:#F1F4F8;--ink:#141B26;--ink-soft:#333E4F;
  --navy:#0A192F;--navy2:#050D1A;--navy-mid:#112240;--gold:#C5A880;--golddk:#8F6C36;
  --gold-bg:#FAF6F0;--gold-line:#E6DACB;--green:#1F6B4C;--card:#FFFFFF;--line:#E2E8F0;
  --line-light:#EDF2F7;--muted:#5A6678;--r:8px;
}
*{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:16.5px/1.65 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:'Source Serif 4',Georgia,'Times New Roman',serif;color:var(--navy);line-height:1.22;margin:0 0 .5em;font-weight:600}
h1{font-size:clamp(2.05rem,4.8vw,3.15rem);letter-spacing:-.02em}
h2{font-size:clamp(1.55rem,3.2vw,2.25rem);letter-spacing:-.015em}
h3{font-size:1.18rem;font-weight:600}
p{margin:0 0 1em}a{color:var(--navy)}img{max-width:100%;height:auto;display:block}
.ic{width:1.28em;height:1.28em;flex:none;vertical-align:-.25em}
.wrap{max-width:1140px;margin:0 auto;padding:0 24px}
.skip{position:absolute;left:-999px;top:0;background:var(--navy);color:#fff;padding:12px 18px;z-index:50}.skip:focus{left:10px;top:10px}
:focus-visible{outline:2.5px solid var(--gold);outline-offset:2px}

/* barra superior institucional */
.topbar{background:var(--navy2);color:#E2E8F0;font-size:.82rem;border-bottom:1px solid rgba(197,168,128,.18)}
.topbar .wrap{display:flex;justify-content:space-between;gap:16px;padding-top:8px;padding-bottom:8px;flex-wrap:wrap;align-items:center}
.topbar a{color:#F5E8D2;text-decoration:none}.topbar a:hover{text-decoration:underline}
.topbar span{display:inline-flex;gap:7px;align-items:center}

/* cabeçalho */
header.site{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:25;box-shadow:0 2px 14px rgba(10,25,47,.04)}
.nav{display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:72px}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;font:600 1.32rem 'Source Serif 4',Georgia,serif;color:var(--navy);letter-spacing:-.01em}
.brand img{width:40px;height:auto}
.brand small{display:block;font:600 .62rem -apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:var(--golddk);margin-top:-2px}
.menu{display:flex;align-items:center;gap:6px}
.menu a{text-decoration:none;color:var(--ink-soft);font-size:.94rem;padding:9px 13px;border-radius:6px;transition:.15s;font-weight:500}
.menu a:hover,.menu a[aria-current]{color:var(--navy);background:var(--bg2)}
.menu a.btn{color:#fff;margin-left:10px;padding:11px 20px;font-weight:600}
.menu a.btn:hover{background:var(--navy2);color:#fff}
#nt{position:absolute;opacity:0;pointer-events:none}
.burger{display:none;cursor:pointer;padding:12px;border-radius:6px;margin-right:-8px}
.burger span,.burger span:before,.burger span:after{display:block;width:24px;height:2px;background:var(--navy);position:relative;content:'';transition:.2s}
.burger span:before{position:absolute;top:-7px}.burger span:after{position:absolute;top:7px}

/* botões com design refinado */
.btn{overflow-wrap:anywhere;text-align:center;display:inline-flex;align-items:center;gap:9px;justify-content:center;background:var(--navy);color:#fff!important;padding:13px 26px;border-radius:var(--r);text-decoration:none;font-weight:600;font-size:.96rem;border:1px solid var(--navy);min-height:48px;transition:.2s;letter-spacing:.01em}
.btn:hover{background:var(--navy2);border-color:var(--navy2);transform:translateY(-1px);box-shadow:0 6px 18px rgba(10,25,47,.18)}
.btn.alt{background:transparent;color:var(--navy)!important;border-color:var(--line)}.btn.alt:hover{background:var(--bg2);border-color:var(--navy)}
.btn.gold{background:var(--gold);border-color:var(--gold);color:#0e1724!important}.btn.gold:hover{background:#d3b892;border-color:#d3b892}
.btn.wa{background:var(--navy);border-color:var(--navy)}.btn.wa:hover{background:var(--navy2)}
.row{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px}

/* hero institucional */
.hero{background:linear-gradient(180deg,#FFFFFF 0%,#F8F9FA 100%);padding:52px 0 76px;border-bottom:1px solid var(--line)}
.hero .wrap{display:grid;grid-template-columns:1.25fr 1fr;gap:52px;align-items:center}
.eyebrow{color:var(--golddk);font-weight:700;letter-spacing:.07em;text-transform:uppercase;font-size:.95rem;display:flex;gap:12px;align-items:center;margin-bottom:.85em}
.eyebrow:before{content:'';width:28px;height:2.5px;background:var(--gold);flex-shrink:0}
.lead{font-size:1.16rem;color:var(--ink-soft);line-height:1.68}
.photo{position:relative;max-width:420px;margin-left:auto;width:100%}
.photo img{border-radius:var(--r);width:100%;box-shadow:0 18px 40px rgba(10,25,47,.12);aspect-ratio:3/4;object-fit:cover;border:1px solid var(--line)}
.badge{position:absolute;z-index:2;left:-18px;bottom:26px;background:var(--navy);color:#fff;border-radius:var(--r);padding:14px 18px;box-shadow:0 12px 28px rgba(5,13,26,.3);max-width:245px;line-height:1.35;border-left:3px solid var(--gold)}
.badge .badge-tag{display:block;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:4px}
.badge b{display:block;font:600 1.25rem 'Source Serif 4',Georgia,serif;color:#F5E8D2;line-height:1.2;margin-bottom:4px}
.badge span{font-size:.82rem;color:#E2E8F0;display:block}

/* barras de autoridade e credenciais */
.trust-bar{background:#fff;border-bottom:1px solid var(--line);padding:20px 0}
.trust-bar .wrap{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.trust-item{display:inline-flex;align-items:center;gap:10px;font-size:.88rem;font-weight:600;color:var(--navy)}
.trust-item .ic{color:var(--golddk)}

/* seção dedicada para caminhos de atendimento (3 cards sem sobreposição) */
.section-entradas{padding:54px 0 68px;background:var(--bg)}
.entradas{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;position:relative;z-index:2;margin:0}
.entrada{display:flex;flex-direction:column;gap:10px;text-decoration:none;background:var(--card);border:1px solid var(--line);border-top:4px solid var(--gold);border-radius:var(--r);padding:28px 24px;color:var(--ink);box-shadow:0 8px 24px rgba(10,25,47,.05);transition:.2s}
.entrada.inv{border-top-color:var(--navy)}.entrada.dois{border-top-color:var(--golddk)}
.entrada:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(10,25,47,.12);border-color:var(--gold)}
.entrada .ico{width:46px;height:46px;border-radius:var(--r);background:var(--bg2);color:var(--navy);display:grid;place-items:center;margin-bottom:4px;border:1px solid var(--line-light)}
.entrada strong{font:600 1.22rem 'Source Serif 4',Georgia,serif;color:var(--navy);line-height:1.35}
.entrada p{margin:0;font-size:.95rem;color:var(--ink-soft);line-height:1.58}
.entrada span.go{margin-top:auto;padding-top:10px;font-weight:600;color:var(--golddk);display:inline-flex;gap:6px;align-items:center;font-size:.92rem}

/* seções institucionais */
section{padding:72px 0}.alt-bg{background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.white-bg{background:#fff}
.head{max-width:740px;margin:0 0 36px}.head.c{text-align:center;margin-left:auto;margin-right:auto}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px}
.grid.g3{grid-template-columns:repeat(3,1fr)}.grid.g4{grid-template-columns:repeat(4,1fr)}.grid.g5{grid-template-columns:repeat(5,1fr)}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:26px 22px;display:flex;flex-direction:column;gap:6px;box-shadow:0 4px 14px rgba(10,25,47,.03);transition:.2s}
.card .ico{width:44px;height:44px;border-radius:var(--r);background:var(--bg2);color:var(--navy);display:grid;place-items:center;margin-bottom:8px;border:1px solid var(--line-light)}
.card p{margin:0 0 .5em;color:var(--ink-soft);font-size:.95rem;line-height:1.6}
.card a.more{font-weight:600;color:var(--golddk);text-decoration:none;margin-top:auto;display:inline-flex;gap:6px;align-items:center;padding-top:6px;font-size:.92rem}
.card a.more:hover{text-decoration:underline}
a.card{text-decoration:none;color:inherit;transition:.2s}a.card:hover{box-shadow:0 12px 28px rgba(10,25,47,.09);transform:translateY(-2px);border-color:var(--gold)}

/* etiquetas e pílulas */
.pill{display:inline-block;align-self:flex-start;font-size:.72rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:3px 10px;border-radius:4px;background:#EBF2FA;color:var(--navy);border:1px solid #D2E3F7}
.pill.pf{background:var(--gold-bg);color:var(--golddk);border-color:var(--gold-line)}
.quote{font:italic 1.22rem/1.55 'Source Serif 4',Georgia,serif;color:var(--navy);border-left:3px solid var(--gold);padding:6px 0 6px 20px;margin:0 0 28px}
ul.ok{padding-left:0;list-style:none;margin:0 0 1em}
ul.ok li{padding-left:30px;position:relative;margin:.6em 0;color:var(--ink-soft)}
ul.ok li:before{content:'';position:absolute;left:0;top:.35em;width:18px;height:18px;border-radius:50%;background:var(--navy) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='5 12.5 10 17.5 19 7'/%3E%3C/svg%3E") center/12px no-repeat}
.two{display:grid;grid-template-columns:1fr 1fr;gap:52px;align-items:center}
.two img{border-radius:var(--r);width:100%;box-shadow:0 16px 36px rgba(10,25,47,.10);border:1px solid var(--line)}
.two.top{align-items:start}

/* faixa estatística de prestígio */
.stats{background:var(--navy);color:#fff;padding:46px 0;border-top:1px solid rgba(197,168,128,.2);border-bottom:1px solid rgba(197,168,128,.2)}
.stats .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center}
.stats b{display:block;font:600 2.5rem 'Source Serif 4',Georgia,serif;color:#F5E8D2;line-height:1.1;margin-bottom:6px}
.stats span{font-size:.9rem;color:#D3DCE8;line-height:1.45}

/* cartões de diagnóstico (5 pilares) */
.pilar-card{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:26px 20px;display:flex;flex-direction:column;gap:8px;position:relative}
.pilar-card h3{margin:0;font-size:1.14rem;color:var(--navy)}

/* passos e jornada */
.steps{counter-reset:s;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;padding:0;list-style:none;margin:0}
.steps li{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:24px;position:relative}
.steps li:before{counter-increment:s;content:counter(s);display:grid;place-items:center;width:36px;height:36px;border-radius:var(--r);background:var(--navy);color:#F5E8D2;font:600 1.1rem 'Source Serif 4',Georgia,serif;margin-bottom:12px;border:1px solid var(--gold)}
.steps strong{display:block;font:600 1.08rem 'Source Serif 4',Georgia,serif;color:var(--navy);margin-bottom:6px}
.steps p{margin:0;font-size:.94rem;color:var(--ink-soft);line-height:1.55}

/* faixa chamada de conversão */
.cta-band{background:linear-gradient(135deg,var(--navy) 0%,var(--navy-mid) 100%);color:#fff;border-radius:var(--r);padding:48px 40px;display:flex;gap:32px;align-items:center;justify-content:space-between;flex-wrap:wrap;border:1px solid rgba(197,168,128,.3);box-shadow:0 18px 45px rgba(5,13,26,.2)}
.cta-band h2{color:#fff;margin:0 0 .3em}
.cta-band p{margin:0;color:#D3DCE8;font-size:1.05rem;max-width:640px}
.cta-wrap{padding:0 0 72px}

/* credenciais e selo */
.creds{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}
.chip{display:inline-flex;gap:8px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:4px;padding:8px 14px;font-size:.88rem;font-weight:600;color:var(--navy)}
.chip .ic{color:var(--golddk)}
.selo{display:flex;gap:16px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:18px 20px;max-width:440px;margin:16px 0;box-shadow:0 4px 14px rgba(10,25,47,.03)}
.selo img{width:80px;height:80px;flex:none;object-fit:contain}.selo p{margin:0;font-size:.92rem;color:var(--ink-soft);line-height:1.5}

/* linha do tempo */
.timeline{list-style:none;margin:0;padding:0 0 0 24px;border-left:2px solid var(--line)}
.timeline li{position:relative;padding:0 0 28px 22px}
.timeline li:before{content:'';position:absolute;left:-33px;top:6px;width:14px;height:14px;border-radius:50%;background:var(--gold);border:3px solid #fff}
.timeline b.y{display:inline-block;font:600 1.05rem 'Source Serif 4',Georgia,serif;color:var(--golddk);margin-right:8px}
.timeline strong{color:var(--navy);font-size:1.02rem}
.timeline p{margin:.25em 0 0;color:var(--ink-soft);font-size:.96rem}
.alt-bg .timeline li:before{border-color:var(--bg2)}

/* faq com visual limpo */
details{background:#fff;border:1px solid var(--line);border-radius:var(--r);margin:0 0 10px;padding:0;transition:.2s}
details:hover{border-color:var(--line-strong)}
summary{cursor:pointer;font-weight:600;color:var(--navy);padding:16px 48px 16px 20px;list-style:none;position:relative;min-height:48px;font-size:1.02rem}
summary::-webkit-details-marker{display:none}
summary:after{content:'+';position:absolute;right:20px;top:10px;font-size:1.6rem;color:var(--golddk);font-weight:400}
details[open] summary:after{content:'–'}
details>div{padding:0 20px 18px;color:var(--ink-soft);font-size:.96rem;line-height:1.6}
details p{margin:0}

/* utilitários */
.crumbs{font-size:.85rem;margin:0 auto;color:var(--muted);padding-top:16px;padding-bottom:0}
.crumbs a{color:var(--muted);text-decoration:none}.crumbs a:hover{text-decoration:underline}
.small{font-size:.86rem;color:var(--muted)}
.narrow{max-width:820px}
.pagehead{background:linear-gradient(180deg,#FFFFFF,#F8F9FA);padding:24px 0 48px;border-bottom:1px solid var(--line)}
.pagehead h1{margin-top:.3em}

/* rodapé institucional */
footer{background:var(--navy);color:#D3DCE8;font-size:.92rem;border-top:1px solid rgba(197,168,128,.2)}
.foot{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:36px;padding:60px 0 36px}
.foot h4{font:700 .78rem -apple-system,BlinkMacSystemFont,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#F5E8D2;margin:0 0 16px}
.foot ul{list-style:none;margin:0;padding:0}.foot li{margin:0 0 10px}
.foot a{color:#D3DCE8;text-decoration:none;transition:.15s}.foot a:hover{color:#fff;text-decoration:underline}
.foot .bl{display:flex;gap:12px;align-items:center;margin-bottom:14px}
.foot .bl .chipimg{background:#fff;border-radius:6px;padding:6px 8px;display:flex;align-items:center}
.foot .bl img{width:36px;height:auto}
.foot .bl strong{font:600 1.3rem 'Source Serif 4',Georgia,serif;color:#fff}
.foot .ct li{display:flex;gap:10px;align-items:flex-start}
.foot .ct .ic{color:#F5E8D2;margin-top:.15em}
.legal{border-top:1px solid rgba(255,255,255,.12);padding:28px 0 34px;display:flex;gap:28px;align-items:flex-start}
.legal img{width:80px;height:80px;flex:none;object-fit:contain}
.legal p{margin:0 0 .7em;font-size:.82rem;color:#A2AFBF;line-height:1.6}
.legal .copy{color:#D3DCE8}

/* botão flutuante */
.fab{position:fixed;right:20px;bottom:20px;z-index:35;display:none;align-items:center;gap:9px;background:var(--navy);color:#fff;text-decoration:none;font-weight:600;padding:14px 20px;border-radius:99px;box-shadow:0 10px 28px rgba(5,13,26,.35);border:1px solid var(--gold);font-size:.94rem}
.fab:hover{background:var(--navy2)}

/* responsividade e mobile */
@media(max-width:980px){
  .hero .wrap,.two,.foot{grid-template-columns:1fr;gap:36px}
  .hero{padding:36px 0 60px}
  .photo{margin:20px auto 0;max-width:340px}
  .badge{left:0;bottom:16px}
  .entradas,.grid.g3,.grid.g4,.grid.g5,.steps{grid-template-columns:1fr 1fr}
  .stats .wrap{grid-template-columns:1fr 1fr}
  .burger{display:block}
  .menu{display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border-bottom:1px solid var(--line);flex-direction:column;align-items:stretch;padding:12px 24px 22px;box-shadow:0 16px 28px rgba(10,25,47,.08)}
  .menu a{padding:14px 12px;font-size:1.02rem;border-bottom:1px solid var(--line-light)}
  .menu a.btn{margin:12px 0 0;border-bottom:none}
  #nt:checked~.menu{display:flex}
  #nt:checked~.burger span{background:transparent}
  #nt:checked~.burger span:before{top:0;transform:rotate(45deg)}
  #nt:checked~.burger span:after{top:0;transform:rotate(-45deg)}
  .topbar .hide-m{display:none}
  .fab{display:inline-flex}
  .cta-band{padding:34px 26px}
  section{padding:54px 0}
  .legal{flex-direction:column}
}
@media(max-width:620px){
  body{font-size:16px}
  .entradas,.grid.g3,.grid.g4,.grid.g5,.steps{grid-template-columns:1fr}
  .entradas{margin:0;gap:18px}
  .row .btn{width:100%}
  .stats b{font-size:2.1rem}
  .brand{font-size:1.18rem}
  .topbar .wrap{justify-content:center;text-align:center}
  .trust-bar .wrap{justify-content:center}
}
@media(prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
`;

// ── Navegação e Textos Fixos ────────────────────────────────────────────────
const NAV = [
  ['/negocios/', 'Para empresas e autônomos'],
  ['/investimentos/', 'Vida pessoal e patrimônio'],
  ['/exterior/', 'Patrimônio global'],
  ['/sobre/', 'Quem é o Maycoln'],
];

const FOOT_NOTE =
  'A Outro Primo é uma consultoria independente orientada por rigor fiduciário: não vendemos produtos financeiros, não recebemos corretagem nem qualquer tipo de comissão ou rebate de bancos, corretoras ou instituições. A cobrança é estritamente pelo serviço de consultoria profissional (fee fixo, participação no ganho comprovado ou a combinação de formatos), sempre combinada previamente com clareza. Não somos distribuidora de títulos nem gestora; a tomada de decisão e a execução cabem sempre ao cliente. Nenhum resultado passado garante rentabilidade futura; cada diagnóstico é individual e respaldado por critérios técnicos. Conteúdo de caráter educativo e consultivo, que não substitui a atuação de contadores ou advogados parceiros.';

const cta = (txt = 'Quero conversar sobre o meu caso', msg = 'Olá, Maycoln! Vim pelo site da Outro Primo e quero conversar sobre o meu caso.', cls = '') =>
  `<a class="btn ${cls}" href="${WA(msg)}" rel="noopener">${ic('chat')}${txt}</a>`;

const seloImg = (cls = '') =>
  SHOW_SELO
    ? `<img class="${cls}" src="/img/selo-anbima.png" alt="Selo ANBIMA: profissional certificado" width="240" height="240" loading="lazy">`
    : '';

// ── Base de Dores e Oportunidades (SEO & Resolução de Problemas Reais) ──────
// NEG = empresas e autônomos; PF = vida pessoal e patrimônio.
const PROBLEMAS = [
  {
    slug: 'empresa-fatura-mas-nao-sobra-dinheiro',
    curto: 'Empresa fatura e não sobra caixa',
    seg: 'neg',
    icon: 'dollar',
    q: 'Minha empresa vende bem, mas no fim do mês o caixa não sobra.',
    h1: 'Empresa fatura, mas não sobra dinheiro: onde está o gargalo?',
    title: 'Empresa fatura e não sobra caixa: o que fazer | Outro Primo',
    desc: 'Vende bem e o dinheiro não aparece no caixa? Veja onde costuma estar o vazamento e como destravar lucro, em Ponta Grossa/PR e online.',
    corpo: [
      'Faturamento é vaidade, lucro é sanidade e caixa é realidade. Quando a empresa vende bem mas o saldo bancário vive apertado, o problema raramente é o volume de vendas. Quase sempre a causa está em poucos pontos: precificação sem cálculo real da margem de contribuição, despesas ocultas, mistura de contas pessoais com as da empresa, ou impostos pagos além do estritamente necessário.',
      'Na Outro Primo, aplicamos o princípio 80/20 de Pareto: não complicamos o negócio com relatórios burocráticos. Fazemos uma fotografia rápida do fluxo de caixa, recalculamos a margem de cada produto ou serviço e alinhamos o enquadramento tributário dentro da lei junto ao seu contador para que o resultado apareça rápido no bolso.',
    ],
    sinais: [
      'O faturamento aumenta, mas o saldo no banco continua estagnado',
      'Você não sabe exatamente quanto sobra de margem em cada produto ou serviço vendido',
      'Despesas da família e da empresa ainda se confundem no fim do mês',
      'Falta previsibilidade de fluxo de caixa para pagar fornecedores e impostos com folga',
    ],
    entrega: [
      'Fotografia do caixa real e margem de contribuição por item',
      'Separação definitiva e estruturada entre o caixa da empresa e a vida do sócio',
      'Revisão do enquadramento tributário em conjunto com o seu contador',
      'Plano de ação simples e pragmático, com responsável, prazo e meta',
    ],
    faq: [
      ['Por que minha empresa vende bem e o caixa não acompanha?', 'As causas mais comuns são precificação defasada em relação ao custo variável real, prazos de pagamento desalinhados com os recebimentos, despesas fixas que crescem sem controle e retiradas desorganizadas dos sócios. Medimos cada item para estancar a perda certa.'],
      ['Em quanto tempo conseguimos organizar o caixa?', 'A fotografia inicial e os primeiros ajustes de margem e caixa costumam ficar claros nas primeiras semanas. As ações prioritárias geram alívio imediato no fluxo de caixa.'],
    ],
  },
  {
    slug: 'como-pagar-menos-imposto-na-empresa-legalmente',
    curto: 'Pagar menos imposto legalmente',
    seg: 'neg',
    icon: 'file',
    q: 'Tenho a sensação de que pago mais imposto do que deveria.',
    h1: 'Como pagar menos imposto na empresa, estritamente dentro da lei',
    title: 'Pagar menos imposto na empresa legalmente | Outro Primo',
    desc: 'Elisão fiscal lícita, enquadramento e Fator R: revise a carga tributária da sua empresa com segurança jurídica e cálculo transparente.',
    corpo: [
      'Muitas pequenas e médias empresas e profissionais autônomos pagam mais impostos do que precisam por simples falta de simulação técnica. Elisão fiscal é o planejamento tributário lícito: a escolha prévia do caminho legal que resulta na menor carga de tributos. É o oposto de sonegação (que é crime).',
      'Fazemos a análise em parceria com o seu contador, apresentando o cálculo detalhado do antes e do depois com a fundamentação legal vigente antes de qualquer tomada de decisão. Cada centavo economizado legalmente vai direto para o seu caixa.',
    ],
    sinais: [
      'Você nunca comparou o seu regime atual (Simples, Presumido, Real) com as alternativas nos últimos anos',
      'O pró-labore foi fixado sem cálculo do Fator R ou do impacto previdenciário',
      'Sua atividade tem benefícios fiscais ou segregações que ninguém nunca calculou',
      'O contador emite as guias mensais, mas falta planejamento prévio do imposto',
    ],
    entrega: [
      'Simulação comparativa do antes e depois com base na legislação vigente',
      'Validação técnica e alinhamento direto com o seu contador',
      'Ajuste seguro do pró-labore e da distribuição de lucros isenta',
      'Acompanhamento do ganho real comprovado mês a mês',
    ],
    faq: [
      ['Reduzir imposto é legal e seguro?', 'Sim, quando feito via planejamento tributário lícito (elisão fiscal). A legislação brasileira prevê diferentes formas de apuração. Nosso trabalho é demonstrar a opção mais vantajosa dentro das normas da Receita Federal.'],
      ['O que é o Fator R no Simples Nacional?', 'É a relação entre a folha de pagamento (incluindo o pró-labore) e o faturamento bruto. Dependendo da atividade (como clínicas, consultorias e serviços), atingir 28% reduz a alíquota de impostos de cerca de 15,5% para 6% no anexo correto.'],
    ],
  },
  {
    slug: 'como-separar-financas-da-empresa-e-pessoais',
    curto: 'Misturo contas da empresa e pessoais',
    seg: 'neg',
    icon: 'layers',
    q: 'Misturo as contas da empresa com as pessoais e não sei meu ganho real.',
    h1: 'Como separar as contas da empresa e da vida pessoal de vez',
    title: 'Separar finanças da empresa e pessoais | Outro Primo',
    desc: 'Pró-labore justo, distribuição de lucros e contas separadas: o método simples para o empresário e autônomo ter paz e clareza de ganhos.',
    corpo: [
      'Quando o sócio paga o boleto de casa com o cartão da empresa ou usa a conta física para compras do negócio, perde-se a noção de rentabilidade. A empresa parece não dar lucro e a pessoa física vive em constante insegurança financeira.',
      'A solução é humana e pragmática: estruturamos contas separadas, definimos um pró-labore compatível com a realidade do negócio, estabelecemos uma política de distribuição periódica de lucros e criamos uma rotina financeira que não toma seu tempo.',
    ],
    sinais: [
      'Despesas pessoais são pagas pelo caixa da empresa ou vice-versa',
      'Não há um dia fixo nem valor claro de retirada mensal',
      'Você trabalha exaustivamente, mas não sabe dizer se o negócio deu lucro no ano',
      'A declaração de Imposto de Renda é sempre uma dor de cabeça cheia de inconsistências',
    ],
    entrega: [
      'Definição de pró-labore saudável e calendário de distribuição de lucros',
      'Separação física e bancária das rotinas da empresa e da família',
      'Planilha ou aplicativo simples para controle de entradas e saídas',
      'Clareza sobre o patrimônio pessoal que está sendo construído fora do negócio',
    ],
    faq: [
      ['O que é melhor: tirar tudo como pró-labore ou lucro?', 'O pró-labore tem incidência de INSS e IRPF, mas é exigido para sócios que trabalham. A distribuição de lucros devidamente apurada é isenta de imposto de renda. O equilíbrio ideal é calculado sob medida para a sua empresa.'],
      ['Tenho um negócio pequeno (ou sou autônomo). Isso serve para mim?', 'Com certeza. É exatamente em clínicas, escolas, pequenas empresas e prestadores de serviço que a mistura de contas mais prejudica o crescimento.'],
    ],
  },
  {
    slug: 'como-reduzir-desperdicio-na-empresa',
    curto: 'Desperdício e baixa eficiência',
    seg: 'neg',
    icon: 'target',
    q: 'Sinto que há desperdício no dia a dia e quero mais eficiência.',
    h1: 'Como eliminar desperdícios e aumentar a eficiência operacional',
    title: 'Eliminar desperdício e aumentar eficiência na empresa | Outro Primo',
    desc: 'Retrabalho, estoques parados, tempo ocioso e desperdício de energia: métodos práticos de melhoria contínua para empresas e autônomos.',
    corpo: [
      'Desperdício nem sempre é evidente. Ele se esconde em processos mal desenhados, retrabalho de tarefas que deveriam ser feitas certas de primeira, clientes ou pedidos esperando em filas, estoque parado que come capital de giro e custos excessivos de insumos.',
      'Trazemos a experiência prática e os treinamentos em métodos Lean e Six Sigma aplicados ao tamanho do seu negócio. Identificamos onde o dinheiro está escorrendo, priorizamos o que gera ganho imediato (Pareto 80/20) e deixamos padrões simples para o resultado se manter.',
    ],
    sinais: [
      'Sua equipe frequentemente refaz trabalhos por falta de padrão claro',
      'Há gargalos onde tarefas ou clientes ficam parados esperando',
      'Dinheiro empatado em materiais ou produtos que giram devagar',
      'Sensação de cansaço extremo da equipe sem que a produção aumente',
    ],
    entrega: [
      'Mapeamento dos gargalos e do custo financeiro de cada perda',
      'Plano de melhoria de processos sem burocracia desnecessária',
      'Padronização das etapas críticas para manter o ganho conquistado',
      'Indicadores visuais simples para acompanhamento semanal',
    ],
    faq: [
      ['Métodos Lean Six Sigma servem para empresas de qualquer porte e setor?', 'Totalmente. Embora tenham nascido na grande manufatura industrial, os princípios de eliminação de desperdício aplicam-se com enorme retorno a fábricas e oficinas locais (perdas de materiais e estoques parados), restaurantes e varejo (quebras e gargalos de atendimento), e também a clínicas, escolas e consultórios (tempo perdido, retrabalho e desorganização de fluxo).'],
      ['Como funciona a cobrança por ganho comprovado?', 'Em projetos operacionais, podemos atuar com participação de 50% no ganho financeiro comprovado em até 12 meses. Se o ganho não for demonstrado por métricas técnicas acordadas, você não paga.'],
    ],
  },
  {
    slug: 'como-precificar-produtos-e-servicos',
    curto: 'Preço certo para lucrar de verdade',
    seg: 'neg',
    icon: 'trending',
    q: 'Não sei se o meu preço cobre os custos e deixa lucro real.',
    h1: 'Como precificar produtos e serviços com segurança e margem real',
    title: 'Como precificar produtos e serviços sem perder dinheiro | Outro Primo',
    desc: 'Copiar o concorrente pode esconder prejuízo. Calcule margem de contribuição, custos reais e política de desconto para lucrar de verdade.',
    corpo: [
      'Muitos empresários e autônomos definem seus preços olhando apenas o que o concorrente cobra. O risco é que o concorrente pode estar tendo prejuízo ou ter custos completamente diferentes dos seus. Um preço saudável cobre os custos variáveis, ajuda a pagar os custos fixos, os impostos e ainda gera o lucro desejado.',
      'Ajudamos você a calcular a margem de contribuição de cada produto ou serviço. Com essa clareza, você sabe exatamente qual é o desconto máximo seguro, quais itens merecem destaque e quais estão apenas gerando trabalho sem retorno.',
    ],
    sinais: [
      'Você dá descontos no improviso sem saber se está pagando para trabalhar',
      'Os produtos ou serviços mais vendidos não são os que deixam dinheiro no caixa',
      'O volume de trabalho aumentou, mas o lucro líquido não acompanhou',
      'Incerteza na hora de repassar reajustes de insumos e inflação',
    ],
    entrega: [
      'Cálculo da margem de contribuição de cada linha de produto ou serviço',
      'Definição de preço mínimo viável e tabela de descontos seguros',
      'Revisão do mix de vendas com foco em rentabilidade e não apenas volume',
      'Ferramenta simples para atualizar preços sempre que os custos mudarem',
    ],
    faq: [
      ['O que é margem de contribuição?', 'É o valor que sobra de cada venda após deduzir os custos e despesas diretamente atrelados a ela (matéria-prima, comissão, imposto sobre a nota). É essa margem que paga o aluguel, salários fixos e gera o seu lucro.'],
      ['Posso cobrar mais que os concorrentes?', 'Sim, desde que a entrega de valor, o posicionamento e o atendimento justifiquem a diferença. Mas o primeiro passo é saber o custo técnico para nunca vender abaixo do ponto de equilíbrio.'],
    ],
  },
  {
    slug: 'a-equipe-nao-entrega-resultado',
    curto: 'Equipe que não entrega resultado',
    seg: 'neg',
    icon: 'users',
    q: 'Minha equipe não entrega com a qualidade e autonomia que espero.',
    h1: 'Equipe que não entrega: como criar alinhamento, autonomia e resultado',
    title: 'Equipe que não entrega resultado: como melhorar | Outro Primo',
    desc: 'Metas claras, feedback construtivo e ritos de liderança: transforme a entrega do seu time com métodos adaptados ao dia a dia da PME.',
    corpo: [
      'Quando os funcionários não entregam o esperado, quase sempre o motivo não é má vontade: é falta de metas objetivas, ausência de feedback periódico ou processos que só o fundador sabe como fazer. Cobrar sem dar clareza gera desmotivação e rotatividade.',
      'Trazemos a experiência prática de 19 anos liderando equipes em ambientes desafiadores. Estruturamos ritos curtos de alinhamento, metas compreensíveis e conversas de feedback que desenvolvem as pessoas sem conflitos desgastantes.',
    ],
    sinais: [
      'Os funcionários dependem de você para aprovar cada pequeno detalhe',
      'As metas só existem na sua cabeça e não são compartilhadas com clareza',
      'O feedback só ocorre quando um erro grave acontece',
      'Você gasta o seu dia apagando incêndios operacionais da equipe',
    ],
    entrega: [
      'Diagnóstico de liderança, papéis e responsabilidades de cada função',
      'Ritos simples de alinhamento semanal que duram poucos minutos',
      'Roteiros práticos para feedbacks difíceis e reconhecimento',
      'Plano de delegação gradativa com checagem de qualidade',
    ],
    faq: [
      ['Como cobrar entrega sem desmotivar a equipe?', 'O segredo é separar a pessoa do processo: estabelecer a expectativa com clareza, concordar com a métrica de sucesso e dar retorno frequente sobre o fato ocorrido, oferecendo apoio para a evolução.'],
      ['Minha empresa tem menos de 10 funcionários. Vale a pena?', 'É exatamente na equipe enxuta que uma pessoa desalinhada pesa mais. Criar cultura de responsabilidade desde cedo evita perdas enormes.'],
    ],
  },
  {
    slug: 'empresa-que-depende-do-dono',
    curto: 'Empresa depende 100% de mim',
    seg: 'neg',
    icon: 'sliders',
    q: 'Minha empresa só funciona se eu estiver lá o tempo todo.',
    h1: 'Empresa que depende do dono: como fazer o negócio rodar com autonomia',
    title: 'Empresa que depende do dono: como mudar | Outro Primo',
    desc: 'Padronize o essencial, delegue com segurança e tire a sobrecarga dos seus ombros com métodos práticos de gestão pela rotina.',
    corpo: [
      'Se você não consegue tirar 15 dias de férias sem que o telefone toque sem parar, você não é dono de uma empresa: você é o funcionário mais sobrecarregado dela. Quando todas as decisões dependem do fundador, a empresa atinge um teto de crescimento e a vida pessoal se esgota.',
      'Ajudamos você a identificar os processos críticos, documentar o essencial em instruções simples e treinar pessoas para assumirem a execução. Você passa a atuar como estrategista do negócio, e não como bombeiro de plantão.',
    ],
    sinais: [
      'Você não tira férias descansadas há anos',
      'Se você se ausenta um dia, as vendas ou entregas travam',
      'Todas as compras, exceções e problemas chegam na sua mesa',
      'Sensação constante de exaustão e sobrecarga mental',
    ],
    entrega: [
      'Mapeamento dos processos que mais consomem o seu tempo',
      'Criação de padrões simples de trabalho (rotinas descomplicadas)',
      'Treinamento e delegação assistida para os colaboradores-chave',
      'Painel de indicadores semanais para acompanhar o negócio sem sufoco',
    ],
    faq: [
      ['Preciso comprar softwares caros de gestão?', 'Não. A organização começa no método e na clareza de papéis. Sistemas só funcionam quando os processos manuais já estão saudáveis e compreendidos.'],
      ['Em quanto tempo consigo delegar tarefas críticas?', 'Começando pelo que mais se repete e mais drena sua energia, é possível transferir as primeiras rotinas com segurança nas primeiras semanas.'],
    ],
  },
  {
    slug: 'como-vender-mais-sem-gastar-mais',
    curto: 'Vender mais sem gastar em excesso',
    seg: 'neg',
    icon: 'trending',
    q: 'Quero aumentar as vendas, mas não quero queimar dinheiro com anúncios.',
    h1: 'Como vender mais e melhor sem desperdiçar recursos em anúncios',
    title: 'Como vender mais sem gastar em excesso | Outro Primo',
    desc: 'Organize funil de vendas, acompanhamento de clientes e precificação por margem antes de investir em tráfego pago. Estratégia enxuta.',
    corpo: [
      'Antes de investir valores altos em marketing ou anúncios digitais, a empresa precisa tapar os furos do balde. Muitas vezes clientes pedem orçamento e ninguém faz o acompanhamento (follow-up), clientes antigos nunca mais são contatados ou o time vende os produtos que deixam a menor margem de lucro.',
      'Desenhamos uma estratégia comercial enxuta e focada em conversão e retenção. Ajustamos a proposta de valor, organizamos a rotina de vendas e ensinamos a equipe a cuidar do cliente desde o primeiro contato até o pós-venda.',
    ],
    sinais: [
      'Muitos orçamentos são enviados, mas pouquíssimos viram negócios fechados',
      'Não existe acompanhamento estruturado após a apresentação da proposta',
      'Clientes antigos compram uma vez e nunca mais são reativados',
      'O investimento em divulgação não tem retorno comprovado em números',
    ],
    entrega: [
      'Roteiro de abordagem e follow-up de clientes para aumentar fechamento',
      'Ações para reativar clientes inativos que já conhecem e confiam na sua marca',
      'Alinhamento do mix de vendas priorizando produtos de maior margem líquida',
      'Métricas comerciais simples para acompanhar a taxa de conversão',
    ],
    faq: [
      ['A Outro Primo faz a gestão de anúncios em redes sociais?', 'Nosso foco é a estratégia de negócios, inteligência comercial, precificação e processos de vendas. Ajudamos a empresa a arrumar a casa para que qualquer investimento em marketing traga lucro real.'],
      ['Como saber se o cliente desistiu pelo preço?', 'Na maioria dos casos, o cliente não recua pelo preço, mas pela falta de percepção de valor e segurança ou pela demora no retorno. Ajustamos essa comunicação.'],
    ],
  },
  {
    slug: 'autonomos-e-profissionais-pj-como-organizar',
    curto: 'Autônomos, liberais e prestadores PJ',
    seg: 'neg',
    icon: 'briefcase',
    q: 'Sou autônomo, profissional liberal ou presto serviços PJ: como me organizar?',
    h1: 'Autônomos, profissionais liberais e PJ: finanças, impostos e aposentadoria',
    title: 'Autônomos e profissionais liberais: como se organizar | Outro Primo',
    desc: 'Para psicólogos, médicos, arquitetos, consultores e prestadores PJ: como organizar pró-labore, fluxo de caixa e aposentadoria sem depender do INSS.',
    corpo: [
      'Psicólogos, terapeutas, médicos, dentistas, arquitetos, advogados, consultores e especialistas de tecnologia: seja atuando em consultório ou escritório próprio, seja prestando serviços como pessoa jurídica (PJ) para empresas, o profissional autônomo e liberal enfrenta o desafio diário de ser o seu próprio departamento financeiro, comercial e tributário.',
      'Apoiamos você com métodos práticos e descomplicados: calculamos o enquadramento tributário mais econômico (Simples Nacional, Fator R, Lucro Presumido ou Livro Caixa/Carnê-Leão) em parceria com o seu contador, organizamos uma retirada mensal previsível, montamos a reserva de estabilidade para oscilações sazonais de renda e estruturamos um plano consistente de aposentadoria e patrimônio pessoal.',
    ],
    sinais: [
      'Sua renda oscila mês a mês e você não sabe quanto pode retirar com segurança para casa',
      'O dinheiro recebido de pacientes, clientes ou contratos é transferido sem critério para a conta pessoal',
      'Incerteza sobre enquadramento tributário e se está pagando imposto a mais sem necessidade',
      'Você trabalha muito hoje, mas teme pelo futuro caso precise diminuir o ritmo ou parar de atender',
    ],
    entrega: [
      'Planejamento tributário lícito (enquadramento ideal, Fator R, pró-labore e lucros isentos)',
      'Organização do fluxo de caixa e colchão de oscilação de renda para períodos de baixa',
      'Proteções essenciais e preservação de patrimônio para quem depende da própria força de trabalho',
      'Estratégia de acumulação e investimentos para a sua aposentadoria e patrimônio pessoal',
    ],
    faq: [
      ['Atuo como profissional autônomo em consultório ou escritório (PF ou PJ). A consultoria se aplica?', 'Perfeitamente. Analisamos se é mais vantajoso atuar como pessoa física (com carnê-leão e livro caixa) ou formalizar empresa no Simples Nacional com o benefício do Fator R. Além disso, estruturamos sua reserva para férias, imprevistos e sua aposentadoria calculada.'],
      ['Presto serviços exclusivos para uma empresa como PJ. Como me proteger?', 'Você precisa de uma gestão financeira ainda mais rigorosa: uma reserva de estabilidade maior, seguro de proteção de renda e diversificação de patrimônio para não ficar refém de um único contrato.'],
      ['Vale a pena recolher o INSS pelo teto sendo autônomo ou PJ?', 'Quase sempre é muito mais eficiente recolher o piso legal exigido e investir a diferença com base em estatística aplicada e ativos de qualidade. Fazemos essa simulação técnica para o seu caso.'],
    ],
  },
  {
    slug: 'segunda-opiniao-isenta-sobre-meus-investimentos',
    curto: 'Segunda opinião sem conflito',
    seg: 'pf',
    icon: 'eye',
    q: 'Não sei se o que meu gerente ou corretora recomenda é bom para mim ou para eles.',
    h1: 'Segunda opinião sobre seus investimentos, sem conflito de interesses',
    title: 'Segunda opinião sobre investimentos sem conflito | Outro Primo',
    desc: 'Auditoria de carteira sem conflito de interesses. Não recebo comissão por venda de produtos nem rebate de corretoras. Modelo fiduciário em Ponta Grossa e online.',
    corpo: [
      'No mercado financeiro tradicional, quase todos os profissionais são remunerados por comissões ocultas (rebates) embutidas nos produtos que vendem. Isso cria um conflito de interesses inevitável: o produto que paga a maior comissão para o intermediário quase nunca é o mais rentável ou seguro para você.',
      'Na Outro Primo, atuamos sob o modelo sem conflito de interesses (Fee-Only): você nos remunera pela consultoria técnica e nós trabalhamos exclusivamente para o seu bolso. Não recebo comissão por venda de produtos nem rebate de corretoras ou bancos. Analisamos sua carteira atual, identificamos taxas ocultas, riscos desnecessários e sugerimos a alocação ideal para os seus objetivos.',
    ],
    sinais: [
      'Sua carteira tem produtos complexos (COEs, títulos ilíquidos, previdências com taxas altas) que você não compreende',
      'Seu assessor ou gerente troca seus investimentos com frequência sem motivo claro',
      'Você não sabe exatamente quanto paga de taxas administrativas e de corretagem no total',
      'Falta uma visão do patrimônio como um todo, alinhada à sua vida e família',
    ],
    entrega: [
      'Auditoria completa da carteira atual com raio-x de custos, riscos e taxas embutidas',
      'Estruturação da carteira por classes de ativos usando estatística aplicada',
      'Alinhamento com seus objetivos reais de curto, médio e longo prazo',
      'Independência total: a custódia e a execução permanecem sob o seu controle no banco de sua escolha',
    ],
    faq: [
      ['A Outro Primo recebe alguma comissão de bancos ou corretoras?', 'Zero. Não temos vínculo com nenhuma instituição financeira e não recebemos rebate. Essa é a única garantia de que o conselho dado é 100% voltado para o seu patrimônio.'],
      ['Preciso transferir meu dinheiro para a Outro Primo?', 'Não. Não somos corretora nem gestora de recursos. O seu dinheiro permanece na sua conta em qualquer banco ou corretora que você preferir.'],
    ],
  },
  {
    slug: 'quanto-preciso-juntar-para-me-aposentar',
    curto: 'Quanto preciso para me aposentar',
    seg: 'pf',
    icon: 'clock',
    q: 'Quanto preciso acumular e guardar por mês para me aposentar com tranquilidade?',
    h1: 'Quanto preciso juntar para me aposentar com tranquilidade e independência?',
    title: 'Quanto juntar para me aposentar com tranquilidade | Outro Primo',
    desc: 'Cálculo real de independência financeira com premissas transparentes de taxa real, inflação e longevidade. Fuja de fórmulas mágicas.',
    corpo: [
      'Aposentadoria tranquila não é fruto de sorte nem de apostas arriscadas: é matemática e disciplina. Depender exclusivamente do INSS ou de fórmulas genéricas da internet é uma armadilha perigosa para quem deseja manter o padrão de vida na maturidade.',
      'Desenvolvemos um cálculo personalizado com premissas explícitas: taxa real de retorno acima da inflação, horizonte de tempo, capacidade mensal de aporte e taxa de retirada segura (baseada nos estudos clássicos de finanças). Você passa a enxergar exatamente onde está e o que precisa fazer hoje para ter paz amanhã.',
    ],
    sinais: [
      'Você guarda dinheiro quando sobra, mas sem saber se o valor será suficiente',
      'Não tem ideia de quanto precisa acumular para viver de renda no futuro',
      'Preocupa-se com o futuro da família caso você não possa mais gerar receita',
      'Quer saber se é possível antecipar sua aposentadoria ou desacelerar o ritmo de trabalho',
    ],
    entrega: [
      'Simulação técnica de independência financeira com cenários conservador e moderado',
      'Cálculo do aporte mensal ideal e da taxa de retirada segura na fase de usufruto',
      'Estratégia de transição suave do trabalho para a liberdade financeira',
      'Revisões periódicas para ajustar o plano às mudanças da economia e da sua vida',
    ],
    faq: [
      ['O que é a taxa de retirada segura?', 'É o percentual anual que você pode resgatar do seu patrimônio acumulado sem correr o risco de esgotar o dinheiro durante a sua vida, considerando a reposição inflacionária.'],
      ['Ainda sou jovem (ou já passei dos 45 anos). Ainda dá tempo?', 'Sempre dá tempo de construir mais segurança. Quanto mais cedo, mais o tempo trabalha a favor; para quem começa mais tarde, o foco é a eficiência e a proteção do capital existente.'],
    ],
  },
  {
    slug: 'como-organizar-as-financas-pessoais',
    curto: 'Organizar finanças pessoais',
    seg: 'pf',
    icon: 'home',
    q: 'Quero organizar minha vida financeira com tranquilidade e sem neura.',
    h1: 'Como organizar a vida financeira com simplicidade, empatia e método',
    title: 'Como organizar as finanças pessoais com tranquilidade | Outro Primo',
    desc: 'Inspirado na filosofia de acolhimento e simplicidade: orçamento sem neura, reserva de emergência e rotina automática de poupança.',
    corpo: [
      'Organizar o dinheiro não deve ser um exercício de culpa ou preenchimento de planilhas complexas com centenas de linhas. Finanças pessoais saudáveis tratam da sua tranquilidade, do bem-estar da família e da clareza sobre suas escolhas de vida.',
      'Inspirados na abordagem humanizada de finanças (onde a escuta atenta e o vínculo genuíno vêm antes de qualquer gráfico), ajudamos você a construir uma reserva de emergência realista, eliminar dívidas caras e automatizar seus investimentos com leveza e constância.',
    ],
    sinais: [
      'O mês termina e você não tem clareza sobre onde o dinheiro foi parar',
      'Você já tentou preencher planilhas complicadas e desistiu após poucos dias',
      'Falta um colchão de segurança para imprevistos de saúde ou manutenção',
      'Sensação de que o dinheiro é motivo de tensão nas conversas da família',
    ],
    entrega: [
      'Mapeamento simples dos fluxos essenciais de despesas e estilo de vida',
      'Cálculo da reserva de emergência proporcional à estabilidade da sua renda',
      'Estruturação de um sistema automático para guardar dinheiro antes de gastar',
      'Acompanhamento acolhedor até que os bons hábitos se tornem naturais',
    ],
    faq: [
      ['Vou precisar cortar tudo o que gosto para me organizar?', 'De forma alguma. Organização financeira consciente não é privação, é priorização. O objetivo é gastar com tranquilidade no que realmente importa para você e eliminar os desperdícios que passam despercebidos.'],
      ['Como funciona a reserva de emergência?', 'É um montante investido em ativos de liquidez diária e risco quase zero (como Tesouro Selic ou CDBs com liquidez imediata) destinado exclusivamente a imprevistos, protegendo o restante dos seus investimentos.'],
    ],
  },
];

const SEGS = { neg: 'Para empresas e autônomos', pf: 'Vida pessoal e patrimônio' };
const SEGURL = { neg: '/negocios/', pf: '/investimentos/' };

const problemaCard = (p) =>
  `<a class="card" href="/problemas/${p.slug}/">
    <div class="ico">${ic(p.icon)}</div>
    <span class="pill ${p.seg}">${SEGS[p.seg]}</span>
    <h3 style="margin-top:8px">${p.q}</h3>
    <span class="more">Ver como resolvemos ${ic('arrow')}</span>
  </a>`;

const faqHtml = (items) =>
  `<div class="narrow">${items.map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('')}</div>`;

const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

const FAQ_NEG = [
  ['Preciso trocar de contador para contratar a Outro Primo?', 'De forma alguma. Trabalhamos em parceria estreita com o seu contador: fazemos o levantamento técnico e as simulações, fundamentamos a base legal e realizamos a implantação junto com ele.'],
  ['Reduzir imposto é legal e seguro?', 'Sim. A elisão fiscal é o planejamento tributário lícito, escolhendo previamente as alternativas permitidas pelas normas vigentes. Confirmamos a legislação antes de qualquer recomendação e mostramos o cálculo comparativo. Não há promessas mágicas: cada empresa é analisada com critério.'],
  ['Como funciona a cobrança na Outro Primo Negócios?', 'Trabalhamos com formatos transparentes e flexíveis de acordo com o projeto: honorários de consultoria pré-combinados (fee fixo), participação sobre ganhos financeiros comprovados (success fee em até 12 meses) ou a combinação de ambos, assegurando alinhamento total de interesses e risco compartilhado. Você só remunera o que for combinado e demonstrado.'],
  ['Atendem apenas empresas ou também profissionais autônomos e liberais?', 'Atendemos pequenas e médias empresas dos mais diversos setores — como manufaturas e indústrias locais, comércio varejista, restaurantes, clínicas veterinárias e de saúde, e escolas — além de profissionais autônomos e liberais (psicólogos, médicos, terapeutas, dentistas, arquitetos, consultores) e prestadores de serviços PJ que precisam organizar o fluxo de caixa, otimizar tributos de forma lícita e planejar a aposentadoria com segurança.'],
  ['Por onde começamos o trabalho?', 'Pelo diagnóstico de maturidade gerencial nos 5 pilares fundamentais da empresa. A partir do diagnóstico, aplicamos a lógica 80/20 de Pareto: atacamos primeiro os gargalos que destravam caixa rápido para você sentir a diferença no bolso.'],
  ['Atendem fora de Ponta Grossa/PR?', 'Sim. Nosso escritório fica em Ponta Grossa/PR, onde atendemos presencialmente toda a região dos Campos Gerais e Curitiba, além de atendimento online estruturado para clientes em todo o Brasil.'],
];

const FAQ_PF = [
  ['A Outro Primo vende produtos de investimento ou seguros?', 'Não. Atuamos sob o modelo fiduciário puro (Fee-Only): você nos remunera pela consultoria técnica. Não vendemos produtos financeiros nem recebemos rebates ou comissões de bancos e corretoras. Nosso único compromisso é com o seu bolso.'],
  ['Como é calculada a minha aposentadoria?', 'Definimos o seu perfil e objetivos de vida, calculamos o padrão de despesas desejado na maturidade e projetamos o patrimônio necessário com premissas transparentes de taxa real de retorno e taxa de retirada segura, usando ferramentas estatísticas.'],
  ['Vocês decidem onde o meu dinheiro fica custodiado?', 'Não. Apresentamos a alocação técnica ideal por classes de ativos e os critérios objetivos de escolha. A decisão e a execução final continuam 100% sob o seu controle, no banco ou na corretora de sua preferência.'],
  ['Como funciona a experiência de atendimento?', 'Priorizamos o atendimento próximo, pessoal e humanizado: simplicidade, vínculo genuíno e escuta atenta sem julgamentos. Aliamos esse cuidado pessoal a ferramentas analíticas proprietárias de modelagem financeira para entregar soluções práticas com total tranquilidade.'],
  ['Vocês também orientam sobre patrimônio no exterior?', 'Sim. Estruturamos a diversificação internacional de forma 100% legal, declarada perante a Receita Federal e o Banco Central, avaliando custos totais, eficiência de impostos e proteção sucessória.'],
];

const FAQ_EXT = [
  ['Investir no exterior é legal e seguro?', 'Sim, perfeitamente legal e seguro, desde que realizado de forma declarada. Orientamos a organização das declarações perante a Receita Federal e o Banco Central de acordo com as normas vigentes.'],
  ['As leis tributárias sobre ativos no exterior mudaram recentemente?', 'Sim, a Lei 14.754/2023 unificou a tributação de investimentos no exterior. Por isso, toda a nossa orientação avalia a regra vigente em conjunto com o seu contador ou advogado de confiança.'],
  ['Vale a pena para quem não é milionário?', 'Sim. Hoje existem estruturas acessíveis e seguras que permitem a pessoas físicas e famílias protegerem parte do seu poder de compra em moedas fortes com custos operacionais baixos.'],
];

// ── Schemas Estruturados (SEO & E-E-A-T Máximo) ─────────────────────────────
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#org`,
  name: NOME,
  url: SITE_URL,
  description: 'Consultoria independente para pequenas e médias empresas, autônomos e pessoas físicas. Métodos de multinacionais adaptados com simplicidade na lógica 80/20 de Pareto, e consultoria patrimonial fiduciária sem venda de produtos.',
  logo: `${SITE_URL}/img/marca.png`,
  image: `${SITE_URL}/img/og.jpg`,
  email: EMAIL,
  areaServed: [{ '@type': 'City', name: 'Ponta Grossa' }, { '@type': 'Country', name: 'Brasil' }],
  address: { '@type': 'PostalAddress', addressLocality: 'Ponta Grossa', addressRegion: 'PR', addressCountry: 'BR' },
  founder: { '@id': `${SITE_URL}/#maycoln` },
  sameAs: [LINKEDIN],
  knowsAbout: [
    'Consultoria para pequenas e médias empresas',
    'Consultoria para profissionais autônomos e liberais',
    'Diagnóstico de maturidade gerencial',
    'Planejamento tributário lícito e elisão fiscal',
    'Eliminação de desperdício Lean Six Sigma',
    'Gestão de fluxo de caixa e margem de contribuição',
    'Planejamento de aposentadoria e independência financeira',
    'Consultoria patrimonial independente e sem conflito de interesses',
    'Alocação de ativos e estatística aplicada',
  ],
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#maycoln`,
  name: 'Maycoln Primo',
  jobTitle: 'Fundador e Consultor Principal da Outro Primo',
  url: `${SITE_URL}/sobre/`,
  image: `${SITE_URL}/img/perfil.jpg`,
  worksFor: { '@id': `${SITE_URL}/#org` },
  sameAs: [LINKEDIN],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Universidade Tecnológica Federal do Paraná (UTFPR)' },
    { '@type': 'CollegeOrUniversity', name: 'Universidade Estadual de Ponta Grossa (UEPG)' },
  ],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'Profissional Certificado ANBIMA CEA' },
    { '@type': 'EducationalOccupationalCredential', name: 'Especialista Lean Six Sigma Black Belt' },
  ],
};

// ── Layout Base com Padrão Safra ────────────────────────────────────────────
const layout = ({ url, title, desc, body, schema = [], image = '/img/og.jpg', crumb = null, noindex = false, preload = '' }) => {
  const bc = crumb
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [['/', 'Início'], ...crumb].map(([h, t], i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t,
          item: SITE_URL + (h || url),
        })),
      }
    : null;
  const crumbHtml = crumb
    ? `<nav class="wrap crumbs" aria-label="Você está em">${[['/', 'Início'], ...crumb]
        .map(([h, t], i, a) => (i < a.length - 1 ? `<a href="${h}">${t}</a>` : `<span aria-current="page">${t}</span>`))
        .join(' › ')}</nav>`
    : '';
  const cur = (h) => (url === h || (h !== '/' && url.startsWith(h)) ? ' aria-current="page"' : '');

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#0A192F">
<meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">
<link rel="canonical" href="${SITE_URL}${url}">
<link rel="icon" href="/favicon.png">
<link rel="apple-touch-icon" href="/favicon.png">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="${NOME}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${SITE_URL}${url}">
<meta property="og:image" content="${SITE_URL}${image}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${SITE_URL}${image}">
${preload}<link rel="stylesheet" href="/style.css">
${[...schema, ...(bc ? [bc] : [])].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
${SPRITE}
<div class="topbar">
  <div class="wrap">
    <span>${ic('shield')} Consultoria independente · Sem conflito de interesses · Não recebo comissão por produtos nem rebate de corretoras</span>
    <span class="hide-m">
      ${ic('mail')} <a href="mailto:${EMAIL}">${EMAIL}</a>
      &nbsp;·&nbsp; ${ic('pin')} Ponta Grossa/PR e online
    </span>
  </div>
</div>
<header class="site">
  <div class="wrap nav">
    <a class="brand" href="/" aria-label="${NOME}: página inicial">
      <img src="/img/marca.png" alt="Logotipo Outro Primo" width="40" height="43">
      <span>${NOME}<small>Gestão &bull; Finanças</small></span>
    </a>
    <input type="checkbox" id="nt" aria-label="Abrir menu de navegação">
    <label class="burger" for="nt" aria-hidden="true"><span></span></label>
    <nav class="menu" aria-label="Navegação principal">
      ${NAV.map(([h, t]) => `<a href="${h}"${cur(h)}>${t}</a>`).join('')}
      <a class="btn" href="/contato/">Agendar Conversa</a>
    </nav>
  </div>
</header>
<main id="conteudo">${crumbHtml}${body}</main>
<footer>
  <div class="wrap">
    <div class="foot">
      <div>
        <div class="bl">
          <span class="chipimg"><img src="/img/marca.png" alt="" width="36" height="39" loading="lazy"></span>
          <strong>${NOME}</strong>
        </div>
        <p>A experiência prática e treinamentos em multinacionais adaptados com simplicidade à realidade de pequenas e médias empresas, autônomos e pessoas físicas. Mais dinheiro no seu bolso, com rigor técnico e calor humano.</p>
        <p><a href="${LINKEDIN}" rel="noopener" target="_blank" aria-label="LinkedIn de Maycoln Primo">${ic('linkedin')} Conecte-se no LinkedIn</a></p>
      </div>
      <div>
        <h4>Empresas e Autônomos</h4>
        <ul>
          <li><a href="/negocios/">Como ajudamos seu negócio</a></li>
          ${PROBLEMAS.filter((p) => p.seg === 'neg').map((p) => `<li><a href="/problemas/${p.slug}/">${p.curto}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h4>Vida Pessoal e Família</h4>
        <ul>
          <li><a href="/investimentos/">Como organizamos seu patrimônio</a></li>
          <li><a href="/exterior/">Patrimônio no exterior</a></li>
          ${PROBLEMAS.filter((p) => p.seg === 'pf').map((p) => `<li><a href="/problemas/${p.slug}/">${p.curto}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h4>Atendimento & Institucional</h4>
        <ul class="ct">
          <li>${ic('chat')}<a href="${WA('Olá, Maycoln! Vim pelo site da Outro Primo e gostaria de conversar.')}" rel="noopener">WhatsApp Direto</a></li>
          <li>${ic('mail')}<a href="mailto:${EMAIL}">${EMAIL}</a></li>
          <li>${ic('pin')}<span>Ponta Grossa/PR<br>e online para todo o Brasil</span></li>
        </ul>
        <h4 style="margin-top:22px">Institucional</h4>
        <ul>
          <li><a href="/sobre/">Quem é o Maycoln</a></li>
          <li><a href="/problemas/">Problemas e oportunidades</a></li>
          <li><a href="/privacidade/">Privacidade & Governança</a></li>
          <li><a href="/contato/">Contato</a></li>
        </ul>
      </div>
    </div>
    <div class="legal">
      ${SHOW_SELO ? seloImg() : ''}
      <div>
        <p>${FOOT_NOTE}</p>
        ${SHOW_SELO ? '<p>Maycoln Primo é profissional certificado ANBIMA CEA &bull; Especialista em Melhoria Contínua Lean Six Sigma.</p>' : ''}
        <p class="copy">&copy; ${ANO} ${NOME} Consultoria Independente. Todos os direitos reservados. &bull; <a href="/privacidade/" style="color:#C5A880;text-decoration:none">Política de Privacidade e Governança Fiduciária</a></p>
      </div>
    </div>
  </div>
</footer>
<a class="fab" href="${WA('Olá, Maycoln! Vim pelo site da Outro Primo e quero conversar.')}" rel="noopener" aria-label="Falar pelo WhatsApp com Maycoln Primo">${ic('chat')} Falar no WhatsApp</a>
</body>
</html>`;
};

// ── Bloco de Desperdício e Eficiência ───────────────────────────────────────
const DESPERDICIO = `<section class="white-bg">
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Eficiência Operacional & Lean Six Sigma</p>
      <h2>Onde há desperdício, há lucro imediato esperando para ser destravado.</h2>
      <p>Em qualquer operação — de indústrias e manufaturas locais a lojas de varejo, restaurantes, clínicas e prestadores de serviços —, uma parte expressiva do esforço, do tempo, dos insumos e da energia se perde em retrabalho e ociosidade. Estancar essa perda é o caminho mais rápido para colocar dinheiro no caixa sem precisar vender mais. Atuamos na empresa inteira ou focados no setor onde o ganho for mais expressivo.</p>
    </div>
    <div class="grid g4">
      <div class="card"><div class="ico">${ic('clock')}</div><h3>Espera e retrabalho</h3><p>Fluxos interrompidos, tarefas refeitas e clientes aguardando por falta de padrão claro.</p></div>
      <div class="card"><div class="ico">${ic('layers')}</div><h3>Estoque e materiais</h3><p>Capital de giro parado em prateleiras, desperdício de insumos e quebras que ninguém mede.</p></div>
      <div class="card"><div class="ico">${ic('leaf')}</div><h3>Energia e utilidades</h3><p>Contas de energia e água acima do necessário, com potencial comprovado de redução.</p></div>
      <div class="card"><div class="ico">${ic('sliders')}</div><h3>Gargalos e ociosidade</h3><p>O ponto crítico que segura toda a operação e limita a rentabilidade do negócio.</p></div>
    </div>
    <h3 style="margin-top:36px">Como conduzimos um projeto de eficiência operacional</h3>
    <ol class="steps">
      <li><strong>Medir</strong><p>Identificar exatamente onde está o vazamento de recursos e quanto ele custa em reais por mês.</p></li>
      <li><strong>Priorizar (80/20)</strong><p>Atacar primeiro o que gera o maior ganho com o menor esforço e custo de implantação.</p></li>
      <li><strong>Atacar a causa</strong><p>Resolver a causa-raiz do problema com método prático (DMAIC), evitando soluções paliativas.</p></li>
      <li><strong>Manter o ganho</strong><p>Padronizar rotinas e criar indicadores visuais simples para o resultado se manter no longo prazo.</p></li>
    </ol>
    <p class="small" style="margin-top:16px">Nenhum resultado é fruto de promessas mágicas; cada caso é respaldado por dados técnicos e alinhamento com a equipe.</p>
    <p><a class="btn alt" href="/problemas/como-reduzir-desperdicio-na-empresa/">Ver como funciona na prática ${ic('arrow')}</a></p>
  </div>
</section>`;

const pages = [];
const add = (p) => pages.push(p);

// ─────────────────────────────────────────────────────────────────────────────
// 1. HOME (Página Inicial)
// ─────────────────────────────────────────────────────────────────────────────
add({
  url: '/',
  title: 'Outro Primo | Gestão de Negócios e Finanças com Rigor e Independência',
  desc: '28 anos de liderança na indústria multinacional. Métodos de gestão e ferramentas patrimoniais adaptados a PMEs, autônomos e famílias. Lógica 80/20 sem conflito de interesses.',
  schema: [orgSchema, personSchema, { '@context': 'https://schema.org', '@type': 'WebSite', name: NOME, url: SITE_URL, inLanguage: 'pt-BR' }],
  preload: '<link rel="preload" as="image" href="/img/hero.jpg" fetchpriority="high">\n',
  body: `
<section class="hero">
  <div class="wrap">
    <div>
      <p class="eyebrow">Consultoria Independente &bull; Negócios &bull; Gestão Patrimonial</p>
      <h1>A vivência de 28 anos na liderança da indústria multinacional, com a simplicidade que o seu negócio e sua vida pessoal precisam.</h1>
      <p class="lead">Nossa proposta de valor é colocar mais dinheiro no seu bolso: destravando caixa e reduzindo impostos de forma legal e segura no seu negócio, e organizando a aposentadoria e os investimentos da sua família sem conflito de interesses. Métodos testados e aplicados com simplicidade na lógica 80/20 de Pareto.</p>
      <div class="row">
        ${cta('Agendar conversa sem compromisso', 'Olá, Maycoln! Vim pelo site da Outro Primo e gostaria de agendar uma conversa.', 'wa')}
        <a class="btn alt" href="/sobre/">Conheça o Maycoln</a>
      </div>
    </div>
    <div class="photo">
      <img src="/img/hero.jpg" alt="Maycoln Primo, consultor e fundador da Outro Primo" width="450" height="600" fetchpriority="high" decoding="async">
      <div class="badge">
        <span class="badge-tag">Trajetória Executiva</span>
        <b>28 anos de carreira</b>
        <span>liderando equipes e processos na indústria multinacional</span>
      </div>
    </div>
  </div>
</section>

<div class="trust-bar">
  <div class="wrap">
    <div class="trust-item">${ic('award')} Profissional Certificado ANBIMA CEA</div>
    <div class="trust-item">${ic('target')} Especialista Lean Six Sigma Black Belt</div>
    <div class="trust-item">${ic('shield')} Modelo Sem Conflito de Interesses (Zero comissão ou rebate de corretoras)</div>
    <div class="trust-item">${ic('pin')} Ponta Grossa/PR e atendimento online em todo o Brasil</div>
  </div>
</div>

<section class="section-entradas">
  <div class="wrap">
    <div class="head c" style="margin-bottom:32px">
      <p class="eyebrow" style="justify-content:center">Caminhos de Atendimento</p>
      <h2>Por onde você prefere começar?</h2>
      <p>Estruturamos soluções sob medida tanto para a gestão do seu negócio quanto para a sua vida pessoal e patrimônio familiar:</p>
    </div>
    <div class="entradas">
      <a class="entrada" href="/negocios/">
        <span class="ico">${ic('briefcase')}</span>
        <strong>Para a sua Empresa ou Atuação Profissional</strong>
        <p>Para indústrias, comércios, restaurantes, clínicas e profissionais autônomos. Diagnóstico em 5 pilares, caixa, processos, equipe e elisão fiscal dentro da lei.</p>
        <span class="go">Ver soluções empresariais ${ic('arrow')}</span>
      </a>
      <a class="entrada inv" href="/investimentos/">
        <span class="ico">${ic('pie')}</span>
        <strong>Para a sua Vida Pessoal e Família</strong>
        <p>Organização financeira humanizada, cálculo exato para aposentadoria, carteira de investimentos com estatística aplicada e segunda opinião sem conflito de interesses.</p>
        <span class="go">Ver soluções pessoais ${ic('arrow')}</span>
      </a>
      <a class="entrada dois" href="/contato/">
        <span class="ico">${ic('layers')}</span>
        <strong>Visão Integrada (Negócio e Vida Pessoal)</strong>
        <p>Para empresários, profissionais liberais e autônomos que desejam organizar o caixa do negócio e estruturar a proteção e o patrimônio da família de forma harmônica.</p>
        <span class="go">Quero um diagnóstico completo ${ic('arrow')}</span>
      </a>
    </div>
  </div>
</section>

<section class="white-bg">
  <div class="wrap two">
    <div>
      <p class="eyebrow">Nossa Missão & Cultura</p>
      <h2>Democratizar o conhecimento de gestão e finanças de classe mundial.</h2>
      <p>Grandes indústrias corporativas e investidores globais utilizam ferramentas consolidadas de governança, eficiência operacional e alocação patrimonial. Nossa missão é traduzir essas teorias para a linguagem simples e a realidade prática de empreendedores comuns, pequenas e médias empresas dos mais diversos setores — manufaturas e indústrias locais, comércio varejista, restaurantes, clínicas veterinárias e de saúde, escolas e empresas de serviços — além de profissionais autônomos e liberais (psicólogos, médicos, arquitetos, consultores) que vivem o dia a dia da operação sem dispor de diretorias de finanças.</p>
      <p>Tudo estruturado na <strong>lógica 80/20 de Pareto</strong>: você não precisa da burocracia que uma multinacional carrega; precisa apenas dos 20% das ações que movem 80% do resultado do seu negócio e da sua vida financeira.</p>
    </div>
    <ul class="ok" style="font-size:1.05rem">
      <li><strong>Mais dinheiro no seu bolso:</strong> destrave de margem na sua empresa e acúmulo consciente no seu patrimônio pessoal.</li>
      <li><strong>Experiência e treinamentos de ponta:</strong> 28 anos de carreira na liderança industrial traduzidos sem jargões.</li>
      <li><strong>Conexão humana e acolhimento:</strong> atendimento próximo, escuta atenta e conversa franca sem julgamentos ou planilhas intimidadoras.</li>
      <li><strong>Inteligência analítica e ferramentas proprietárias:</strong> simulações financeiras precisas e diagnósticos rápidos para decisões seguras.</li>
    </ul>
  </div>
</section>

<!-- DIAGNÓSTICO DE MATURIDADE GERENCIAL EM 5 PILARES -->
<section class="alt-bg">
  <div class="wrap">
    <div class="head c">
      <p class="eyebrow" style="justify-content:center">Metodologia Exclusiva &bull; Outro Primo Negócios</p>
      <h2>Diagnóstico de Maturidade Gerencial em 5 Pilares</h2>
      <p>Baseado no app de diagnóstico proprietário da Outro Primo, avaliamos o negócio para identificar com precisão onde o caixa está travado e onde estão as maiores oportunidades de ganho.</p>
    </div>
    <div class="grid g5">
      <div class="pilar-card">
        <h3>1. Finanças & Caixa</h3>
        <p>Precificação por margem real, previsibilidade de fluxo de caixa, separação estrita PJ/PF e elisão fiscal dentro da lei.</p>
      </div>
      <div class="pilar-card">
        <h3>2. Liderança & Equipe</h3>
        <p>Delegação segura, ritos curtos de gestão, treinamento prático e alinhamento de metas sem desgastar o dono.</p>
      </div>
      <div class="pilar-card">
        <h3>3. Operações & Processos</h3>
        <p>Eliminação de desperdício Lean Six Sigma, redução de retrabalho, estoque enxuto e estanque de perdas operacionais.</p>
      </div>
      <div class="pilar-card">
        <h3>4. Vendas & Comercial</h3>
        <p>Funil enxuto de vendas, política de descontos seguros, follow-up de clientes e mix de produtos com maior margem líquida.</p>
      </div>
      <div class="pilar-card">
        <h3>5. Estratégia & Escala</h3>
        <p>Visão clara de crescimento sustentável, indicadores visuais semanais e governança para a empresa rodar sem sufoco.</p>
      </div>
    </div>
    <div style="text-align:center;margin-top:28px">
      <p class="small">O conselho foca apenas no que você precisa para destravar resultado imediato. Sem teorias vazias: valor rápido sentido no bolso.</p>
      <p><a class="btn" href="/negocios/">Entenda o diagnóstico para sua empresa ${ic('arrow')}</a></p>
    </div>
  </div>
</section>

<!-- EXPERIÊNCIA DO CLIENTE: CONEXÃO HUMANA E INTELIGÊNCIA ANALÍTICA -->
<section class="white-bg">
  <div class="wrap two">
    <div>
      <p class="eyebrow">Experiência do Cliente &bull; Conexão Real</p>
      <h2>O toque humano, a escuta acolhedora e a inteligência analítica de ponta.</h2>
      <p>Acreditamos profundamente que finanças e negócios tratam, antes de tudo, de pessoas reais e suas famílias. Colocamos a simplicidade, a confiança e a escuta atenta no centro de cada conversa. Sem julgamentos sobre escolhas passadas, sem teorias complicadas e sem planilhas intimidadoras.</p>
      <p>Você é atendido diretamente por quem tem 28 anos de vivência executiva, com o suporte de ferramentas analíticas proprietárias de modelagem e diagnóstico. Essa combinação traz clareza imediata para as suas decisões, permitindo entregar muito mais do que você espera, com tranquilidade e respeito ao seu momento.</p>
      <div class="creds">
        <span class="chip">${ic('heart')} Escuta Atenta e Vínculo Real</span>
        <span class="chip">${ic('target')} Modelagem Analítica Própria</span>
        <span class="chip">${ic('shield')} Sigilo e Confidencialidade Absolutos</span>
      </div>
    </div>
    <img src="/img/escritorio.jpg" alt="Maycoln Primo em seu escritório de consultoria" loading="lazy" width="450" height="600">
  </div>
</section>

<section class="alt-bg">
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Dores & Oportunidades Frequentes</p>
      <h2>Alguma dessas situações se parece com o seu momento?</h2>
      <p>Clique na situação que mais reflete o seu desafio atual e veja, na prática, como resolvemos com simplicidade técnica.</p>
    </div>
    <div class="grid">${PROBLEMAS.map(problemaCard).join('')}</div>
  </div>
</section>

<div class="stats">
  <div class="wrap">
    <div><b>28 anos</b><span>de carreira executiva<br>na indústria multinacional</span></div>
    <div><b>19 anos</b><span>liderando equipes<br>em grandes operações</span></div>
    <div><b>5 pilares</b><span>de diagnóstico<br>empresarial calibrados</span></div>
    <div><b>100%</b><span>independente e fiduciário<br>sem comissão de terceiros</span></div>
  </div>
</div>

${DESPERDICIO}

<section>
  <div class="wrap">
    <div class="head c">
      <p class="eyebrow" style="justify-content:center">Jornada de Trabalho</p>
      <h2>Do primeiro contato ao resultado real no bolso</h2>
    </div>
    <ol class="steps">
      <li><strong>Conversa de alinhamento</strong><p>Você conta a sua realidade e seus desafios; avaliamos com honestidade se faz sentido trabalharmos juntos.</p></li>
      <li><strong>Diagnóstico focado</strong><p>Avaliamos os números e gargalos sob a regra 80/20, identificando o que mais pesa no seu resultado.</p></li>
      <li><strong>Plano pragmático</strong><p>Um plano simples, sem burocracia, com ações prioritárias, responsáveis, metas e prazos transparentes.</p></li>
      <li><strong>Acompanhamento próximo</strong><p>Ao seu lado até a rotina se consolidar, com medição técnica do ganho alcançado.</p></li>
    </ol>
  </div>
</section>

<!-- MODELO DE COBRANÇA (SEÇÃO 12) -->
<section class="alt-bg">
  <div class="wrap two top">
    <div>
      <p class="eyebrow">Transparência Radical &bull; Seção 12</p>
      <h2>Modelo de remuneração transparente e combinado antes de começar.</h2>
      <p>No mercado tradicional de consultoria e investimentos, é comum encontrar taxas ocultas, letrinhas miúdas e comissões invisíveis. Na Outro Primo, o alinhamento com você é inegociável:</p>
      <ul class="ok">
        <li><strong>Honorários de consultoria (Fee fixo combinado previamente):</strong> valor acordado antes de iniciar qualquer trabalho, sem surpresas nem acréscimos indevidos.</li>
        <li><strong>Participação no ganho comprovado (Success Fee):</strong> até 50% do ganho real comprovado em até 12 meses, auditado por indicadores técnicos e fontes verificadas com o cliente. Se o ganho não for demonstrado, você não remunera esse valor.</li>
        <li><strong>Estrutura personalizada (combinação de formatos):</strong> em diversos projetos, combinamos honorários fixos enxutos com participação sobre os resultados reais alcançados, garantindo risco compartilhado e total alinhamento de interesses.</li>
        <li><strong>Modelo sem conflito de interesses:</strong> não recebo comissão por venda de produtos nem rebate de corretoras ou bancos. Minha remuneração vem única e exclusivamente do serviço de consultoria prestado a você, com responsabilidade total pelo seu resultado.</li>
      </ul>
    </div>
    <div>
      <div class="card" style="padding:32px 28px;border-top:4px solid var(--gold)">
        <h3 style="font-size:1.3rem;margin-bottom:12px">Segurança e Ética Profissional</h3>
        <p>Trabalhamos lado a lado com o seu contador e com os seus parceiros de confiança. Toda recomendação de elisão fiscal é respaldada na legislação vigente e todo conselho de investimentos respeita o seu perfil exclusivo de risco.</p>
        <div style="margin-top:20px">${cta('Converse diretamente com o Maycoln', 'Olá, Maycoln! Quero entender as opções de consultoria para o meu caso.', 'wa')}</div>
      </div>
    </div>
  </div>
</section>

<section class="white-bg">
  <div class="wrap two">
    <img src="/img/blazer.jpg" alt="Maycoln Primo, consultor da Outro Primo" loading="lazy" width="450" height="600" style="max-width:420px">
    <div>
      <p class="eyebrow">Quem conduz o seu trabalho</p>
      <h2>Experiência de liderança em multinacionais a serviço do seu negócio e do seu patrimônio.</h2>
      <p>Iniciei minha carreira formal em 1998 em multinacionais de grande porte, passei à liderança oficial em 2007 e gerenciei orçamentos e custos operacionais da ordem de dezenas de milhões de reais em plantas industriais complexas. Criei a Outro Primo para compartilhar essas ferramentas com quem mais move a economia real: o pequeno e médio empresário, o profissional autônomo e a pessoa física que quer cuidar bem do seu patrimônio.</p>
      <div class="creds">
        <span class="chip">${ic('award')} Certificação ANBIMA CEA</span>
        <span class="chip">${ic('target')} Black Belt Six Sigma</span>
        <span class="chip">${ic('book')} Especialista em Gestão Ambiental (UEPG)</span>
      </div>
      <p><a class="btn alt" href="/sobre/">Conheça a trajetória completa do Maycoln ${ic('arrow')}</a></p>
    </div>
  </div>
</section>

<div class="wrap cta-wrap">
  <div class="cta-band">
    <div>
      <h2>Vamos conversar sobre o seu momento?</h2>
      <p>Primeira conversa sem nenhum compromisso. Atendemos com discrição e respeito em Ponta Grossa/PR e online para todo o Brasil.</p>
    </div>
    ${cta('Chamar no WhatsApp', 'Olá, Maycoln! Vim pelo site da Outro Primo e gostaria de conversar.', 'gold')}
  </div>
</div>
`,
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. NEGÓCIOS & AUTÔNOMOS (`/negocios/`)
// ─────────────────────────────────────────────────────────────────────────────
add({
  url: '/negocios/',
  title: 'Consultoria para Empresas e Autônomos | Outro Primo',
  desc: 'Métodos de gestão industrial adaptados a PMEs, comércios, restaurantes e profissionais autônomos. Diagnóstico em 5 pilares, caixa, processos e elisão fiscal.',
  crumb: [[null, 'Para empresas e autônomos']],
  schema: [orgSchema, faqSchema(FAQ_NEG)],
  body: `
<section class="pagehead">
  <div class="wrap">
    <p class="eyebrow">Outro Primo Negócios &bull; Gestão Empresarial &bull; Profissionais Autônomos</p>
    <h1>Consultoria prática para pequenas e médias empresas e profissionais autônomos</h1>
    <p class="lead narrow">Apoiamos indústrias leves e manufaturas, comércio varejista, restaurantes, clínicas veterinárias e de saúde, escolas e profissionais autônomos e liberais com o diagnóstico em 5 pilares. Focamos no que realmente destrava caixa e resultado (Pareto 80/20), para você sentir a diferença no bolso.</p>
    <div class="row">
      ${cta('Solicitar diagnóstico do meu negócio', 'Olá, Maycoln! Gostaria de agendar um diagnóstico para minha empresa/atuação autônoma.', 'wa')}
    </div>
  </div>
</section>

<section style="padding-top:20px">
  <div class="wrap">
    <div class="head">
      <h2>Os 5 pilares de maturidade da sua empresa</h2>
      <p>Nosso app de diagnóstico avalia a saúde integral da sua operação para priorizar as ações com maior retorno financeiro:</p>
    </div>
    <div class="grid g5">
      <div class="pilar-card">
        <h3>1. Finanças & Caixa</h3>
        <p>Precificação correta com margem de contribuição, fluxo de caixa previsível, separação de contas e planejamento tributário dentro da lei.</p>
      </div>
      <div class="pilar-card">
        <h3>2. Liderança & Equipe</h3>
        <p>Ritos semanais curtos, processos de delegação segura, feedbacks construtivos e engajamento da equipe sem sobrecarregar o sócio.</p>
      </div>
      <div class="pilar-card">
        <h3>3. Operações & Processos</h3>
        <p>Eliminação de desperdício (Lean Six Sigma), redução de tempo ocioso, retrabalho, controle de estoque e padronização das rotinas.</p>
      </div>
      <div class="pilar-card">
        <h3>4. Vendas & Marketing</h3>
        <p>Funil enxuto, abordagem comercial, acompanhamento de propostas (follow-up) e foco nos produtos que deixam maior margem de lucro.</p>
      </div>
      <div class="pilar-card">
        <h3>5. Estratégia & Escala</h3>
        <p>Metas claras, indicadores visuais semanais e planejamento sustentável para a empresa funcionar sem depender 100% da sua presença.</p>
      </div>
    </div>
  </div>
</section>

<!-- SEÇÃO ESPECÍFICA PARA AUTÔNOMOS E PROFISSIONAIS LIBERAIS -->
<section class="alt-bg">
  <div class="wrap two">
    <div>
      <p class="eyebrow">Apoio a Profissionais Autônomos & Liberais</p>
      <h2>Você atua como autônomo, em consultório, escritório ou como prestador PJ? Nós organizamos a sua estrutura.</h2>
      <p>Muitos profissionais liberais e autônomos — como psicólogos, terapeutas, médicos, dentistas, arquitetos, advogados, consultores e especialistas técnicos — enfrentam o desafio da oscilação mensal de receitas, a dúvida de quanto retirar para a vida pessoal, a complexidade dos tributos e a incerteza quanto à própria aposentadoria.</p>
      <ul class="ok">
        <li>Enquadramento tributário econômico e seguro em conjunto com o seu contador (Simples Nacional, Fator R, Presumido ou Livro Caixa).</li>
        <li>Definição de pró-labore saudável e distribuição periódica de lucros isentos.</li>
        <li>Reserva de estabilidade para lidar com períodos de baixa ou oscilações de contratos.</li>
        <li>Planejamento de previdência e aposentadoria pessoal sem depender exclusivamente do INSS.</li>
      </ul>
      <p><a class="btn alt" href="/problemas/autonomos-e-profissionais-pj-como-organizar/">Ver soluções para autônomos e liberais ${ic('arrow')}</a></p>
    </div>
    <div class="card" style="padding:32px 28px;border-top:4px solid var(--navy)">
      <h3>O princípio 80/20 em ação</h3>
      <p>Pequenos empresários e autônomos não têm tempo para reuniões infindáveis ou teorias corporativas pesadas. Nosso compromisso é entregar clareza imediata:</p>
      <p class="quote" style="font-size:1.1rem;margin:16px 0">"Identificamos os 20% dos gargalos que geram 80% das dores de cabeça no seu caixa e na sua rotina."</p>
      <p class="small">Todo o diagnóstico é conduzido com discrição e respeito aos seus prazos.</p>
    </div>
  </div>
</section>

${DESPERDICIO}

<section>
  <div class="wrap two top">
    <div>
      <p class="eyebrow">Modelo de Remuneração Transparente</p>
      <h2>Transparência e alinhamento de interesses</h2>
      <p>Estruturamos a remuneração de forma transparente e combinada previamente, de acordo com o escopo do projeto:</p>
      <ul class="ok">
        <li><strong>Honorários de consultoria (fee pré-fixado):</strong> clareza e previsibilidade total, sem custos ocultos.</li>
        <li><strong>Participação nos ganhos comprovados (success fee):</strong> até 50% do ganho real comprovado em até 12 meses, auditado por métricas técnicas acordadas. Você só remunera o que for demonstrado no caixa.</li>
        <li><strong>Estrutura combinada sob medida:</strong> em diversos casos, estruturamos uma combinação de fee base com participação em resultados para compartilhar riscos e maximizar o retorno da sua empresa.</li>
        <li><strong>Prova técnica e verificável:</strong> indicadores claros do antes e do depois, com fontes validadas junto a você e ao seu contador.</li>
      </ul>
    </div>
    <div>
      <h3>Dores e desafios mais comuns no dia a dia</h3>
      <div class="grid" style="grid-template-columns:1fr">
        ${PROBLEMAS.filter((p) => p.seg === 'neg').map((p) => `<a class="card" style="flex-direction:row;align-items:center;gap:12px;padding:16px 18px" href="/problemas/${p.slug}/">${ic(p.icon)}<span style="flex:1">${p.q}</span>${ic('arrow')}</a>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="alt-bg">
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Dúvidas Frequentes</p>
      <h2>Perguntas frequentes sobre a consultoria para empresas e autônomos</h2>
    </div>
    ${faqHtml(FAQ_NEG)}
  </div>
</section>

<div class="wrap cta-wrap">
  <div class="cta-band">
    <div>
      <h2>Quer destravar o caixa do seu negócio ou da sua atuação PJ?</h2>
      <p>Conte o seu desafio em poucas palavras e vamos conversar sem compromisso.</p>
    </div>
    ${cta('Falar com o Maycoln', 'Olá, Maycoln! Quero agendar um diagnóstico para o meu negócio/atuação.', 'gold')}
  </div>
</div>
`,
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. INVESTIMENTOS & PATRIMÔNIO (`/investimentos/`)
// ─────────────────────────────────────────────────────────────────────────────
add({
  url: '/investimentos/',
  title: 'Consultoria de Investimentos e Organização Financeira | Outro Primo',
  desc: 'Planejamento de aposentadoria, reserva de emergência e diversificação com estatística aplicada. Consultoria sem conflito de interesses (Fee-Only), sem venda de produtos.',
  crumb: [[null, 'Vida pessoal e patrimônio']],
  schema: [orgSchema, faqSchema(FAQ_PF)],
  body: `
<section class="pagehead">
  <div class="wrap">
    <p class="eyebrow">Outro Primo Investimentos &bull; Vida Pessoal &bull; Família &bull; Patrimônio</p>
    <h1>Vida pessoal, organização financeira e gestão do patrimônio</h1>
    <p class="lead narrow">Traduzimos o universo das finanças de forma humanizada e prática para a sua rotina. Uma consultoria independente (Fee-Only) onde você nos remunera pelo serviço profissional, sem conflito de interesses e sem venda de produtos.</p>
    <div class="row">
      ${cta('Quero uma segunda opinião sem conflito', 'Olá, Maycoln! Gostaria de uma segunda opinião sem conflito de interesses sobre os meus investimentos e patrimônio.', 'wa')}
    </div>
  </div>
</section>

<section style="padding-top:20px">
  <div class="wrap">
    <p class="quote">"Não sei se o que meu gerente ou corretora recomenda é bom para mim ou para quem me vendeu. Quero ter a segunda opinião de alguém experiente, técnico e sem conflito de interesses."</p>
    <div class="grid g4">
      <div class="card">
        <div class="ico">${ic('home')}</div>
        <h3>Organização & Reserva</h3>
        <p>Clareza sobre entradas e saídas, cálculo da reserva de emergência adequada ao seu perfil e automação da poupança com tranquilidade.</p>
      </div>
      <div class="card">
        <div class="ico">${ic('clock')}</div>
        <h3>Aposentadoria Calculada</h3>
        <p>Quanto acumular e quanto poupar por mês para ter liberdade financeira real, com premissas transparentes de taxa real e inflação.</p>
      </div>
      <div class="card">
        <div class="ico">${ic('pie')}</div>
        <h3>Estatística Aplicada</h3>
        <p>Diversificação matemática por classes de ativos inspirada nas estratégias de grandes investidores e family offices. A decisão e a custódia continuam 100% sob o seu controle.</p>
      </div>
      <div class="card">
        <div class="ico">${ic('shield')}</div>
        <h3>Proteção & Sucessão</h3>
        <p>Seguros adequados, preservação do patrimônio familiar, eficiência tributária e planejamento sucessório para proteger quem você ama.</p>
      </div>
    </div>
  </div>
</section>

<section class="alt-bg">
  <div class="wrap two top">
    <div>
      <p class="eyebrow">Acolhimento &bull; Finanças Humanizadas</p>
      <h2>Finanças tratadas com respeito, empatia e sem julgamentos.</h2>
      <p>Entendemos que falar de dinheiro mexe com emoções profundas, anseios de segurança e planos familiares. Nosso papel não é apontar o dedo ou exigir que você preencha planilhas cansativas no seu tempo livre.</p>
      <p>O foco é a conexão humana e a simplicidade: entender o seu estilo de vida, traduzir os conceitos do mercado financeiro em linguagem clara e montar uma estratégia realista que traga paz de espírito no presente e segurança no futuro.</p>
      <div style="margin-top:20px">
        <a class="more" href="/exterior/" style="font-weight:600;color:var(--golddk)">Também orientamos sobre patrimônio no exterior de forma 100% declarada ${ic('arrow')}</a>
      </div>
    </div>
    <div>
      <h3>Dúvidas mais comuns sobre o patrimônio pessoal</h3>
      <div class="grid" style="grid-template-columns:1fr">
        ${PROBLEMAS.filter((p) => p.seg === 'pf').map((p) => `<a class="card" style="flex-direction:row;align-items:center;gap:12px;padding:16px 18px" href="/problemas/${p.slug}/">${ic(p.icon)}<span style="flex:1">${p.q}</span>${ic('arrow')}</a>`).join('')}
      </div>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Perguntas Frequentes</p>
      <h2>O que as pessoas mais perguntam sobre nossa consultoria de investimentos</h2>
    </div>
    ${faqHtml(FAQ_PF)}
  </div>
</section>

<div class="wrap cta-wrap">
  <div class="cta-band">
    <div>
      <h2>Quer uma leitura transparente e sem conflito de interesses do seu patrimônio?</h2>
      <p>Converse diretamente com o Maycoln Primo e descubra como cuidar melhor do seu futuro.</p>
    </div>
    ${cta('Falar com o Maycoln', 'Olá, Maycoln! Quero uma segunda opinião sobre meus investimentos.', 'gold')}
  </div>
</div>
`,
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. EXTERIOR (`/exterior/`)
// ─────────────────────────────────────────────────────────────────────────────
add({
  url: '/exterior/',
  title: 'Patrimônio no Exterior de Forma Legal e Declarada | Outro Primo',
  desc: 'Organização e orientação técnica para investir no exterior de forma 100% legal e declarada, com eficiência tributária e proteção sucessória.',
  crumb: [[null, 'Patrimônio global']],
  schema: [orgSchema, faqSchema(FAQ_EXT)],
  body: `
<section class="pagehead">
  <div class="wrap two">
    <div>
      <p class="eyebrow">Investimentos Globais &bull; Proteção de Capital</p>
      <h1>Patrimônio no exterior, de forma legal, declarada e eficiente</h1>
      <p class="lead">Orientação técnica para investir e proteger capital fora do país, com total transparência com a Receita Federal e o Banco Central, avaliando custos totais e proteção da sua família.</p>
      <div class="row">
        ${cta('Entender o meu caso', 'Olá, Maycoln! Quero entender como diversificar meu patrimônio no exterior de forma legal.', 'wa')}
      </div>
    </div>
    <div>
      <ul class="ok" style="font-size:1.05rem">
        <li>Entender o que faz sentido para o tamanho do seu patrimônio e momento de vida.</li>
        <li>Comparar custos totais: taxas de custódia, câmbio, spread e enquadramento tributário (Lei 14.754/2023).</li>
        <li>Organizar as declarações fiscais exigidas perante os órgãos reguladores.</li>
        <li>Planejar a sucessão patrimonial para proteger seus herdeiros de burocracias internacionais.</li>
      </ul>
    </div>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="grid g3">
      <div class="card"><div class="ico">${ic('globe')}</div><h3>Visão de Conjunto</h3><p>Onde está o seu patrimônio hoje e qual parcela faz sentido alocar em moedas fortes e ativos globais.</p></div>
      <div class="card"><div class="ico">${ic('file')}</div><h3>Tudo Declarado</h3><p>Conformidade estrita com as regras da Receita Federal e do Banco Central, em parceria com seu contador.</p></div>
      <div class="card"><div class="ico">${ic('shield')}</div><h3>Família Protegida</h3><p>Estruturação de sucessão que evita impostos abusivos no exterior e garante agilidade para os herdeiros.</p></div>
    </div>
    <p class="small" style="margin-top:24px">A legislação tributária internacional exige confirmação periódica da norma vigente. Toda orientação é validada tecnicamente com seu contador ou assessor jurídico.</p>
  </div>
</section>

<section class="alt-bg">
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Dúvidas Frequentes</p>
      <h2>Perguntas frequentes sobre patrimônio no exterior</h2>
    </div>
    ${faqHtml(FAQ_EXT)}
  </div>
</section>
`,
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. SOBRE O FUNDADOR (`/sobre/`)
// ─────────────────────────────────────────────────────────────────────────────
const LINHA = [
  ['1998', 'Início da carreira executiva', 'Primeiro emprego formal já em indústria multinacional de grande porte. Desde 2001, atuação na coordenação de equipes técnicas.'],
  ['2007', 'Liderança oficial de manutenção industrial', 'Coordenação de equipes de manutenção mecânica, elétrica, eletrônica e civil em fábrica de alimentos com sete linhas de produção. Implantação do setor de planejamento e controle.'],
  ['2009', 'Especialista em produção e processos industriais', 'Metas operacionais, cálculo de custos por produto, orçamento anual, redução de gargalos e implantação de ferramentas Lean Manufacturing.'],
  ['2011', 'Gerente de projetos: implantação de fábrica do zero', 'Planejamento, contratação, treinamento de equipes, relacionamento com fornecedores globais e órgãos reguladores até a entrega da fábrica operando em plena capacidade.'],
  ['2013', 'Gerente de utilidades industriais', 'Participação no comissionamento de planta de processamento e gestão integral de utilidades críticas (caldeiras de biomassa, tratamento de água, ar comprimido e refrigeração).'],
  ['2016', 'Gerente de produção em larga escala', 'Gestão de três linhas contínuas de produção, cadeia de suprimentos, orçamento, segurança, qualidade e desenvolvimento de novos líderes.'],
  ['2021', 'Gerente de produção de moagem e ração úmida', 'Liderança de equipes multidisciplinares (supervisão, engenharia e operação), gestão de custos fixos e variáveis na ordem de R$ 82 milhões e formação de times em Lean Six Sigma.'],
  ['2023', 'Gerente de unidade industrial', 'Liderança integral de planta industrial: gestão de resultado (P&L), orçamento, segurança, qualidade, sucessão de lideranças e processos de transformação cultural.'],
  ['2026', 'Fundação da Outro Primo Consultoria', 'Criação da Outro Primo para democratizar métodos de gestão industrial e estratégias patrimoniais para PMEs, comércios, restaurantes, autônomos e famílias, com empatia e sem conflito de interesses.'],
];

const TEMAS = [
  ['target', 'Eliminação de desperdício & Lean', 'Projetos de melhoria prática que reduzem perdas, retrabalho e custos operacionais com método DMAIC.'],
  ['sliders', 'Gestão de processos e rotina', 'Padronização do essencial, rotinas visuais e indicadores simples que não tomam o tempo do empresário.'],
  ['users', 'Liderança e desenvolvimento de equipes', 'Delegação com segurança, feedback estruturado e formação de times autônomos.'],
  ['dollar', 'Custos, margem e orçamento', 'Orçamento empresarial, separação de custos fixos e variáveis e gestão focada em resultado de caixa.'],
  ['layers', 'Projetos e implantação prática', 'Da concepção à entrega: estruturação, metas com responsáveis e prazos claros.'],
  ['shield', 'Consultoria fiduciária e de investimentos', 'Profissional certificado ANBIMA CEA, atuando sob modelo sem conflito de interesses (Fee-Only): não recebo comissão de produtos nem rebate de corretoras.'],
];

add({
  url: '/sobre/',
  title: 'Maycoln Primo | 28 anos de carreira na indústria multinacional',
  desc: 'Conheça a trajetória de Maycoln Primo: 28 anos de carreira na indústria multinacional, certificação ANBIMA CEA, Black Belt Six Sigma e fundador da Outro Primo.',
  crumb: [[null, 'Quem é o Maycoln']],
  schema: [orgSchema, personSchema],
  body: `
<section class="pagehead">
  <div class="wrap two">
    <div>
      <p class="eyebrow">Quem conduz a Outro Primo</p>
      <h1>Maycoln Primo</h1>
      <p class="lead">28 anos de carreira executiva na indústria multinacional, 19 deles liderando equipes, processos e orçamentos em ambientes de alta exigência.</p>
      <p>Comecei em 1998 já em indústria multinacional de grande porte, passei à liderança formal em 2007 e vivenciei de perto como grandes organizações industriais gerenciam custos de dezenas de milhões de reais, eliminam desperdícios e formam equipes de alta performance.</p>
      <p>Fundei a <strong>Outro Primo</strong> com um propósito claro: democratizar essas ferramentas de gestão e as melhores práticas patrimoniais para quem move a economia real — donos de pequenas e médias empresas (manufaturas, varejo, restaurantes, clínicas, escolas e serviços), profissionais liberais e autônomos (psicólogos, médicos, arquitetos, consultores) e pessoas físicas que querem cuidar com rigor do seu patrimônio. Sou profissional certificado ANBIMA (CEA), especialista Lean Six Sigma (Black Belt) e atuo de forma 100% independente, sob modelo sem conflito de interesses (zero comissão por venda de produtos ou rebate de corretoras).</p>
      <div class="creds">
        <span class="chip">${ic('award')} Certificação ANBIMA CEA</span>
        <span class="chip">${ic('target')} Black Belt Six Sigma</span>
        <span class="chip">${ic('globe')} Inglês Avançado</span>
      </div>
      <div class="row">
        ${cta('Quero conversar com o Maycoln', 'Olá, Maycoln! Vim pela página Sobre do site e quero conversar.', 'wa')}
        <a class="btn alt" href="${LINKEDIN}" rel="noopener" target="_blank">${ic('linkedin')} LinkedIn</a>
      </div>
    </div>
    <img src="/img/perfil.jpg" alt="Maycoln Primo, fundador da Outro Primo" width="450" height="600" style="max-width:420px;margin-left:auto" fetchpriority="high">
  </div>
</section>

<section class="white-bg">
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Competências Práticas</p>
      <h2>Seis frentes em que tenho sólida vivência</h2>
    </div>
    <div class="grid g3">${TEMAS.map(([i, t, d]) => `<div class="card"><div class="ico">${ic(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
  </div>
</section>

<section class="alt-bg">
  <div class="wrap two top">
    <div>
      <p class="eyebrow">Trajetória Profissional</p>
      <h2>De 1998 até hoje: uma jornada de consistência</h2>
      <p>Carreira construída na indústria de alimentos e agronegócio de grandes multinacionais, sempre próximo das pessoas, dos processos e do resultado financeiro.</p>
      ${SHOW_SELO ? `<div class="selo">${seloImg()}<p><strong>Profissional Certificado ANBIMA CEA.</strong><br>Atuação fiduciária independente: remuneração exclusiva pela consultoria, sem venda de produtos.</p></div>` : ''}
    </div>
    <ol class="timeline">${LINHA.map(([y, t, d]) => `<li><b class="y">${y}</b><strong>${t}</strong><p>${d}</p></li>`).join('')}</ol>
  </div>
</section>

<section>
  <div class="wrap">
    <div class="head">
      <p class="eyebrow">Formação & Credenciais</p>
      <h2>Estudo contínuo e fundamentação técnica</h2>
    </div>
    <div class="grid g3">
      <div class="card">
        <div class="ico">${ic('book')}</div>
        <h3>Formação Acadêmica</h3>
        <ul class="ok" style="margin-top:6px">
          <li>Especialização em Gestão Ambiental, UEPG (2009)</li>
          <li>Tecnologia em Processos de Fabricação Mecânica, UTFPR (2007)</li>
          <li>Técnico em Mecânica Industrial, CEFET-PR (1997)</li>
        </ul>
      </div>
      <div class="card">
        <div class="ico">${ic('pie')}</div>
        <h3>Finanças & Investimentos</h3>
        <ul class="ok" style="margin-top:6px">
          <li>Profissional Certificado ANBIMA (CEA)</li>
          <li>Formação EFinc em consultoria e planejamento financeiro (Instituto Soaper)</li>
        </ul>
      </div>
      <div class="card">
        <div class="ico">${ic('target')}</div>
        <h3>Gestão & Melhoria Contínua</h3>
        <ul class="ok" style="margin-top:6px">
          <li>Black Belt Six Sigma</li>
          <li>Green Belt, ferramentas estatísticas (Fundação Vanzolini)</li>
          <li>Lean Leader & Gestão pela Rotina</li>
          <li>Gerenciamento de Projetos (INDG)</li>
        </ul>
      </div>
    </div>

    <div class="grid g3" style="margin-top:20px">
      <div class="card">
        <div class="ico">${ic('award')}</div>
        <h3>Reconhecimento Nacional</h3>
        <ul class="ok" style="margin-top:6px">
          <li>1º lugar no Prêmio Nacional de Conservação de Energia (2005) - MME e Eletrobras</li>
          <li>1º lugar em prêmio nacional pelo uso eficiente de água (2015) em estação de tratamento industrial</li>
        </ul>
      </div>
      <div class="card">
        <div class="ico">${ic('globe')}</div>
        <h3>Vivência Internacional</h3>
        <p>Missões de benchmarking em sete plantas fabris nos EUA (cinco estados) e visitas técnicas industriais na Alemanha e Itália. Inglês fluente.</p>
      </div>
      <div class="card">
        <div class="ico">${ic('shield')}</div>
        <h3>Qualidade & Governança</h3>
        <p>Auditor interno nas normas ISO 14001 e ISO 22000, e coordenador de comitês de segurança operacional e meio ambiente.</p>
      </div>
    </div>
  </div>
</section>

<div class="wrap cta-wrap">
  <div class="cta-band">
    <div>
      <h2>Vamos conversar sobre o seu caso?</h2>
      <p>Uma conversa franca e transparente para vermos se faz sentido trabalharmos juntos.</p>
    </div>
    ${cta('Chamar no WhatsApp', 'Olá, Maycoln! Vim pela página Sobre e gostaria de conversar.', 'gold')}
  </div>
</div>
`,
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. CONTATO (`/contato/`)
// ─────────────────────────────────────────────────────────────────────────────
add({
  url: '/contato/',
  title: 'Fale com a Outro Primo | Ponta Grossa/PR e Atendimento Online',
  desc: 'Agende uma conversa confidencial com Maycoln Primo. Atendimento em Ponta Grossa/PR e online para todo o Brasil. WhatsApp e e-mail.',
  crumb: [[null, 'Conversar']],
  schema: [orgSchema],
  body: `
<section class="pagehead">
  <div class="wrap">
    <p class="eyebrow">Canais de Atendimento</p>
    <h1>Vamos conversar sobre o seu momento</h1>
    <p class="lead narrow">Conte em poucas palavras qual é a sua situação atual. Na primeira conversa avaliamos com franqueza se a consultoria faz sentido para o seu momento.</p>
  </div>
</section>

<section style="padding-top:20px">
  <div class="wrap">
    <div class="grid g3">
      <div class="card">
        <div class="ico">${ic('chat')}</div>
        <h3>WhatsApp Direto</h3>
        <p>O meio mais ágil para agendarmos um horário de conversa.</p>
        ${cta('Chamar no WhatsApp', 'Olá, Maycoln! Vim pelo site da Outro Primo e quero conversar.', 'wa')}
      </div>
      <div class="card">
        <div class="ico">${ic('mail')}</div>
        <h3>E-mail Corporativo</h3>
        <p>Prefere detalhar o seu caso e números por escrito com discrição?</p>
        <a class="btn alt" href="mailto:${EMAIL}?subject=${encodeURIComponent('Contato pelo site da Outro Primo')}">${EMAIL}</a>
      </div>
      <div class="card">
        <div class="ico">${ic('pin')}</div>
        <h3>Onde Atendemos</h3>
        <p>Ponta Grossa/PR (presencial) e online para todo o Brasil.</p>
        <a class="btn alt" href="${LINKEDIN}" rel="noopener" target="_blank">${ic('linkedin')} Perfil no LinkedIn</a>
      </div>
    </div>

    <h2 style="margin-top:48px">Orientações antes de nos chamar</h2>
    <p class="narrow">Se você for <strong>empresário ou autônomo</strong>, conte em poucas linhas o seu segmento e o que mais tem incomodado na rotina ou no caixa. Se o foco for a <strong>vida pessoal</strong>, mencione se o objetivo principal é organizar as contas, calcular a aposentadoria ou ter uma segunda opinião sobre a sua carteira atual. Isso já torna a primeira conversa muito mais produtiva.</p>
  </div>
</section>
`,
});

// ─────────────────────────────────────────────────────────────────────────────
// 7. POLÍTICA DE PRIVACIDADE & GOVERNANÇA FIDUCIÁRIA (`/privacidade/`)
// ─────────────────────────────────────────────────────────────────────────────
add({
  url: '/privacidade/',
  title: 'Privacidade, Proteção de Dados e Governança Fiduciária | Outro Primo',
  desc: 'Conheça nossa política de confidencialidade, conformidade com a LGPD e compromisso de modelo sem conflito de interesses, sem venda de produtos.',
  crumb: [[null, 'Privacidade e Governança']],
  schema: [orgSchema],
  body: `
<section class="pagehead">
  <div class="wrap narrow">
    <p class="eyebrow">Conformidade & Ética</p>
    <h1>Política de Privacidade e Governança Fiduciária</h1>
    <p class="lead">Nosso compromisso inegociável com a segurança das suas informações, a privacidade dos seus dados e o estrito alinhamento de interesses.</p>
  </div>
</section>

<section style="padding-top:20px">
  <div class="wrap narrow">
    <h2>1. Princípio Fiduciário e Não-Conflito de Interesses (Fee-Only)</h2>
    <p>A <strong>Outro Primo Consultoria</strong> opera sob o modelo de remuneração estritamente fiduciária (Fee-Based/Fee-Only). Isso significa que nossa remuneração decorre única e exclusivamente dos honorários contratados pelo cliente pelo serviço de consultoria prestado.</p>
    <ul class="ok">
      <li>Não recebemos taxas de corretagem, comissões ou rebates de distribuidoras, bancos ou corretoras de valores.</li>
      <li>Não vendemos produtos financeiros, seguros, consórcios ou títulos mobiliários.</li>
      <li>Não temos acesso às senhas, contas ou à custódia de recursos dos clientes; a tomada de decisão e a execução cabem exclusivamente a você na instituição de sua escolha.</li>
    </ul>

    <h2 style="margin-top:32px">2. Sigilo Profissional e Confidencialidade (NDA)</h2>
    <p>Todos os dados econômicos, contábeis, faturamentos, margens, folhas de pagamento e informações familiares compartilhados durante os diagnósticos ou sessões de consultoria são tratados sob rigoroso sigilo profissional. Não divulgamos nomes de clientes ou dados empresariais a terceiros sem autorização prévia e expressa.</p>

    <h2 style="margin-top:32px">3. Conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018)</h2>
    <p>Coletamos apenas as informações estritamente necessárias para a prestação dos serviços contratados (como nome, contato telefônico e e-mail). Não vendemos, não alugamos e não compartilhamos dados pessoais com bases de marketing de terceiros. Você pode solicitar a qualquer momento a conferência, atualização ou exclusão definitiva dos seus dados de contato dos nossos registros enviando uma mensagem para <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>

    <h2 style="margin-top:32px">4. Integração Contábil e Jurídica</h2>
    <p>Nossos diagnósticos tributários e de elisão fiscal constituem pareceres de apoio à gestão e são elaborados em estreita colaboração com o profissional contábil ou jurídico formal da sua empresa. Não substituímos os atos privativos de contadores registrados ou advogados, mas agregamos capacidade analítica e técnica na tomada de decisão estratégica.</p>
  </div>
</section>
`,
});

// ─────────────────────────────────────────────────────────────────────────────
// 8. ÍNDICE DE PROBLEMAS & OPORTUNIDADES (`/problemas/`)
// ─────────────────────────────────────────────────────────────────────────────
add({
  url: '/problemas/',
  title: 'Problemas e Oportunidades: Encontre o seu Caso | Outro Primo',
  desc: 'Identifique o problema financeiro ou operacional parecido com o seu e veja como a Outro Primo ajuda com método pragmático e sem conflito de interesses.',
  crumb: [[null, 'Problemas e oportunidades']],
  schema: [],
  body: `
<section class="pagehead">
  <div class="wrap">
    <h1>Problemas e Oportunidades: Encontre a sua situação</h1>
    <p class="lead narrow">Escolha o desafio mais parecido com o seu momento atual e veja, na prática, como atuamos para destravar o resultado.</p>
  </div>
</section>

<section style="padding-top:20px">
  <div class="wrap">
    <h2>Para Empresas, Negócios e Profissionais Autônomos</h2>
    <div class="grid">${PROBLEMAS.filter((p) => p.seg === 'neg').map(problemaCard).join('')}</div>

    <h2 style="margin-top:48px">Para a Vida Pessoal, Família e Gestão de Patrimônio</h2>
    <div class="grid">${PROBLEMAS.filter((p) => p.seg === 'pf').map(problemaCard).join('')}</div>
  </div>
</section>
`,
});

// ─────────────────────────────────────────────────────────────────────────────
// 9. PÁGINAS INDIVIDUAIS DE PROBLEMAS (`/problemas/${slug}/`)
// ─────────────────────────────────────────────────────────────────────────────
for (const p of PROBLEMAS) {
  const url = `/problemas/${p.slug}/`;
  const outros = PROBLEMAS.filter((o) => o.seg === p.seg && o.slug !== p.slug).slice(0, 3);
  const servico = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: p.h1,
    serviceType: p.curto,
    description: p.desc,
    provider: { '@id': SITE_URL + '/#org' },
    areaServed: ['Ponta Grossa, PR', 'Brasil'],
    url: SITE_URL + url,
  };

  add({
    url,
    title: p.title,
    desc: p.desc,
    schema: [orgSchema, servico, faqSchema(p.faq)],
    crumb: [[SEGURL[p.seg], SEGS[p.seg]], [null, p.curto]],
    body: `
<section class="pagehead">
  <div class="wrap narrow">
    <span class="pill ${p.seg}">${SEGS[p.seg]}</span>
    <h1>${p.h1}</h1>
    <p class="lead">${p.q}</p>
  </div>
</section>

<section style="padding-top:16px">
  <div class="wrap narrow">
    ${p.corpo.map((t) => `<p>${t}</p>`).join('')}

    <h2 style="font-size:1.4rem;margin-top:32px">Sinais de que esta situação afeta o seu dia a dia</h2>
    <ul class="ok">${p.sinais.map((t) => `<li>${t}</li>`).join('')}</ul>

    <div class="card" style="margin:28px 0;border-left:4px solid var(--gold)">
      <h2 style="font-size:1.35rem">O que você recebe com a nossa consultoria</h2>
      <ul class="ok" style="margin:0">${p.entrega.map((t) => `<li>${t}</li>`).join('')}</ul>
    </div>

    <div class="row">
      ${cta('Quero conversar sobre isso', `Olá, Maycoln! Vim pelo site da Outro Primo e me identifiquei com: "${p.q}"`, 'wa')}
      <a class="btn alt" href="${SEGURL[p.seg]}">${p.seg === 'neg' ? 'Ver tudo para empresas e autônomos' : 'Ver tudo de finanças pessoais'}</a>
    </div>

    <h2 style="font-size:1.4rem;margin:40px 0 16px">Perguntas Frequentes sobre este tema</h2>
    ${p.faq.map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('')}
  </div>
</section>

<section class="alt-bg">
  <div class="wrap">
    <h2>Outras situações e oportunidades relacionadas</h2>
    <div class="grid">${outros.map(problemaCard).join('')}</div>
  </div>
</section>
`,
  });
}

// ── Gravação de Arquivos em dist/ ───────────────────────────────────────────
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const PULAR = new Set(['1-Logo.png', 'green belt logo.png', 'Selo-ANBIMA-CEA-colorido.jpg', 'logo.png']);
fs.cpSync(path.join(ROOT, 'public'), DIST, { recursive: true, filter: (src) => !PULAR.has(path.basename(src)) });
fs.writeFileSync(path.join(DIST, 'style.css'), CSS.trim());

// Gravação das páginas HTML
for (const p of pages) {
  const dir = path.join(DIST, p.url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), layout(p));
}



// Sitemap, Robots e Página 404
const prio = (u) =>
  u === '/'
    ? '1.0'
    : ['/negocios/', '/investimentos/'].includes(u)
    ? '0.9'
    : u.startsWith('/problemas/') && u !== '/problemas/'
    ? '0.7'
    : '0.8';

fs.writeFileSync(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `<url><loc>${SITE_URL}${p.url}</loc><lastmod>${HOJE}</lastmod><priority>${prio(p.url)}</priority></url>`)
    .join('\n')}\n</urlset>\n`
);

fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);

fs.writeFileSync(
  path.join(DIST, '404.html'),
  layout({
    url: '/404.html',
    title: 'Página não encontrada | Outro Primo',
    desc: 'Página não encontrada.',
    noindex: true,
    body: `
<section class="pagehead">
  <div class="wrap narrow">
    <h1>Página não encontrada</h1>
    <p class="lead">O endereço que você buscou pode ter sido alterado ou não existe. Volte à página inicial ou converse diretamente conosco.</p>
    <div class="row">
      <a class="btn" href="/">Voltar à Página Inicial</a>
      ${cta('Falar pelo WhatsApp', 'Olá! Acessei uma página não encontrada no site e gostaria de ajuda.', 'alt')}
    </div>
  </div>
</section>
`,
  })
);

// ── Verificação Automática de Títulos e Metadados ───────────────────────────
let avisos = 0;
for (const p of pages) {
  if (p.title.length > 70) {
    console.warn(`AVISO: título longo (${p.title.length} carac) em ${p.url}`);
    avisos++;
  }
  if (p.desc.length > 175) {
    console.warn(`AVISO: descrição longa (${p.desc.length} carac) em ${p.url}`);
    avisos++;
  }
}
console.log(`SUCESSO: ${pages.length} páginas geradas em dist/ (SITE_URL=${SITE_URL}) · Avisos SEO: ${avisos}`);
