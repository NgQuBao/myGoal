import styled from 'styled-components'
import { PoweroffOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

function UserInfoPage() {
  const myObjectString = localStorage.getItem('userInfo')
  const Userdata = JSON.parse(myObjectString)
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <Container>
      <UserInfo>
        <Avatar
          src={'https://vinasa.org.vn/Anhdaidien/tgl%20logo.jpg'}
          alt='Profile picture'
        />
        <Name>{Userdata.shortName}</Name>
        <Email>{Userdata.email}</Email>
        <table>
          <tr>
            <td className='first-col'>AccountStatus</td>
            <td className='second-col'>{Userdata.accountStatus}</td>
          </tr>
          <tr>
            <td className='first-col'>FullName</td>
            <td className='second-col'>{Userdata.fullName}</td>
          </tr>
          <tr>
            <td className='first-col'>Gender</td>
            <td className='second-col'>{Userdata.gender}</td>
          </tr>
          <tr>
            <td className='first-col'>Joined-At</td>
            <td className='second-col'>{Userdata.joinedAt}</td>
          </tr>
          <tr>
            <td className='first-col'>TGLCode</td>
            <td className='second-col'>{Userdata.tglCode}</td>
          </tr>
        </table>
        <Button
          onClick={logOut}
          type='primary'
          icon={<PoweroffOutlined />}
          loading={false}
        >
          LogOut
        </Button>
      </UserInfo>
    </Container>
  )
}

export default UserInfoPage

const Container = styled.div`
  display: flex;
  position: relative;
`

const UserInfo = styled.div`
  width: 100%;
  padding-top: 80px;
  padding: 80px 24px;
  background-color: #fff;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  table {
    margin-top: 80px;
    font-size: 16px;
    color: #333;

    border-top: 1px #ccc solid;
    border-left: 1px #ccc solid;
    width: 100%;

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }

    td {
      border-right: 1px #ccc solid;
      border-bottom: 1px #ccc solid;
    }
    .first-col {
      width: 20%;
      font-weight: bold;
    }
    .second-col {
      text-align: left;
      padding-left: 10px;
    }
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    color: #614700;
    &:hover {
      background: none;
      color: #ad8b00 !important;

      background: #f6ffed !important;
    }
  }
`

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 16px;
`

const Name = styled.h1`
  font-size: 24px;
  margin-bottom: 8px;
`

const Email = styled.p`
  font-size: 18px;
  margin-bottom: 16px;
`
