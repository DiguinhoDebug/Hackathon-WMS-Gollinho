export function Input({ label, error, className = '', required, icon: Icon, ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      <div className="relative">
        {Icon && <Icon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />}
        <input
          className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400
            focus:ring-2 focus:ring-wms-500 focus:border-wms-500 outline-none transition
            ${Icon ? 'pl-9' : ''} ${error ? 'border-red-400' : 'border-slate-300'} ${className}`}
          {...props}
        />
      </div>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function Select({ label, error, options = [], placeholder, className = '', required, ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </span>
      )}
      <select
        className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-800 bg-white
          focus:ring-2 focus:ring-wms-500 focus:border-wms-500 outline-none transition
          ${error ? 'border-red-400' : 'border-slate-300'} ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}
