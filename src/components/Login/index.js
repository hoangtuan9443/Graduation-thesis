import '../../styles/login.css'
import CheckEmail from '../shared/checkEmail'

import { useState } from 'react'
import { Form, Button, Input, Typography, Modal } from 'antd'
import { MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { get } from 'firebase/database'
import { dbRef } from '../../Firebase/config'

function Login() {

    const navigate = useNavigate()

    const [waitSendCode, setWaitSendCode] = useState(false)
    const [openTypeCode, setOpenTypeCode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [codeLogin, setCodeLogin] = useState({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''})
    const [emailLogin, setEmailLogin] = useState('')
    const [typeError, setTypeError] = useState('')
    
    const handleLogin = async () => {
        if(emailLogin && CheckEmail(emailLogin)) {
            setLoading(true)
            await get(dbRef).then(snapshot => {
                const size = snapshot.size
                let count = 0
                snapshot.child('/emailManagement/list').forEach(node => {
                    count++
                    if(emailLogin === node.key.replaceAll(" ", ".")) {
                        setTypeError('')
                        return fetch('http://localhost:4000/api/email/send', {
                            method: "POST",
                            mode: "cors",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({email: emailLogin})
                        }).then(response => {
                            setLoading(false)
                            return setOpenTypeCode(true)
                        })
                        .catch(error =>{
                            console.log(error)
                        })
                    }
                    if(count === size){
                        setTypeError('wrongEmail')
                        setLoading(false)
                    }
                })
            })
        }else {
            if(!emailLogin) {
                setTypeError('noType')
            } 
            if(!CheckEmail(emailLogin) && emailLogin) {
                setTypeError('syntaxError')
            }
        }
    }

    const handleCancel = () => {
        setOpenTypeCode(false)
        setCodeLogin({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''})
    }

    const handleSendCode = () => {
        if(codeLogin[1] && codeLogin[2] && codeLogin[3] && codeLogin[4] && codeLogin[5] && codeLogin[6]){
            get(dbRef).then(snapshot => {
                const codeDatabase = snapshot.child(`/emailManagement/list/${emailLogin.replaceAll(".", " ")}`).val()
                const codeUser = codeLogin[1] + codeLogin[2] + codeLogin[3] + codeLogin[4] + codeLogin[5] + codeLogin[6]
                if(codeDatabase === Number(codeUser)) {
                    setOpenTypeCode(false)
                    setTypeError('')
                    setCodeLogin({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''})
                    localStorage.setItem('account', emailLogin)
                    navigate('/home')
                    window.location.reload()
                }else{
                    setTypeError("CodeLoginError")
                }
            })
        }else{
            setTypeError("CodeLoginError")
        }
    }

    const handleGetCodeAgain = () => {
        setWaitSendCode(true)
        setCodeLogin({1: '', 2: '', 3: '', 4: '', 5: '', 6: ''})
        setTypeError('')
        fetch('http://localhost:4000/api/email/send', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: emailLogin})
        }).then(response => {
            setWaitSendCode(false)
            return setOpenTypeCode(true)
        }).catch(error =>{
            console.log(error)
        })
    }

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
                            name='Email' 
                            prefix={<MailOutlined />}
                            placeholder='Email'
                            style={{
                                borderRadius: 10,
                                padding: 7,
                                border: '1px solid #218AD6',
                                marginTop: 10
                            }}
                            value={emailLogin ? emailLogin : ''}
                            onChange={e => setEmailLogin(e.target.value)}
                            type='email'
                        />
                    </Form.Item>
                    {   typeError === 'noType' && 
                        <Form.Item style={{margin: '-20px 0 5px 0'}}>
                            <Typography.Text style={{color: 'red', fontSize: 14, float: 'left'}}>
                                Vui lòng nhập email đăng nhập !
                            </Typography.Text>
                        </Form.Item>
                    }
                    {   typeError === 'syntaxError' &&
                        <Form.Item style={{margin: '-20px 0 5px 0'}}>
                            <Typography.Text style={{color: 'red', fontSize: 14, float: 'left'}}>
                                Email đăng nhập không đúng cú pháp. Vui lòng kiểm tra lại. 
                            </Typography.Text>
                        </Form.Item>
                    }
                    {   typeError === 'wrongEmail' &&
                        <Form.Item style={{margin: '-20px 0 5px 0'}}>
                            <Typography.Text style={{color: 'red', fontSize: 14, float: 'left'}}>
                                Email đăng nhập không tồn tại. Vui lòng kiểm tra lại. 
                            </Typography.Text>
                        </Form.Item>
                    }
                    <Form.Item>
                        <Button
                            type='primary'
                            style={{width: '100%'}}
                            loading={loading}
                            onClick={handleLogin}
                        >
                                ĐĂNG NHẬP
                        </Button>
                    </Form.Item>
                    {/* <Form.Item>
                        <Typography.Text 
                        style={{color: 'red', fontWeight: 'lighter', cursor: 'pointer'}}>
                            Bạn quên email đăng nhập?
                        </Typography.Text>
                    </Form.Item> */}
                </Form>
            </div>
            <Modal 
                title='Nhập mã xác nhận đăng nhập'  
                open={openTypeCode}
                onCancel={handleCancel}
                onOk={handleSendCode}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Quay lại
                    </Button>,
                    <Button key='send' loading={waitSendCode} type='primary' onClick={handleGetCodeAgain}>
                        Gửi lại
                    </Button>,
                    <Button key='submit' onClick={handleSendCode} type='primary'>
                        Xác nhận
                    </Button>
                ]}
            >
                <p>Vui lòng kiểm tra email để nhận được mã xác nhận đăng nhập</p>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Input
                        style={{width: 40, height: 40, fontSize: '30px'}} 
                        maxLength={1}
                        value={codeLogin[`1`] ? codeLogin[`1`] : ''}
                        onChange={e => setCodeLogin(prev => ({...prev, 1: e.target.value}))}
                        />
                    <Input 
                        style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}} 
                        maxLength={1}
                        value={codeLogin[`2`] ? codeLogin[`2`] : ''}
                        onChange={e => setCodeLogin(prev => ({...prev, 2: e.target.value}))}
                        />
                    <Input 
                        style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}} 
                        maxLength={1}
                        value={codeLogin[`3`] ? codeLogin[`3`] : ''}
                        onChange={e => setCodeLogin(prev => ({...prev, 3: e.target.value}))}
                        />
                    <Input 
                        style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}} 
                        maxLength={1}
                        value={codeLogin[`4`] ? codeLogin[`4`] : ''}
                        onChange={e => setCodeLogin(prev => ({...prev, 4: e.target.value}))}
                        />
                    <Input 
                        style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}} 
                        maxLength={1}
                        value={codeLogin[`5`] ? codeLogin[`5`] : ''}
                        onChange={e => setCodeLogin(prev => ({...prev, 5: e.target.value}))}
                        />
                    <Input 
                        style={{width: 40, height: 40, fontSize: '30px', marginLeft: 10}} 
                        maxLength={1}
                        value={codeLogin[`6`] ? codeLogin[`6`] : ''}
                        onChange={e => setCodeLogin(prev => ({...prev, 6: e.target.value}))}
                        />
                </div>
                {typeError === "CodeLoginError" && <div style={{color: 'red'}}>
                    <p>Mã xác nhận không hợp lệ. Vui lòng thử lại !</p>
                </div>}
            </Modal>
        </div>
    )
}

export default Login
