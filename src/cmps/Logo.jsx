const Logo = ({ width = 32, height = 32, color = '#ff385c', className = '', style = {} }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width={width}
        height={height}
        className={className}
        style={{ fill: color, ...style }}
      >
        <path d="M 224 373.12 c -25.24 -31.67 -40.08 -59.43 -45 -83.18 c -22.55 -88 112.61 -88 90.06 0 c -5.45 24.25 -20.29 52 -45 83.18 Z m 138.15 73.23 c -42.06 18.31 -83.67 -10.88 -119.3 -50.47 c 103.9 -130.07 46.11 -200 -18.85 -200 c -54.92 0 -85.16 46.51 -73.28 100.5 c 6.93 29.19 25.23 62.39 54.43 99.5 c -32.53 36.05 -60.55 52.69 -85.15 54.92 c -50 7.43 -89.11 -41.06 -71.3 -91.09 c 15.1 -39.16 111.72 -231.18 115.87 -241.56 c 15.75 -30.07 25.56 -57.4 59.38 -57.4 c 32.34 0 43.4 25.94 60.37 59.87 c 36 70.62 89.35 177.48 114.84 239.09 c 13.17 33.07 -1.37 71.29 -37.01 86.64 Z m 47 -136.12 C 280.27 35.93 273.13 32 224 32 c -45.52 0 -64.87 31.67 -84.66 72.79 C 33.18 317.1 22.89 347.19 22 349.81 C -3.22 419.14 48.74 480 111.63 480 c 21.71 0 60.61 -6.06 112.37 -62.4 c 58.68 63.78 101.26 62.4 112.37 62.4 c 62.89 0.05 114.85 -60.86 89.61 -130.19 c 0.02 -3.89 -16.82 -38.9 -16.82 -39.58 Z" />
      </svg>
    );
  }
  
  export default Logo;
  