export default function PaginationLinks({meta, onChangePagitaion}) {

  function onClick(e, link){
    e.preventDefault();
    if(!link.url){
      return;
    }
    onChangePagitaion(link.url)
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {meta && meta.links.map((link, ind) => (
                <a
                key={ind}
                onClick={e => onClick(e, link)}
                href={link.url}
                aria-current="page"
                className={
                    "relative inline-flex items-center px-4 py-2 text-sm hover:text-black ring-gray-300 hover:bg-gray-300 focus:z-20 focus:outline-offset-0 font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                + (ind === 0 ? ' rounded-l-md' : '')
                + (ind === meta.links.length -1 ? ' rounded-r-md ' : '')
                + (link.active ? ' z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 ' : ' text-black')
                }
                dangerouslySetInnerHTML={{ __html: link.label }}
                >
                </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
