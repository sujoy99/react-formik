import React, {useState} from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

const RadioButtons = (props) => {
	console.log("first", props)
	const { label, name, options, setFieldValue, ...rest } = props
	const [state, setState] = useState(props.value)
	console.log("state", state);
	return (
		<div className='form-control'>
			<label>{label}</label>
			<Field name={name} >
				{({ field }) => {
					// field.value = props.value
					console.log("in", field);
					return options.map(option => {
						return (
							<React.Fragment key={option.key}>
								{/* <input
									type='radio'
									id={option.value}
									{...field}
									{...rest}
									value={option.value}
									
									// checked={field.value === props.value}
									checked={state === option.value}
									onChange={(e) => {
										console.log("a", e)
										setState(e.target.value)
										setFieldValue(e.target.value)
										
										// field.value=e.target
									}}
								/> */}
								<input
                  type='radio'
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
								<label htmlFor={option.value}>{option.key}</label>
							</React.Fragment>
						)
					})
				}}
			</Field>
			<ErrorMessage component={TextError} name={name} />
		</div>
	)
}

export default RadioButtons