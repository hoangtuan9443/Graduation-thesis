import {useState} from 'react'
import { Image, Typography, Menu, Modal } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import '../../styles/menulv1.css'
import avtDefault from '../../assets/img/avatar.jpg'

function MenuLv1({ menus = [], styled, activeMenuItem, setActiveMenuItem }) {

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
                        >Hoàng Tuấn 
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
                <div className="menulv1__logout" onClick={handleLogout}>
                    <div>
                        <LogoutOutlined style={{color: 'red', fontSize: 20}}/>  
                        <Typography.Text
                            style={{fontSize: 16, marginLeft: 5, color: 'red'}}
                            >Đăng xuất
                        </Typography.Text>
                    </div>
                </div>
            </div>
            <Modal title='Đăng xuất' open={isLogout} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn đăng xuất?</p>
            </Modal>
        </>
    )
}

export default MenuLv1
