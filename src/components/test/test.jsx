import "./style.css";

const Test = () => {
  return (
    <div class="scrollable-tabs-container">
      <div class="left-arrow">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      <ul>
        <li>
          <a href="#" class="active">
            All
          </a>
        </li>

        <li>
          <a href="#">Music</a>
        </li>

        <li>
          <a href="#">Chess</a>
        </li>

        <li>
          <a href="#">Live</a>
        </li>

        <li>
          <a href="#">Gaming</a>
        </li>

        <li>
          <a href="#">Editing</a>
        </li>

        <li>
          <a href="#">Mixing consoles</a>
        </li>

        <li>
          <a href="#">Comedy</a>
        </li>

        <li>
          <a href="#">Computer Hardware</a>
        </li>

        <li>
          <a href="#">News</a>
        </li>

        <li>
          <a href="#">Computer Programming</a>
        </li>

        <li>
          <a href="#">Video Editing Software</a>
        </li>

        <li>
          <a href="#">Sports</a>
        </li>
      </ul>

      <div class="right-arrow active">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default Test;
