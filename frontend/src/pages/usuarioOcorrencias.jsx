import Navbar from "../components/Navbar.jsx";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import OccurrenceFormEdit from "../components/form/occurrenceFormEdit.jsx";

import { useOcorrencias } from "@/hooks/ocorrenciasHook.js";

export default function UsuarioOcorrencia() {
  const [occurrences, setOccurrences] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const { user } = useAuthContext();
  const { listarOcorrenciaUser, isLoading, message, deletarOcorrencia, editarOcorrencia } = useOcorrencias();
  const occurrencesPerPage = 6;
  const pagesVisited = pageNumber * occurrencesPerPage;
  const [isEditing, setIsEditing] = useState(false);
  const [occurrenceData, setEditingOccurrence] = useState(null);

  useEffect(() => {
    listarOcorrenciaUser()
      .then((json) => {
        setOccurrences(json);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const formatDateTime = (dateTime) => {
    return format(new Date(dateTime), "dd-MM-yyyy HH:mm:ss");
  };

  const pageCount = Math.ceil(occurrences?.length / occurrencesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleEdit = (occurrence) => {
    setIsEditing(true);
    setEditingOccurrence(occurrence);
    // Defina o ID da ocorrência, se necessário
  };

  const handleDelete = (ocorrenciaId) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir esta ocorrência?");
  
    if (confirmDelete) {
      // Chamar a função de exclusão de ocorrência
      deletarOcorrencia(ocorrenciaId);
    }
  };
  const renderOccurrencesTable = () => {
    return (
      <div className="table-responsive">
        <table className="w-full overflow-hidden rounded-l text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-semibold">
                Tipo de Ocorrência
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold">
                Data da Ocorrência
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold">
                Local
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold">KM</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">
                Criado por
              </th>
              <th className="px-6 py-3 text-left text-lg font-semibold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {occurrences
              .slice(pagesVisited, pagesVisited + occurrencesPerPage)
              .map((occurrence, index) => (
                <tr
                  key={occurrence.id}
                  className={index % 2 === 0 ? "bg-indigo-600" : "bg-gray-400"}
                >
                  <td className="px-6 py-4">{occurrence.occurrence_type}</td>
                  <td className="px-6 py-4">
                    {formatDateTime(occurrence.registered_at)}
                  </td>
                  <td className="px-6 py-4">{occurrence.local}</td>
                  <td className="px-6 py-4">{occurrence.km}</td>
                  <td className="px-6 py-4">{occurrence.user_id}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleEdit(occurrence)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(occurrence.id)}
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
          breakClassName={"pagination__link--break"}
        />
      </div>
    );
  }
  const renderOccurrencesCards = () => {
    return (
      <div>
        {occurrences
          .slice(pagesVisited, pagesVisited + occurrencesPerPage)
          .map((occurrence, index) => (
            <div
              key={occurrence.id}
              className={`${
                index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
              } mb-4 rounded-lg p-4`}
            >
              <p className="text-lg font-semibold">
                Tipo de Ocorrência: {occurrence.occurrence_type}
              </p>
              <p className="text-sm">
                Data da Ocorrência: {formatDateTime(occurrence.registered_at)}
              </p>
              <p className="text-sm">Local: {occurrence.local}</p>
              <p className="text-sm">KM: {occurrence.km}</p>
              <p className="text-sm">Criado por: {occurrence.user_id}</p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div className="px min-h-screen text-black">
      <Navbar />
      <div className="flex flex-col px-8 pt-8 md:flex-row">
        <div className="w-full pr-0 md:w-3/4 md:pr-4">
          {isEditing ? (
            <OccurrenceFormEdit occurrenceData={occurrenceData}  />
          ) : (
            <>
              {Array.isArray(occurrences) && occurrences.length > 0 ? (
                <div className="hidden md:block">{renderOccurrencesTable()}</div>
              ) : (
                <p className="text-black">Nenhuma ocorrência encontrada.</p>
              )}
  
              {Array.isArray(occurrences) && occurrences.length > 0 ? (
                <div className="md:hidden">{renderOccurrencesCards()}</div>
              ) : null}
  
              {occurrences && occurrences.length > occurrencesPerPage && (
                <div className="mt-4 flex justify-center">
                  <ReactPaginate
                    previousLabel={"Anterior"}
                    nextLabel={"Próxima"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName="pagination flex space-x-2 text-white"
                    pageClassName="bg-gray-600 py-2 px-3 rounded-md hover:bg-gray-700 cursor-pointer"
                    previousClassName="bg-gray-600 py-2 px-3 rounded-md hover:bg-gray-700 cursor-pointer"
                    nextClassName="bg-gray-600 py-2 px-3 rounded-md hover:bg-gray-700 cursor-pointer"
                    disabledClassName="opacity-50 cursor-not-allowed"
                    activeClassName="bg-cyan-700 font-bold hover:bg-cyan-600"
                    previousLinkClassName="flex items-center"
                    nextLinkClassName="flex items-center"
                    previousLinkLabel={<i className="fas fa-chevron-left"></i>}
                    nextLinkLabel={<i className="fas fa-chevron-right"></i>}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

}