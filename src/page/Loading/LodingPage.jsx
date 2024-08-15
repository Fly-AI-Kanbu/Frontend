import { css } from '@emotion/css';
import Common from "@style/common"

const loadingStyle = css`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background: linear-gradient(130deg, rgba(${Common.colors.primary100}) 0%, rgba(${Common.colors.primary200}) 100%);


  .title {
    z-index: 100;
    position: absolute;
    font-size: 4em;
    font-weight: 700;

    color: rgba(${Common.colors.primary700});
  }

  .loader {
    width: 5em;
    aspect-ratio: 1;
    display: grid;
  }
  .loader,
  .loader:before,
  .loader:after {
    --c:no-repeat linear-gradient(rgba(${Common.colors.primary300}) 0 0);
    background:var(--c), var(--c), var(--c), var(--c);
    animation: l19-1 1.5s infinite, l19-2 1.5s infinite;
  }
  .loader:before,
  .loader:after {
    content: "";
    grid-area: 1/1;
    transform: translate(calc(50% - 2px),calc(2px - 50%)) rotate(90deg);
    animation-delay: -.25s;
  }
  .loader:after {
    transform: translate(calc(2px - 50%),calc(50% - 2px)) rotate(90deg);
  }
  @keyframes l19-1 {
    0%,
    10%   {background-size: 0    4px,4px 0 }
    40%,
    60%   {background-size: 100% 4px,4px 100%}
    90%,
    100%  {background-size: 0    4px,4px 0  }
  }
  @keyframes l19-2 {
    0%,49.9%{background-position: 0    0,0    0,100% 100%,100% 100%}
    50%,100%{background-position: 100% 0,0 100%,0    100%,100% 0}
  }
`;

export const LoadingPage = () => {
  return (
    <div className={loadingStyle}>
      <h1 className='title'>Kanbu</h1>
      <div className='loader'></div>
    </div>
  );
};
