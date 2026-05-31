export default function Container({ children }) {
  return (
    <div className="ml-80 w-[calc(100%-20rem)] px-4 md:px-6 lg:px-8">
      {children}
    </div>
  );
}