import React, { Component } from 'react';
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

class DayPicker extends Component {
	render() {
		const { from, to, onFromChange, onToChange } = this.props;
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
							onDayChange={onFromChange}
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
							onDayChange={onToChange}
						/>
					</InputFromDiv>
				</div>
			</div>
		);
	}
}

export default DayPicker;