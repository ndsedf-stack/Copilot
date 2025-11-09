
export default function BodyMap({ muscles }: { muscles: string[] }) {
  return (
    <div className="text-center text-sm text-gray-500">
      Carte des muscles travaillés : {muscles.join(", ")}
    </div>
  )
}
