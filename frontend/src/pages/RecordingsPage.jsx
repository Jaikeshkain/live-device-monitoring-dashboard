import { useParams } from "react-router-dom";

export default function RecordingsPage() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Recordings for Device {id}</h1>
    </div>
  );
}
