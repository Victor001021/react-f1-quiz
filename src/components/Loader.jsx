export default function Loader({ label }) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Carregando {label}...</p>
    </div>
  );
}
