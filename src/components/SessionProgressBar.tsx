export default function SessionProgressBar({ value = 0 }: { value?: number }) {
  return (
    <div className="w-full h-2 bg-[#232733] rounded">
      <div className="h-2 rounded bg-success transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}
