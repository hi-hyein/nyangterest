import React, { Fragment, useState } from 'react';
import Template from "./Template";
import Checkbox from '@material-ui/core/Checkbox';

const UnRegisterAgree = (props) => {
	const [state, setState] = useState({
		checked: false,
	});

	const handler  = props.handler;

	const handleChange = ()=> {
		if(!checked){
			setState({
				checked : true
			})
			
			handler(props.name, true)
			
		}else {
			setState({
				checked : false
			})

			handler(props.name, false)
		}
	};

	const { checked } = state;

	return (
		
		<Fragment>
			<Template>
			<h2>{props.title}</h2>
			<p>
				{props.content}
			</p>
			<Checkbox
				color="primary"
				checked = {checked}
				onClick = {handleChange}
			/>
			</Template>
		</Fragment>
	);
};

export default UnRegisterAgree;