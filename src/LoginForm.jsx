import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [TOKEN, setToken] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const fetchToken = async () => {
    try {
      await axios
        .post('https://tms-stag.tgl-cloud.com/graphql/', {
          query: `
          mutation {
            login (loginInput: {
              username : "${email}"
              password : "${password}"
            }) {
              token
              tglCode
            }
          }
        `
        })
        .then((response) => {
          setToken(response.data.data.login.token)
          localStorage.setItem('token', response.data.data.login.token)
          localStorage.setItem('tglCode', response.data.data.login.tglCode)
          navigate('/home')
        })
    } catch (error) {
      alert('Thất Bại')
      console.error(error)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()

    fetchToken()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Email:
        <Input
          type='string'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Label>
      <Label>
        Password:
        <Input
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Label>
      <Button type='submit'>Login</Button>
    </Form>
  )
}
export default LoginForm

const Form = styled.form`
  border: 1px #333 solid;
  border-bottom: none;
  border-radius: 10px;

  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

const Input = styled.input`
  padding: 8px;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`

const Button = styled.button`
  padding: 8px;
  background-color: blue;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`
