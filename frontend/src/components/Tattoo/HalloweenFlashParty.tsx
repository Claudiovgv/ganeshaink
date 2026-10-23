'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { BatFlash, GhostFlash, PumpkinFlash } from './HalloweenFlashes';
import { FLASH_DIALOG, FLASH_OVERLAY, FlashSheetDialog, FlashSheetView } from './HalloweenFlashSheet';
import {
  FLASH_PRICES,
  OWN_FLASH_ID,
  SHEET_FLASHES,
  type FlashQuantity,
} from '@/lib/halloweenFlashes';

const CLICK_KEY = 'halloween-flash-click';
const RSVP_KEY = 'halloween-flash-rsvp';

function campaignBase() {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3002/v1';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/v1';
}

async function postCampaign(path: string, body?: Record<string, string>) {
  const res = await fetch(`${campaignBase()}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(data.error || res.statusText);
  }
}

const FLOATERS = [
  { Drawing: GhostFlash, className: 'left-[4%] top-[12%] w-16 md:w-20 text-white/80', motion: 'flash-float' },
  { Drawing: BatFlash, className: 'right-[6%] top-[10%] w-20 md:w-24 text-white/80', motion: 'flash-float-alt' },
  { Drawing: PumpkinFlash, className: 'flash-float-orange left-[48%] top-[4%] w-16 md:w-20 text-[#FF5C00]', motion: 'flash-float-slow' },
  { Drawing: GhostFlash, className: 'left-[18%] bottom-[14%] w-14 md:w-16 text-white/80', motion: 'flash-float-slow' },
  { Drawing: BatFlash, className: 'right-[16%] bottom-[18%] w-16 md:w-20 text-white/80', motion: 'flash-float' },
  { Drawing: PumpkinFlash, className: 'flash-float-orange right-[3%] top-[36%] w-[4.5rem] md:w-20 text-[#FF5C00]', motion: 'flash-float-alt' },
  { Drawing: GhostFlash, className: 'right-[28%] top-[22%] w-12 md:w-14 text-white/80', motion: 'flash-float-alt' },
  { Drawing: BatFlash, className: 'left-[30%] top-[8%] w-14 md:w-16 text-white/80', motion: 'flash-float-slow' },
  { Drawing: PumpkinFlash, className: 'flash-float-orange left-[2%] bottom-[6%] w-16 md:w-[4.5rem] text-[#FF5C00]', motion: 'flash-float' },
  { Drawing: GhostFlash, className: 'left-[8%] top-[48%] w-12 md:w-[4.5rem] text-white/80', motion: 'flash-float' },
  { Drawing: BatFlash, className: 'right-[8%] top-[52%] w-14 md:w-20 text-white/80', motion: 'flash-float-alt' },
];

function hasStoredRsvp() {
  try {
    return typeof window !== 'undefined' && sessionStorage.getItem(RSVP_KEY) === '1';
  } catch {
    return false;
  }
}

export default function HalloweenFlashParty() {
  const clickSent = useRef(false);
  const [open, setOpen] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [tick, setTick] = useState(0);
  const [preselect, setPreselect] = useState<string[]>([]);

  useEffect(() => {
    setConfirmed(hasStoredRsvp());
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setTick((value) => value + 1), 2600);
    return () => window.clearInterval(id);
  }, []);

  const openModal = (flashId?: string | string[]) => {
    if (confirmed) return;
    setPreselect(Array.isArray(flashId) ? flashId : flashId ? [flashId] : []);
    setGallery(false);
    setSheet(false);
    setOpen(true);
    if (clickSent.current) return;
    if (typeof window !== 'undefined' && sessionStorage.getItem(CLICK_KEY)) return;
    clickSent.current = true;
    try {
      sessionStorage.setItem(CLICK_KEY, '1');
    } catch {
      /* ignore */
    }
    postCampaign('/campaigns/halloween-flash/click').catch(() => {
      /* o modal abre na mesma */
    });
  };

  const onReserved = () => {
    try {
      sessionStorage.setItem(RSVP_KEY, '1');
    } catch {
      /* ignore */
    }
    setConfirmed(true);
    setOpen(false);
    setGallery(false);
    setSheet(false);
  };

  return (
    <section className="flash-party relative z-20 overflow-hidden bg-black px-5 pt-24 pb-28 md:px-12 md:pt-28 md:pb-16">
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden>
        {FLOATERS.map((floater, index) => (
          <span
            key={`${floater.className}-${index}`}
            className={`absolute ${floater.motion} ${floater.className}`}
            style={{ animationDelay: `${-index * 0.7}s` }}
          >
            <floater.Drawing drawn className="h-full w-full" />
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
        <header className="flash-copy text-center lg:text-left">
          <p className="font-gate text-xl font-semibold uppercase tracking-[0.28em] text-[#FF5C00] drop-shadow-[0_0_28px_rgba(255,92,0,0.85)] sm:text-2xl md:text-3xl">
            31 de outubro
          </p>
          <h2 className="mt-4 font-gate text-[2.35rem] font-semibold uppercase leading-[0.9] tracking-[0.08em] text-white sm:text-6xl md:text-7xl">
            Halloween
          </h2>
          <p className="mt-4 font-gate text-2xl font-semibold uppercase tracking-[0.22em] text-white sm:text-4xl md:text-5xl">
            Flash Party
          </p>
          <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2 text-left lg:mx-0">
            {([1, 2, 3] as FlashQuantity[]).map((qty) => (
              <li
                key={qty}
                className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-2 font-gate text-sm uppercase tracking-[0.14em] text-white sm:text-base"
              >
                <span>{qty} flash</span>
                <span className="text-[#FF5C00]">{FLASH_PRICES[qty]} €</span>
              </li>
            ))}
          </ul>
          {confirmed ? (
            <div className="mx-auto mt-8 max-w-md text-center lg:mx-0 lg:text-left">
              <p className="font-gate text-2xl font-semibold uppercase leading-tight tracking-[0.12em] text-[#FF5C00] drop-shadow-[0_0_22px_rgba(255,92,0,0.7)] sm:text-3xl">
                Dia 31 estamos à tua espera.
              </p>
              <p className="mt-4 font-gate text-sm font-semibold uppercase tracking-[0.16em] text-[#FFB347] sm:text-base">
                As vagas são por ordem de chegada na loja.
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openModal()}
              className="flash-cta mt-8 inline-flex items-center justify-center px-7 py-3.5 font-gate text-[0.78rem] uppercase tracking-[0.22em] text-[#FF5C00]"
            >
              Conta comigo
            </button>
          )}
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/70 sm:text-base lg:mx-0">
            Podes trazer a tua ideia se corresponder aos requisitos — ou escolher uma das flashes
            da folha.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            {['3 × 3', 'Minimalista', 'Só preto e branco'].map((rule) => (
              <li
                key={rule}
                className="border border-white/40 px-4 py-2 font-gate text-[0.82rem] uppercase tracking-[0.18em] text-white sm:text-[0.9rem]"
              >
                {rule}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-5 max-w-md text-sm font-medium uppercase tracking-[0.16em] text-white/80 sm:text-base lg:mx-0">
            As vagas são por ordem de chegada.
          </p>
        </header>

        <div>
          <div className="flash-sheet mx-auto grid w-full max-w-[22rem] grid-cols-3 gap-px border border-white/25 bg-white/25 sm:max-w-md">
            {Array.from({ length: 9 }, (_, index) => {
              const flash = SHEET_FLASHES[(tick + index * 5) % SHEET_FLASHES.length];
              return (
                <figure key={index} className="relative aspect-square bg-black">
                  <img
                    src={flash.src}
                    alt={flash.label}
                    className="h-full w-full object-contain p-[12%] transition-opacity duration-500"
                  />
                </figure>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setGallery(true)}
              className="border border-white/40 px-5 py-2.5 font-gate text-[0.72rem] uppercase tracking-[0.2em] text-white hover:border-[#FF5C00] hover:text-[#FF5C00]"
            >
              Ver mais
            </button>
            <button
              type="button"
              onClick={() => setSheet(true)}
              className="border border-[#FF5C00]/70 px-5 py-2.5 font-gate text-[0.72rem] uppercase tracking-[0.2em] text-[#FF5C00] hover:border-[#FF5C00] hover:bg-[#FF5C00]/10"
            >
              Ver folha
            </button>
          </div>
        </div>
      </div>

      {gallery && (
        <FlashGallery
          onClose={() => setGallery(false)}
          onAdvance={(ids) => openModal(ids)}
          onSheet={() => {
            setGallery(false);
            setSheet(true);
          }}
        />
      )}
      {sheet && (
        <FlashSheetDialog
          onClose={() => setSheet(false)}
          onPick={(id) => openModal(id)}
        />
      )}
      {open && (
        <HalloweenFlashModal
          onClose={() => setOpen(false)}
          onReserved={onReserved}
          preselect={preselect}
        />
      )}
    </section>
  );
}

function FlashGallery({
  onClose,
  onAdvance,
  onSheet,
}: {
  onClose: () => void;
  onAdvance: (ids: string[]) => void;
  onSheet: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const toggle = (id: string) => {
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return [...current.slice(1), id];
      return [...current, id];
    });
  };

  return (
    <div className={FLASH_OVERLAY} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Escolhe a tua flash"
        onClick={(event) => event.stopPropagation()}
        className={`${FLASH_DIALOG} max-w-3xl`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-3 text-2xl leading-none text-white/55 hover:text-white"
        >
          ×
        </button>
        <p className="pr-8 font-gate text-xl font-semibold uppercase tracking-[0.18em] text-[#FF5C00] sm:text-2xl">
          Escolhe a tua
        </p>
        <p className="mt-2 font-gate text-sm uppercase tracking-[0.14em] text-[#FFB347] sm:text-base">
          1, 2 ou 3 flashes — e avança
        </p>
        <button
          type="button"
          onClick={onSheet}
          className="mt-4 w-full border-2 border-[#FF5C00] bg-[#FF5C00]/15 px-5 py-3 font-gate text-[0.82rem] uppercase tracking-[0.2em] text-[#FF5C00] hover:bg-[#FF5C00]/25"
        >
          Ver folha das flashes
        </button>
        <div className="mt-5 grid grid-cols-3 gap-px border border-white/20 bg-white/20 sm:grid-cols-4 md:grid-cols-6">
          {SHEET_FLASHES.map((flash) => {
            const picked = selected.includes(flash.id);
            return (
              <button
                key={flash.id}
                type="button"
                onClick={() => toggle(flash.id)}
                aria-pressed={picked}
                className={`relative aspect-square bg-black p-[10%] ${
                  picked ? 'ring-2 ring-inset ring-[#FF5C00]' : ''
                }`}
              >
                <img src={flash.src} alt={flash.label} className="h-full w-full object-contain" />
                {picked && (
                  <span className="absolute inset-x-1 bottom-1 font-gate text-[0.52rem] uppercase tracking-[0.1em] text-[#FF5C00]">
                    Escolho esta
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="sticky bottom-0 -mx-4 mt-5 border-t border-[#FF5C00]/40 bg-black px-4 pt-3 sm:-mx-7 sm:px-7">
          <p className="mb-3 text-center font-gate text-[0.68rem] uppercase tracking-[0.16em] text-white/60">
            {selected.length === 0
              ? 'Escolhe 1 ou mais para avançar.'
              : `${selected.length} flash${selected.length > 1 ? 'es' : ''} · ${FLASH_PRICES[selected.length as FlashQuantity]} €`}
          </p>
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => onAdvance(selected)}
            className="flash-cta mb-1 inline-flex w-full items-center justify-center px-7 py-3.5 font-gate text-[0.82rem] uppercase tracking-[0.28em] text-[#FF5C00] disabled:opacity-40"
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  );
}

function HalloweenFlashModal({
  onClose,
  onReserved,
  preselect,
}: {
  onClose: () => void;
  onReserved: () => void;
  preselect: string[];
}) {
  const firstRef = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [quantity, setQuantity] = useState<FlashQuantity>(
    preselect.length === 2 || preselect.length === 3 ? preselect.length : 1
  );
  const [own, setOwn] = useState(false);
  const [selected, setSelected] = useState<string[]>(preselect.slice(0, 3));
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const focused = own ? null : selected[selected.length - 1] ?? null;

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const toggleFlash = (id: string) => {
    setOwn(false);
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      const next = [...current, id];
      return next.slice(-quantity);
    });
  };

  const chooseOwn = () => {
    setOwn(true);
    setSelected([]);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      setError('Indica o primeiro e o último nome.');
      return;
    }
    if (!own && selected.length !== quantity) {
      setError(`Escolhe ${quantity} flash${quantity > 1 ? 'es' : ''} da folha, ou «Levo a minha».`);
      return;
    }
    setSaving(true);
    setError('');
    try {
      await postCampaign('/campaigns/halloween-flash/rsvp', {
        firstName,
        lastName,
        quantity: String(quantity),
        flashIds: own ? OWN_FLASH_ID : selected.join(','),
      });
      onReserved();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível gravar. Tenta outra vez.');
      setSaving(false);
    }
  };

  return (
    <div className={FLASH_OVERLAY} onClick={onClose}>
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="flash-modal-title"
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
        className={`${FLASH_DIALOG} flash-modal max-w-xl`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-3 text-2xl leading-none text-white/55 hover:text-white"
        >
          ×
        </button>
        <p
          id="flash-modal-title"
          className="font-gate text-2xl font-semibold uppercase tracking-[0.18em] text-[#FF5C00] sm:text-3xl"
        >
          Levo uma flash
        </p>
        <p className="mt-4 font-gate text-sm font-semibold uppercase leading-relaxed tracking-[0.14em] text-[#FFB347] sm:text-base">
          3 × 3 · Minimalista · Preto e branco
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="block text-left">
            <span className="font-gate text-[0.68rem] uppercase tracking-[0.18em] text-white/55">
              Primeiro nome
            </span>
            <input
              ref={firstRef}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              autoComplete="given-name"
              required
              className="mt-1 w-full border border-white/25 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-[#FF5C00]"
            />
          </label>
          <label className="block text-left">
            <span className="font-gate text-[0.68rem] uppercase tracking-[0.18em] text-white/55">
              Último nome
            </span>
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              autoComplete="family-name"
              required
              className="mt-1 w-full border border-white/25 bg-black px-3 py-2.5 text-sm text-white outline-none focus:border-[#FF5C00]"
            />
          </label>
        </div>

        <p className="mt-6 font-gate text-[0.68rem] uppercase tracking-[0.2em] text-white/55">
          Quantas flashes
        </p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {([1, 2, 3] as FlashQuantity[]).map((qty) => (
            <button
              key={qty}
              type="button"
              onClick={() => {
                setQuantity(qty);
                setSelected((current) => current.slice(0, qty));
              }}
              className={`border px-2 py-3 font-gate text-[0.68rem] uppercase tracking-[0.12em] ${
                quantity === qty
                  ? 'border-[#FF5C00] text-[#FF5C00]'
                  : 'border-white/25 text-white/80'
              }`}
            >
              {qty} · {FLASH_PRICES[qty]} €
            </button>
          ))}
        </div>

        <p className="mt-6 font-gate text-[0.68rem] uppercase tracking-[0.2em] text-white/55">
          Escolhe da folha ou leva a tua
        </p>
        {focused && (
          <FlashSheetView focusId={focused} className="mt-3 border border-[#FF5C00]/40" />
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={chooseOwn}
            className={`flex-1 border px-4 py-3 font-gate text-[0.72rem] uppercase tracking-[0.16em] ${
              own ? 'border-[#FF5C00] text-[#FF5C00]' : 'border-white/25 text-white'
            }`}
          >
            {own ? 'Escolho esta — levo a minha' : 'Levo a minha'}
          </button>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="border border-[#FF5C00]/70 px-4 py-3 font-gate text-[0.72rem] uppercase tracking-[0.16em] text-[#FF5C00]"
          >
            Ver folha
          </button>
        </div>
        <div className="mt-3 grid max-h-64 grid-cols-3 gap-px overflow-y-auto border border-white/25 bg-white/25 sm:grid-cols-4">
          {SHEET_FLASHES.map((flash) => {
            const picked = selected.includes(flash.id);
            return (
              <button
                key={flash.id}
                type="button"
                onClick={() => toggleFlash(flash.id)}
                aria-pressed={picked}
                className={`relative aspect-square bg-black p-[10%] ${
                  picked ? 'ring-2 ring-inset ring-[#FF5C00]' : ''
                }`}
              >
                <img src={flash.src} alt={flash.label} className="h-full w-full object-contain" />
                {picked && (
                  <span className="absolute inset-x-1 bottom-1 font-gate text-[0.52rem] uppercase tracking-[0.1em] text-[#FF5C00]">
                    Escolho esta
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {error && <p className="mt-4 text-sm text-[#FF5C00]">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="flash-cta mt-6 inline-flex w-full items-center justify-center px-7 py-3.5 font-gate text-[0.82rem] uppercase tracking-[0.28em] text-[#FF5C00] disabled:opacity-60"
        >
          {saving ? 'A gravar…' : `Vou · ${FLASH_PRICES[quantity]} €`}
        </button>
      </form>
      {sheetOpen && (
        <FlashSheetDialog
          focusId={focused}
          onClose={() => setSheetOpen(false)}
          onPick={(id) => {
            setOwn(false);
            setSelected((current) => (current.includes(id) ? current : [...current, id].slice(-quantity)));
            setSheetOpen(false);
          }}
        />
      )}
    </div>
  );
}
