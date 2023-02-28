import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'
import styled from 'styled-components'
import Contain from '../component/Contain'
import UserInfoPage from '../component/UserInfo'

const { Header, Sider, Content } = Layout

const HomePage = ({ isShowUser }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const MENU = [
    {
      label: 'User',
      key: '/users',
      icon: <UserOutlined />
    },
    {
      label: 'Goal',
      key: '/home',
      icon: <VideoCameraOutlined />
    }
  ]

  return (
    <ConTainer>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className='logo' />
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['2']}
            items={MENU}
            onSelect={(value) => navigate(value.key)}
          />
        </Sider>
        <Layout className='site-layout'>
          <Header
            style={{
              padding: 0,
              background: '#d9f7be',
              textAlign: 'left'
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed)
              }
            )}
            <h3>My Goal</h3>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: '80vh',
              background: '#f6ffed',
              borderRadius: '8px'
            }}
          >
            {isShowUser ? <UserInfoPage /> : <Contain />}
          </Content>
        </Layout>
      </Layout>
    </ConTainer>
  )
}

export default HomePage

const ConTainer = styled.div`
  h3 {
    margin: 0;
    color: #3c84ab;
    font-size: 24px;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    height: 64px;
    align-items: center;
  }

  #components-layout-demo-custom-trigger .trigger {
    padding: 0 24px;
    font-size: 18px;
    line-height: 64px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
`
