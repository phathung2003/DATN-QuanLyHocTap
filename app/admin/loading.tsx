export default function Loading() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-600 mt-4 flex space-x-1 text-lg">
          Đang tải
          <span className="dots"> </span>
        </p>
      </div>
    </div>
  );
}
