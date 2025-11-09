interface ProgressItem {
  label: string;
  value: number;
}

interface ProgressBarProps {
  data: ProgressItem[];
}

export default function ProgressBar({ data }: ProgressBarProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Progression</h2>
      <div className="space-y-2">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.label}</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
