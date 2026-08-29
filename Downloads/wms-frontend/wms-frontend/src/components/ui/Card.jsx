export default function Card({ children, className = '', title, actions }) {
  return (
    <div className={`bg-white rounded-xl shadow-card border border-slate-100 ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          {title && <h3 className="text-sm font-semibold text-slate-800">{title}</h3>}
          {actions}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
