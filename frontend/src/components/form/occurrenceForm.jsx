import { useState } from "react";
import { useOcorrencias } from "../../hooks/ocorrenciasHook.js";

export default function OccurrenceForm() {
  const [registeredAt, setRegisteredAt] = useState("");
  const [local, setLocal] = useState("");
  const [km, setKm] = useState("");
  const [occurrenceType, setOccurrenceType] = useState("");
  const currentDateTime = new Date().toISOString().slice(0, 16);

  const { cadastrarOcorrencia } = useOcorrencias();

  function formatDateTime(dateTime) {
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedDateTime = formatDateTime(new Date(registeredAt));

    const occurrence = {
      registered_at: formattedDateTime,
      local: local,
      occurrence_type: Number(occurrenceType),
      km: km,
    };

    cadastrarOcorrencia(occurrence);
  };

  return (
    <div className="rounded-lg bg-indigo-600 px-6 py-3 shadow-md">
      <h3 className="mb-4 text-lg font-medium text-white">
        Adicionar uma ocorrência
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Data e Hora:
          </label>
          <input
            type="datetime-local"
            value={registeredAt}
            onChange={(event) => setRegisteredAt(event.target.value)}
            max={currentDateTime}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Local:
          </label>
          <input
            type="text"
            value={local}
            onChange={(event) => setLocal(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Tipo de Ocorrência:
          </label>
          <select
            value={occurrenceType}
            onChange={(event) => setOccurrenceType(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="1">Atropelamento</option>
            <option value="2">Deslizamento</option>
            <option value="3">Colisão frontal</option>
            <option value="4">Capotagem</option>
            <option value="5">Saída de pista</option>
            <option value="6">Batida em objeto fixo</option>
            <option value="7">Veículo avariado</option>
            <option value="8">Colisão com motocicletas</option>
            <option value="9">Colisão no mesmo sentido ou transversal</option>
            <option value="10">Construção</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-300">
            Distância (km):
          </label>
          <input
            type="number"
            value={km}
            onChange={(event) => setKm(event.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-green-500 px-4 py-2 text-white transition duration-200 hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
