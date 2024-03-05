const ButtonArrange = () => {
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="button flex gap-x-2 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          <p className="text-base">Sort by</p>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <a>Top comments</a>
          </li>
          <li>
            <a>Newest first</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ButtonArrange;
