import { createGlobalStyle } from "styled-components";
import resetCSS from "reset-css";

const GlobalStyle = createGlobalStyle`
  ${resetCSS};
  body {
		margin: 0;
		padding: 0;
		font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI",  "Oxygen",
		"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
		sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
  }

  * {
    	box-sizing:border-box;
  }

  img {max-width:100%;}
  ul {
	  	padding: 50px;
		padding-bottom: 100px;
		display: grid;
		grid-template-columns: repeat(auto-fill, 250px);
		grid-gap: 20px;
		// grid-auto-rows: 300px;
		justify-content: space-around;
		// grid-template-rows: 260px 400px 400px;
		& > li {
			grid-column: span 1;
			// &:nth-child(5),
			// &:nth-child(6) {
			// 	grid-column: span 1;
			// }
			// &:nth-child(8) {
			// 	grid-column: span 4;
			// }
			// &:nth-child(14) {
			// 	grid-column: span 4;
			// }
	}
	@media screen and (max-width: 700px) {
		grid-template-columns: 1fr;
		grid-gap: 50px;
		padding: 10px;
		& > div {
			grid-column: span 1 !important;
		}
	}
  }

`;

export default GlobalStyle;
