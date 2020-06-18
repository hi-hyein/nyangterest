import { createGlobalStyle } from "styled-components";
import resetCSS from "reset-css";
import "../fonts/fonts.css";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
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
	  		position: relative;
	  		min-height: 100vh;
			padding-top: 102px;
			background: #f5faf6

			@media screen and (max-width:960px) {
				padding-top:0;
			}
  }	

  h1 {
	  font-family: 'Caveat', cursive
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
