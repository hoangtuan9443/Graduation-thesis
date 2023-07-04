import {useState} from 'react'
import { Image, Typography, Menu, Modal, Dropdown, Row, Col, Select, Button, message } from 'antd'
import { LogoutOutlined, SettingOutlined, TableOutlined, UserOutlined, WifiOutlined, HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import '../../styles/menulv1.css'
import avtDefault from '../../assets/img/avatar.jpg'
import { putData } from '../../Firebase/config'

function MenuLv1({ 
    menus = [], 
    styled, 
    activeMenuItem, 
    setActiveMenuItem, 
    setIsOpenChangeWifi, 
    setIsOpenChangePw, 
    setIsOpenChangeAccount,
    optionSelect = []
}) {

    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const [isLogout, setIsLogout] = useState(false)
    const [openDoor, setOpenDoor] = useState({dv: '', type: ''})
    const [openTab, setOpenTab] = useState(false)

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

    const handleOpenDoor = () => {
        if(openDoor.dv && openDoor.type) {
            if(openDoor.type === 'open') {
                putData(`/dv/${openDoor.dv}/Action`, 3)
                messageApi.success(`Mở cửa thành công`)
                setOpenDoor({dv: '', type: ''})
                setOpenTab(false)
            } else if(openDoor.type === 'close') {
                putData(`/dv/${openDoor.dv}/Action`, 4)
                messageApi.success(`Đóng cửa thành công`)
                setOpenDoor({dv: '', type: ''})
                setOpenTab(false)
            } 
        } else {
            if(!openDoor.dv) {
                messageApi.info('Vui lòng chọn thiết bị !')
            }
            if(!openDoor.type) {
                messageApi.info('Vui lòng chọn điều khiển cửa !')
            }
        }
    }

    const items = [
        {
            key: 'account',
            label: (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}} onClick={() => setIsOpenChangeAccount(true)}>
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
                    <Typography style={{fontSize: 16}}>Cài đặt mật khẩu</Typography>
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
            {contextHolder}
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
                <div className="menulv1__logout" style={{marginBottom: 10}} onClick={() => setOpenTab(true)}>
                    <Typography.Text
                        style={{fontSize: 16, marginLeft: 5, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    > 
                        <HomeOutlined style={{color: '#fff', fontSize: 20, marginRight: 5}}/>  
                            Điều khiển
                    </Typography.Text>
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
            <Modal title='Điều khiển thiết bị' open={openTab}
                onCancel={() => {
                    setOpenDoor('')
                    setOpenTab(false)
                }}
                footer={[
                    <Button key='back' onClick={() => {
                        setOpenDoor('')
                        setOpenTab(false)
                    }}>
                        Huỷ
                    </Button>,
                    <Button key='submit' onClick={handleOpenDoor} type='primary'>
                        Xác nhận 
                    </Button>
                ]}
            >
                <Row gutter={[0, 8]}>
                    <Col span={24}>
                        <Typography.Text
                            style={{fontWeight: 600, marginLeft: 5}}
                        >
                            Chọn thiết bị
                        </Typography.Text>
                    </Col>
                    <Col span={24}>
                        <Select 
                            value={openDoor.dv ? openDoor.dv : ''}
                            style={{width: '100%'}}
                            options={optionSelect}
                            onChange={(e) => setOpenDoor(prev => ({...prev, dv: e}))}
                        />
                    </Col>
                    <Col span={24}>
                        <Typography.Text
                            style={{fontWeight: 600, marginLeft: 5}}
                        >
                            Đóng/mở cửa
                        </Typography.Text>
                    </Col>
                    <Col span={24}>
                        <Select 
                            value={openDoor.type ? openDoor.type : ''}
                            style={{width: '100%'}}
                            options={[{value: 'open', label: 'Mở cửa'}, {value: 'close', label: 'Đóng cửa'}]}
                            onChange={(e) => setOpenDoor(prev => ({...prev, type: e}))}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default MenuLv1
