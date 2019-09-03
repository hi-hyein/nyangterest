import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPickerStyle from './DayPickerStyle'
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/ko';
import styled from 'styled-components';

const InputFromDiv = styled.div`
	display: inline-block;

	input {
			max-width:127px; 
			border:none
			// border-bottom: 1px dotted #f00;
			font-size: 1rem;
			line-height: 1.5rem;
			text-align: center;

			&::placeholder {
				color: #ccc;
				// text-align: center;
			}
		}
`;

// 오늘 날짜 기준으로 일주일전
const defaultFrom = new Date(Date.now() + -7 * 24 * 3600 * 1000);    //-일/시/60분*60초/밀리세컨
const todayDate = new Date();

class DayPicker extends Component {

	// DayPicker
	state = {
		from: defaultFrom,
		to: todayDate,
	}

	handleFromChange = (from) => {
		this.setState({ from });
	}

	handleToChange = (to) => {

		this.setState({ to }, this.showFromMonth)
		// this.setState({ to }, this.showFromMonth, console.log(typeof to))
	}

	showFromMonth = () => {
		const { from, to } = this.state;
		if (!from) {
			return;
		}
		if (moment(to).diff(moment(from), 'months') < 1) {
			this.to.getDayPicker().showMonth(from);
		}
	}

	render() {
		const { from, to, } = this.state;
		const { handleFromChange, handleToChange } = this;
		const modifiers = { start: from, end: to };
		return (
			<div>
				<DayPickerStyle />
				<div className="InputFromTo">
					<InputFromDiv>
						<DayPickerInput
							value={from}
							placeholder={`${formatDate(new Date(), "LL", "ko")}`}
							format={"LL"}
							formatDate={formatDate}
							parseDate={parseDate}
							dayPickerProps={{
								locale: 'ko',
								localeUtils: MomentLocaleUtils,
								selectedDays: [from, { from, to }],
								disabledDays: { after: to },
								toMonth: to,
								modifiers,
								numberOfMonths: 1,
								onDayClick: () => this.to.getInput().focus(),
							}}
							onDayFromChange={handleFromChange}
						/></InputFromDiv>{' '}
					-{' '}
					<InputFromDiv className="InputFromTo-to">
						<DayPickerInput
							ref={el => (this.to = el)}
							value={to}
							placeholder={`${formatDate(new Date(), "LL", "ko")}`}
							format={"LL"}
							formatDate={formatDate}
							parseDate={parseDate}
							dayPickerProps={{
								locale: 'ko',
								localeUtils: MomentLocaleUtils,
								selectedDays: [from, { from, to }],
								disabledDays: { before: from },
								modifiers,
								month: from,
								fromMonth: from,
								numberOfMonths: 1,
							}}
							onDayToChange={handleToChange}
						/>
					</InputFromDiv>
				</div>
			</div>
		);
	}
}

export default DayPicker;