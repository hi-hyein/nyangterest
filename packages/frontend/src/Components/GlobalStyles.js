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

  #wrap {
			padding-top: 76px;

			@media screen and (max-width:1024px) {
				padding-top:0;
			}
  }	

  input {

	  &:focus{
			outline: none;
	  }  

  }	

  input[type="checkbox" i] {vertical-align: middle}

  a, button {transition: all 0.3s linear}

  a:-webkit-any-link {
		text-decoration: none;
  }

  button {
	cursor: pointer;
	border: none;

  	&:focus{
		  outline:0;
		  }
  }
  
  img {max-width:100%;}

`;

export default GlobalStyle;
