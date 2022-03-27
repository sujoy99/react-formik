import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from './FormikControl'

const FormikContainer = () => {

	const dropdownOptions = [
		{ key: 'Select an option', value: '' },
		{ key: 'Option 1', value: 'option1' },
		{ key: 'Option 2', value: 'option2' },
		{ key: 'Option 3', value: 'option3' }
	]

	const radioOptions = [
		{ key: 'Option 1', value: 'rOption1' },
		{ key: 'Option 2', value: 'rOption2' },
		{ key: 'Option 3', value: 'rOption3' }
	]

	const initialValues = {
		email: '',
		description: '',
		selectOption: '',
		// radioOption: 'rOption3' 
		radioOption: 'rOption3',
	}
	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email format')
			.required('Required'),
		description: Yup.string().required('Required'),
		selectOption: Yup.string().required('Required'),
		radioOption: Yup.string().required('Required'),
	})
	const onSubmit = values => {
		console.log('Form data', values)
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{formik => (
				<Form>
					<FormikControl
						control='input'
						type='email'
						label='Email'
						name='email'
					/>
					<FormikControl
						control='textarea'
						label='Description'
						name='description'
					/>
					<FormikControl
						control='select'
						label='Select a topic'
						name='selectOption'
						options={dropdownOptions}
					/>
					{/* practice  */}
					{/* <FormikControl
						control='radio'
						label='Radio topic'
						name='radioOption'
						options={radioOptions}
						// value={{ key: 'Option 3', value: 'rOption3' }}
						value={formik.values.radioOption}
						setFieldValue={(val) => { console.log("o", val); formik.setFieldValue("radioOption", val)}}
					/> */}
					{/* ends  */}
					<FormikControl
						control='radio'
						label='Radio topic'
						name='radioOption'
						options={radioOptions}
					/>
					{/* <FormikControl
            control='checkbox'
            label='Checkbox topics'
            name='checkboxOption'
            options={checkboxOptions}
          /> */}
					{/* <FormikControl
            control='date'
            label='Pick a date'
            name='birthDate'
          /> */}
					<button type='submit'>Submit</button>
				</Form>
			)}
		</Formik>
	)
}

export default FormikContainer