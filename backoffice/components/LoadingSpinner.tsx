export default function LoadingSpinner({ size = 24 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-2 border-gold-border border-t-gold rounded-full animate-spin"
    />
  );
}
