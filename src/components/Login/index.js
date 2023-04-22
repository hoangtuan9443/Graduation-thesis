import React from 'react'
import '../../styles/login.css'
import { Form, Button, Input, Typography, Modal } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function Login() {


    return (
        <div className='login'>
            <div className='login__form'>
                <Typography.Title level={3} style={{marginTop: 20}}>Đăng nhập</Typography.Title>
                <Typography.Text style={{fontWeight: 'lighter', margin: '10px 0'}}>
                    Chào mừng bạn đã đến với ứng dụng quản lý ổ khoá thông minh
                </Typography.Text>
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
                    {/* <Form.Item>
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
                    </Form.Item> */}
                    <Form.Item>
                        <Button
                            type='primary'
                            style={{width: '100%'}}
                        >
                                ĐĂNG NHẬP
                        </Button>
                    </Form.Item>
                    {/* <Form.Item>
                        <Typography.Text>
                            Bạn chưa có tài khoản? {" "}
                            <Link to={'/register'}>Tạo ngay</Link>
                        </Typography.Text>
                    </Form.Item> */}
                    <Form.Item>
                        <Typography.Text 
                        style={{color: 'red', fontWeight: 'lighter', cursor: 'pointer'}}>
                            Bạn quên email đăng nhập?
                        </Typography.Text>
                    </Form.Item>
                </Form>
            </div>
            <Modal title='Nhập mã xác nhận đăng nhập' okText="Xác nhận" cancelText="Gửi lại" open>
                <p>Vui lòng kiểm tra email để nhận được mã xác nhận đăng nhập</p>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <Input style={{width: 40, height: 40, fontSize: '30px'}}/>
                    <Input style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}}/>
                    <Input style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}}/>
                    <Input style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}}/>
                    <Input style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}}/>
                    <Input style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}}/>
                </div>
            </Modal>
        </div>
    )
}

export default Login
