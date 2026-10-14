export default function StencilScrollHint() {
  return (
    <div
      className="pointer-events-none absolute bottom-[5.75rem] left-1/2 z-20 -translate-x-1/2 md:bottom-10"
      aria-hidden
    >
      <svg
        viewBox="0 0 48 72"
        className="stencil-scroll-hint h-14 w-10 text-[#b9a0e0] mix-blend-screen md:h-16 md:w-11"
        fill="none"
      >
        <path
          d="M24 6v44"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M10 36 24 54 38 36"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 48 24 62 34 48"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
