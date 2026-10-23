'use client';

import { FLASH_BOXES, FLASH_SHEET } from '@/lib/halloweenFlashBoxes';

export const FLASH_OVERLAY =
  'fixed inset-0 z-[90] flex items-center justify-center bg-black/85 px-4 pt-[calc(6.5rem+env(safe-area-inset-top))] pb-[calc(6.5rem+env(safe-area-inset-bottom))] md:px-6 md:pt-[calc(8rem+env(safe-area-inset-top))] md:pb-10';

export const FLASH_DIALOG =
  'relative max-h-full w-full overflow-y-auto border border-[#FF5C00]/50 bg-black px-4 py-6 sm:px-7 sm:py-8';

export function FlashSheetView({
  focusId,
  onPick,
  className = '',
}: {
  focusId?: string | null;
  onPick?: (id: string) => void;
  className?: string;
}) {
  const box = focusId ? FLASH_BOXES[focusId] : null;
  const pad = 72;
  const view = box
    ? {
        x: Math.max(0, box.x - pad),
        y: Math.max(0, box.y - pad),
        w: Math.min(FLASH_SHEET.width, box.x + box.w + pad) - Math.max(0, box.x - pad),
        h: Math.min(FLASH_SHEET.height, box.y + box.h + pad) - Math.max(0, box.y - pad),
      }
    : { x: 0, y: 0, w: FLASH_SHEET.width, h: FLASH_SHEET.height };

  return (
    <div className={`relative overflow-hidden bg-white ${className}`}>
      <div className="relative w-full" style={{ aspectRatio: `${view.w} / ${view.h}` }}>
        <img
          src={FLASH_SHEET.src}
          alt="Folha de flash tattoos"
          className="absolute max-w-none"
          style={{
            width: `${(FLASH_SHEET.width / view.w) * 100}%`,
            height: `${(FLASH_SHEET.height / view.h) * 100}%`,
            left: `${(-view.x / view.w) * 100}%`,
            top: `${(-view.y / view.h) * 100}%`,
          }}
        />
        {box && (
          <div
            className="pointer-events-none absolute border-2 border-[#FF5C00] shadow-[0_0_18px_rgba(255,92,0,0.55)]"
            style={{
              left: `${((box.x - view.x) / view.w) * 100}%`,
              top: `${((box.y - view.y) / view.h) * 100}%`,
              width: `${(box.w / view.w) * 100}%`,
              height: `${(box.h / view.h) * 100}%`,
            }}
          />
        )}
        {onPick &&
          Object.entries(FLASH_BOXES).map(([id, item]) => (
            <button
              key={id}
              type="button"
              onClick={() => onPick(id)}
              aria-label={`Flash ${id.replace('flash-', '')}`}
              className="absolute"
              style={{
                left: `${((item.x - view.x) / view.w) * 100}%`,
                top: `${((item.y - view.y) / view.h) * 100}%`,
                width: `${(item.w / view.w) * 100}%`,
                height: `${(item.h / view.h) * 100}%`,
              }}
            />
          ))}
      </div>
    </div>
  );
}

export function FlashSheetDialog({
  focusId,
  onClose,
  onPick,
}: {
  focusId?: string | null;
  onClose: () => void;
  onPick?: (id: string) => void;
}) {
  return (
    <div className={FLASH_OVERLAY} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Folha de flash tattoos"
        onClick={(event) => event.stopPropagation()}
        className={`${FLASH_DIALOG} max-w-2xl`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-4 top-3 text-2xl leading-none text-white/55 hover:text-white"
        >
          ×
        </button>
        <p className="font-gate text-xl font-semibold uppercase tracking-[0.18em] text-[#FF5C00]">
          Folha das flashes
        </p>
        <p className="mt-2 text-sm text-white/60">
          {focusId
            ? 'A flash escolhida está marcada a laranja.'
            : 'Toca numa flash para a escolher.'}
        </p>
        <FlashSheetView focusId={focusId} onPick={onPick} className="mt-4 border border-white/15" />
      </div>
    </div>
  );
}
