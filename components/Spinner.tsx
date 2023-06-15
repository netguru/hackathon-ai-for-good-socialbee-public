export const Spinner = ({ className = '' }: { className?: string }) => {
  return (
    <span
      className={`h-6 w-6 animate-spin rounded-full border-4 border-white/30 border-t-violet-400 ${className}`}
    />
  );
};
