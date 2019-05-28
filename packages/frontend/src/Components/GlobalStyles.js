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
  .List {
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

  .Item {
	  width: 100%;
	  
	  & > h2 {
		  padding-bottom: 0.5rem;
	  }

	  & > p {
		  padding-bottom: 1rem;
	  }

	  & > a {
		  display: flex;
		  height:200px;
		  justify-content: center;
		  align-items: center;

		& > img {
			max-width:100%;
			max-height:100%
		}
	  }	
  }
 
  .nav {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 100;
		background: #fff;
		opacity: 0.8;
		border-top: 1px solid #f8f9fa;
		&-list {
			li {
				width: 20%;
				float: left;
				text-align: center;
				a,
				button {
					width: 100%;
					display: block;
					padding: 6px 0;
					color: #868e96;
					font-size: 2rem;
					
					span {
						display: block;
						font-size: 1rem;
						padding: 5px 0 0 0;
					}
					&.active {
					* {
						color: #38d9a9;
					}
				}
				
				}
			}
		}
	}

`;

export default GlobalStyle;
