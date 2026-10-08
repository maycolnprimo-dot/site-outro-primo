// Gerador do site Outro Primo (estático, v2). Uso: node scripts/build.mjs
// ───────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÃO RÁPIDA (o que você pode mudar sem mexer no resto):
//   SITE_URL  = endereço do site (domínio). Hoje é provisório.
//   WHATSAPP  = número com 55 + DDD + número, só dígitos.
//   EMAIL     = e-mail da empresa.
//   SHOW_SELO = true mostra o selo ANBIMA; false esconde em todo o site.
// Também dá para usar variáveis de ambiente (SITE_URL=... npm run build).
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = (process.env.SITE_URL || 'https://www.outroprimo.com.br').replace(/\/$/, ''); // TODO: confirmar domínio
const WHATSAPP = process.env.WHATSAPP || '5546991164045'; // TODO: trocar quando a linha com DDD 42 estiver definida
const EMAIL = process.env.EMAIL || 'outroprimo.empresa@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/maycoln-primo-878b0b4a';
const SHOW_SELO = true; // selo ANBIMA (profissional certificado). Mude para false para esconder.
const NOME = 'Outro Primo';
const ANO = new Date().getFullYear();
const HOJE = new Date().toISOString().slice(0, 10);
const WA = (t) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t)}`;
const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');

// ── Ícones (traço simples, embutidos no HTML; sem biblioteca externa) ──────
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
};
const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>${Object.entries(ICONS)
  .map(([k, v]) => `<symbol id="i-${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${v}</symbol>`)
  .join('')}</defs></svg>`;
const ic = (n, c = '') => `<svg class="ic ${c}" aria-hidden="true" focusable="false"><use href="#i-${n}"/></svg>`;

// ── Estilos ─────────────────────────────────────────────────────────────────
const CSS = `
:root{--bg:#F7F2E8;--bg2:#EFE7D6;--ink:#201D18;--navy:#132A4C;--navy2:#0c1d36;--gold:#B8863A;--golddk:#8A6A2E;--green:#1F6B4C;--card:#FFFFFF;--line:#E4DAC6;--muted:#5b5446;--r:14px}
*{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.65 -apple-system,'Segoe UI',Roboto,Arial,Helvetica,sans-serif;overflow-x:hidden}
h1,h2,h3{font-family:Georgia,'Times New Roman',serif;color:var(--navy);line-height:1.2;margin:0 0 .5em}
h1{font-size:clamp(2rem,5.2vw,3.2rem)}h2{font-size:clamp(1.55rem,3.4vw,2.25rem)}h3{font-size:1.18rem}
p{margin:0 0 1em}a{color:var(--navy)}img{max-width:100%;height:auto;display:block}
.ic{width:1.35em;height:1.35em;flex:none;vertical-align:-.3em}
.wrap{max-width:1120px;margin:0 auto;padding:0 20px}
.skip{position:absolute;left:-999px;top:0;background:var(--navy);color:#fff;padding:10px 16px;z-index:50}.skip:focus{left:8px;top:8px}
:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
/* barra superior */
.topbar{background:var(--navy2);color:#e8e2d3;font-size:.82rem}
.topbar .wrap{display:flex;justify-content:space-between;gap:16px;padding-top:7px;padding-bottom:7px;flex-wrap:wrap}
.topbar a{color:#f1d9a6;text-decoration:none}.topbar span{display:inline-flex;gap:6px;align-items:center}
/* cabeçalho */
header.site{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:20;box-shadow:0 2px 14px rgba(19,42,76,.06)}
.nav{display:flex;align-items:center;justify-content:space-between;gap:16px;min-height:68px}
.brand{display:flex;align-items:center;gap:11px;text-decoration:none;font:700 1.3rem Georgia,serif;color:var(--navy)}
.brand img{width:38px;height:auto}.brand small{display:block;font:600 .62rem Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--golddk);margin-top:-2px}
.menu{display:flex;align-items:center;gap:4px}
.menu a{text-decoration:none;color:var(--ink);font-size:.95rem;padding:10px 12px;border-radius:8px}.menu a:hover,.menu a[aria-current]{color:var(--golddk);background:var(--bg)}
.menu a.btn{color:#fff;margin-left:8px;padding:11px 18px}.menu a.btn:hover{background:var(--navy2);color:#fff}
#nt{position:absolute;opacity:0;pointer-events:none}
.burger{display:none;cursor:pointer;padding:12px;border-radius:8px;margin-right:-8px}
.burger span,.burger span:before,.burger span:after{display:block;width:24px;height:2px;background:var(--navy);position:relative;content:'';transition:.2s}
.burger span:before{position:absolute;top:-7px}.burger span:after{position:absolute;top:7px}
/* botões */
.btn{overflow-wrap:anywhere;text-align:center;display:inline-flex;align-items:center;gap:8px;justify-content:center;background:var(--navy);color:#fff!important;padding:14px 26px;border-radius:10px;text-decoration:none;font-weight:700;border:2px solid var(--navy);min-height:48px;transition:.15s}
.btn:hover{background:var(--navy2);transform:translateY(-1px);box-shadow:0 8px 20px rgba(19,42,76,.22)}
.btn.alt{background:transparent;color:var(--navy)!important}.btn.alt:hover{background:#fff}
.btn.gold{background:var(--gold);border-color:var(--gold);color:#1b1407!important}.btn.gold:hover{background:#c9963f}
.btn.wa{background:#1F6B4C;border-color:#1F6B4C}.btn.wa:hover{background:#17533a}
.row{display:flex;gap:12px;flex-wrap:wrap;margin-top:8px}
/* hero */
.hero{background:linear-gradient(180deg,#fff 0,var(--bg) 100%);padding:44px 0 70px}
.hero .wrap{display:grid;grid-template-columns:1.25fr 1fr;gap:48px;align-items:center}
.eyebrow{color:var(--golddk);font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:.78rem;display:flex;gap:8px;align-items:center;margin-bottom:.8em}
.eyebrow:before{content:'';width:28px;height:2px;background:var(--gold)}
.lead{font-size:1.15rem;color:#3a352c}
.photo{position:relative;max-width:440px;margin-left:auto;width:100%}
.photo:before{content:'';position:absolute;inset:18px -14px -14px 18px;border:2px solid var(--gold);border-radius:24px;z-index:0}
.photo img{position:relative;z-index:1;border-radius:24px;width:100%;box-shadow:0 18px 44px rgba(19,42,76,.22);aspect-ratio:3/4;object-fit:cover}
.badge{position:absolute;z-index:2;left:-22px;bottom:34px;background:var(--navy);color:#fff;border-radius:14px;padding:14px 18px;box-shadow:0 10px 26px rgba(0,0,0,.25);max-width:210px;line-height:1.25}
.badge b{display:block;font:700 2rem Georgia,serif;color:#f1d9a6;line-height:1}.badge span{font-size:.82rem}
/* entradas */
.entradas{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:-44px;position:relative;z-index:3}
.entrada{display:flex;flex-direction:column;gap:6px;text-decoration:none;background:var(--card);border:1px solid var(--line);border-top:5px solid var(--gold);border-radius:var(--r);padding:24px;color:var(--ink);box-shadow:0 10px 28px rgba(19,42,76,.10);transition:.18s}
.entrada.inv{border-top-color:var(--navy)}.entrada.dois{border-top-color:var(--green)}
.entrada:hover{transform:translateY(-4px);box-shadow:0 16px 34px rgba(19,42,76,.16)}
.entrada .ico{width:48px;height:48px;border-radius:12px;background:var(--bg);color:var(--golddk);display:grid;place-items:center;margin-bottom:6px}
.entrada.inv .ico{color:var(--navy)}.entrada.dois .ico{color:var(--green)}
.entrada strong{font:700 1.18rem Georgia,serif;color:var(--navy)}.entrada span.go{margin-top:6px;font-weight:700;color:var(--golddk);display:inline-flex;gap:6px;align-items:center}
/* seções */
section{padding:64px 0}.alt-bg{background:var(--bg2)}.white-bg{background:#fff}
.head{max-width:720px;margin:0 0 32px}.head.c{text-align:center;margin-left:auto;margin-right:auto}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(255px,1fr));gap:18px}
.grid.g3{grid-template-columns:repeat(3,1fr)}.grid.g4{grid-template-columns:repeat(4,1fr)}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:24px;display:flex;flex-direction:column;gap:4px}
.card .ico{width:46px;height:46px;border-radius:12px;background:var(--bg);color:var(--green);display:grid;place-items:center;margin-bottom:8px}
.card p{margin:0 0 .6em;color:#3a352c}.card a.more{font-weight:700;color:var(--golddk);text-decoration:none;margin-top:auto;display:inline-flex;gap:6px;align-items:center;padding-top:6px}
.card a.more:hover{text-decoration:underline}
a.card{text-decoration:none;color:inherit;transition:.18s}a.card:hover{box-shadow:0 12px 28px rgba(19,42,76,.12);transform:translateY(-3px)}
.pill{display:inline-block;align-self:flex-start;font-size:.72rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:3px 10px;border-radius:99px;background:#efe3c4;color:#6c5320}
.pill.pf{background:#dfe8f3;color:var(--navy)}
.quote{font:italic 1.25rem/1.5 Georgia,serif;color:var(--navy);border-left:4px solid var(--gold);padding:4px 0 4px 18px;margin:0 0 28px}
ul.ok{padding-left:0;list-style:none;margin:0 0 1em}ul.ok li{padding-left:30px;position:relative;margin:.55em 0}
ul.ok li:before{content:'';position:absolute;left:0;top:.35em;width:18px;height:18px;border-radius:50%;background:var(--green) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='5 12.5 10 17.5 19 7'/%3E%3C/svg%3E") center/12px no-repeat}
.two{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.two img{border-radius:22px;width:100%;box-shadow:0 14px 36px rgba(19,42,76,.18)}
.two.top{align-items:start}
/* faixa de números */
.stats{background:var(--navy);color:#fff;padding:38px 0}
.stats .wrap{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:center}
.stats b{display:block;font:700 2.6rem Georgia,serif;color:#f1d9a6;line-height:1.1}.stats span{font-size:.92rem;color:#d9d3c2}
/* passos */
.steps{counter-reset:s;display:grid;grid-template-columns:repeat(4,1fr);gap:18px;padding:0;list-style:none;margin:0}
.steps li{background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:22px;position:relative}
.steps li:before{counter-increment:s;content:counter(s);display:grid;place-items:center;width:38px;height:38px;border-radius:50%;background:var(--gold);color:#1b1407;font:700 1.1rem Georgia,serif;margin-bottom:10px}
.steps strong{display:block;font:700 1.08rem Georgia,serif;color:var(--navy);margin-bottom:4px}.steps p{margin:0;font-size:.95rem;color:#3a352c}
/* faixa chamada */
.cta-band{background:linear-gradient(120deg,var(--navy) 0,#1b3a66 100%);color:#fff;border-radius:22px;padding:44px;display:flex;gap:28px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.cta-band h2{color:#fff;margin:0 0 .3em}.cta-band p{margin:0;color:#e0dac9}
.cta-wrap{padding:0 0 64px}
/* credenciais */
.creds{display:flex;gap:12px;flex-wrap:wrap;margin:18px 0}
.chip{display:inline-flex;gap:8px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:99px;padding:8px 14px;font-size:.88rem;font-weight:600;color:var(--navy)}.chip .ic{color:var(--gold)}
.selo{display:flex;gap:16px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:var(--r);padding:16px 18px;max-width:420px;margin:16px 0}
.selo img{width:84px;height:84px;flex:none}.selo p{margin:0;font-size:.92rem}
/* linha do tempo */
.timeline{list-style:none;margin:0;padding:0 0 0 26px;border-left:2px solid var(--line)}
.timeline li{position:relative;padding:0 0 26px 22px}.timeline li:before{content:'';position:absolute;left:-35px;top:6px;width:16px;height:16px;border-radius:50%;background:var(--gold);border:3px solid var(--bg)}
.timeline b.y{display:inline-block;font:700 1.05rem Georgia,serif;color:var(--golddk);margin-right:8px}.timeline strong{color:var(--navy)}
.timeline p{margin:.2em 0 0;color:#3a352c;font-size:.98rem}
.alt-bg .timeline li:before{border-color:var(--bg2)}
/* faq */
details{background:#fff;border:1px solid var(--line);border-radius:12px;margin:0 0 10px;padding:0}
summary{cursor:pointer;font-weight:700;color:var(--navy);padding:16px 48px 16px 18px;list-style:none;position:relative;min-height:48px}
summary::-webkit-details-marker{display:none}summary:after{content:'+';position:absolute;right:18px;top:10px;font-size:1.6rem;color:var(--gold)}
details[open] summary:after{content:'–'}details>div{padding:0 18px 16px;color:#3a352c}details p{margin:0}
.crumbs{font-size:.85rem;margin:0 auto;color:var(--muted);padding-top:16px;padding-bottom:0}.crumbs a{color:var(--muted)}
.small{font-size:.86rem;color:var(--muted)}
.narrow{max-width:800px}
.pagehead{background:linear-gradient(180deg,#fff,var(--bg));padding:12px 0 40px}
.pagehead h1{margin-top:.4em}
/* rodapé */
footer{background:var(--navy);color:#d9d3c2;font-size:.92rem}
.foot{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:34px;padding:54px 0 34px}
.foot h4{font:700 .8rem Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#f1d9a6;margin:0 0 14px}
.foot ul{list-style:none;margin:0;padding:0}.foot li{margin:0 0 9px}.foot a{color:#e8e2d3;text-decoration:none}.foot a:hover{color:#fff;text-decoration:underline}
.foot .bl{display:flex;gap:10px;align-items:center;margin-bottom:12px}.foot .bl .chipimg{background:#fff;border-radius:12px;padding:8px 10px}.foot .bl img{width:42px;height:auto}
.foot .bl strong{font:700 1.3rem Georgia,serif;color:#fff}
.foot .ct li{display:flex;gap:10px;align-items:flex-start}.foot .ct .ic{color:#f1d9a6;margin-top:.15em}
.legal{border-top:1px solid rgba(255,255,255,.14);padding:24px 0 30px;display:flex;gap:24px;align-items:flex-start}
.legal img{width:76px;height:76px;flex:none;border-radius:6px}.legal p{margin:0 0 .6em;font-size:.82rem;color:#bfb9a8;line-height:1.55}
.legal .copy{color:#e8e2d3}
/* botão flutuante */
.fab{position:fixed;right:16px;bottom:16px;z-index:30;display:none;align-items:center;gap:8px;background:#1F6B4C;color:#fff;text-decoration:none;font-weight:700;padding:13px 18px;border-radius:99px;box-shadow:0 8px 24px rgba(0,0,0,.3)}
@media(max-width:900px){
 .hero .wrap,.two,.foot{grid-template-columns:1fr}.hero{padding:28px 0 60px}.photo{margin:10px auto 0;max-width:320px}.badge{left:-8px}
 .entradas,.grid.g3,.grid.g4,.steps{grid-template-columns:1fr 1fr}.stats .wrap{grid-template-columns:1fr 1fr}
 .burger{display:block}.menu{display:none;position:absolute;left:0;right:0;top:100%;background:#fff;border-bottom:1px solid var(--line);flex-direction:column;align-items:stretch;padding:10px 20px 18px;box-shadow:0 16px 24px rgba(0,0,0,.08)}
 .menu a{padding:14px 12px;font-size:1.02rem}.menu a.btn{margin:8px 0 0}#nt:checked~.menu{display:flex}
 #nt:checked~.burger span{background:transparent}#nt:checked~.burger span:before{top:0;transform:rotate(45deg)}#nt:checked~.burger span:after{top:0;transform:rotate(-45deg)}
 .topbar .hide-m{display:none}.fab{display:inline-flex}.cta-band{padding:30px 24px}section{padding:48px 0}
 .legal{flex-direction:column}
}
@media(max-width:560px){body{font-size:16.5px}.entradas,.grid.g3,.grid.g4,.steps{grid-template-columns:1fr}.entradas{margin-top:-34px}.row .btn{width:100%}.stats b{font-size:2.1rem}.brand{font-size:1.15rem}.topbar .wrap{justify-content:center}}
@media(prefers-reduced-motion:reduce){*{transition:none!important;scroll-behavior:auto!important}}
`;

// ── Navegação e textos fixos ────────────────────────────────────────────────
const NAV = [
  ['/negocios/', 'Para empresas'],
  ['/investimentos/', 'Vida pessoal e patrimônio'],
  ['/exterior/', 'Patrimônio no exterior'],
  ['/sobre/', 'Quem é o Maycoln'],
];

const FOOT_NOTE =
  'A Outro Primo é uma consultoria independente: não vende produtos financeiros nem recebe comissão de instituições. A cobrança é pelo serviço de consultoria, combinada antes de começar. Não somos corretora, gestora nem distribuidora de produtos de investimento; a decisão e a execução dos investimentos são sempre do cliente. Nenhum resultado é garantido; cada caso é analisado individualmente. Conteúdo informativo, que não substitui orientação jurídica ou contábil.';

const cta = (txt = 'Quero conversar sobre o meu caso', msg = 'Olá, Maycoln! Vim pelo site e quero conversar sobre o meu caso.', cls = '') =>
  `<a class="btn ${cls}" href="${WA(msg)}" rel="noopener">${ic('chat')}${txt}</a>`;

const seloImg = (cls = '') => (SHOW_SELO ? `<img class="${cls}" src="/img/selo-anbima.png" alt="Selo ANBIMA: profissional certificado" width="260" height="260" loading="lazy">` : '');

// ── Problemas e oportunidades ───────────────────────────────────────────────
// NEG = empresas; PF = pessoa física. (Perguntas 1-5, 7 e 8 são rascunhos do Marketing para revisão do Maycoln; a 6 é texto aprovado.)
const PROBLEMAS = [
  { slug: 'empresa-fatura-mas-nao-sobra-dinheiro', curto: 'Sobra pouco no fim do mês', seg: 'neg', icon: 'dollar', q: 'Minha empresa vende, mas no fim do mês sobra pouco.',
    h1: 'Empresa fatura, mas não sobra dinheiro: o que fazer',
    title: 'Empresa fatura e não sobra dinheiro: o que fazer | Outro Primo',
    desc: 'Vende bem e o caixa não acompanha? Veja onde costuma estar o vazamento e como corrigir, em Ponta Grossa/PR e online.',
    corpo: ['Faturamento não é lucro, e lucro não é dinheiro no caixa. Quando a empresa vende e o caixa não aparece, quase sempre a causa está em poucos pontos: preço que não cobre o custo real, mistura entre as contas da empresa e as do sócio, imposto pago além do necessário ou falta de previsão do que entra e sai.',
      'Na prática, começamos pelo que mais pesa (regra 80/20): organizamos o caixa, conferimos a margem de contribuição de cada produto ou serviço e olhamos o enquadramento tributário dentro da lei.'],
    sinais: ['O faturamento cresce, mas o saldo do banco não', 'Você não sabe dizer quanto cada produto ou serviço realmente dá de margem', 'O dinheiro da empresa e o da família se misturam', 'Falta caixa para pagar fornecedores mesmo em mês bom'],
    entrega: ['Fotografia do caixa e da margem em poucas semanas', 'Separação clara entre empresa e sócio', 'Revisão do enquadramento tributário com o contador do cliente', 'Plano de ação simples, com responsável e prazo'],
    faq: [['Por que minha empresa fatura bem e não sobra dinheiro?', 'As causas mais comuns são preço abaixo do custo real, despesas que crescem sem controle, imposto acima do necessário, prazo de recebimento maior que o de pagamento e retiradas do sócio misturadas com o caixa da empresa. É preciso medir cada uma para saber qual pesa mais.'], ['Quanto tempo leva para ver o caixa organizado?', 'A fotografia inicial do caixa e da margem costuma sair em poucas semanas, dependendo da qualidade dos dados que a empresa já tem. A melhora do resultado vem das ações priorizadas depois.']] },
  { slug: 'como-pagar-menos-imposto-na-empresa-legalmente', curto: 'Pago imposto demais', seg: 'neg', icon: 'file', q: 'Tenho a sensação de que pago imposto demais.',
    h1: 'Como pagar menos imposto na empresa, dentro da lei',
    title: 'Pagar menos imposto na empresa, dentro da lei | Outro Primo',
    desc: 'Enquadramento, pró-labore e Fator R: veja como revisar a carga tributária da empresa de forma legal, com prova do antes e depois.',
    corpo: ['Muitas empresas pagam mais imposto do que precisam por causa do enquadramento, da forma como o sócio é remunerado (pró-labore e distribuição de lucros) ou de receitas que poderiam ser separadas. Planejamento tributário lícito (elisão fiscal) é diferente de sonegação: é escolher, dentro da lei, o caminho legal mais leve.',
      'Fazemos a análise junto com o contador do cliente, mostramos o cálculo do antes e do depois e só então decidimos o que mudar. Toda regra usada tem a vigência conferida antes de recomendar.'],
    sinais: ['Você nunca comparou o seu regime tributário com as alternativas', 'O pró-labore foi definido “de cabeça”, sem simulação', 'Sua atividade tem benefícios ou regras específicas que ninguém analisou', 'O contador entrega as guias, mas ninguém planeja o imposto'],
    entrega: ['Simulação do antes e do depois com a fonte da regra usada', 'Conferência de vigência da norma antes de recomendar', 'Plano de implantação com o contador', 'Medição do ganho nos meses seguintes'],
    faq: [['Reduzir imposto da empresa é legal?', 'Sim, quando feito por planejamento tributário lícito (elisão fiscal): escolher entre caminhos que a lei permite. Sonegação, que é esconder ou fraudar, é crime. Toda recomendação nossa é validada com o contador e com a norma vigente.'], ['O que é o Fator R no Simples Nacional?', 'É uma relação entre a folha de pagamento (incluindo o pró-labore) e o faturamento que, para algumas atividades, pode mudar a tabela do Simples Nacional aplicada. Vale ou não para o seu caso depende da atividade e dos números da empresa, por isso é simulado antes de qualquer mudança.']] },
  { slug: 'como-reduzir-desperdicio-na-empresa', curto: 'Desperdício e baixa eficiência', seg: 'neg', icon: 'target', q: 'Sinto que há desperdício na operação e quero ganhar eficiência.',
    h1: 'Como reduzir desperdício e ganhar eficiência na empresa',
    title: 'Como reduzir desperdício e ganhar eficiência | Outro Primo',
    desc: 'Retrabalho, espera, estoque parado, energia e água em excesso? Projetos de eficiência para a empresa toda ou só um setor ou unidade.',
    corpo: ['Desperdício nem sempre aparece como perda: está no retrabalho, na espera entre uma etapa e outra, no estoque parado, no deslocamento desnecessário, no material que sobra, na energia e na água usadas além do necessário e na máquina ou na pessoa ociosa.',
      'Conduzimos projetos de melhoria de eficiência com método (Lean e Six Sigma): medimos onde está a perda, priorizamos o que mais pesa (regra 80/20), atacamos a causa e deixamos um indicador para manter o ganho. Pode ser na empresa inteira ou só no setor, na linha ou na unidade onde o ganho é maior.'],
    sinais: ['Há retrabalho frequente: refazer o que já deveria estar pronto', 'Pedidos, clientes ou material ficam esperando entre uma etapa e outra', 'Estoque parado, sobras ou perdas que ninguém mede', 'Contas de energia ou água que só sobem'],
    entrega: ['Mapa dos desperdícios, com o custo de cada um (o dinheiro deixado na mesa)', 'Projeto de melhoria com meta, indicador, responsável e prazo', 'Padronização do que funcionou, para o ganho não se perder', 'Acompanhamento dos indicadores até o resultado aparecer'],
    faq: [['O que são os 7 desperdícios do Lean?', 'São as perdas clássicas apontadas pelo Lean: superprodução, espera, transporte, excesso de processamento, estoque, movimentação e defeitos (retrabalho). Muitos autores acrescentam um oitavo: o talento das pessoas não aproveitado. Na prática, adaptamos a lista ao seu tipo de negócio.'], ['Isso serve só para indústria?', 'Não. O método nasceu na indústria, mas retrabalho, espera e agenda ociosa existem em clínicas, escolas, lojas, restaurantes e prestadores de serviço. Adaptamos o cálculo da ociosidade para o seu segmento.']] },
  { slug: 'como-separar-financas-da-empresa-e-pessoais', curto: 'Misturo contas da empresa e pessoais', seg: 'neg', icon: 'layers', q: 'Misturo o dinheiro da empresa com o meu e não sei quanto realmente ganho.',
    h1: 'Como separar as finanças da empresa das finanças pessoais',
    title: 'Como separar finanças da empresa e pessoais | Outro Primo',
    desc: 'Pró-labore, distribuição de lucros e contas separadas: o passo a passo para o dono saber quanto a empresa gera e quanto pode retirar.',
    corpo: ['Quando o dono paga conta de casa pela empresa e despesa da empresa no cartão pessoal, ninguém sabe se o negócio dá lucro. Separar as finanças é o primeiro passo para decidir preço, investimento e retirada com segurança.',
      'O caminho tem poucas peças: contas bancárias separadas, um pró-labore definido com critério (junto com o contador), uma regra clara de retirada de lucros e um controle mensal simples do que entra e sai.'],
    sinais: ['Você paga despesas pessoais com o dinheiro da empresa, ou o contrário', 'Não existe um valor fixo de retirada mensal', 'No fim do ano você não sabe se a empresa deu lucro', 'O imposto de renda pessoal e o da empresa viram surpresa'],
    entrega: ['Estrutura de contas e regra de retirada definidas', 'Pró-labore e distribuição de lucros simulados com o contador', 'Controle mensal simples de entradas e saídas', 'Visão do patrimônio do sócio fora da empresa'],
    faq: [['Preciso pagar pró-labore para mim mesmo?', 'Em regra, sócio que trabalha na empresa deve ter pró-labore, e o valor e as regras dependem do regime tributário. Definimos isso junto com o contador, simulando o efeito nos impostos antes de decidir.'], ['Posso retirar o lucro da empresa quando quiser?', 'Depende da apuração contábil e das regras do seu regime. O que recomendamos é criar uma regra clara e conferir com o contador o que pode ser distribuído e como.']] },
  { slug: 'como-precificar-produtos-e-servicos', curto: 'Preço certo para vender', seg: 'neg', icon: 'trending', q: 'Não sei se o meu preço está certo.',
    h1: 'Como precificar produtos e serviços sem perder dinheiro',
    title: 'Como precificar produtos e serviços sem perder | Outro Primo',
    desc: 'Preço baseado só no concorrente pode esconder prejuízo. Entenda margem de contribuição e como chegar ao preço que sustenta o seu negócio.',
    corpo: ['Muita empresa copia o preço do concorrente e descobre tarde que cada venda deixa pouco, ou nada. Um preço sustentável cobre os custos variáveis, ajuda a pagar os custos fixos, os impostos e ainda deixa o lucro desejado.',
      'Calculamos a margem de contribuição (quanto sobra de cada venda depois dos custos variáveis) de cada produto ou serviço, e a partir dela ajustamos preço, desconto e mix de vendas.'],
    sinais: ['Você define o preço olhando só o que o concorrente cobra', 'Dá desconto sem saber até onde pode ir', 'Os produtos mais vendidos não são os que mais dão lucro', 'Vende muito e a margem parece pequena'],
    entrega: ['Margem de contribuição de cada produto ou serviço', 'Preço mínimo e política de desconto', 'Mix de vendas pensado em lucro, não só em volume', 'Planilha simples para repetir o cálculo sozinho'],
    faq: [['O que é margem de contribuição?', 'É o que sobra de cada venda depois de descontar os custos e despesas que variam com ela, como material, comissão e imposto sobre a venda. É esse valor que paga os custos fixos e forma o lucro.'], ['Posso cobrar mais caro que o concorrente?', 'Pode, se o cliente enxergar valor. Mas primeiro é preciso saber qual é o seu preço mínimo para não perder dinheiro, e depois decidir posicionamento.']] },
  { slug: 'a-equipe-nao-entrega-resultado', curto: 'Equipe que não entrega', seg: 'neg', icon: 'users', q: 'Minha equipe não entrega como eu espero.',
    h1: 'Equipe que não entrega resultado: como melhorar',
    title: 'Equipe que não entrega resultado: como melhorar | Outro Primo',
    desc: 'Metas claras, feedback e delegação: como melhorar a entrega da equipe com ferramentas das grandes empresas adaptadas ao dia a dia.',
    corpo: ['Equipe que não entrega costuma ser sintoma de metas pouco claras, feedback raro ou tarefas que só o dono sabe fazer. A boa notícia: isso se resolve com poucas rotinas bem escolhidas.',
      'Levamos para a sua empresa o que funciona em multinacionais (metas simples, reunião curta, feedback estruturado, delegação com acompanhamento), sem burocracia.'],
    sinais: ['As pessoas esperam você mandar para agir', 'As metas existem na sua cabeça, mas não estão combinadas com o time', 'O feedback só aparece quando algo dá errado', 'Você faz o que deveria ter delegado'],
    entrega: ['Diagnóstico de liderança e cultura', 'Rotinas de gestão que cabem no seu dia', 'Roteiros de conversa e feedback para situações reais', 'Acompanhamento até a rotina pegar'],
    faq: [['Como cobrar resultado sem desmotivar a equipe?', 'Com meta clara, acompanhamento frequente e feedback sobre o comportamento e o resultado, não sobre a pessoa. Montamos roteiros para as conversas difíceis do dia a dia.'], ['A consultoria treina minha equipe?', 'O foco é você, dono ou gestor, e as rotinas de gestão. Quando o treinamento da equipe for o gargalo, desenhamos em conjunto o que treinar, com foco no que gera resultado.']] },
  { slug: 'empresa-que-depende-do-dono', curto: 'Empresa que depende só de mim', seg: 'neg', icon: 'sliders', q: 'Minha empresa só funciona se eu estiver presente.',
    h1: 'Empresa que depende do dono: como fazer funcionar sem você',
    title: 'Empresa que depende do dono: como mudar | Outro Primo',
    desc: 'Padronize processos e organize a operação para o negócio funcionar sem depender 100% do dono, focando no essencial (Pareto 80/20).',
    corpo: ['Quando tudo passa pelo dono, o negócio não cresce e o dono não descansa. O caminho é mapear o que realmente trava (o gargalo operacional), padronizar o essencial e delegar com critério.',
      'Usamos método de melhoria de processos (Lean Six Sigma), mas na linguagem do seu negócio e só no que traz resultado.'],
    sinais: ['Você não consegue tirar férias sem a empresa parar', 'Só você sabe resolver os problemas mais comuns', 'Tudo precisa da sua aprovação', 'Cada funcionário faz do seu jeito'],
    entrega: ['Mapa dos gargalos da operação', 'Cálculo do que está sendo deixado na mesa (ociosidade)', 'Padronização do essencial', 'Indicadores simples para acompanhar toda semana'],
    faq: [['Por onde começar a tirar o dono do operacional?', 'Pelo que mais consome o seu tempo e se repete: registre o passo a passo, treine alguém e acompanhe por indicadores simples. Fazemos isso priorizando o que mais pesa, sem burocracia.'], ['Preciso de um sistema caro para isso?', 'Não. Em geral começa com processos simples e padronizados. A ferramenta vem depois, se fizer sentido.']] },
  { slug: 'como-vender-mais-sem-gastar-mais', curto: 'Vender mais sem gastar demais', seg: 'neg', icon: 'trending', q: 'Quero vender mais, mas não sei onde investir.',
    h1: 'Como vender mais sem gastar mais com anúncios',
    title: 'Como vender mais sem gastar demais | Outro Primo',
    desc: 'Organize funil de vendas, preço e acompanhamento de clientes antes de gastar em anúncios. Plano de vendas enxuto para a sua empresa.',
    corpo: ['Antes de gastar em anúncio, vale saber quanto custa trazer cada cliente, qual produto dá mais margem e onde o cliente desiste. Muitas vezes o ganho está em ajustar preço, abordagem e follow-up (acompanhamento do cliente depois do primeiro contato).',
      'Montamos junto com você um plano de vendas enxuto, com metas e indicadores claros.'],
    sinais: ['Você investe em divulgação sem saber o retorno', 'Orçamentos enviados não viram venda e ninguém acompanha', 'Clientes antigos não voltam', 'Não há meta de vendas combinada com o time'],
    entrega: ['Precificação com base na margem real', 'Roteiro de abordagem e de acompanhamento de clientes', 'Metas e indicadores comerciais', 'Calendário simples de comunicação'],
    faq: [['Como saber se vale a pena anunciar?', 'Compare o custo para conquistar um cliente com o que ele deixa de margem ao longo do tempo. Se o cálculo fecha, anuncie; se não, ajuste preço e abordagem antes.'], ['Vocês fazem o marketing da empresa?', 'Atuamos na estratégia comercial: preço, funil, indicadores e rotina de vendas. A execução de anúncios e design fica com quem a empresa já tem ou com especialistas indicados.']] },
  { slug: 'segunda-opiniao-isenta-sobre-meus-investimentos', curto: 'Segunda opinião isenta', seg: 'pf', icon: 'eye', q: 'Não sei se o que me recomendam é bom para mim ou bom para quem vende. Quero ter uma segunda opinião de alguém experiente e isento!',
    h1: 'Segunda opinião isenta sobre os seus investimentos',
    title: 'Segunda opinião isenta sobre investimentos | Outro Primo',
    desc: 'Gerente ou assessor ganha por produto vendido? Tenha uma segunda opinião de quem é pago pela consultoria, não pelo produto.',
    corpo: ['Quem recomenda um produto geralmente é pago por ele. Isso não faz o profissional mal-intencionado, mas é razoável querer uma segunda leitura de alguém que não ganha nada se você escolher A ou B.',
      'Na Outro Primo você paga pela consultoria, não pelo produto: não vendemos produtos nem recebemos comissão de instituições. A cobrança é por valor fixo combinado, clara desde o início.'],
    sinais: ['Seu gerente ou assessor só oferece produtos da própria instituição', 'Você não entende quanto paga de taxa', 'Sua carteira tem muitos produtos e nenhum objetivo claro', 'Você quer comparar antes de aceitar uma recomendação'],
    entrega: ['Leitura do seu patrimônio como um todo', 'Reserva de emergência e metas de vida bem definidas', 'Explicação em linguagem simples dos critérios de escolha', 'A decisão e a execução continuam sendo suas'],
    faq: [['Como saber se o meu assessor de investimentos me atende bem?', 'Pergunte como ele é remunerado, quanto você paga de taxa no total e por que aquele produto serve ao seu objetivo. Uma segunda opinião independente ajuda a conferir essas respostas.'], ['Vocês indicam onde investir?', 'Explicamos critérios, custos e riscos para você decidir. Não vendemos produtos, e a execução é sua. Não somos corretora, gestora nem distribuidora de valores mobiliários.']] },
  { slug: 'como-organizar-as-financas-pessoais', curto: 'Organizar a vida financeira', seg: 'pf', icon: 'home', q: 'Quero organizar minha vida financeira, mas não sei por onde começar.',
    h1: 'Como organizar as finanças pessoais, passo a passo',
    title: 'Como organizar as finanças pessoais | Outro Primo',
    desc: 'Orçamento simples, reserva de emergência e objetivos claros: o começo de uma vida financeira tranquila, sem planilha complicada.',
    corpo: ['O começo é simples: saber para onde vai o que entra, montar uma reserva de emergência e dar nome aos objetivos (casa, estudos, aposentadoria). Sem planilha complicada.',
      'Fazemos isso junto, no seu ritmo, com acompanhamento até virar hábito.'],
    sinais: ['O dinheiro acaba antes do fim do mês e você não sabe para onde foi', 'Não há reserva para imprevistos', 'Você tem dívidas ou parcelas que pesam', 'Falta clareza sobre os objetivos para o seu dinheiro'],
    entrega: ['Mapa dos gastos principais', 'Reserva de emergência calculada para a sua realidade', 'Objetivos com valor e prazo', 'Rotina automática de poupança'],
    faq: [['Por onde começo a organizar minhas finanças?', 'Pelo mapa do que entra e sai, depois a reserva de emergência e só então os investimentos. Sem esse alicerce, qualquer investimento fica frágil.'], ['Quanto devo ter de reserva de emergência?', 'Depende da estabilidade da sua renda, das suas despesas fixas e de quantas pessoas dependem de você. Calculamos para a sua realidade, em vez de usar uma regra única para todos.']] },
  { slug: 'quando-posso-me-aposentar', curto: 'Quando posso me aposentar', seg: 'pf', icon: 'clock', q: 'Quando e com quanto eu posso me aposentar com tranquilidade?',
    h1: 'Quando posso me aposentar? Como calcular a independência financeira',
    title: 'Quando posso me aposentar? Calcule | Outro Primo',
    desc: 'Calcule quanto você precisa acumular e guardar por mês para ter independência financeira, com premissas claras e revisadas.',
    corpo: ['A conta da aposentadoria depende do padrão de vida desejado, do que você já tem, de quanto consegue guardar e das premissas de retorno e inflação, que precisam ser claras e revisadas.',
      'Mostramos o cálculo com as premissas à vista, para você entender e ajustar.'],
    sinais: ['Você não sabe quanto precisa acumular', 'Conta apenas com a previdência oficial (INSS) sem simular', 'Já investe, mas sem uma meta de renda futura', 'Quer saber se pode parar de trabalhar mais cedo'],
    entrega: ['Cálculo de independência financeira com premissas explícitas', 'Cenários conservador e realista', 'Proteções para o patrimônio (seguros, sucessão)', 'Revisões periódicas'],
    faq: [['O que é independência financeira?', 'É ter patrimônio suficiente para que os rendimentos cubram o seu padrão de vida sem depender do salário. O valor necessário varia de pessoa para pessoa.'], ['Como calcular quanto preciso para me aposentar?', 'Parte-se do gasto mensal desejado, do tempo até a aposentadoria, do que já foi acumulado e de premissas de retorno e inflação. Como as premissas mudam, o cálculo precisa ser revisto de tempos em tempos.']] },
];
const SEGS = { neg: 'Para empresas', pf: 'Vida pessoal e patrimônio' };
const SEGURL = { neg: '/negocios/', pf: '/investimentos/' };

const problemaCard = (p) =>
  `<a class="card" href="/problemas/${p.slug}/"><div class="ico">${ic(p.icon)}</div><span class="pill ${p.seg}">${SEGS[p.seg]}</span><h3 style="margin-top:8px">${p.q}</h3><span class="more">Ver como resolvemos ${ic('arrow')}</span></a>`;

const faqHtml = (items) => `<div class="narrow">${items.map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('')}</div>`;
const faqSchema = (items) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });

const FAQ_NEG = [
  ['Preciso trocar de contador?', 'Não. Trabalhamos junto com o seu contador: a nossa análise mostra o cálculo e a fonte da regra, e a implantação é feita com ele.'],
  ['Reduzir imposto é legal?', 'Planejamento tributário lícito (elisão fiscal) é legal e é diferente de sonegação. Antes de recomendar, confirmamos a norma vigente e mostramos o cálculo do antes e do depois. Nenhum resultado é garantido: cada caso é analisado individualmente.'],
  ['Como funciona a cobrança?', 'Valor fixo combinado, ou participação de 50% no ganho comprovado, medido em até 12 meses por indicadores claros, com cálculo e fonte. Você só participa do que ficar demonstrado.'],
  ['Por onde começamos?', 'Pelo que mais pesa no resultado (regra 80/20). Fazemos um diagnóstico em cinco frentes e atacamos primeiro o que destrava resultado.'],
  ['Atendem só pequenas e médias empresas?', 'Sim. O nosso foco são as pequenas e médias empresas e os empreendedores, no negócio inteiro, mas atuamos também com empresas maiores em um setor, unidade, linha ou projeto específico.'],
  ['Que projetos de eficiência vocês fazem?', 'Projetos para eliminar desperdícios (retrabalho, espera, estoque parado, perda de material, energia e água em excesso) e aumentar a eficiência, com meta, indicador e acompanhamento. Nenhum resultado é garantido.'],
  ['Atendem fora de Ponta Grossa?', 'Sim. Atendemos em Ponta Grossa/PR e online para todo o Brasil.'],
];
const FAQ_PF = [
  ['Vocês vendem produtos de investimento?', 'Não. Você paga pela nossa consultoria, não por produto: a Outro Primo não vende produtos financeiros nem recebe comissão de instituições.'],
  ['Como funciona a cobrança?', 'Valor fixo, combinado antes de começar, sem participação em rendimento.'],
  ['Vocês escolhem os meus investimentos?', 'Apresentamos a estrutura do patrimônio por classes de ativos e os critérios de escolha. A decisão e a execução são suas.'],
  ['Atendem online?', 'Sim. Atendemos em Ponta Grossa/PR e online para todo o Brasil.'],
];
const FAQ_EXT = [
  ['É legal investir no exterior?', 'Sim, desde que seja feito de forma legal e declarada. Por isso organizamos as declarações exigidas e consultamos a norma vigente antes de orientar.'],
  ['As regras mudam?', 'Com frequência. Por isso cada caso confirma a regra vigente e, quando necessário, trabalhamos com o seu contador ou advogado.'],
  ['O que olhamos na escolha?', 'O custo total (taxas e impostos), o tamanho do patrimônio e o seu momento de vida, além de sucessão e proteção da família.'],
];

// ── Estrutura de página ─────────────────────────────────────────────────────
const orgSchema = {
  '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${SITE_URL}/#org`, name: NOME, url: SITE_URL,
  description: 'Consultoria e acompanhamento independentes: métodos de gestão de grandes empresas adaptados ao dia a dia de pequenas e médias empresas e empreendedores, e consultoria para a vida financeira pessoal.',
  logo: `${SITE_URL}/img/marca.png`, image: `${SITE_URL}/img/og.jpg`, email: EMAIL,
  areaServed: [{ '@type': 'City', name: 'Ponta Grossa' }, { '@type': 'Country', name: 'Brasil' }],
  address: { '@type': 'PostalAddress', addressLocality: 'Ponta Grossa', addressRegion: 'PR', addressCountry: 'BR' },
  founder: { '@id': `${SITE_URL}/#maycoln` }, sameAs: [LINKEDIN],
  knowsAbout: ['Consultoria empresarial', 'Planejamento tributário', 'Eliminação de desperdícios', 'Melhoria de eficiência operacional', 'Gestão de processos', 'Liderança de equipes', 'Planejamento financeiro pessoal', 'Investimentos'],
};
const personSchema = {
  '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE_URL}/#maycoln`, name: 'Maycoln Primo', jobTitle: 'Consultor e fundador da Outro Primo',
  url: `${SITE_URL}/sobre/`, image: `${SITE_URL}/img/perfil.jpg`, worksFor: { '@id': `${SITE_URL}/#org` }, sameAs: [LINKEDIN],
  alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Universidade Tecnológica Federal do Paraná (UTFPR)' }, { '@type': 'CollegeOrUniversity', name: 'Universidade Estadual de Ponta Grossa (UEPG)' }],
  knowsAbout: ['Eliminação de desperdícios', 'Melhoria de eficiência operacional', 'Liderança de equipes', 'Lean Six Sigma', 'Gestão de custos e orçamento', 'Planejamento financeiro'],
  hasCredential: { '@type': 'EducationalOccupationalCredential', name: 'Profissional certificado ANBIMA' },
};

const layout = ({ url, title, desc, body, schema = [], image = '/img/og.jpg', crumb = null, noindex = false, preload = '' }) => {
  const bc = crumb
    ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['/', 'Início'], ...crumb].map(([h, t], i) => ({ '@type': 'ListItem', position: i + 1, name: t, item: SITE_URL + (h || url) })) }
    : null;
  const crumbHtml = crumb ? `<nav class="wrap crumbs" aria-label="Você está em">${[['/', 'Início'], ...crumb].map(([h, t], i, a) => (i < a.length - 1 ? `<a href="${h}">${t}</a>` : `<span aria-current="page">${t}</span>`)).join(' › ')}</nav>` : '';
  const cur = (h) => (url === h || (h !== '/' && url.startsWith(h)) ? ' aria-current="page"' : '');
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="theme-color" content="#132A4C">
<meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large'}">
<link rel="canonical" href="${SITE_URL}${url}">
<link rel="icon" href="/favicon.png"><link rel="apple-touch-icon" href="/favicon.png">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="${NOME}">
<meta property="og:title" content="${title}"><meta property="og:description" content="${desc}">
<meta property="og:url" content="${SITE_URL}${url}"><meta property="og:image" content="${SITE_URL}${image}">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${desc}"><meta name="twitter:image" content="${SITE_URL}${image}">
${preload}<link rel="stylesheet" href="/style.css">
${[...schema, ...(bc ? [bc] : [])].map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head><body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
${SPRITE}
<div class="topbar"><div class="wrap"><span>${ic('shield')} Consultoria independente · cobrança clara, combinada antes de começar</span><span class="hide-m">${ic('mail')} <a href="mailto:${EMAIL}">${EMAIL}</a> &nbsp;·&nbsp; ${ic('pin')} Ponta Grossa/PR e online</span></div></div>
<header class="site"><div class="wrap nav"><a class="brand" href="/" aria-label="${NOME}: página inicial"><img src="/img/marca.png" alt="" width="38" height="41"><span>${NOME}<small>Negócios · Finanças</small></span></a>
<input type="checkbox" id="nt" aria-label="Abrir menu"><label class="burger" for="nt" aria-hidden="true"><span></span></label>
<nav class="menu" aria-label="Principal">${NAV.map(([h, t]) => `<a href="${h}"${cur(h)}>${t}</a>`).join('')}<a class="btn" href="/contato/">Conversar</a></nav></div></header>
<main id="conteudo">${crumbHtml}${body}</main>
<footer><div class="wrap"><div class="foot">
<div><div class="bl"><span class="chipimg"><img src="/img/marca.png" alt="" width="42" height="45" loading="lazy"></span><strong>${NOME}</strong></div>
<p>Os métodos de gestão das grandes empresas, adaptados ao dia a dia de pequenas e médias empresas e empreendedores, e consultoria para a vida financeira pessoal.</p>
<p><a href="${LINKEDIN}" rel="noopener" target="_blank" aria-label="LinkedIn do Maycoln Primo">${ic('linkedin')} LinkedIn</a></p></div>
<div><h4>Para empresas</h4><ul><li><a href="/negocios/">Como ajudamos</a></li>${PROBLEMAS.filter((p) => p.seg === 'neg').map((p) => `<li><a href="/problemas/${p.slug}/">${p.curto}</a></li>`).join('')}</ul></div>
<div><h4>Vida pessoal e patrimônio</h4><ul><li><a href="/investimentos/">Como ajudamos</a></li><li><a href="/exterior/">Patrimônio no exterior</a></li>${PROBLEMAS.filter((p) => p.seg === 'pf').map((p) => `<li><a href="/problemas/${p.slug}/">${p.curto}</a></li>`).join('')}</ul></div>
<div><h4>Fale com a gente</h4><ul class="ct"><li>${ic('chat')}<a href="${WA('Olá, Maycoln! Vim pelo site e quero conversar.')}" rel="noopener">WhatsApp</a></li><li>${ic('mail')}<a href="mailto:${EMAIL}">${EMAIL}</a></li><li>${ic('pin')}<span>Ponta Grossa/PR<br>e online para todo o Brasil</span></li></ul>
<h4 style="margin-top:22px">Institucional</h4><ul><li><a href="/sobre/">Quem é o Maycoln</a></li><li><a href="/problemas/">Problemas e oportunidades</a></li><li><a href="/contato/">Contato</a></li></ul></div>
</div>
<div class="legal">${SHOW_SELO ? seloImg() : ''}<div><p>${FOOT_NOTE}</p>${SHOW_SELO ? '<p>Maycoln Primo é profissional certificado ANBIMA.</p>' : ''}<p class="copy">© ${ANO} ${NOME}. Todos os direitos reservados.</p></div></div></div></footer>
<a class="fab" href="${WA('Olá, Maycoln! Vim pelo site e quero conversar.')}" rel="noopener" aria-label="Falar pelo WhatsApp">${ic('chat')} WhatsApp</a>
</body></html>`;
};

const DESPERDICIO = `<section class="white-bg"><div class="wrap"><div class="head"><p class="eyebrow">Eliminação de desperdício e eficiência</p><h2>Onde há desperdício, há resultado esperando.</h2>
<p>Em qualquer empresa, parte do esforço, do tempo, do material, da energia e da água se perde no caminho. Eliminar essa perda pode ser o caminho mais rápido para melhorar o resultado. Nas pequenas e médias empresas, cada perda pesa ainda mais no caixa. Atuamos na empresa inteira ou só no setor, na linha ou na unidade onde o ganho é maior.</p></div>
<div class="grid g4">
<div class="card"><div class="ico">${ic('clock')}</div><h3>Espera e retrabalho</h3><p>Etapas paradas, erros que voltam e trabalho feito duas vezes.</p></div>
<div class="card"><div class="ico">${ic('layers')}</div><h3>Estoque e material</h3><p>Estoque parado, sobra, quebra e perda de material.</p></div>
<div class="card"><div class="ico">${ic('leaf')}</div><h3>Energia e água</h3><p>Consumo além do necessário, que dá para reduzir sem perder qualidade.</p></div>
<div class="card"><div class="ico">${ic('sliders')}</div><h3>Gargalos e paradas</h3><p>O ponto que segura todo o resto e limita o que a empresa entrega.</p></div></div>
<h3 style="margin-top:34px">Como conduzimos um projeto de melhoria de eficiência</h3>
<ol class="steps"><li><strong>Medir</strong><p>Onde está a perda hoje e quanto ela custa.</p></li><li><strong>Priorizar</strong><p>O que mais pesa, com a regra 80/20.</p></li><li><strong>Atacar a causa</strong><p>A causa real, não só o sintoma, com método (DMAIC: definir, medir, analisar, melhorar e controlar).</p></li><li><strong>Manter o ganho</strong><p>Padronização e indicador, para o resultado não se perder.</p></li></ol>
<p class="small" style="margin-top:14px">Nenhum resultado é garantido; cada caso é analisado individualmente.</p>
<p><a class="btn alt" href="/problemas/como-reduzir-desperdicio-na-empresa/">Ver como funciona ${ic('arrow')}</a></p></div></section>`;

const pages = [];
const add = (p) => pages.push(p);

// ── Home ────────────────────────────────────────────────────────────────────
add({
  url: '/', title: 'Outro Primo | Consultoria para pequenas e médias empresas',
  desc: 'Métodos de gestão das grandes empresas adaptados a pequenas e médias empresas e empreendedores. Consultoria independente em Ponta Grossa/PR e online.',
  schema: [orgSchema, personSchema, { '@context': 'https://schema.org', '@type': 'WebSite', name: NOME, url: SITE_URL, inLanguage: 'pt-BR' }],
  preload: '<link rel="preload" as="image" href="/img/hero.jpg" fetchpriority="high">\n',
  body: `<section class="hero" style="padding-bottom:70px"><div class="wrap"><div>
<p class="eyebrow">Consultoria independente · para pequenas e médias empresas</p>
<h1>O que as grandes empresas usam para decidir, na medida certa para você.</h1>
<p class="lead">28 anos de carreira em multinacionais, 19 deles liderando equipes. Hoje levo os métodos de gestão das grandes empresas, adaptados ao dia a dia, para pequenas e médias empresas e empreendedores, e também para a vida pessoal e o patrimônio.</p>
<div class="row">${cta('Quero conversar', 'Olá, Maycoln! Vim pelo site e quero conversar.', 'wa')}<a class="btn alt" href="/sobre/">Conheça o Maycoln</a></div></div>
<div class="photo"><img src="/img/hero.jpg" alt="Maycoln Primo, consultor e fundador da Outro Primo" width="450" height="600" fetchpriority="high" decoding="async"><div class="badge"><b>28 anos</b><span>de carreira em multinacionais, 19 deles liderando equipes</span></div></div></div></section>
<div class="wrap"><h2 class="head" style="margin-bottom:0;position:absolute;left:-999px">Por onde você quer começar?</h2><div class="entradas">
<a class="entrada" href="/negocios/"><span class="ico">${ic('briefcase', 'big')}</span><strong>Minha empresa</strong>Resultado, equipe, processos, vendas e impostos, dentro da lei.<span class="go">Ver como ajudamos ${ic('arrow')}</span></a>
<a class="entrada inv" href="/investimentos/"><span class="ico">${ic('pie')}</span><strong>Minha vida pessoal e meu patrimônio</strong>Organização, reserva, aposentadoria e uma segunda opinião isenta.<span class="go">Ver como ajudamos ${ic('arrow')}</span></a>
<a class="entrada dois" href="/contato/"><span class="ico">${ic('layers')}</span><strong>Os dois</strong>Sou empresário e quero cuidar da empresa e do meu patrimônio.<span class="go">Quero conversar ${ic('arrow')}</span></a></div></div>
<section class="white-bg"><div class="wrap two"><div><p class="eyebrow">Nosso foco</p><h2>Gestão de grande empresa, no tamanho do seu negócio.</h2>
<p>Nosso propósito é democratizar o conhecimento de gestão de classe mundial: as ferramentas que as grandes empresas usam, traduzidas para a linguagem simples e a realidade das pequenas e médias empresas e dos empreendedores, em que o dono vive o dia a dia, mas não tem todo o aparato de gestão e finanças.</p>
<p>Tudo na lógica 80/20: você não precisa de tudo o que uma grande empresa usa, precisa do que realmente move o seu resultado.</p></div>
<ul class="ok" style="font-size:1.05rem"><li>Métodos de multinacionais, adaptados ao seu dia a dia</li><li>Linguagem simples, sem corporativês</li><li>Só o que move o resultado, sem burocracia</li><li>Do negócio inteiro a um setor ou unidade, quando faz sentido</li></ul></div></section>
<section><div class="wrap"><div class="head"><p class="eyebrow">Problemas e oportunidades</p><h2>Algum destes é parecido com o seu?</h2><p>Escolha o que mais se parece com a sua situação e veja, na prática, como resolvemos.</p></div>
<div class="grid">${PROBLEMAS.map(problemaCard).join('')}</div></div></section>
<div class="stats"><div class="wrap"><div><b>28</b><span>anos de carreira<br>em multinacionais</span></div><div><b>19</b><span>anos liderando<br>equipes</span></div><div><b>5</b><span>frentes de diagnóstico<br>para empresas</span></div><div><b>12</b><span>meses para medir<br>o ganho comprovado</span></div></div></div>
${DESPERDICIO}
<section><div class="wrap"><div class="head c"><p class="eyebrow" style="justify-content:center">Como funciona</p><h2>Do primeiro contato ao resultado, em quatro passos</h2></div>
<ol class="steps"><li><strong>Conversa inicial</strong><p>Você conta a sua situação e vemos se faz sentido trabalharmos juntos.</p></li><li><strong>Diagnóstico</strong><p>Olhamos o que mais pesa no resultado, com a regra 80/20.</p></li><li><strong>Plano de ação simples</strong><p>Cada passo com responsável, prazo e indicador.</p></li><li><strong>Acompanhamento</strong><p>Ao seu lado até virar rotina, com o resultado medido.</p></li></ol></div></section>
<section class="alt-bg"><div class="wrap two"><div><p class="eyebrow">Aplicação prática</p><h2>Na prática, na sua realidade.</h2>
<ul class="ok"><li>Soluções personalizadas para a realidade e o perfil de cada cliente</li><li>Tecnologia e kits de aplicação prática no seu dia a dia</li><li>Foco no que realmente move o resultado (regra 80/20)</li><li>Acompanhamento próximo, com linguagem simples</li><li>Preço claro, combinado antes de começar</li></ul>
<p>${cta()}</p></div><img src="/img/escritorio.jpg" alt="Maycoln Primo em seu escritório, com estante de livros ao fundo" loading="lazy" width="450" height="600"></div></section>
<section><div class="wrap two"><img src="/img/blazer.jpg" alt="Maycoln Primo, consultor" loading="lazy" width="450" height="600" style="max-width:420px"><div><p class="eyebrow">Quem está do outro lado</p><h2>Carreira em multinacionais, a serviço da sua empresa e do seu patrimônio.</h2>
<p>Comecei com carteira assinada em 1998, passei à liderança oficial em 2007 e vivi de perto como as grandes empresas decidem, medem e melhoram. Criei a Outro Primo para levar isso, na medida certa, a quem não tem todo esse aparato.</p>
<div class="creds"><span class="chip">${ic('award')} Profissional certificado ANBIMA</span><span class="chip">${ic('target')} Lean Six Sigma</span><span class="chip">${ic('book')} Pós em Gestão Ambiental</span></div>
<p><a class="btn alt" href="/sobre/">Ver a trajetória completa ${ic('arrow')}</a></p></div></div></section>
<div class="wrap cta-wrap"><div class="cta-band"><div><h2>Vamos conversar sobre o seu caso?</h2><p>Primeira conversa sem compromisso. Atendemos em Ponta Grossa/PR e online para todo o Brasil.</p></div>${cta('Chamar no WhatsApp', 'Olá, Maycoln! Vim pelo site e quero conversar.', 'gold')}</div></div>`,
});

// ── Negócios ────────────────────────────────────────────────────────────────
add({
  url: '/negocios/', title: 'Consultoria para pequenas e médias empresas | Outro Primo',
  desc: 'Gestão de grandes empresas adaptada a pequenas e médias empresas e empreendedores: desperdício, eficiência, caixa, impostos dentro da lei, liderança e vendas.',
  crumb: [[null, 'Para empresas']], schema: [orgSchema, faqSchema(FAQ_NEG)],
  body: `<section class="pagehead"><div class="wrap"><p class="eyebrow">Outro Primo Negócios</p>
<h1>Consultoria para pequenas e médias empresas e empreendedores</h1><p class="lead narrow">Fazemos um diagnóstico em cinco frentes e atacamos primeiro o que destrava resultado, para você sentir a diferença no caixa.</p>
<p class="narrow">O nosso foco são as pequenas e médias empresas e os empreendedores, no negócio inteiro. Atuamos também com empresas maiores em um setor, unidade, linha ou projeto específico.</p>
<div class="row">${cta('Quero um diagnóstico da minha empresa', 'Olá, Maycoln! Quero um diagnóstico da minha empresa.', 'wa')}</div></div></section>
<section style="padding-top:20px"><div class="wrap"><div class="grid">
<div class="card"><div class="ico">${ic('dollar')}</div><h3>Finanças e geração de caixa</h3><p>Preço, previsão de caixa, separação entre empresa e sócio e impostos dentro da lei.</p></div>
<div class="card"><div class="ico">${ic('users')}</div><h3>Liderança e cultura de equipe</h3><p>Delegação, feedback, treinamento e gestão de conflitos na prática.</p></div>
<div class="card"><div class="ico">${ic('sliders')}</div><h3>Operações, eficiência e desperdício</h3><p>Eliminação de desperdício, projetos de melhoria de eficiência, gargalos e o dinheiro deixado na mesa.</p></div>
<div class="card"><div class="ico">${ic('trending')}</div><h3>Vendas e marketing</h3><p>Precificação, abordagem e comunicação com metas claras.</p></div>
<div class="card"><div class="ico">${ic('compass')}</div><h3>Estratégia e crescimento</h3><p>Para onde crescer, em que ordem e com quais indicadores.</p></div></div></div></section>
${DESPERDICIO}
<section class="alt-bg"><div class="wrap two top"><div><p class="eyebrow">Como cobramos</p><h2>Transparência desde o começo</h2><p>Valor fixo combinado, ou participação no ganho comprovado, medido por indicadores claros, com cálculo e fonte, em até 12 meses. Você só participa do que ficar demonstrado.</p>
<ul class="ok"><li>Indicadores do antes e do depois, verificáveis</li><li>Prova técnica de cada resultado</li><li>Sem surpresa: tudo combinado antes</li></ul></div>
<div><h3>Problemas e oportunidades mais comuns</h3><div class="grid" style="grid-template-columns:1fr">${PROBLEMAS.filter((p) => p.seg === 'neg').map((p) => `<a class="card" style="flex-direction:row;align-items:center;gap:12px;padding:16px 18px" href="/problemas/${p.slug}/">${ic(p.icon)}<span style="flex:1">${p.q}</span>${ic('arrow')}</a>`).join('')}</div></div></div></section>
<section><div class="wrap"><div class="head"><p class="eyebrow">Perguntas frequentes</p><h2>O que as pessoas mais perguntam</h2></div>${faqHtml(FAQ_NEG)}</div></section>
<div class="wrap cta-wrap"><div class="cta-band"><div><h2>Quer saber onde está o resultado da sua empresa?</h2><p>Conte a sua situação em poucas palavras.</p></div>${cta('Falar com o Maycoln', 'Olá, Maycoln! Quero um diagnóstico da minha empresa.', 'gold')}</div></div>`,
});

// ── Investimentos ───────────────────────────────────────────────────────────
add({
  url: '/investimentos/', title: 'Organização financeira e segunda opinião isenta | Outro Primo',
  desc: 'Orçamento, reserva de emergência, aposentadoria e visão do patrimônio inteiro, com segunda opinião de quem é pago pela consultoria, não por produto.',
  crumb: [[null, 'Vida pessoal e patrimônio']], schema: [orgSchema, faqSchema(FAQ_PF)],
  body: `<section class="pagehead"><div class="wrap"><p class="eyebrow">Outro Primo Investimentos</p>
<h1>Vida pessoal e patrimônio</h1><p class="lead narrow">Traduzimos finanças para o dia a dia e olhamos o patrimônio inteiro. Você paga pela consultoria, não pelo produto.</p>
<div class="row">${cta('Quero uma segunda opinião', 'Olá, Maycoln! Quero uma segunda opinião sobre o meu patrimônio.', 'wa')}</div></div></section>
<section style="padding-top:20px"><div class="wrap"><p class="quote">Não sei se o que me recomendam é bom para mim ou bom para quem vende. Quero ter uma segunda opinião de alguém experiente e isento!</p>
<div class="grid">
<div class="card"><div class="ico">${ic('home')}</div><h3>Organização e reserva</h3><p>Para onde vai o que entra, quanto manter de reserva de emergência e como automatizar a poupança.</p></div>
<div class="card"><div class="ico">${ic('clock')}</div><h3>Independência financeira</h3><p>Quanto acumular e quanto guardar por mês, com premissas à vista.</p></div>
<div class="card"><div class="ico">${ic('pie')}</div><h3>Estrutura da carteira</h3><p>Como distribuir o patrimônio entre classes de ativos conforme o seu perfil e objetivos, e os critérios para escolher. A decisão e a execução são suas.</p></div>
<div class="card"><div class="ico">${ic('shield')}</div><h3>Proteção do patrimônio</h3><p>Seguros, sucessão e cuidado com custos e impostos.</p></div></div></div></section>
<section class="alt-bg"><div class="wrap two top"><div><p class="eyebrow">Como cobramos</p><h2>Você paga pela consultoria, não pelo produto</h2><p>Valor fixo, combinado antes de começar, sem participação em rendimento e sem comissão de instituições financeiras. Por isso a nossa única preocupação é o que é melhor para você.</p>
<p><a class="more" href="/exterior/" style="font-weight:700;color:var(--golddk)">Também orientamos sobre patrimônio no exterior ${ic('arrow')}</a></p></div>
<div><h3>Problemas e oportunidades mais comuns</h3><div class="grid" style="grid-template-columns:1fr">${PROBLEMAS.filter((p) => p.seg === 'pf').map((p) => `<a class="card" style="flex-direction:row;align-items:center;gap:12px;padding:16px 18px" href="/problemas/${p.slug}/">${ic(p.icon)}<span style="flex:1">${p.q.length > 70 ? 'Quero uma segunda opinião isenta sobre meus investimentos.' : p.q}</span>${ic('arrow')}</a>`).join('')}</div></div></div></section>
<section><div class="wrap"><div class="head"><p class="eyebrow">Perguntas frequentes</p><h2>O que as pessoas mais perguntam</h2></div>${faqHtml(FAQ_PF)}</div></section>
<div class="wrap cta-wrap"><div class="cta-band"><div><h2>Quer uma leitura isenta do seu patrimônio?</h2><p>Conte a sua situação em poucas palavras.</p></div>${cta('Falar com o Maycoln', 'Olá, Maycoln! Quero uma segunda opinião sobre o meu patrimônio.', 'gold')}</div></div>`,
});

// ── Exterior ────────────────────────────────────────────────────────────────
add({
  url: '/exterior/', title: 'Investir no exterior de forma legal e declarada | Outro Primo',
  desc: 'Organização e orientação para investir e manter patrimônio no exterior de forma legal e declarada, com atenção a custos e impostos.',
  crumb: [[null, 'Patrimônio no exterior']], schema: [orgSchema, faqSchema(FAQ_EXT)],
  body: `<section class="pagehead"><div class="wrap two"><div><p class="eyebrow">Investimentos internacionais</p>
<h1>Patrimônio no exterior, de forma legal e declarada</h1>
<p class="lead">Organização e orientação para investir e manter patrimônio no exterior, com transparência com a Receita Federal e o Banco Central e olhando custo total, taxas e impostos.</p>
<div class="row">${cta('Quero entender o meu caso', 'Olá, Maycoln! Quero entender como organizar patrimônio no exterior de forma legal.', 'wa')}</div></div>
<div><ul class="ok" style="font-size:1.05rem"><li>Entender o que faz sentido para o seu patrimônio e o seu momento</li><li>Comparar custos totais: taxas, impostos e tamanho do patrimônio</li><li>Organizar as declarações exigidas (consultamos a norma vigente antes de orientar)</li><li>Pensar também em sucessão e proteção da família</li></ul></div></div></section>
<section><div class="wrap"><div class="grid g3">
<div class="card"><div class="ico">${ic('globe')}</div><h3>Visão do conjunto</h3><p>Onde está o seu patrimônio hoje e qual papel o exterior pode ter nele.</p></div>
<div class="card"><div class="ico">${ic('file')}</div><h3>Tudo declarado</h3><p>Organização das declarações exigidas, com a norma vigente confirmada.</p></div>
<div class="card"><div class="ico">${ic('shield')}</div><h3>Família protegida</h3><p>Atenção à sucessão e à proteção de quem depende de você.</p></div></div>
<p class="small" style="margin-top:20px">Cada caso depende de normas que mudam com frequência; por isso confirmamos a regra vigente e, quando necessário, trabalhamos com o seu contador ou advogado.</p></div></section>
<section class="alt-bg"><div class="wrap"><div class="head"><p class="eyebrow">Perguntas frequentes</p><h2>Antes de começar</h2></div>${faqHtml(FAQ_EXT)}</div></section>`,
});

// ── Sobre ───────────────────────────────────────────────────────────────────
const LINHA = [
  ['1998', 'Início da carreira', 'Primeiro emprego com carteira assinada, já em multinacional. Desde 2001, liderança informal de equipes.'],
  ['2007', 'Liderança oficial: supervisão de manutenção', 'Coordenei equipes de manutenção civil, mecânica, elétrica e eletrônica em uma fábrica de alimentos com sete linhas de produção. Implantei o setor de planejamento e controle de manutenção.'],
  ['2009', 'Especialista em produção industrial', 'Metas e medição de eficiência, custos por produto, orçamento anual, redução de gargalos e eliminação de perdas (Lean).'],
  ['2011', 'Gerente de projetos: uma fábrica nova, do projeto à operação', 'Planejamento, contratação e treinamento da equipe, fornecedores nacionais e internacionais e relação com órgãos reguladores, até a operação dentro dos parâmetros de qualidade, custo e segurança.'],
  ['2013', 'Gerente de utilidades: construção de uma planta do zero', 'Participei do projeto, da contratação, do comissionamento e da partida de uma nova planta de processamento de milho e depois gerenciei caldeiras de biomassa, tratamento de água, ar comprimido e torres de resfriamento.'],
  ['2016', 'Gerente de produção: três linhas de produção', 'Metas de produção, cadeia de suprimentos, segurança, qualidade e engajamento; orçamento anual; pesquisas de clima, planos de sucessão e desenvolvimento de novos líderes.'],
  ['2021', 'Gerente de produção: moagem e ração úmida', 'Equipes de supervisão, engenharia e operação; custos fixos e variáveis da ordem de R$ 82 milhões; formação de profissionais em Lean Six Sigma.'],
  ['2023', 'Gerente de unidade industrial', 'Liderança integral de uma fábrica de rações: resultado (P&L, ou lucros e perdas), orçamento, segurança, qualidade, sucessão de lideranças, processo de aquisição da fábrica e transformação cultural.'],
  ['2026', 'Outro Primo', 'Fundação da Outro Primo, para levar essas ferramentas a pequenas e médias empresas e empreendedores, e à vida financeira pessoal.'],
];
const TEMAS = [
  ['target', 'Eliminação de desperdício e eficiência', 'Projetos de melhoria que reduzem perdas, custo e consumo de energia e água, com Lean e Six Sigma.'],
  ['sliders', 'Melhoria de processos', 'Gestão pela rotina, indicadores e padronização: o essencial, sem burocracia.'],
  ['users', 'Liderança de equipes', 'Delegação, feedback, sucessão e desenvolvimento de líderes, em fábricas de grande porte.'],
  ['dollar', 'Custos e orçamento', 'Orçamento anual, custos fixos e variáveis e gestão de resultado (P&L).'],
  ['layers', 'Projetos e partida de fábricas', 'Do projeto à operação: contratação, treinamento e comissionamento.'],
  ['leaf', 'Pessoas, segurança e inclusão', 'Comitê de segurança do trabalho e meio ambiente e comitês de inclusão e diversidade nas fábricas.'],
];
add({
  url: '/sobre/', title: 'Maycoln Primo: 28 anos em multinacionais | Outro Primo',
  desc: '28 anos de carreira em multinacionais, 19 deles liderando equipes. Conheça a trajetória, a formação e as certificações do consultor por trás da Outro Primo.',
  crumb: [[null, 'Quem é o Maycoln']], schema: [orgSchema, personSchema],
  body: `<section class="pagehead"><div class="wrap two"><div><p class="eyebrow">Quem está do outro lado</p>
<h1>Maycoln Primo</h1>
<p class="lead">28 anos de carreira em multinacionais, 19 deles liderando equipes oficialmente.</p>
<p>Comecei com carteira assinada em 1998, liderava de modo informal desde 2001 e passei à liderança oficial como supervisor em 2007. Vi de perto como as grandes empresas decidem, medem e melhoram.</p>
<p>Minha especialidade é eliminar desperdícios e conduzir projetos de melhoria de eficiência. Criei a Outro Primo para levar essas ferramentas, na medida certa, a pequenas e médias empresas e empreendedores, e a quem quer cuidar melhor do patrimônio. Atuo também em um setor, unidade ou projeto específico de empresas maiores. Sou profissional certificado ANBIMA e tenho formação em melhoria de processos (Green Belt). Atuo de forma independente, com cobrança clara, combinada antes de começar.</p>
<div class="creds"><span class="chip">${ic('award')} Profissional certificado ANBIMA</span><span class="chip">${ic('target')} Green Belt (Lean Six Sigma)</span><span class="chip">${ic('globe')} Inglês avançado</span></div>
<div class="row">${cta('Quero conversar', 'Olá, Maycoln! Vim pelo site e quero conversar.', 'wa')}<a class="btn alt" href="${LINKEDIN}" rel="noopener" target="_blank">${ic('linkedin')}LinkedIn</a></div></div>
<img src="/img/perfil.jpg" alt="Maycoln Primo" width="450" height="600" style="max-width:420px;margin-left:auto" fetchpriority="high"></div></section>
<section class="white-bg"><div class="wrap"><div class="head"><p class="eyebrow">O que levo para o seu negócio</p><h2>Seis frentes em que tenho prática</h2></div>
<div class="grid g3">${TEMAS.map(([i, t, d]) => `<div class="card"><div class="ico">${ic(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>
<section class="alt-bg"><div class="wrap two top"><div><p class="eyebrow">Trajetória</p><h2>De 1998 até hoje</h2><p>Experiência em fábricas de alimentos e agronegócio de multinacionais, sempre perto de resultado, de pessoas e de processo.</p>
${SHOW_SELO ? `<div class="selo">${seloImg()}<p><strong>Profissional certificado ANBIMA.</strong><br>Atuação independente: você paga pela consultoria, não por produto.</p></div>` : ''}</div>
<ol class="timeline">${LINHA.map(([y, t, d]) => `<li><b class="y">${y}</b><strong>${t}</strong><p>${d}</p></li>`).join('')}</ol></div></section>
<section><div class="wrap"><div class="head"><p class="eyebrow">Formação e qualificações</p><h2>O que estudei, e continuo estudando</h2></div>
<div class="grid g3">
<div class="card"><div class="ico">${ic('book')}</div><h3>Formação acadêmica</h3><ul class="ok" style="margin-top:6px"><li>Especialização em Gestão Ambiental, UEPG (2009)</li><li>Tecnologia em Processos de Fabricação Mecânica, UTFPR (2007)</li><li>Técnico em Mecânica Industrial, CEFET-PR (1997)</li></ul></div>
<div class="card"><div class="ico">${ic('pie')}</div><h3>Finanças e investimentos</h3><ul class="ok" style="margin-top:6px"><li>Profissional certificado ANBIMA</li><li>Formação EFinc em consultoria e organização financeira (Instituto Soaper)</li></ul></div>
<div class="card"><div class="ico">${ic('target')}</div><h3>Gestão e melhoria</h3><ul class="ok" style="margin-top:6px"><li>Black Belt Six Sigma</li><li>Green Belt, ferramentas estatísticas (Fundação Vanzolini)</li><li>Lean Leader</li><li>Gestão de alta performance e formação de coaches</li><li>Gerenciamento de projetos (INDG)</li></ul></div></div>
<div class="grid g3" style="margin-top:18px">
<div class="card"><div class="ico">${ic('award')}</div><h3>Reconhecimento nacional</h3><ul class="ok" style="margin-top:6px"><li>1º lugar no Prêmio Nacional de Conservação e Uso Racional de Energia (2005), do Ministério de Minas e Energia e da Eletrobras, com projeto de uso eficiente de energia elétrica de minha autoria</li><li>1º lugar em prêmio nacional pelo uso eficiente de água (2015), com projeto de eficiência da estação de tratamento de água</li></ul></div>
<div class="card"><div class="ico">${ic('globe')}</div><h3>Experiência internacional</h3><p>Benchmarking em sete fábricas de cinco estados dos Estados Unidos e visitas técnicas na Itália e na Alemanha. Inglês avançado.</p></div>
<div class="card"><div class="ico">${ic('shield')}</div><h3>Qualidade e meio ambiente</h3><p>Auditor interno nas normas ISO 14001 e ISO 22000 e coordenador de comitê de segurança do trabalho e meio ambiente.</p></div></div></div></section>
<div class="wrap cta-wrap"><div class="cta-band"><div><h2>Vamos conversar?</h2><p>Conte a sua situação e vemos juntos se faz sentido trabalharmos juntos.</p></div>${cta('Chamar no WhatsApp', 'Olá, Maycoln! Vim pelo site e quero conversar.', 'gold')}</div></div>`,
});

// ── Contato ─────────────────────────────────────────────────────────────────
add({
  url: '/contato/', title: 'Fale com a Outro Primo | Ponta Grossa/PR',
  desc: 'Conte o seu caso e veja se podemos ajudar. Primeira conversa sem compromisso. WhatsApp e e-mail. Ponta Grossa/PR e online.',
  crumb: [[null, 'Conversar']], schema: [orgSchema],
  body: `<section class="pagehead"><div class="wrap"><p class="eyebrow">Contato</p><h1>Vamos conversar</h1>
<p class="lead narrow">Conte em poucas palavras qual é a sua situação. Na primeira conversa vemos se faz sentido trabalharmos juntos.</p></div></section>
<section style="padding-top:20px"><div class="wrap"><div class="grid g3">
<div class="card"><div class="ico">${ic('chat')}</div><h3>WhatsApp</h3><p>O jeito mais rápido de começar.</p>${cta('Chamar no WhatsApp', 'Olá, Maycoln! Vim pelo site e quero conversar.', 'wa')}</div>
<div class="card"><div class="ico">${ic('mail')}</div><h3>E-mail</h3><p>Prefere escrever com calma?</p><a class="btn alt" href="mailto:${EMAIL}?subject=${encodeURIComponent('Contato pelo site da Outro Primo')}">${EMAIL}</a></div>
<div class="card"><div class="ico">${ic('pin')}</div><h3>Onde atendemos</h3><p>Ponta Grossa/PR e online para todo o Brasil.</p><a class="btn alt" href="${LINKEDIN}" rel="noopener" target="_blank">${ic('linkedin')}LinkedIn</a></div></div>
<h2 style="margin-top:44px">Antes de chamar</h2><p class="narrow">Se for empresa, conte o ramo e o que mais incomoda hoje. Se for vida pessoal, conte o que você quer resolver (organizar, aposentar, ter uma segunda opinião). Isso já ajuda muito na primeira conversa.</p></div></section>`,
});

// ── Índice de problemas ─────────────────────────────────────────────────────
add({
  url: '/problemas/', title: 'Problemas e oportunidades: encontre o seu caso | Outro Primo',
  desc: 'Escolha o problema ou oportunidade parecido com o seu e veja como a Outro Primo ajuda, na prática.',
  crumb: [[null, 'Problemas e oportunidades']], schema: [],
  body: `<section class="pagehead"><div class="wrap"><h1>Problemas e oportunidades</h1><p class="lead narrow">Escolha o que mais se parece com a sua situação.</p></div></section>
<section style="padding-top:20px"><div class="wrap"><h2>Para empresas</h2><div class="grid">${PROBLEMAS.filter((p) => p.seg === 'neg').map(problemaCard).join('')}</div>
<h2 style="margin-top:40px">Vida pessoal e patrimônio</h2><div class="grid">${PROBLEMAS.filter((p) => p.seg === 'pf').map(problemaCard).join('')}</div></div></section>`,
});

// ── Páginas de problema ─────────────────────────────────────────────────────
for (const p of PROBLEMAS) {
  const url = `/problemas/${p.slug}/`;
  const outros = PROBLEMAS.filter((o) => o.seg === p.seg && o.slug !== p.slug).slice(0, 3);
  const servico = { '@context': 'https://schema.org', '@type': 'Service', name: p.h1, serviceType: p.curto, description: p.desc, provider: { '@id': SITE_URL + '/#org' }, areaServed: ['Ponta Grossa, PR', 'Brasil'], url: SITE_URL + url };
  add({
    url, title: p.title, desc: p.desc, schema: [orgSchema, servico, faqSchema(p.faq)],
    crumb: [[SEGURL[p.seg], SEGS[p.seg]], [null, p.curto]],
    body: `<section class="pagehead"><div class="wrap narrow"><span class="pill ${p.seg}">${SEGS[p.seg]}</span><h1>${p.h1}</h1><p class="lead">${p.q}</p></div></section>
<section style="padding-top:10px"><div class="wrap narrow">${p.corpo.map((t) => `<p>${t}</p>`).join('')}
<h2 style="font-size:1.4rem;margin-top:28px">Sinais de que isso acontece com você</h2><ul class="ok">${p.sinais.map((t) => `<li>${t}</li>`).join('')}</ul>
<div class="card" style="margin:24px 0"><h2 style="font-size:1.4rem">O que você recebe</h2><ul class="ok" style="margin:0">${p.entrega.map((t) => `<li>${t}</li>`).join('')}</ul></div>
<div class="row">${cta('Quero conversar sobre isso', `Olá, Maycoln! Vim pelo site e me identifiquei com: ${p.q}`, 'wa')}<a class="btn alt" href="${SEGURL[p.seg]}">${p.seg === 'neg' ? 'Ver tudo para empresas' : 'Ver tudo de vida pessoal e patrimônio'}</a></div>
<h2 style="font-size:1.4rem;margin:36px 0 12px">Perguntas frequentes</h2>${p.faq.map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('')}</div></section>
<section class="alt-bg"><div class="wrap"><h2>Outros problemas e oportunidades</h2><div class="grid">${outros.map(problemaCard).join('')}</div></div></section>`,
  });
}

// ── Escrita ─────────────────────────────────────────────────────────────────
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
const PULAR = new Set(['1-Logo.png', 'green belt logo.png', 'Selo-ANBIMA-CEA-colorido.jpg', 'logo.png']); // arquivos antigos/pesados: não vão para o site
fs.cpSync(path.join(ROOT, 'public'), DIST, { recursive: true, filter: (src) => !PULAR.has(path.basename(src)) });
fs.writeFileSync(path.join(DIST, 'style.css'), CSS.trim());
for (const p of pages) {
  const dir = path.join(DIST, p.url);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), layout(p));
}
const prio = (u) => (u === '/' ? '1.0' : ['/negocios/', '/investimentos/'].includes(u) ? '0.9' : u.startsWith('/problemas/') && u !== '/problemas/' ? '0.7' : '0.8');
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `<url><loc>${SITE_URL}${p.url}</loc><lastmod>${HOJE}</lastmod><priority>${prio(p.url)}</priority></url>`).join('\n')}\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.writeFileSync(path.join(DIST, '404.html'), layout({ url: '/404.html', title: 'Página não encontrada | Outro Primo', desc: 'Página não encontrada.', noindex: true, body: '<section class="pagehead"><div class="wrap"><h1>Página não encontrada</h1><p class="lead">O endereço pode ter mudado. Volte ao início ou fale com a gente.</p><div class="row"><a class="btn" href="/">Voltar ao início</a></div></div></section>' }));

// ── Conferência automática (avisos no terminal) ─────────────────────────────
let avisos = 0;
for (const p of pages) {
  if (p.title.length > 62) { console.warn(`AVISO: título longo (${p.title.length}) em ${p.url}`); avisos++; }
  if (p.desc.length > 165) { console.warn(`AVISO: descrição longa (${p.desc.length}) em ${p.url}`); avisos++; }
}
console.log(`OK: ${pages.length} páginas em dist/ (SITE_URL=${SITE_URL}) · avisos: ${avisos}`);
