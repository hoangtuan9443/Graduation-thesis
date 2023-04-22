import React from 'react'
import {Form, Input, Button, Typography} from 'antd'
import {MailOutlined, UserOutlined, LockOutlined} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import '../../styles/login.css'

function Register() {
    return (
        <div className='register'>
            <div className='register__form'> 
                <Typography.Title style={{marginTop: 20}} level={3}>Đăng ký</Typography.Title>
                <Form layout='vertical'>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            placeholder='Email'
                            style={{
                                borderRadius: 10,
                                padding: 7,
                                border: '1px solid #218AD6',
                                marginTop: 10
                            }}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />} 
                            placeholder='Tên người dùng'
                            style={{
                                borderRadius: 10,
                                padding: 7,
                                border: '1px solid #218AD6',
                                marginTop: 10
                            }}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Input.Password 
                            prefix={<LockOutlined />}
                            placeholder='Mật khẩu'
                            style={{
                                borderRadius: 10,
                                padding: 7,
                                border: '1px solid #218AD6',
                                marginTop: 10
                            }}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Input.Password 
                            prefix={<LockOutlined />}
                            placeholder='Nhập lại mật khẩu'
                            style={{
                                borderRadius: 10,
                                padding: 7,
                                border: '1px solid #218AD6',
                                marginTop: 10
                            }}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Typography.Text>
                            Bạn đã có tài khoản? {" "}
                            <Link to='/login'>Đăng nhập</Link>
                        </Typography.Text>
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type='primary'
                            style={{width: '100%'}}
                        >
                            ĐĂNG KÍ
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Register
