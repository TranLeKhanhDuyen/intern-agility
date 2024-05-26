import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterRequest, useUser } from '@services'
import { Button, RHFTextField, FormProvider } from '@components'
import './auth.css'
import { ValidationMessages } from '@constants/validation'

const RegisterForm = () => {
  const methods = useForm<RegisterRequest>()
  const { handleSubmit } = methods
  const [error, setError] = useState<string | null>(null)
  const { setUser } = useUser()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<RegisterRequest> = (data) => {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const userExists = existingUsers.some(
        (user: { email: string }) => user.email === data.email
      )

      if (userExists) {
        throw new Error('Email already exists')
      }

      const newUser = {
        userName: data.userName,
        email: data.email,
        password: data.password
      }

      const updatedUsers = [...existingUsers, newUser]
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      setUser(newUser)
      alert('Register is successful')
      navigate('/auth/login')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(ValidationMessages.RegisterFailed)
      }
    }
  }

  const handleEyeClick = () => {
    // update later
  }

  return (
    <div className='container auth-container'>
      <article className='register-background'></article>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        additionalClass='auth-form'
      >
        <h1 className='auth-title'>Please Fill out form to Register!</h1>
        <RHFTextField
          additionalClass='form'
          name='userName'
          label='UserName'
          isShowLabel
          rules={{ required: ValidationMessages.Required }}
        />
        <RHFTextField
          additionalClass='form'
          name='email'
          label='Email'
          isShowLabel
          rules={{
            required: ValidationMessages.Required,
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: ValidationMessages.EmailPattern
            }
          }}
        />
        <RHFTextField
          additionalClass='form'
          name='password'
          label='Password'
          type='password'
          isShowLabel
          iconRight='eye'
          rules={{
            required: ValidationMessages.Required,
            minLength: {
              value: 6,
              message: ValidationMessages.PasswordMinLength
            }
          }}
        />
        <RHFTextField
          additionalClass='form'
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          isShowLabel
          iconRight='eye'
          rules={{
            required: ValidationMessages.Required,
            validate: (value: string) =>
              value === methods.getValues('password') ||
              ValidationMessages.ConfirmPasswordMatch
          }}
        />
        <Button additionalClass='btn-register' type='submit' label='Register' />
        <p className='navigate-auth'>
          Yes i have an account?{' '}
          <Link className='navigate-auth-link' to='/auth/login'>
            Login
          </Link>
        </p>
      </FormProvider>
    </div>
  )
}

export default RegisterForm
