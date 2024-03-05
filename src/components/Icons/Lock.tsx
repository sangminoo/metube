const Lock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="800px"
    height="800px"
    viewBox="0 0 64 64"
    enableBackground="new 0 0 64 64"
    xmlSpace="preserve"
    className="w-5 h-5"
    {...props}
  >
    <g>
      <rect
        x={8}
        y={33}
        fill="none"
        stroke="#000000"
        strokeWidth={2}
        strokeMiterlimit={10}
        width={48}
        height={30}
      />
      <path
        fill="none"
        stroke="#000000"
        strokeWidth={2}
        strokeMiterlimit={10}
        d="M16,33V17c0-8.837,7.163-16,16-16s16,7.163,16,16 v16"
      />
      <circle
        fill="none"
        stroke="#000000"
        strokeWidth={2}
        strokeMiterlimit={10}
        cx={32}
        cy={47}
        r={4}
      />
      <line
        fill="none"
        stroke="#000000"
        strokeWidth={2}
        strokeMiterlimit={10}
        x1={32}
        y1={51}
        x2={32}
        y2={55}
      />
    </g>
  </svg>
);
export default Lock;