export default function Table({ colunas, dados, renderAcoes, chave = 'id', vazio = 'Nenhum registro encontrado.' }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-100">
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-wms-50/60">
          <tr>
            {colunas.map((col) => (
              <th
                key={col.chave}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-wms-700"
              >
                {col.titulo}
              </th>
            ))}
            {renderAcoes && (
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-wms-700">
                Ações
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {dados.length === 0 && (
            <tr>
              <td colSpan={colunas.length + (renderAcoes ? 1 : 0)} className="px-4 py-8 text-center text-slate-400">
                {vazio}
              </td>
            </tr>
          )}
          {dados.map((item) => (
            <tr key={item[chave]} className="hover:bg-slate-50">
              {colunas.map((col) => (
                <td key={col.chave} className="px-4 py-3 text-slate-700">
                  {col.render ? col.render(item) : item[col.chave]}
                </td>
              ))}
              {renderAcoes && <td className="px-4 py-3 text-right">{renderAcoes(item)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
