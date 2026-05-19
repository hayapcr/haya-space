export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-6">
      {children}
    </div>
  );
}