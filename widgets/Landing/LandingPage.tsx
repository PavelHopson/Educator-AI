import React from 'react';
import { Button } from '../../shared/ui/Button';
import { Logo, IllustrationHero, IllustrationFeatures } from '../../shared/ui/Branding';
import { Language } from '../../shared/lib/game/types';

interface LandingPageProps {
  onStart: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const TRANSLATIONS = {
  en: {
    nav: { features: 'Features', pricing: 'Pricing', login: 'Login', start: 'Start Building' },
    hero: {
      badge: 'Powered by Gemini 3 Pro',
      titleStart: 'Turn any manual into an',
      titleEnd: 'escape room',
      subtitle: 'Transform boring PDFs, HR docs, and textbooks into interactive gamified experiences in 60 seconds. No coding required.',
      ctaPrimary: 'Start Questifying',
      ctaSecondary: 'View Demo',
      trust: 'Trusted by 100+ L&D Managers'
    },
    features: {
      label: 'Capabilities',
      title: 'Gamification that writes itself',
      subtitle: 'Our AI engine handles the mechanics, you focus on the learning outcomes.',
      cards: [
        { title: 'Instant Conversion', desc: 'Upload a PDF and get a playable link in under 60 seconds.' },
        { title: 'Story Engine', desc: 'Gemini 3 Pro weaves facts into a compelling narrative context.' },
        { title: 'LMS Ready', desc: 'Export as SCORM or embed directly into your existing dashboard.' }
      ]
    },
    pricing: {
      label: 'Pricing',
      title: 'Simple Pricing',
      subtitle: 'Start for free, upgrade for power.',
      free: { name: 'Starter', cta: 'Get Started' },
      pro: { name: 'Pro', cta: 'Upgrade to Pro' },
      ent: { name: 'Enterprise', cta: 'Contact Sales', price: 'Custom' }
    },
    footer: {
      rights: '2025 Questify Inc. All rights reserved.'
    }
  },
  ru: {
    nav: { features: 'Возможности', pricing: 'Тарифы', login: 'Войти', start: 'Создать Квест' },
    hero: {
      badge: 'На базе Gemini 3 Pro',
      titleStart: 'Преврати инструкции в',
      titleEnd: 'эскейп-рум',
      subtitle: 'Трансформируй скучные PDF, HR-мануалы и учебники в интерактивные игры за 60 секунд. Без программирования.',
      ctaPrimary: 'Начать Бесплатно',
      ctaSecondary: 'Демо',
      trust: 'Выбор 100+ L&D менеджеров'
    },
    features: {
      label: 'Возможности',
      title: 'Геймификация на автопилоте',
      subtitle: 'Наш ИИ берет на себя механики, вы фокусируетесь на обучении.',
      cards: [
        { title: 'Мгновенная конвертация', desc: 'Загрузи текст и получи готовую игру менее чем за 60 секунд.' },
        { title: 'Сюжетный движок', desc: 'Gemini 3 Pro вплетает сухие факты в захватывающий нарратив.' },
        { title: 'LMS интеграция', desc: 'Экспорт в SCORM или встраивание в ваш корпоративный портал.' }
      ]
    },
    pricing: {
      label: 'Тарифы',
      title: 'Простые тарифы',
      subtitle: 'Начните бесплатно, платите за масштаб.',
      free: { name: 'Старт', cta: 'Начать' },
      pro: { name: 'Профи', cta: 'Купить Pro' },
      ent: { name: 'Бизнес', cta: 'Отдел продаж', price: 'Индив.' }
    },
    footer: {
      rights: '2025 Questify Inc. Все права защищены.'
    }
  }
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, language, setLanguage }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="grain min-h-screen bg-quest-950 text-white font-sans selection:bg-quest-500/25 selection:text-white overflow-x-hidden cyber-grid">

      {/* Nav */}
      <nav className="fixed w-full z-50 glass-panel border-b border-quest-700/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <span className="font-display font-bold text-2xl tracking-tight text-glow-blue">Questify</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400 items-center">
            <a href="#features" className="hover:text-quest-300 transition-colors tracking-wide">{t.nav.features}</a>
            <a href="#pricing" className="hover:text-quest-300 transition-colors tracking-wide">{t.nav.pricing}</a>

            {/* Language Switcher */}
            <div className="flex bg-quest-950/80 rounded-lg p-1 border border-quest-700/30 ml-4">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wider transition-all ${language === 'en' ? 'bg-quest-500/20 text-quest-300' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 rounded-md text-[10px] font-bold tracking-wider transition-all ${language === 'ru' ? 'bg-quest-500/20 text-quest-300' : 'text-slate-500 hover:text-slate-300'}`}
              >
                RU
              </button>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button className="hidden md:block text-sm font-medium text-slate-400 hover:text-quest-300 transition-colors tracking-wide">{t.nav.login}</button>
            <Button variant="primary" onClick={onStart} className="px-6 py-2 text-sm">
              {t.nav.start}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-quest-500/10 rounded-full blur-[150px] -z-10" />
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-quest-500/5 border border-quest-500/15 text-quest-300 text-[10px] font-mono mb-6 uppercase tracking-[0.2em]">
              <span className="relative w-2 h-2 rounded-full bg-quest-400 animate-pulse pulse-ring"></span>
              {t.hero.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 text-glow-blue">
              {t.hero.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-quest-300 via-quest-400 to-amber-400">{t.hero.titleEnd}</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 tracking-wide">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={onStart} className="text-lg px-8 py-4">
                {t.hero.ctaPrimary}
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4">
                {t.hero.ctaSecondary}
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-quest-800 border-2 border-quest-950 flex items-center justify-center text-xs">👤</div>
                ))}
              </div>
              <p className="tracking-wide">{t.hero.trust}</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-quest-500/5 to-amber-500/5 rounded-3xl transform rotate-3 scale-95 opacity-50 blur-md" />
            <div className="relative quest-card rounded-2xl p-6 shadow-2xl overflow-hidden group">
               <IllustrationHero className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-quest-700/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-quest-300 uppercase tracking-[0.2em] mb-4 block">{t.features.label}</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-glow-blue">{t.features.title}</h2>
            <p className="text-slate-400 tracking-wide">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.features.cards.map((f, i) => (
              <div key={i} className="quest-card p-8 rounded-2xl hover:bg-quest-800/10 transition-all duration-300 group">
                <div className="w-12 h-12 bg-quest-500/5 border border-quest-500/10 rounded-lg flex items-center justify-center mb-6 text-quest-400 group-hover:scale-110 group-hover:border-quest-500/25 transition-all">
                   <IllustrationFeatures type={['speed', 'game', 'export'][i] as any} />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-wide">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 relative overflow-hidden border-t border-quest-700/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-quest-500/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-quest-300 uppercase tracking-[0.2em] mb-4 block">{t.pricing.label}</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4 text-glow-blue">{t.pricing.title}</h2>
            <p className="text-slate-400 tracking-wide">{t.pricing.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="quest-card gradient-border-hover p-8 rounded-2xl">
              <h3 className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">{t.pricing.free.name}</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-slate-600 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-quest-300">&#10003;</span> 3 Quests per month</li>
                <li className="flex items-center gap-2"><span className="text-quest-300">&#10003;</span> Basic Analytics</li>
                <li className="flex items-center gap-2"><span className="text-quest-300">&#10003;</span> Community Support</li>
              </ul>
              <Button variant="secondary" className="w-full" onClick={onStart}>{t.pricing.free.cta}</Button>
            </div>

            {/* Pro */}
            <div className="quest-card p-8 rounded-2xl border-quest-500/30 relative transform scale-105 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-quest-400 to-quest-500 text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase shadow-lg shadow-quest-500/30">POPULAR</div>
              <h3 className="text-[10px] font-bold text-quest-300 mb-2 uppercase tracking-[0.2em]">{t.pricing.pro.name}</h3>
              <div className="text-4xl font-bold mb-6 text-glow-blue">$15<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-slate-200">
                <li className="flex items-center gap-2"><span className="text-amber-400">&#10003;</span> Unlimited Quests</li>
                <li className="flex items-center gap-2"><span className="text-amber-400">&#10003;</span> White-labeling</li>
                <li className="flex items-center gap-2"><span className="text-amber-400">&#10003;</span> Export to Video/SCORM</li>
                <li className="flex items-center gap-2"><span className="text-amber-400">&#10003;</span> Priority Support</li>
              </ul>
              <Button variant="primary" className="w-full" onClick={onStart}>{t.pricing.pro.cta}</Button>
            </div>

            {/* Enterprise */}
             <div className="quest-card gradient-border-hover p-8 rounded-2xl">
              <h3 className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">{t.pricing.ent.name}</h3>
              <div className="text-4xl font-bold mb-6">{t.pricing.ent.price}</div>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2"><span className="text-quest-300">&#10003;</span> SSO Integration</li>
                <li className="flex items-center gap-2"><span className="text-quest-300">&#10003;</span> Custom Domain</li>
                <li className="flex items-center gap-2"><span className="text-quest-300">&#10003;</span> Dedicated Success Manager</li>
              </ul>
              <Button variant="outline" className="w-full">{t.pricing.ent.cta}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-quest-700/10 bg-quest-950 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <Logo size={24} />
              <span className="font-bold text-lg tracking-tight">Questify</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold mb-4 uppercase tracking-[0.2em] text-slate-300">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-quest-300 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-quest-300 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-quest-300 transition-colors">Showcase</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold mb-4 uppercase tracking-[0.2em] text-slate-300">Company</h4>
             <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-quest-300 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-quest-300 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-quest-300 transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
             <h4 className="text-[10px] font-bold mb-4 uppercase tracking-[0.2em] text-slate-300">Legal</h4>
             <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-quest-300 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-quest-300 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-[10px] text-slate-600 pt-8 border-t border-quest-700/10 tracking-[0.15em] uppercase">
          {t.footer.rights}
        </div>
      </footer>
    </div>
  );
};
