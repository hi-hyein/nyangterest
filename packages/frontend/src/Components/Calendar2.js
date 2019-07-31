import React, { Component } from 'react';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';
import styled from 'styled-components';

const InputFromDiv = styled.div`
	display: inline-block;
	input {max-width:120px}
`;


class Calendar2 extends Component {

	state = {
		from: undefined,
		to: undefined,
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

	handleFromChange = (from) => {
		this.setState({ from });
	}

	handleToChange = (to) => {
		this.setState({ to }, this.showFromMonth);
	}

	render() {
		const { from, to } = this.state;
		const modifiers = { start: from, end: to };
		return (
			<div className="InputFromTo">
				<InputFromDiv>
					<DayPickerInput
						// overlayComponent={CustomOverlay}
						value={from}
						placeholder="From"
						format="LL"
						formatDate={formatDate}
						parseDate={parseDate}
						dayPickerProps={{
							selectedDays: [from, { from, to }],
							disabledDays: { after: to },
							toMonth: to,
							modifiers,
							numberOfMonths: 1,
							onDayClick: () => this.to.getInput().focus(),
						}}
						onDayChange={this.handleFromChange}
					/></InputFromDiv>{' '}
				-{' '}
				<InputFromDiv className="InputFromTo-to">
					<DayPickerInput
						ref={el => (this.to = el)}
						value={to}
						placeholder="To"
						format="LL"
						formatDate={formatDate}
						parseDate={parseDate}
						dayPickerProps={{
							selectedDays: [from, { from, to }],
							disabledDays: { before: from },
							modifiers,
							month: from,
							fromMonth: from,
							numberOfMonths: 1,
						}}
						onDayChange={this.handleToChange}
					/>
				</InputFromDiv>
			</div>
		);
	}
}

export default Calendar2;