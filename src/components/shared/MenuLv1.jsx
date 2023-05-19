import {useState} from 'react'
import { Image, Typography, Menu, Modal, Dropdown } from 'antd'
import { LogoutOutlined, SettingOutlined, TableOutlined, UserOutlined, WifiOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import '../../styles/menulv1.css'
import avtDefault from '../../assets/img/avatar.jpg'

function MenuLv1({ menus = [], styled, activeMenuItem, setActiveMenuItem, setIsOpenChangeWifi, setIsOpenChangePw }) {

    const navigate = useNavigate()
    const [isLogout, setIsLogout] = useState(false)

    const handleClick = (e) => {
        if(e !== activeMenuItem) {
            setActiveMenuItem(e)
        }
    }
    const handleLogout = () => {
        setIsLogout(true)
    }

    const handleOk = () => {
        navigate('/login')
    } 

    const handleCancel = () => {
        setIsLogout(false)
    }

    const items = [
        {
            key: 'account',
            label: (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <UserOutlined style={{fontSize: 16, marginRight: 10}}/>
                    <Typography style={{fontSize: 16}}>Cài đặt tài khoản</Typography>
                </div>
            )
        },
        {
            key: 'keypad',
            label: (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} onClick={() => setIsOpenChangePw(true)}>
                    <TableOutlined style={{fontSize: 16, marginRight: 10}}/>
                    <Typography style={{fontSize: 16}}>Mật khẩu bàn phím</Typography>
                </div>
            )
        },
        {
            key: 'wifi',
            label: (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} onClick={() => setIsOpenChangeWifi(true)}>
                    <WifiOutlined style={{fontSize: 16, marginRight: 10}}/>
                    <Typography style={{fontSize: 16}}>Cài đặt wifi</Typography>
                </div>
            ),
        },
        {
            key: 'logout',
            label: (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} onClick={handleLogout}>
                    <LogoutOutlined style={{fontSize: 16, color: 'red', marginRight: 10}}/>
                    <Typography style={{fontSize: 16, color: 'red'}}>Đăng xuất</Typography>
                </div>
            ),
        },
        
    ]

    return (
        <>
            <div className={`menulv1`} style={{...styled}} >
                <div className='menulv1__avt'>
                    <Image 
                        src={avtDefault}
                        style={{borderRadius: '100%', padding: 2, border: '1px solid rgba(245,245,245, .5)'}}
                        width={44}
                        height={44}
                        />
                    <Typography.Text style={{color: '#fff', marginLeft: 5, fontSize: 16}}
                        >Admin 
                    </Typography.Text>
                </div>
                <div className='menulv1__box'>
                    <Menu mode='inline' selectedKeys={[`${activeMenuItem}`]} style={{background: '#0762a5'}}>
                        {
                            menus.map((item) => {
                                return (
                                    <Menu.Item key={item.key} onClick={() => handleClick(item.key)}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            {item.icon}
                                            <Typography.Text style={{fontSize: 16, marginLeft: 5, color: '#fff'}}>
                                                {item.title}
                                            </Typography.Text> 
                                        </div>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </div>
                <div className="menulv1__logout">
                    <Dropdown menu={{ items }} placement="top" arrow trigger={['click']}>
                        <Typography.Text
                            style={{fontSize: 16, marginLeft: 5, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                            <SettingOutlined style={{color: '#fff', fontSize: 20, marginRight: 5}}/>  
                                Thiết lập
                        </Typography.Text>
                    </Dropdown>
                </div>
            </div>
            <Modal title='Đăng xuất' open={isLogout} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn đăng xuất?</p>
            </Modal>
        </>
    )
}

export default MenuLv1
