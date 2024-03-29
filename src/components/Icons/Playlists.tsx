const Playlists = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="32px"
    height="32px"
    viewBox="0 0 32 32"
    id="icon"
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="#fff"
    {...props}
  >
    <defs>
      <style>{".cls-1{fill:none;}"}</style>
    </defs>
    <title>{"playlist"}</title>
    <rect x={4} y={6} width={18} height={2} />
    <rect x={4} y={12} width={18} height={2} />
    <rect x={4} y={18} width={12} height={2} />
    <polygon points="21 18 28 23 21 28 21 18" />
    <rect
      id="_Transparent_Rectangle_"
      data-name="&lt;Transparent Rectangle&gt;"
      className="cls-1"
      width={32}
      height={32}
    />
  </svg>
);
export default Playlists;
