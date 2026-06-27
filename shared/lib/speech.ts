// Голос через Web Speech API (без зависимостей): озвучка (TTS) и распознавание
// (STT). Типов SpeechRecognition в стандартном lib нет — используем any-касты.

/// Имя языка (как ввёл пользователь) → BCP-47 для голоса/распознавания.
export function toBcp47(name: string): string {
  const n = name.toLowerCase();
  if (/англ|english/.test(n)) return 'en-US';
  if (/япон|japan|日本/.test(n)) return 'ja-JP';
  if (/испан|spanish|español/.test(n)) return 'es-ES';
  if (/франц|french|français/.test(n)) return 'fr-FR';
  if (/немец|german|deutsch/.test(n)) return 'de-DE';
  if (/итал|italian|italiano/.test(n)) return 'it-IT';
  if (/кита|chinese|中文/.test(n)) return 'zh-CN';
  if (/коре|korean|한국/.test(n)) return 'ko-KR';
  if (/португал|portuguese|português/.test(n)) return 'pt-PT';
  if (/рус|russian/.test(n)) return 'ru-RU';
  return 'en-US';
}

export function ttsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string, lang: string): void {
  if (!ttsSupported()) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export function sttSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}

/// Одноразовое распознавание речи. onResult получает распознанный текст.
/// Возвращает функцию остановки.
export function listenOnce(lang: string, onResult: (text: string) => void, onEnd: () => void): () => void {
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) { onEnd(); return () => {}; }
  const rec = new SR();
  rec.lang = lang;
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = (e: any) => {
    const text = e.results?.[0]?.[0]?.transcript ?? '';
    if (text) onResult(text);
  };
  rec.onerror = () => onEnd();
  rec.onend = () => onEnd();
  try { rec.start(); } catch { onEnd(); }
  return () => { try { rec.stop(); } catch { /* noop */ } };
}
