export default function GridLayout({ children }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {children}
    </div>
  );
}