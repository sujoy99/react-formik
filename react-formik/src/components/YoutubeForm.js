import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import TextError from './TextError'
import * as Yup from 'yup'

const initialValues = {
	name: 'Vishwas',
	email: '',
	channel: '',
	comments: '',
	address: '',
	social: {
		facebook: '',
		twitter: ''
	},
	phoneNumbers: ['', ''],
	phNumbers: ['']
}

const savedValues = {
	name: 'Vishwas',
	email: 'v@example.com',
	channel: 'codevolution',
	comments: 'Welcome to Formik',
	address: '221B Baker Street',
	social: {
		facebook: '',
		twitter: ''
	},
	phoneNumbers: ['', ''],
	phNumbers: ['']
}

const onSubmit = (values, submitProps) => {
	console.log('Form data', values)
	console.log('submitProps', submitProps)

	setTimeout(() => {
		submitProps.setSubmitting(false)
		submitProps.resetForm()
	} , 2000);

}

const validationSchema = Yup.object({
	name: Yup.string().required('Required first'),
	email: Yup.string()
		.email('Invalid email format')
		.required('Required'),
	channel: Yup.string().required('Required'),
	address: Yup.string().required('Required'),
	// phoneNumbers: Yup.string().required('neccessary')
})

const validateComments = value => {
	let error
	if (!value) {
		error = 'Required'
	}
	return error
}

const validatePrimaryPh = value => {
	let error
	if (!value) {
		error = 'Required'
	}
	return error
}

const validatePhNumbers = value => {
	// console.log("value", value);
	let error
	if (!value) {
		error = 'Required!!'
	}
	return error
}

const YoutubeForm = () => {

	const [formValues, setFormValues] = useState(null)

	return (
		<Formik
		initialValues={formValues || initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			enableReinitialize
			// validateOnChange={false}
			// validateOnBlur={false}
			// validateOnMount
		>

			{/* manually triggering validation starts */}
			{
				formik => {
					// console.log('Formik props', formik)
					return (
						<Form>
							<div className='form-control'>
								<label htmlFor='name'>Name</label>
								<Field
									type='text'
									id='name'
									name='name'
								/>
								<ErrorMessage name='name' component={TextError} />
							</div>

							<div className='form-control'>
								<label htmlFor='email'>E-mail</label>
								<Field
									type='email'
									id='email'
									name='email'
								/>
								<ErrorMessage name='email'>
									{error => <div style={{ color: 'red' }}>{error}</div>}
								</ErrorMessage>
							</div>

							<div className='form-control'>
								<label htmlFor='channel'>Channel</label>
								<Field
									type='text'
									id='channel'
									name='channel'
									placeholder='enter channel name'
								/>
								<ErrorMessage name='channel' component={TextError} />
							</div>

							<div className='form-control'>
								<label htmlFor='comments'>Comments</label>
								<Field
									as='textarea'
									// component='textarea'
									id='comments'
									name='comments'
									validate={validateComments}
								/>
								<ErrorMessage name='comments' component={TextError} />
							</div>

							{/* render property pattern starts  */}
							<div className='form-control'>
								<label htmlFor='address'>Address</label>
								<FastField name='address'>
									{(props) => {
										// console.log('render props', props)
										const { field, form, meta } = props
										return (
											<div>
												<input type='text' id="address" {...field} />
												{meta.touched && meta.error ? (
													<div style={{color: 'red'}}>{meta.error}</div>
												) : null}
											</div>
										)
									}}
								</FastField>
							</div>
							{/* render property pattern ends  */}

							{/* nested object starts  */}
							<div className='form-control'>
								<label htmlFor='facebook'>Facebook profile</label>
								<Field type='text' id='facebook' name='social.facebook' />
							</div>

							<div className='form-control'>
								<label htmlFor='twitter'>Twitter profile</label>
								<Field type='text' id='twitter' name='social.twitter' />
							</div>
							{/* nested object ends  */}

							{/* array starts  */}
							<div className='form-control'>
								<label htmlFor='primaryPh'>Primary phone number</label>
								<Field type='text' id='primaryPh' name='phoneNumbers[0]' validate={validatePrimaryPh} />
								<ErrorMessage name='phoneNumbers[0]'>
									{error => <div style={{ color: 'red' }}>neccessary</div>}
								</ErrorMessage>
							</div>

							<div className='form-control'>
								<label htmlFor='secondaryPh'>Secondary phone number</label>
								<Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
							</div>
							{/* array ends  */}

							{/* field array starts  */}
							<div className='form-control'>
								<label>List of phone numbers</label>
								<FieldArray name='phNumbers'>
									{fieldArrayProps => {
										const { push, remove, form } = fieldArrayProps
										const { values } = form
										const { phNumbers } = values
										// console.log('fieldArrayProps', fieldArrayProps)
										// console.log('Form errors', form.errors)
										return (
											<div>
												{phNumbers.map((phNumber, index) => (
													<div key={index}>
														<Field name={`phNumbers[${index}]`} validate={validatePhNumbers} />
														{index > 0 && (
															<button type='button' onClick={() => remove(index)}>
																-
															</button>
														)}
														<button type='button' onClick={() => push('')}>
															+
														</button>
													</div>

												))}

												<ErrorMessage name='phNumbers'>
													{error => <div style={{ color: 'red' }}>{error}</div>}
												</ErrorMessage>

											</div>
										)
									}}
								</FieldArray>
							</div>
							{/* field array ends  */}

							{/* <button
								type='button'
								onClick={() => formik.validateField('comments')}
							>
								Validate comments
							</button>
							<button
								type='button'
								onClick={() => formik.setFieldTouched('comments')}
							>
								Visit comments
							</button>
							<button type='button' onClick={() => formik.validateForm()}>
								Validate all
							</button>
							<button
								type='button'
								onClick={() =>
									formik.setTouched({
										name: true,
										email: true,
										channel: true,
										comments: true
									})
								}
							>
								Visit all
							</button> */}

							<button type='button' onClick={() => setFormValues(savedValues)}>
								Load saved data
							</button>

							<button type='submit'
								disabled={!formik.isValid || formik.isSubmitting}
							>Submit</button>
						</Form>
					)
				}
			}
			{/* manually triggering validation ends */}


		</Formik>
	)
}

export default YoutubeForm