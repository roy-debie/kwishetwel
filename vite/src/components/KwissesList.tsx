const KwissesList = ({
  kwisses,
}: {
  kwisses: Array<{
    _id: string;
    name: string;
  }>;
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 w-8/12 m-auto pt-10">
      {kwisses.map((kwis) => (
        <div
          key={kwis._id}
          className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
        >
          <div className="flex-shrink-0">&#129504;</div>
          <div className="min-w-0 flex-1">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{kwis.name}</p>
              <p className="truncate text-sm text-gray-500">{kwis.name}</p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KwissesList;
