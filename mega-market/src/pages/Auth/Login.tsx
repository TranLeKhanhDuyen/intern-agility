import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { SignInRequest } from '@services'
import { RHFTextField, FormProvider, Button } from '@components'
import { ValidationMessages } from '@constants/validation'
import { useUser } from '@hooks/useUser'
import './Auth.css'

const LoginForm = () => {
  const methods = useForm<SignInRequest>()
  const { handleSubmit } = methods
  const [error, setError] = useState<string | null>(null)
  const { user, setUser } = useUser()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<SignInRequest> = (data) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(
        (user: { email: string; password: string }) =>
          user.email === data.email && user.password === data.password
      )

      if (!user) {
        throw new Error('Wrong email or password')
      }

      setUser(user)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Login failed')
      }
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className='container auth-container'>
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
        additionalClass='auth-form'
      >
        <h1 className='auth-title'>Welcome Back!</h1>
        <RHFTextField
          additionalClass='form'
          type='email'
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
          rules={{ required: ValidationMessages.Required }}
        />
        <div className='error-placeholder'>
          {error && <p className='error-message'>{error}</p>}
        </div>
        <Button additionalClass='btn-register' type='submit' label='Login' />
        <p className='navigate-auth'>
          Don't have an account?{' '}
          <Link className='navigate-auth-link' to='/auth/register'>
            Register
          </Link>
        </p>
      </FormProvider>
      <article className='login-background'></article>
    </div>
  )
}

export default LoginForm
