import styled from "styled-components";

const Template = styled.div`
		overflow: auto;
		width: 95%
		height: 100%;
		max-height: 150px;
		margin: 2% auto;
		padding: 2%;
		border: 1px solid #ccc;
		background-color: #fff;
		font-family: inherit;
		font-size: 0.8rem;
		line-height: 1.5rem;
		white-space: pre-wrap;
		word-break: break-all;
		word-wrap: break-word;

		& h2{
			font-size: 1em;
			font-weight: 600;
			line-height: inherit;
		}

		& p {
			margin-bottom: 0.5rem;

			&:last-child {
				margin-bottom: 0;
			}	
		}
`;

export default Template;