import React, { useState, useEffect } from 'react';
import { 
  Shield, TrendingUp, CheckCircle, ArrowRight, MessageCircle, 
  AlertTriangle, UserCheck, Lock, ChevronDown, Users, Factory, 
  HeartHandshake, Scale, Zap, Landmark, Globe, Clock, Settings,
  HelpCircle, PieChart
} from 'lucide-react';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = "https://wa.me/5546991164045?text=Olá%20Maycoln,%20vi%20seu%20site%20e%20gostaria%20de%20agendar%20um%20diagnóstico%20gratuito";

  const challenges = [
    {
      id: 1,
      tag: "INVESTIMENTOS",
      problem: "Onde investir com segurança e rentabilidade real?",
      previewQuestions: [
        "Sabe a função técnica de cada ativo na sua carteira hoje?",
        "O seu gerente bate a meta dele ou protege a sua?",
        "Sua carteira resistiria a uma crise global hoje?"
      ],
      extraQuestions: [
        "Como saber se um investimento é bom para o meu objetivo ou apenas para a corretora?",
        "Como dolarizar patrimônio com eficiência tributária e foco sucessório?",
        "Minha rentabilidade líquida é real ou estou apenas empatando com a inflação?"
      ],
      solution: "Planejamento de Investimentos Independente",
      benefit: "Consultoria estratégica e sem influências bancárias. Sem conflito de interesses. Foco 100% na sua rentabilidade líquida e proteção do legado.",
      icon: <TrendingUp className="text-emerald-500" />
    },
    {
      id: 2,
      tag: "ORGANIZAÇÃO FINANCEIRA",
      problem: "Como organizar as contas e finalmente fazer sobrar?",
      previewQuestions: [
        "Por que o dinheiro 'evapora' mesmo você ganhando bem?",
        "Como ter controle real sem precisar de planilhas infinitas?",
        "Suas compras geram paz mental ou insegurança futura?"
      ],
      extraQuestions: [
        "Onde estão os ralos de dinheiro que você não percebe no dia a dia?",
        "Como construir reserva sem cortar o que lhe dá prazer hoje?",
        "Como planejar grandes sonhos com previsibilidade total e técnica?"
      ],
      solution: "Estruturação e Gestão de Estilo de Vida",
      benefit: "Implementação de rotinas industriais no financeiro pessoal para gerar previsibilidade e paz mental para a família.",
      icon: <Users className="text-blue-500" />
    },
    {
      id: 3,
      tag: "NEGÓCIOS & EMPRESAS",
      problem: "Como ter lucro real e tempo para gerir meu negócio?",
      previewQuestions: [
        "Você tem um negócio ou é escravo de si mesmo por falta de processos?",
        "Seus processos e pessoas liberam seu tempo para liderar estrategicamente?",
        "Sua precificação é baseada em dados reais ou no 'achismo' do mercado?"
      ],
      extraQuestions: [
        "Por que o faturamento sobe, mas o lucro não aparece no caixa?",
        "Como organizar ferramentas para a empresa rodar sem você presente 24h?",
        "Como separar o dinheiro da família do caixa da empresa de forma profissional?"
      ],
      solution: "Estratégia Financeira Empresarial",
      benefit: "Metodologia Lean para organizar processos, pessoas e ferramentas, eliminando desperdícios e maximizando o lucro.",
      icon: <Factory className="text-yellow-600" />
    },
    {
      id: 4,
      tag: "RECUPERAÇÃO E DÍVIDAS",
      problem: "Como sair do endividamento com estratégia e dignidade?",
      previewQuestions: [
        "Qual o risco patrimonial real da sua dívida atual?",
        "Sabe negociar com bancos sem ser intimidado por cobranças?",
        "Existe um 'plano de guerra' técnico para retomar sua paz?"
      ],
      extraQuestions: [
        "Como escolher qual dívida atacar primeiro para estancar os juros?",
        "Como reorganizar o padrão de vida para pagar o passado e viver o hoje?",
        "Como reconstruir sua dignidade financeira sem cair em promessas mágicas?"
      ],
      solution: "Plano de Recuperação Estratégica",
      benefit: "Acolhimento técnico e humanizado. Priorização de risco e renegociação baseada em dados reais.",
      icon: <HeartHandshake className="text-red-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center min-w-[150px]">
            {/* CORREÇÃO APLICADA AQUI: 1-Logo.png */}
            <img src="/1-Logo.png" alt="Logo Outro Primo" className={`transition-all duration-300 object-contain ${scrolled ? 'h-10' : 'h-24 md:h-28'}`} />
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-emerald-800 transition-all shadow-lg">
            <MessageCircle size={16} /> Agende um diagnóstico gratuito
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 -skew-x-12 transform translate-x-20 hidden lg:block"></div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-200">
              <Lock size={12} /> Sem Conflito de Interesses
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.15] mb-6 italic">
              A clareza técnica que o seu <span className="text-emerald-700 underline decoration-emerald-500/20">gerente não tem liberdade</span> para entregar.
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-slate-700 mb-6 uppercase tracking-tight">Planejador Financeiro Independente</h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-xl">Utilizo a experiência de 25 anos em cargos de gestão em multinacionais e conhecimento técnico e estatístico para blindar seu patrimônio e organizar seus negócios.</p>
            
            {/* Selos de Autoridade */}
            <div className="flex flex-wrap gap-8 items-center mt-10 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
               <div className="flex flex-col gap-3 min-w-[140px]">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Especialista em Investimentos</span>
                 <img src="/Selo-ANBIMA-CEA-colorido.jpg" alt="CEA" className="h-14 md:h-16 object-contain block" />
               </div>
               <div className="w-px h-12 bg-slate-200 hidden sm:block"></div>
               <div className="flex flex-col gap-3 min-w-[140px]">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Gestor de Projetos Melhoria Contínua</span>
                 <img src="/green belt logo.png" alt="Green Belt" className="h-14 md:h-16 object-contain block" />
               </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200 shadow-2xl relative z-10">
               <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 rounded-3xl flex items-center justify-center shadow-inner overflow-hidden text-yellow-500"><UserCheck size={40} /></div>
                  <div className="text-left">
                    <h3 className="font-black text-xl md:text-2xl text-slate-900 leading-tight">Maycoln Primo</h3>
                    <p className="text-emerald-700 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none">Seu Parceiro Estratégico</p>
                  </div>
               </div>
               <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed text-left italic">
                 <p>"Acredito que o dinheiro deve ser um instrumento de liberdade, não de ansiedade. Minha missão é caminhar ao seu lado, trazendo método para garantir que cada decisão seja baseada em fatos."</p>
               </div>
               <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
                  <div><p className="text-xl md:text-2xl font-black text-slate-900 leading-none">25+</p><p className="text-[9px] text-slate-400 uppercase font-bold mt-2">Anos de Gestão</p></div>
                  <div className="border-l border-slate-100 pl-4"><p className="text-xl md:text-2xl font-black text-slate-900 leading-none tracking-tight">Lean Leader</p><p className="text-[9px] text-slate-400 uppercase font-bold mt-2">Eliminação de desperdícios e produção enxuta</p></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section - Interactive */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 text-navy">
            <span className="text-emerald-600 font-extrabold text-xs uppercase tracking-widest mb-3 block italic underline decoration-emerald-200 underline-offset-4">Diagnóstico Profissional Gratuito</span>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Onde está o seu desafio hoje?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {challenges.map((c) => (
              <div key={c.id} onClick={() => setSelectedChallenge(c.id === selectedChallenge ? null : c.id)} className={`group relative text-left p-10 rounded-[3rem] border transition-all duration-500 cursor-pointer ${selectedChallenge === c.id ? 'bg-slate-900 border-slate-900 shadow-2xl scale-[1.02]' : 'bg-slate-50 border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-xl'}`}>
                <div className={`absolute top-6 right-6 transition-all duration-300 ${selectedChallenge === c.id ? 'rotate-180' : ''}`}><ChevronDown className={selectedChallenge === c.id ? 'text-emerald-400' : 'text-slate-300'} /></div>
                <div className="flex items-center gap-4 mb-8">
                   <div className={`p-3 rounded-2xl transition-colors ${selectedChallenge === c.id ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border border-slate-100 shadow-sm'}`}>{c.icon}</div>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${selectedChallenge === c.id ? 'text-emerald-400' : 'text-slate-400'}`}>{c.tag}</span>
                </div>
                <h3 className={`text-2xl md:text-3xl font-black leading-tight mb-8 ${selectedChallenge === c.id ? 'text-white' : 'text-slate-900'}`}>"{c.problem}"</h3>
                <div className="space-y-5 mb-4">
                  {c.previewQuestions.map((q, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${selectedChallenge === c.id ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-slate-900 border-slate-800'}`}><HelpCircle size={14} className={selectedChallenge === c.id ? 'text-emerald-400' : 'text-white'} /></div>
                      <p className={`text-base leading-relaxed font-medium italic ${selectedChallenge === c.id ? 'text-slate-300' : 'text-slate-600'}`}>{q}</p>
                    </div>
                  ))}
                </div>
                {selectedChallenge === c.id && (
                  <div className="mt-10 pt-10 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                      <h4 className="text-white font-bold text-lg mb-4">{c.solution}</h4>
                      <p className="text-sm text-slate-400 mb-8 leading-relaxed">{c.benefit}</p>
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-4 bg-emerald-600 text-white py-5 rounded-2xl font-black text-base hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-900/40">Agende um diagnóstico gratuito <MessageCircle size={20} /></a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section - The "Why" */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center text-left">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight italic">No sistema tradicional, o <span className="text-emerald-500 underline decoration-emerald-500/30">lucro deles é a sua dúvida.</span></h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">Minha consultoria foi desenhada para que eu esteja do seu lado da mesa. Sem metas de bancos, sem pressões de corretoras.</p>
            <div className="space-y-6">
               <div className="flex items-center gap-5 p-6 bg-white/5 rounded-3xl border border-white/10 group hover:border-emerald-500/50 transition-colors">
                 <Landmark size={28} className="text-red-400 shrink-0" />
                 <div><p className="font-bold text-lg text-white">Institucional:</p><p className="text-sm text-white/50 italic leading-relaxed">Precisa bater metas de venda de produtos da própria casa.</p></div>
               </div>
               <div className="flex items-center gap-5 p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 group hover:border-emerald-500 transition-colors">
                 <Scale size={28} className="text-emerald-400 shrink-0" />
                 <div><p className="font-bold text-lg text-emerald-400">Planejamento Independente:</p><p className="text-sm text-white/60 italic leading-relaxed">Total transparência e foco técnico no seu legado financeiro.</p></div>
               </div>
            </div>
          </div>
          
          {/* GCPM Method Block */}
          <div className="bg-white p-12 rounded-[4rem] text-slate-900 shadow-2xl relative border-4 border-emerald-500/10">
             <h4 className="font-black text-3xl mb-12 flex items-center gap-4 italic"><PieChart className="text-emerald-700 w-10 h-10" /> Método GCPM</h4>
             <div className="space-y-10">
                <div className="flex gap-6"><div className="w-12 h-12 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg shadow-sm">G</div><div><p className="font-bold text-xl mb-1">Gerar</p><p className="text-sm text-slate-500 italic">Eficiência técnica na geração de caixa e renda.</p></div></div>
                <div className="flex gap-6"><div className="w-12 h-12 shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg shadow-sm">C</div><div><p className="font-bold text-xl mb-1">Cuidar</p><p className="text-sm text-slate-500 italic">Gestão de estilo de vida e eliminação de desperdícios.</p></div></div>
                <div className="flex gap-6"><div className="w-12 h-12 shrink-0 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-sm">P</div><div><p className="font-bold text-xl mb-1">Proteger</p><p className="text-sm text-slate-500 italic">Blindagem patrimonial e sucessão inteligente.</p></div></div>
                <div className="flex gap-6"><div className="w-12 h-12 shrink-0 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-black text-lg shadow-sm">M</div><div><p className="font-bold text-xl mb-1">Multiplicar</p><p className="text-sm text-slate-500 italic">Investimentos estratégicos baseados em estatística.</p></div></div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-100 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <Zap size={48} className="mx-auto text-yellow-500 mb-8 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight italic">Dê o próximo passo com o <br/><span className="text-emerald-700">rigor técnico que o seu dinheiro exige.</span></h2>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-5 bg-slate-900 text-white px-8 md:px-14 py-6 rounded-[2.5rem] font-black text-xl md:text-2xl hover:bg-emerald-800 transition-all shadow-2xl">Agende um diagnóstico gratuito <ArrowRight size={24} /></a>
          <div className="mt-16 flex justify-center items-center gap-12 opacity-30 grayscale grayscale">
             <div className="flex flex-col items-center gap-2"><Globe size={28} /><span className="text-[10px] font-black uppercase tracking-widest leading-none">Offshore</span></div>
             <div className="flex flex-col items-center gap-2"><Shield size={28} /><span className="text-[10px] font-black uppercase tracking-widest leading-none">Blindado</span></div>
             <div className="flex flex-col items-center gap-2"><Clock size={28} /><span className="text-[10px] font-black uppercase tracking-widest leading-none">Legado</span></div>
          </div>
          <div className="mt-20 pt-12 border-t border-slate-100 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-emerald-700" /><span className="font-black text-xs uppercase tracking-tighter italic text-slate-400">Outro Primo Investimentos</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;