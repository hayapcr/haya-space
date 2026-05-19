export default function Container({ children }) {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
}