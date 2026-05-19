export default function FlexLayout({ children }) {
  return (
    <div className="flex items-center justify-between">
      {children}
    </div>
  );
}