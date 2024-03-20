const YoutubeBase = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 -17 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M178.624 73.933C178.496 71.4324 178.372 68.9317 178.251 66.4318C178.036 61.8466 177.826 57.2613 177.621 52.6756C177.224 43.9011 176.813 34.8278 176.358 25.9062C176.16 19.8637 173.693 14.118 169.447 9.81435C164.279 4.55251 157.539 1.94523 148.837 1.84153C129.723 1.61443 107.095 1.35216 84.1845 1.11982C80.1362 1.07847 76.0203 1.09164 72.0422 1.10411C69.8048 1.11068 67.566 1.11434 65.3255 1.11565C62.1147 1.11259 58.9039 1.09922 55.6931 1.07559C48.4734 1.0349 41.0129 0.990911 33.6731 1.13071C27.1596 1.25476 21.7618 2.57093 17.1726 5.15559C7.72137 10.4785 2.68859 18.2461 2.22062 28.2428C1.96596 33.6904 1.87808 39.2351 1.79407 44.5955L1.76586 46.3677C1.6626 52.7255 1.56918 59.0832 1.48561 65.4409C1.32612 76.882 1.16141 88.7131 0.910028 100.346C0.756445 107.465 1.1147 115.822 4.94115 123.825C8.21822 130.679 12.512 135.13 18.4552 137.83C23.7258 140.175 29.2712 141.846 34.9601 142.803C44.9496 144.59 55.199 144.793 65.1103 144.989L65.9215 145.005C67.5837 145.038 69.2823 145.17 70.9245 145.297C71.6976 145.356 72.4715 145.416 73.2446 145.467H73.2879H140.677C140.702 145.467 140.727 145.465 140.752 145.462C141.971 145.324 143.192 145.205 144.413 145.085C147.053 144.826 149.784 144.56 152.448 144.1C166.676 141.651 176.183 132.306 177.881 119.103C179.26 107.967 179.693 96.7355 179.173 85.5266C179.019 81.6608 178.819 77.7326 178.624 73.933ZM167.957 85.222C167.849 96.1232 167.218 107.103 166.524 118.329C165.903 128.389 157.184 132.723 149.906 133.378C146.992 133.64 144.069 133.777 141.219 133.787L128.566 133.833C107.982 133.909 86.6969 133.99 65.7647 133.942C53.9034 133.915 42.3294 133.654 31.148 130.782C27.7285 129.932 24.4178 128.693 21.2807 127.089C17.7575 125.246 15.2233 121.987 13.5359 117.127C11.2361 110.302 10.087 103.142 10.1355 95.94C10.0698 86.7513 10.2359 77.4031 10.3928 68.3627L10.4978 62.1775C10.6612 52.1434 10.8306 41.7655 11.1653 31.5719C11.5493 19.8792 18.1526 12.4532 29.7586 10.6614C35.8162 9.74103 41.9353 9.28494 48.0625 9.2965C48.285 9.2965 48.5082 9.2965 48.7307 9.2965C59.5977 9.35228 70.6482 9.6246 81.3347 9.88713C85.7288 9.99517 90.1224 10.0992 94.5159 10.199C94.6944 10.2017 94.867 10.1342 94.997 10.0111C95.0246 9.98499 95.0495 9.95671 95.0718 9.92651C99.6937 10.042 104.316 10.1566 108.938 10.2704C121.98 10.592 135.465 10.9268 148.727 11.3049C152.657 11.4171 156.776 11.9216 160.28 14.8318C163.742 17.7111 165.446 20.8106 165.638 24.5865L165.769 27.165C166.238 36.3104 166.721 45.7683 167.09 55.0719C167.171 57.1424 167.259 59.2135 167.352 61.285C167.685 69.1385 168.036 77.2548 167.957 85.2234V85.222Z"
        fill="#000000"
      />
      <path
        d="M114.992 63.349C112.253 61.1096 109.449 58.9232 107.069 57.0802L104.241 54.89C96.8076 49.1339 89.1219 43.1803 81.5117 37.3887C80.1806 36.447 78.7183 35.7059 77.172 35.1893C74.4364 34.1897 71.7244 35.0582 70.4176 37.3554C68.595 40.561 67.6426 43.297 67.5061 45.7183C67.1517 51.9988 67.0808 58.3928 67.0125 64.5755C66.9876 66.7969 66.9633 69.0199 66.9252 71.2403C66.8084 71.2908 66.708 71.3742 66.6364 71.4798C66.5643 71.5849 66.5242 71.7089 66.5196 71.8362L66.3102 77.9979C66.1108 83.8761 65.9066 89.7543 65.6974 95.6331C65.6055 98.1521 66.4336 99.8468 68.2287 100.814C68.9651 101.221 69.7921 101.436 70.6335 101.441C71.8386 101.406 73.0082 101.024 74.0019 100.342C77.7082 97.9847 81.4159 95.6291 85.1261 93.2755C94.7743 87.1499 104.751 80.8169 114.53 74.5279C116.857 73.0308 118.146 71.2035 118.257 69.2424C118.37 67.2248 117.241 65.1881 114.992 63.349ZM104.113 69.0245L75.4649 87.7176L76.1993 47.9671C82.0131 51.8953 87.4575 56.1529 93.1984 60.6461C96.7276 63.4034 100.366 66.2494 104.113 69.0245Z"
        fill="#000000"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width={179.18}
          height={145.051}
          fill="white"
          transform="translate(0.598877 0.89209)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default YoutubeBase;
