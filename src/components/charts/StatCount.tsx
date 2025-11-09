import { IAppTable } from "@/app/AppTablePage";

interface StatCountProps {
  data: IAppTable[];
}

export default function StatCount({ data }: StatCountProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Nombre d’invités</h2>
      <ul className="space-y-1">
        {data.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.date}</span>
            <span>{item.guest_number}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
