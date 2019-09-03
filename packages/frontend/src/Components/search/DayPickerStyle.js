import { createGlobalStyle } from "styled-components";

const DayPickerStyle = createGlobalStyle`

/* DayPicker styles */

.DayPicker {
	display: inline-block;
	font-size: 1rem;

	&-wrapper {
		position: relative;
		z-index: 100;
		flex-direction: row;
		padding-bottom: 1em;
		-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
				user-select: none;
	}

	
	&-Months {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	&-Month {
		display: table;
		margin: 0 1em;
		margin-top: 1em;
		border-spacing: 0;
		border-collapse: collapse;

		-webkit-user-select: none;

			-moz-user-select: none;

			-ms-user-select: none;

				user-select: none;
	}

	&-NavBar {
	}

	&-NavButton {
		position: absolute;
		top: 1em;
		right: 1.5em;
		left: auto;

		display: inline-block;
		margin-top: 2px;
		width: 1.25em;
		height: 1.25em;
		background-position: center;
		background-size: 50%;
		background-repeat: no-repeat;
		color: #8B9898;
		cursor: pointer;
	}

	&-NavButton:hover {
		opacity: 0.8;
	}

	&-NavButton--prev {
		left: 1.5rem;
		// margin-right: 1.5em;
		background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5wcmV2PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9InByZXYiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzLjM5MzE5MywgMjUuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMy4zOTMxOTMsIC0yNS4wMDAwMDApIHRyYW5zbGF0ZSgwLjg5MzE5MywgMC4wMDAwMDApIiBmaWxsPSIjNTY1QTVDIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsNDkuMTIzNzMzMSBMMCw0NS4zNjc0MzQ1IEwyMC4xMzE4NDU5LDI0LjcyMzA2MTIgTDAsNC4yMzEzODMxNCBMMCwwLjQ3NTA4NDQ1OSBMMjUsMjQuNzIzMDYxMiBMMCw0OS4xMjM3MzMxIEwwLDQ5LjEyMzczMzEgWiIgaWQ9InJpZ2h0IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);
	}

	&-NavButton--next {
		background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5uZXh0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Im5leHQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuOTUxNDUxLCAwLjAwMDAwMCkiIGZpbGw9IiM1NjVBNUMiPgogICAgICAgICAgICA8cGF0aCBkPSJNMCw0OS4xMjM3MzMxIEwwLDQ1LjM2NzQzNDUgTDIwLjEzMTg0NTksMjQuNzIzMDYxMiBMMCw0LjIzMTM4MzE0IEwwLDAuNDc1MDg0NDU5IEwyNSwyNC43MjMwNjEyIEwwLDQ5LjEyMzczMzEgTDAsNDkuMTIzNzMzMSBaIiBpZD0icmlnaHQiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=);
	}

	&-NavButton--interactionDisabled {
		display: none;
	}

	&-Caption {
		display: table-caption;
		margin-bottom: 0.5em;
		padding: 0 0.5em;
		text-align: left;
	}

	&-Caption > div {
		font-weight: 500;
		font-size: 1.15em;
		text-align: center;
	}

	&-Weekdays {
		display: table-header-group;
		margin-top: 1em;
	}

	&-WeekdaysRow {
		display: table-row;
	}

	&-Weekday {
		display: table-cell;
		padding: 0.5em;
		color: #8B9898;
		text-align: center;
		font-size: 0.875em;
	}

	&-Weekday abbr[title] {
		border-bottom: none;
		text-decoration: none;
	}

	&-Body {
		display: table-row-group;
	}

	&-Week {
		display: table-row;
	}

	&-Day {
		display: table-cell;
		padding: 0.5em;
		border-radius: 50%;
		vertical-align: middle;
		text-align: center;
		cursor: pointer;
	}

	&-WeekNumber {
		display: table-cell;
		padding: 0.5em;
		min-width: 1em;
		border-right: 1px solid #EAECEC;
		color: #8B9898;
		vertical-align: middle;
		text-align: right;
		font-size: 0.75em;
		cursor: pointer;
	}

	&--interactionDisabled &-Day {
		cursor: default;
	}

	&-Footer {
		padding-top: 0.5em;
	}

	&-TodayButton {
		border: none;
		background-color: transparent;
		background-image: none;
		box-shadow: none;
		color: #4A90E2;
		font-size: 0.875em;
		cursor: pointer;
	}

	/* Default modifiers */

	&-Day--today {
		color: #D0021B;
		font-weight: 700;
	}

	&-Day--outside {
		color: #8B9898;
		cursor: default;
	}

	&-Day--disabled {
		color: #DCE0E0;
		cursor: default;
		/* background-color: #eff1f1; */
	}


	/* Example modifiers */

	&-Day--sunday {
		background-color: #F7F8F8;
	}

	&-Day--sunday:not(&-Day--today) {
		color: #DCE0E0;
	}

	&-Day--selected:not(&-Day--disabled):not(&-Day--outside) {
		position: relative;

		background-color: #3f51b5;
		color: #F0F8FF;
	}

	&-Day--selected:not(&-Day--disabled):not(&-Day--outside):hover {
		background-color: #51A0FA;
	}

	&:not(&--interactionDisabled)
		&-Day:not(&-Day--disabled):not(&-Day--selected):not(&-Day--outside):hover {
		background-color: #F0F8FF;
	}

}



/* DayPickerInput */

.DayPickerInput {
  display: inline-block;

	&-OverlayWrapper {
		position: relative;
	}

	&-Overlay {
		position: absolute;
		// left: 0;
		z-index: 1;

		background: white;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
	}

}





`;

export default DayPickerStyle;