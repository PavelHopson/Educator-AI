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
      ctaPrimary: 'Start Questifying →',
      ctaSecondary: 'View Demo',
      trust: 'Trusted by 100+ L&D Managers'
    },
    features: {
      title: 'Gamification that writes itself',
      subtitle: 'Our AI engine handles the mechanics, you focus on the learning outcomes.',
      cards: [
        { title: 'Instant Conversion', desc: 'Upload a PDF and get a playable link in under 60 seconds.' },
        { title: 'Story Engine', desc: 'Gemini 3 Pro weaves facts into a compelling narrative context.' },
        { title: 'LMS Ready', desc: 'Export as SCORM or embed directly into your existing dashboard.' }
      ]
    },
    pricing: {
      title: 'Simple Pricing',
      subtitle: 'Start for free, upgrade for power.',
      free: { name: 'Starter', cta: 'Get Started' },
      pro: { name: 'Pro', cta: 'Upgrade to Pro' },
      ent: { name: 'Enterprise', cta: 'Contact Sales', price: 'Custom' }
    },
    footer: {
      rights: '© 2025 Questify Inc. All rights reserved. Made with ❤️ and Gemini 3 Pro.'
    }
  },
  ru: {
    nav: { features: 'Возможности', pricing: 'Тарифы', login: 'Войти', start: 'Создать Квест' },
    hero: {
      badge: 'На базе Gemini 3 Pro',
      titleStart: 'Преврати инструкции в',
      titleEnd: 'эскейп-рум',
      subtitle: 'Трансформируй скучные PDF, HR-мануалы и учебники в интерактивные игры за 60 секунд. Без программирования.',
      ctaPrimary: 'Начать Бесплатно →',
      ctaSecondary: 'Демо',
      trust: 'Выбор 100+ L&D менеджеров'
    },
    features: {
      title: 'Геймификация на автопилоте',
      subtitle: 'Наш ИИ берет на себя механики, вы фокусируетесь на обучении.',
      cards: [
        { title: 'Мгновенная конвертация', desc: 'Загрузи текст и получи готовую игру менее чем за 60 секунд.' },
        { title: 'Сюжетный движок', desc: 'Gemini 3 Pro вплетает сухие факты в захватывающий нарратив.' },
        { title: 'LMS интеграция', desc: 'Экспорт в SCORM или встраивание в ваш корпоративный портал.' }
      ]
    },
    pricing: {
      title: 'Простые тарифы',
      subtitle: 'Начните бесплатно, платите за масштаб.',
      free: { name: 'Старт', cta: 'Начать' },
      pro: { name: 'Профи', cta: 'Купить Pro' },
      ent: { name: 'Бизнес', cta: 'Отдел продаж', price: 'Индив.' }
    },
    footer: {
      rights: '© 2025 Questify Inc. Все права защищены. Сделано с ❤️ и Gemini 3 Pro.'
    }
  }
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, language, setLanguage }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-quest-900 text-white font-sans selection:bg-quest-500 selection:text-white overflow-x-hidden">
      
      {/* Nav */}
      <nav className="fixed w-full z-50 glass-panel border-b-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <span className="font-display font-bold text-2xl tracking-tight">Questify</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300 items-center">
            <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a>
            
            {/* Language Switcher */}
            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700 ml-4">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === 'en' ? 'bg-quest-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === 'ru' ? 'bg-quest-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                RU
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="hidden md:block text-sm font-semibold text-slate-300 hover:text-white">{t.nav.login}</button>
            <Button variant="primary" onClick={onStart} className="px-6 py-2 text-sm">
              {t.nav.start}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-quest-500/20 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-quest-500/10 border border-quest-500/20 text-quest-300 text-xs font-mono mb-6 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-quest-400 animate-pulse"></span>
              {t.hero.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
              {t.hero.titleStart} <span className="text-transparent bg-clip-text bg-gradient-to-r from-quest-400 to-pink-400 text-glow">{t.hero.titleEnd}</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={onStart} className="text-lg px-8 py-4 shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)]">
                {t.hero.ctaPrimary}
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4 border-slate-700 text-slate-300 hover:bg-slate-800">
                {t.hero.ctaSecondary}
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-quest-900 flex items-center justify-center text-xs">👤</div>
                ))}
              </div>
              <p>{t.hero.trust}</p>
            </div>
          </div>
          
          <div className="relative mx-auto w-full max-w-lg lg:max-w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-quest-500/10 to-transparent rounded-3xl transform rotate-3 scale-95 opacity-50 blur-md" />
            <div className="relative glass-panel rounded-2xl p-6 shadow-2xl overflow-hidden group">
               <IllustrationHero className="w-full h-auto drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-quest-950/50 border-t border-quest-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">{t.features.title}</h2>
            <p className="text-slate-400">{t.features.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.features.cards.map((f, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl hover:bg-quest-800/20 transition-all duration-300 group">
                <div className="w-12 h-12 bg-quest-500/10 rounded-lg flex items-center justify-center mb-6 text-quest-400 group-hover:scale-110 transition-transform">
                   <IllustrationFeatures type={['speed', 'game', 'export'][i] as any} />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-quest-600/10 rounded-full blur-[100px] -z-10" />
        
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">{t.pricing.title}</h2>
            <p className="text-slate-400">{t.pricing.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="p-8 rounded-2xl border border-slate-800 bg-quest-950">
              <h3 className="text-lg font-medium text-slate-400 mb-2">{t.pricing.free.name}</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-slate-600 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2">✓ 3 Quests per month</li>
                <li className="flex items-center gap-2">✓ Basic Analytics</li>
                <li className="flex items-center gap-2">✓ Community Support</li>
              </ul>
              <Button variant="secondary" className="w-full" onClick={onStart}>{t.pricing.free.cta}</Button>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl border border-quest-500 bg-quest-900/50 relative transform scale-105 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-quest-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">POPULAR</div>
              <h3 className="text-lg font-medium text-quest-300 mb-2">{t.pricing.pro.name}</h3>
              <div className="text-4xl font-bold mb-6">$15<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-sm text-slate-200">
                <li className="flex items-center gap-2 text-white">✓ Unlimited Quests</li>
                <li className="flex items-center gap-2 text-white">✓ White-labeling</li>
                <li className="flex items-center gap-2 text-white">✓ Export to Video/SCORM</li>
                <li className="flex items-center gap-2 text-white">✓ Priority Support</li>
              </ul>
              <Button variant="primary" className="w-full" onClick={onStart}>{t.pricing.pro.cta}</Button>
            </div>

            {/* Enterprise */}
             <div className="p-8 rounded-2xl border border-slate-800 bg-quest-950">
              <h3 className="text-lg font-medium text-slate-400 mb-2">{t.pricing.ent.name}</h3>
              <div className="text-4xl font-bold mb-6">{t.pricing.ent.price}</div>
              <ul className="space-y-4 mb-8 text-sm text-slate-300">
                <li className="flex items-center gap-2">✓ SSO Integration</li>
                <li className="flex items-center gap-2">✓ Custom Domain</li>
                <li className="flex items-center gap-2">✓ Dedicated Success Manager</li>
              </ul>
              <Button variant="outline" className="w-full border-slate-700 text-slate-400">{t.pricing.ent.cta}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-quest-950 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <Logo size={24} />
              <span className="font-bold text-lg">Questify</span>
            </div>
            <p className="text-xs text-slate-500">
              {t.hero.subtitle}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-quest-400">Features</a></li>
              <li><a href="#" className="hover:text-quest-400">Pricing</a></li>
              <li><a href="#" className="hover:text-quest-400">Showcase</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
             <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-quest-400">About</a></li>
              <li><a href="#" className="hover:text-quest-400">Blog</a></li>
              <li><a href="#" className="hover:text-quest-400">Careers</a></li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold mb-4">Legal</h4>
             <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-quest-400">Privacy</a></li>
              <li><a href="#" className="hover:text-quest-400">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs text-slate-600 pt-8 border-t border-slate-900">
          {t.footer.rights}
        </div>
      </footer>
    </div>
  );
};