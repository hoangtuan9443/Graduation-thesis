import {useState, useEffect} from 'react'
import { FileTextOutlined, ClusterOutlined, DeleteOutlined, ContactsOutlined } from '@ant-design/icons'
import { Typography, Table, Modal, Tag, Input, Select, DatePicker, Row, Col, Button, message } from 'antd'

import '../../styles/home.css'
import MenuLv1 from '../shared/MenuLv1'
import Container from '../shared/Container'
import HeadContainer from '../shared/HeadContainer'
import BreadCrumb from '../shared/BreadCrumb'
import { dbRef, putData, removeData, getValueAuto } from '../../Firebase/config.js'
import { get } from 'firebase/database'
import moment from 'moment/moment'
import CheckEmail from '../shared/checkEmail'
import Xoa_dau from '../shared/Xoa_dau'

function Home() {

    const [messageApi, contextHolder] = message.useMessage();
    const [activeMenuItem, setActiveMenuItem] = useState('quanlythietbi')
    const [selectDevice, setSelectDevice] = useState('')
    const [openAllowDelete, setOpenAllowDelete] = useState(false)
    const [changeID, setChangeID] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [changeDevice, setChangeDevice] = useState(false)
    const [isOpenChangePw, setIsOpenChangePw] = useState(false)
    const [isOpenChangeWifi, setIsOpenChangeWifi] = useState(false)
    const [isOpenChangeAccount, setIsOpenChangeAccount] = useState(false)
    const [loading, setLoading] = useState(false)
    const [checkForm, setCheckForm] = useState({Name: false, Dob: false, Phone: false, IdNumber: false, dv: false})
    const [idDelete, setIdDelete] = useState(0)
    // const [optionSelect, setOptionSelect] = useState(() => {
    //     const data = []
    //     get(dbRef).then(snapshot => {
    //         snapshot.child('/dv').forEach(node => {
    //             data.push({value: node.key, label: node.key.toUpperCase()})
    //         })
    //     }).catch(err => {
    //         console.log(err)
    //     })
    //     return data 
    // })
    const [dataTableQLTB, setDataTableQLTB] = useState([])
    const [dataTableQLDS, setDataTableQLDS] = useState([])
    const [dataTableQLLS, setDataTableQLLS] = useState([])
    const [optionSelect, setOptionSelect] = useState([])
    const [formAddPer, setFormAddPer] = useState(
        {Name: '', Dob: '', Phone: '', IdNumber: '', dv: ''}
    )
    const [formAddDevice, setFormAddDevice] = useState(
        {dv: '', Address: '', Phone: '', Manager: '', Email: ''}
    )
    const [formChangeFinger, setFormChangeFinger] = useState({Id: '', Name: '', list: []})
    const [formChangePassword, setFormChangePassword] = useState({dv: '', oldPw: '', newPw: '', confirmPw: ''})
    const [formChangeWifi, setFormChangeWifi] = useState({dv: '', SSID: '', PASS: ''})
    const [formChangeDevice, setFormChangeDevice] = useState({dv: '', Address: '', Phone: '', Manager: '', Email: ''})
    const [formChangeAccount, setFormChangeAccount] = useState({oldEmail: '', newEmail: '', code: ''})
    const [alertFormChangeAccount, setAlertChangeAccount] = useState({oldEmail: '', newEmail: '', code: ''})
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        // async function handleGetDeviceDatabase() {
        //     await getValueAuto('/dv/', snapshot => {
        //         let newData = []
        //         setOptionSelect([])
        //         snapshot.forEach(node => {
        //             if(node.child('/detail').exists()){
        //                 newData.push({...node.child('/detail').val()})
        //                 setDataTableQLTB(newData)
        //             }
        //         })
        //         newData.map(item => {
        //             setOptionSelect(prev => [...prev, {value: item.dv, label: item.dv.toUpperCase()}])
        //         })
        //     })
        // }
        handleGetDeviceDatabase()
    }, [])

    const handleGetDeviceDatabase = async () => {
        await getValueAuto('/dv/', snapshot => {
            let newData = []
            setOptionSelect([])
            snapshot.forEach(node => {
                if(node.child('/detail').exists()){
                    newData.push({...node.child('/detail').val()})
                    setDataTableQLTB(newData)
                }
            })
            newData.map(item => {
                setOptionSelect(prev => [...prev, {value: item.dv, label: item.dv.toUpperCase()}])
            })
        })
    }

    // useEffect(() => {
    //     if(selectDevice) {
    //         getValueAuto('/listUsedId', snapshot => {
    //             let history = []
    //             snapshot.child(`/${selectDevice}`).forEach(node => {
    //                 node.forEach(doc => {
    //                     get(dbRef).then(item => {
    //                         let temp = {}
    //                         item.child(`/dv/${selectDevice}/IDs`).forEach(valId => {
    //                             if(doc.val() === valId.child('/Id').val()){
    //                                 return temp = {
    //                                     Name: valId.child('/Name').val(),
    //                                     Phone: valId.child('/Phone').val()
    //                                 }
    //                             }
    //                         })
    //                         if(JSON.stringify(temp) !== JSON.stringify({})) {
    //                             history.push({
    //                                 Id: doc.val(),
    //                                 dv: selectDevice.toUpperCase(),
    //                                 Date: node.key,
    //                                 Time: doc.key,
    //                                 ...temp
    //                             })
    //                         }
    //                     }).catch(err => console.log(err))
    //                     setDataTableQLLS(history)
    //                 })
    //             })
    //         })
    //     }
    // }, [selectDevice])

    // useEffect(() => {
    //     if(selectDevice) {
    //         getValueAuto(`/listUsedId/${selectDevice}`, snapshot => {
    //             let history = []
    //             snapshot.forEach(node => {
    //                 node.forEach(doc => {
    //                     get(dbRef).then(item => {
    //                         let temp = {}
    //                         item.child(`/dv/${selectDevice}/IDs`).forEach(valId => {
    //                             if(doc.val() === valId.child('/Id').val()){
    //                                 return temp = {
    //                                     Name: valId.child('/Name').val(),
    //                                     Phone: valId.child('/Phone').val()
    //                                 }
    //                             }
    //                         })
    //                         if(JSON.stringify(temp) !== JSON.stringify({})) {
    //                             history.push({
    //                                 Id: doc.val(),
    //                                 dv: selectDevice.toUpperCase(),
    //                                 Date: node.key,
    //                                 Time: doc.key,
    //                                 ...temp
    //                             })
    //                         }
    //                     }).catch(err => console.log(err))
    //                     setDataTableQLLS(history)
    //                     console.log(history)
    //                 })
    //             })
    //         })
    //     }
    // }, [selectDevice])

    const handleChangePassword = () => {
        if(formChangePassword.dv && formChangePassword.oldPw && formChangePassword.newPw && formChangePassword.confirmPw){
            get(dbRef).then(snapshot => {
                if(formChangePassword.oldPw === snapshot.child(`/dv/${formChangePassword.dv}/Key`).val() 
                    && formChangePassword.newPw === formChangePassword.confirmPw
                    && formChangePassword.newPw.length == 6
                    && Number.isInteger(Number(formChangePassword.newPw))
                ){
                    putData(`/dv/${formChangePassword.dv}/Key`, formChangePassword.newPw)
                    putData(`/dv/${formChangePassword.dv}/Action`, 6)
                    setFormChangePassword({dv: '', oldPw: '', newPw: '', confirmPw: ''})
                    setIsOpenChangePw(false)
                    messageApi.success('Đổi mật khẩu thành công')
                } else {
                    if(formChangePassword.oldPw !== snapshot.child(`/dv/${formChangePassword.dv}/Key`).val()){
                        messageApi.error('Mật khẩu cũ không chính xác !')
                    }
                    if(formChangePassword.newPw !== formChangePassword.confirmPw){
                        messageApi.error('Mật khẩu cũ và mật khẩu xác nhận không trùng khớp !')
                    }
                    if(formChangePassword.newPw.length != 6){
                        messageApi.error('Mật khẩu mới không đủ 6 số')
                    }
                    if(!Number.isInteger(Number(formChangePassword.newPw))){
                        messageApi.error('Mật khẩu chỉ nhận ký tự số !')
                    }
                }
            })
        }
    }

    const handleChangeWifi = () => {
        if(formChangeWifi.dv && formChangeWifi.SSID && formChangeWifi.PASS) {
            putData(`/dv/${formChangeWifi.dv}/SSID`, formChangeWifi.SSID)
            putData(`/dv/${formChangeWifi.dv}/PASS`, formChangeWifi.PASS)
            putData(`/dv/${formChangeWifi.dv}/Action`, 5)
            setFormChangeWifi({dv: '', SSID: '', PASS: ''})
            setIsOpenChangeWifi(false)
            messageApi.success('Thay đổi wifi thành công')
        }
    }

    const handleDelete = (e) => {
        setOpenAllowDelete(true)
        setIdDelete(e)
    }

    const handleAllowDelete = () => {
        putData(`/dv/${selectDevice}/Action`, 2)
        putData(`/dv/${selectDevice}/IDtemp`, idDelete)
        removeData(`/dv/${selectDevice}/IDs/${idDelete}`, () => console.log('Done'))
        const newData = dataTableQLDS.filter(item => {
            return item.Id !== idDelete
        })
        setDataTableQLDS([...newData])
        setOpenAllowDelete(false)
        setIdDelete(0)
        messageApi.success('Xoá thành công')
    }

    const handleAddPerson = async () => {
        if(formAddPer.Name && formAddPer.Dob && formAddPer.Phone.length >= 10 && (formAddPer.IdNumber.length === 9 || formAddPer.IdNumber.length === 12) && formAddPer.dv){
            setCheckForm({Name: false, Dob: false, Phone: false, IdNumber: false, dv: false})
            let countID = 0
            await get(dbRef).then(snapshot => {
                let i = 0
                let less = 0
                snapshot.child(`/dv/${formAddPer.dv}/IDs`).forEach(node => {
                    i++
                    countID = node.key
                    if(i != countID) {
                        less = 1
                        return countID = i  
                    } 
                })
                if(countID == i && less == 0){
                    countID++
                }
            })
            const date = moment().format('DD/MM/YYYY')
            const time = moment().format('hh:mm:ss')
            putData(`/dv/${formAddPer.dv}/IDtemp`, countID)
            putData(`/dv/${formAddPer.dv}/waitScan`, 1)
            putData(`/dv/${formAddPer.dv}/Action`, 1)
            messageApi.loading('Chờ phản hồi từ thiết bị ...', 3)
            setLoading(true)
            let unsubscribe = getValueAuto(`/dv/${formAddPer.dv}/waitScan`, snapshot => {
                const wait = snapshot.val()
                if(wait === 0) {
                    putData(`/dv/${formAddPer.dv}/IDs/${countID}`, {
                        Name: formAddPer.Name,
                        Dob: formAddPer.Dob,
                        IdNumber: Number(formAddPer.IdNumber),
                        Phone: formAddPer.Phone,
                        CreatedDate: date,
                        CreatedTime: time,
                        Id: countID
                    })
                    setLoading(false)
                    messageApi.success(`Thêm vân tay thành công cho ${formAddPer.Name}`)
                    setFormAddPer({Name: '', Dob: '', Phone: '', IdNumber: '', dv: ''})
                    setIsOpen(false)
                    unsubscribe()
                }
            })
        }else{
            !formAddPer.Name ? setCheckForm(prev => ({...prev, Name: true})) : setCheckForm(prev => ({...prev, Name: false}))
            !formAddPer.Dob ? setCheckForm(prev => ({...prev, Dob: true})) : setCheckForm(prev => ({...prev, Dob: false}))
            formAddPer.Phone.length < 10 ? setCheckForm(prev => ({...prev, Phone: true})) : setCheckForm(prev => ({...prev, Phone: false}))
            formAddPer.IdNumber.length != 9 || formAddPer.IdNumber.length != 12 ? setCheckForm(prev => ({...prev, IdNumber: true})) : setCheckForm(prev => ({...prev, IdNumber: false}))
            !formAddPer.dv ? setCheckForm(prev => ({...prev, dv: true})) : setCheckForm(prev => ({...prev, dv: false}))
        }
    }
    
    const handleChangeSelect = (e) => {
        getValueAuto('/dv/' + e + '/IDs', snapshot => {
            if(snapshot.exists()) {
                let newData = []
                snapshot.forEach(doc => {
                    newData.push({...doc.val()})
                    setDataTableQLDS(newData)
                })
            }else {
                setDataTableQLDS([])
            }
        })
        setDataTableQLLS([])
        get(dbRef).then(snapshot => {
            let history = []
                snapshot.child(`/listUsedId/${e}`).forEach(node => {
                node.forEach(doc => {
                    get(dbRef).then(item => {
                        let temp = {}
                        item.child(`/dv/${e}/IDs`).forEach(valId => {
                            if(doc.val() === valId.child('/Id').val()){
                                return temp = {
                                    Name: valId.child('/Name').val(),
                                    Phone: valId.child('/Phone').val()
                                }
                            }
                        })
                        if(JSON.stringify(temp) !== JSON.stringify({})) {
                            history.push({
                                Id: doc.val(),
                                dv: e.toUpperCase(),
                                Date: node.key,
                                Time: doc.key,
                                ...temp
                            })
                        }
                    }).catch(err => console.log(err))
                })
                setDataTableQLLS(history)
                })
        })
        setSelectDevice(e)
        setLoading(true)
        setTimeout(() => {
            setDataTableQLLS(prev => [...prev])
            setLoading(false)
        }, 1000)
    }
    const handleAddDevice = () => {
        if(formAddDevice.dv && formAddDevice.Manager && formAddDevice.Address && formAddDevice.Email && formAddDevice.Phone){
            let checkLoop = false
            dataTableQLTB.forEach(item => {
                if(formAddDevice.dv === item.dv){
                    return checkLoop = true
                }
            })
            if(checkLoop === false){
                putData(`/dv/${formAddDevice.dv}/detail`, {
                    ...formAddDevice,
                    statusConnect: {
                        key: 'noconnect'
                    }
                })
                putData(`/dv/${formAddDevice.dv}/lock`, 0)
                putData(`/dv/${formAddDevice.dv}/Connection`, 1)
                putData(`/dv/${formAddDevice.dv}/Action`, 0
                )
                setFormAddDevice({dv: '', Address: '', Phone: '', Manager: '', Email: ''})
                setIsOpen(false)
                messageApi.success('Thêm thiết bị thành công')
            }
        }else {
    
        }
        
    }

    const handleChangeFinger = () => {
        if(formChangeFinger.Id){
            putData(`/dv/${selectDevice}/IDtemp/`, formChangeFinger.Id)
            putData(`/dv/${selectDevice}/Action`, 1)
            putData(`/dv/${selectDevice}/waitScan`, 1)
            messageApi.loading('Chờ phản hồi từ thiết bị ...', 3)
            setLoading(true)
            const unsubscribe = getValueAuto(`/dv/${selectDevice}/waitScan`, snapshot => {
                const wait = snapshot.val()
                if(wait === 0) {
                    setLoading(false)
                    messageApi.success(`Thay đổi vân tay ${formChangeFinger.Name}`)
                    setFormChangeFinger(prev => ({...prev, Id: '', Name: ''}))
                    setChangeID(false)
                    unsubscribe()   
                }
            })
        }
    }

    const handleChangeAccount = () => {
        if(formChangeAccount.oldEmail 
            && formChangeAccount.newEmail 
            && formChangeAccount.code.length === 6 
            && CheckEmail(formChangeAccount.oldEmail) 
            && CheckEmail(formChangeAccount.newEmail)
        ) {
            get(dbRef).then(snapshot => {
                const databaseCode = snapshot.child('/emailManagement/code').val()
                const databaseEmail = snapshot.child(`/emailManagement/list/${formChangeAccount.oldEmail.replace(".", " ")}`).key
                if(databaseCode == formChangeAccount.code && databaseEmail){
                    putData(`/emailManagement/list/${formChangeAccount.newEmail.replace(".", " ")}`, 100000)
                    removeData(`/emailManagement/list/${formChangeAccount.oldEmail.replace(".", " ")}`, () => {})
                    setAlertChangeAccount({oldEmail: '', newEmail: '', code: ''})
                    setFormChangeAccount({oldEmail: '', newEmail: '', code: ''})
                    setIsOpenChangeAccount(false)
                    messageApi.success('Thay đổi email tài khoản thành công')
                }else setAlertChangeAccount(prev => ({...prev, code: 'Mã xác nhận không chính xác'}))
            })
        }else{
            if(!formChangeAccount.oldEmail){
                setAlertChangeAccount(prev => ({...prev, oldEmail: 'Thiếu trường email đăng nhập cũ'}))
            }else if(formChangeAccount.oldEmail && !CheckEmail(formChangeAccount.oldEmail)) {
                setAlertChangeAccount(prev => ({...prev, oldEmail: 'Email đăng nhập cũ không phù hợp'}))
            }else setAlertChangeAccount(prev => ({...prev, oldEmail: ''}))
            if(!formChangeAccount.newEmail){
                setAlertChangeAccount(prev => ({...prev, newEmail: 'Thiếu trường email đăng nhập mới'}))
            }else if(formChangeAccount.newEmail && !CheckEmail(formChangeAccount.newEmail)) {
                setAlertChangeAccount(prev => ({...prev, newEmail: 'Email đăng nhập mới không phù hợp'}))
            }else setAlertChangeAccount(prev => ({...prev, newEmail: ''}))
            if(formChangeAccount.code.length != 6) {
                setAlertChangeAccount(prev => ({...prev, code: 'Mã xác nhận không phù hợp'}))
            }
        }
    }

    const handleSendMailToNewAccount = () => {
        if(formChangeAccount.newEmail && CheckEmail(formChangeAccount.newEmail)){
            setLoading(true)
            setAlertChangeAccount(prev => ({...prev, newEmail: ''}))
            fetch('http://localhost:4000/api/changeAccount/send', {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: formChangeAccount.newEmail})
            }).then(response => {
                return setLoading(false)
            }).catch(error =>{
                console.log(error)
            })
        }else {
            if(!formChangeAccount.newEmail){
                setAlertChangeAccount(prev => ({...prev, newEmail: 'Thiếu trường email đăng nhập mới'}))
            }else if(formChangeAccount.newEmail && !CheckEmail(formChangeAccount.newEmail)) {
                setAlertChangeAccount(prev => ({...prev, newEmail: 'Email đăng nhập mới không phù hợp'}))
            }
        }
    }

    const handleChangeDevice = () => {
        if(formChangeDevice.dv && formChangeDevice.Manager && formChangeDevice.Address && formChangeDevice.Email && formChangeDevice.Phone){
            putData(`/dv/${formChangeDevice.dv}/detail/Address`, formChangeDevice.Address)
            putData(`/dv/${formChangeDevice.dv}/detail/Email`, formChangeDevice.Email)
            putData(`/dv/${formChangeDevice.dv}/detail/Manager`, formChangeDevice.Manager)
            putData(`/dv/${formChangeDevice.dv}/detail/Phone`, formChangeDevice.Phone)
            setFormChangeDevice({dv: '', Address: '', Phone: '', Manager: '', Email: ''})
            setChangeDevice(false)
            messageApi.success('Thay đổi thông tin thiết bị thành công')
        }else {
            if(!formChangeDevice.dv){
                messageApi.info('Thiếu trường mã thiết bị')
            }
            if(!formChangeDevice.Manager){
                messageApi.info('Thiếu trường người quản lý')
            }
            if(!formChangeDevice.Address){
                messageApi.info('Thiếu trường địa chỉ')
            }
            if(!formChangeDevice.Email){
                messageApi.info('Thiếu trường email')
            }
            if(!formChangeDevice.Phone){
                messageApi.info('Thiếu trường số điện thoại')
            }
        }
    }

    const handleSearch = () => {
        if(activeMenuItem === 'quanlythietbi' && searchValue){
            const searchQLTB = dataTableQLTB.filter(list => {
                if(list.dv.toUpperCase().includes(searchValue.toUpperCase())){
                    return list
                }
            })
            setDataTableQLTB(searchQLTB)
        } else if(activeMenuItem === 'quanlydanhsach' && searchValue){
            const searchQLDS = dataTableQLDS.filter(list => {
                if(Xoa_dau(list.Name).includes(searchValue.toUpperCase())){
                    return list
                }
            })
            setDataTableQLDS(searchQLDS)
        } else if(activeMenuItem === 'quanlylichsu' && searchValue){
            const searchQLLS = dataTableQLLS.filter(list => {
                if(list.Date.toUpperCase().includes(searchValue.toUpperCase()) || Xoa_dau(list.Name).includes(searchValue.toUpperCase())){
                    return list
                }
            })
            setDataTableQLLS(searchQLLS)
        }
    }

    const menu= [
        {
            title: 'Quản lý thiết bị',
            key: 'quanlythietbi',
            icon: <ClusterOutlined style={{fontSize: 20, color: '#fff'}} />
        },
        {
            title: 'Quản lý danh sách',
            key: 'quanlydanhsach',
            icon: <FileTextOutlined style={{fontSize: 20, color: '#fff'}}/>
        },
        {
            title: 'Quản lý lịch sử',
            key: 'quanlylichsu',
            icon: <ContactsOutlined style={{fontSize: 20, color: '#fff', paddingTop: 2}} />
        },
    ]

    const columnTableQLTB = [
        {
            title: 'STT',
            width: '40px',
            align: 'center',
            render: (item, curr, index) => {
                return <Typography.Text key={item.id}>{index + 1}</Typography.Text>
            }
        },
        {
            title: 'Mã thiết bị',
            width: '80px',
            dataIndex: 'dv',
            key: 'dv',
            render: (item) => <Typography.Text>{item.toUpperCase()}</Typography.Text>
        },
        {
            title: 'Địa chỉ',
            width: '200px',
            dataIndex: 'Address',
            key: 'Address'
        },
        {
            title: 'Nguời quản lý',
            width: '140px',
            dataIndex: 'Manager',
            key: 'Manager'
        },
        {
            title: 'Email',
            width: '130px',
            dataIndex: 'Email',
            key: 'Email'
        },
        {
            title: 'Số điện thoại',
            width: '90px',
            dataIndex: 'Phone',
            key: 'Phone'
        },
        {
            title: 'Trạng thái kết nối',
            width: '90px',
            dataIndex: 'statusConnect',
            key: 'statusConnect',
            align: 'center',
            render: (stt) => {
                return stt.key === 'connect' ? (
                    <Tag key={stt.key} color='#218AD6' style={{width: 100, padding: 2, textAlign: 'center'}}>Kết nối</Tag>
                ) : stt.key === 'disconnect' ? (
                    <Tag key={stt.key} color='#cd201f' style={{width: 100, padding: 2, textAlign: 'center'}}>Mất kết nối</Tag>
                ) : stt.key = 'noconnect' ? (
                    <Tag key={stt.key} color='grey' style={{width: 100, padding: 2, textAlign: 'center'}}>Chưa kết nối</Tag>
                ) : null
            }
        },
    ]

    const columnTableQLDS = [
        {
            title: 'STT',
            width: '40px',
            align: 'center',
            render: (item, curr, index) => {
                return <Typography.Text key={item.id}>{index + 1}</Typography.Text>
            }
        },
        {
            title: 'Mã định danh',
            width: '100px',
            dataIndex: 'Id',
            key: 'Id',
            sorter: (a, b) => a.Id - b.Id
        },
        {
            title: 'Họ tên',
            width: '250px',
            dataIndex: 'Name',
            key: 'Name',
            render: (text, value, index) => {
                return (
                    <Typography.Text key={index}>
                        {text}
                    </Typography.Text>
                )
            }
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'Dob',
            key: 'Dob',
            width: '90px'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'Phone',
            key: 'Phone',
            width: '100px'
        },
        {
            title: "Ngày tạo",
            dataIndex: 'CreatedDate',
            key: 'CreatedDate',
            width: '80px',
        },
        {
            title: "Thời gian tạo",
            dataIndex: 'CreatedTime',
            key: 'CreatedTime',
            width: '80px'
        },
        {
            title: 'Xoá',
            dataIndex: 'delete',
            key: 'delete',
            width: '60px',
            align: 'center',
            render: (item, value) => {
                return <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => handleDelete(value.Id)}/>
            }
        }
    ]

    const columnTableQLLS = [
        {
            title: 'STT',
            width: '40px',
            align: 'center',
            render: (item, curr, index) => {
                return <Typography.Text key={item.id}>{index + 1}</Typography.Text>
            }
        },
        {
            title: 'Mã định danh',
            width: '100px',
            dataIndex: 'Id',
            key: 'Id',
        },
        {
            title: 'Mã thiết bị',
            width: '120px',
            dataIndex: 'dv',
            key: 'dv',
        },
        {
            title: 'Họ tên',
            width: '250px',
            dataIndex: 'Name',
            key: 'Name',
            render: (text, value, index) => {
                return (
                    <Typography.Text key={index}>
                        {text}
                    </Typography.Text>
                )
            }
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'Phone',
            key: 'Phone',
            width: '100px'
        },
        {
            title: 'Thời gian',
            dataIndex: 'Time',
            key: 'Time',
            width: '70px'
        },
        {
            title: 'Ngày',
            dataIndex: 'Date',
            key: 'Date',
            width: '70px',
        },
    ]

    const buttonsQLTB = [
        {
            name: 'Thêm thiết bị',
            onClick: () => setIsOpen(true),
            span: 3
        },
        {
            name: 'Thay đổi thông tin thiết bị',
            onClick: () => setChangeDevice(true),
            span: 3,
            style: {marginLeft: '-40px'}
        }
    ]

    const buttonsQLDS = [
        {
            name: 'Thêm nguời sử dụng',
            onClick: () => setIsOpen(true),
            span: 4
        },
        {
            name: 'Thay đổi vân tay',
            onClick: () => {
                const data = dataTableQLDS.map(item => {
                    return ({value: item.Id, label: item.Name})
                })
                setFormChangeFinger(prev => ({...prev, list: data}))
                setChangeID(true)
            },
            span: 3,
            style: {marginLeft: '-50px'}
        },
    ]

    return (
        <>
            {contextHolder}
            <Container>
                <MenuLv1 
                    setIsOpenChangeAccount={setIsOpenChangeAccount} 
                    setIsOpenChangePw={setIsOpenChangePw} 
                    setIsOpenChangeWifi={setIsOpenChangeWifi} 
                    activeMenuItem={activeMenuItem} 
                    setActiveMenuItem={setActiveMenuItem} 
                    menus={menu}
                    optionSelect={optionSelect}
                />
                <div style={{width: '100%', zIndex: 20}}>
                    <div className='ViewContainer'>
                        {
                            activeMenuItem === 'quanlythietbi' && 
                            <>
                                <BreadCrumb list={['Quản lý thiết bị', "Danh sách"]}/>
                                <HeadContainer 
                                    buttons={buttonsQLTB} 
                                    span={6} 
                                    disabled={true} 
                                    searchValue={searchValue} 
                                    setSearchValue={setSearchValue}
                                    handleSearch={handleSearch}
                                    handleReload={() => {
                                        handleGetDeviceDatabase()
                                        setSearchValue('')
                                    }}
                                    placeholder={'Tìm kiếm mã thiết bị'}
                                />
                                <Table 
                                    columns={columnTableQLTB}
                                    dataSource={dataTableQLTB}
                                    bordered
                                    size='small'
                                    pagination={false}
                                    style={{height: 'auto', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', borderBottom: '1px solid #f0f0f0'}}
                                    scroll={{
                                        y: 500,
                                      }}
                                />
                            </>
                        }
                        {
                            activeMenuItem === 'quanlydanhsach' &&
                            <>
                                <BreadCrumb list={["Quản lý danh sách", "Danh sách"]}/>
                                <HeadContainer 
                                    buttons={buttonsQLDS} 
                                    select 
                                    optionSelect={optionSelect}
                                    selectDevice={selectDevice} 
                                    span={10} 
                                    handleChangeSelect={(e) => handleChangeSelect(e)}
                                    searchValue={searchValue} 
                                    handleSearch={handleSearch}
                                    setSearchValue={setSearchValue}
                                    handleReload={() => {
                                        handleChangeSelect(selectDevice)
                                        setSearchValue('')
                                    }}
                                    placeholder={'Tìm kiếm tên'}
                                    />
                                <Table 
                                    columns={columnTableQLDS}
                                    dataSource={dataTableQLDS}
                                    bordered
                                    size='small'
                                    pagination={false}
                                    style={{height: 'auto', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', borderBottom: '1px solid #f0f0f0'}}
                                    scroll={{
                                        y: 500,
                                      }}
                                />
                            </>
                        }
                        {
                            activeMenuItem === 'quanlylichsu' &&
                            <>
                                <BreadCrumb list={["Quản lý lịch sử", "Danh sách"]}/>
                                <HeadContainer 
                                    buttons={[]} 
                                    select 
                                    optionSelect={optionSelect} 
                                    span={3} 
                                    handleChangeSelect={(e) => handleChangeSelect(e)}
                                    selectDevice={selectDevice}
                                    searchValue={searchValue} 
                                    handleSearch={handleSearch}
                                    setSearchValue={setSearchValue}
                                    handleReload={() => {
                                        handleChangeSelect(selectDevice)
                                        setSearchValue('')
                                    }}
                                    placeholder={'Tìm kiếm tên, ngày'}
                                />
                                <Table 
                                    columns={columnTableQLLS}
                                    dataSource={dataTableQLLS.reverse()}
                                    bordered
                                    size='small'
                                    pagination={false}
                                    style={{height: 'auto', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto', borderBottom: '1px solid #f0f0f0'}}
                                    scroll={{
                                        y: 500,
                                      }}
                                    loading={loading}
                                />
                            </>
                        }
                    </div>
                </div>
                {activeMenuItem === 'quanlydanhsach' && <Modal title='Xoá mã định danh' open={openAllowDelete} onOk={handleAllowDelete} onCancel={() => setOpenAllowDelete(false)}>
                    <p>Bạn có chắc chắn muốn xoá mã định danh <Typography.Text style={{fontWeight: 600}}>{idDelete}</Typography.Text></p>
                </Modal>}
                {activeMenuItem === 'quanlydanhsach' && <Modal title='Thêm người sử dụng' open={isOpen} 
                onCancel={() => {
                    setFormAddPer({Name: '', Dob: '', Phone: '', IdNumber: '', dv: ''})
                    setCheckForm({Name: false, Dob: false, Phone: false, IdNumber: false, dv: false})
                    setIsOpen(false)
                }}
                footer={[
                    <Button key='back' onClick={() => {
                        setFormAddPer({Name: '', Dob: '', Phone: '', IdNumber: '', dv: ''})
                        setCheckForm({Name: false, Dob: false, Phone: false, IdNumber: false, dv: false})
                        setIsOpen(false)
                    }}>
                        Huỷ
                    </Button>,
                    <Button key='submit' onClick={handleAddPerson} type='primary' loading={loading}>
                        Xác nhận 
                    </Button>
                ]}
                >
                    <Row gutter={[0, 4]}>
                        <Col span={6}>
                            <Typography.Text 
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Họ tên
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input
                                name='Name'
                                status={checkForm.Name ? `error` : ``}
                                placeholder='Nguyễn Văn A'
                                value={formAddPer.Name ? formAddPer.Name : ''}
                                onChange={e => setFormAddPer(prev => ({...prev, [e.target.name]: e.target.value}))}
                            />
                        </Col>
                        {
                            checkForm.Name && <Col span={24}>
                                <Typography.Text 
                                    style={{fontWeight: 300, marginLeft: 5, color: 'red'}}
                                >
                                    Trường họ tên chưa điền !
                                </Typography.Text>
                            </Col>
                        }
                        <Col span={6}>
                            <Typography.Text 
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Số CMND/CCCD
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input
                                name='IdNumber' 
                                status={checkForm.IdNumber ? `error` : ``}
                                placeholder='CMND/CCCD'
                                type='number'
                                value={formAddPer.IdNumber ? formAddPer.IdNumber : ''}
                                onChange={e => setFormAddPer(prev => ({...prev, [e.target.name]: e.target.value}))}
                            />
                        </Col>
                        {
                            checkForm.IdNumber && <Col span={24}>
                                <Typography.Text 
                                    style={{fontWeight: 300, marginLeft: 5, color: 'red'}}
                                >
                                    Trường CMND/CCCD chưa điền hoặc không hợp lệ !
                                </Typography.Text>
                            </Col>
                        }
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5, padding: '5px 0'}}>
                                Ngày sinh
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <DatePicker
                                status={checkForm.Dob ? `error` : ``}
                                style={{width: '100%'}} 
                                placeholder='01/01/2001'
                                format={'DD/MM/YYYY'}
                                onChange={(e, eString) => setFormAddPer(prev => ({...prev, Dob: eString}))}
                            />
                        </Col>
                        {
                            checkForm.Dob && <Col span={24}>
                                <Typography.Text 
                                    style={{fontWeight: 300, marginLeft: 5, color: 'red'}}
                                >
                                    Trường ngày sinh chưa điền !
                                </Typography.Text>
                            </Col>
                        }
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}>
                                Số điện thoại
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input
                                status={checkForm.Phone ? `error` : ``}
                                name='Phone' 
                                placeholder='0904870509'
                                value={formAddPer.Phone ? formAddPer.Phone : ''}
                                onChange={e => setFormAddPer(prev => ({...prev, [e.target.name]: e.target.value}))}
                            />
                        </Col>
                        {
                            checkForm.Phone && <Col span={24}>
                                <Typography.Text 
                                    style={{fontWeight: 300, marginLeft: 5, color: 'red'}}
                                >
                                    Trường số điện thoại chưa điền hoặc không hợp lệ !
                                </Typography.Text>
                            </Col>
                        }
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}>
                                Mã thiết bị
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Select 
                                style={{width: '100%'}}
                                placeholder='Chọn khu vực'
                                options={optionSelect}
                                value={formAddPer.dv ? formAddPer.dv : ''}
                                onChange={e => setFormAddPer(prev => ({...prev, dv: e}))}
                            />
                        </Col>
                        {
                            checkForm.dv && <Col span={24}>
                                <Typography.Text 
                                    style={{fontWeight: 300, marginLeft: 5, color: 'red'}}
                                >
                                    Trường mã thiết bị chưa điền !
                                </Typography.Text>
                            </Col>
                        }
                    </Row>
                </Modal>}
                {activeMenuItem === 'quanlythietbi' && <Modal title='Thêm thiết bị' open={isOpen} onCancel={() => setIsOpen(false)} onOk={handleAddDevice}>
                    <Row gutter={[0, 8]}>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Mã thiết bị
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input 
                                name='dv'
                                placeholder='DV01'
                                value={formAddDevice.dv ? formAddDevice.dv : ''}
                                onChange={(e) => setFormAddDevice(prev => ({...prev, [e.target.name]: e.target.value}))}
                                />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Người quản lý
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input 
                                name='Manager'
                                placeholder='Nguyễn Văn A'
                                value={formAddDevice.Manager ? formAddDevice.Manager : ''}
                                onChange={(e) => setFormAddDevice(prev => ({...prev, [e.target.name]: e.target.value}))}
                                />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Địa chỉ
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input
                                name='Address' 
                                placeholder='280/2A khu phố ABC, Phường XYZ'
                                value={formAddDevice.Address ? formAddDevice.Address : ''}
                                onChange={e => setFormAddDevice(prev => ({...prev, [e.target.name]: e.target.value}))}
                                />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Email
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input
                                name='Email' 
                                placeholder='user@gmail.com'
                                value={formAddDevice.Email ? formAddDevice.Email : ''}
                                onChange={e => setFormAddDevice(prev => ({...prev, [e.target.name]: e.target.value}))}
                                />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Số điện thoại
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input 
                                name='Phone'
                                placeholder='0904xxxxxx'
                                value={formAddDevice.Phone ? formAddDevice.Phone : ''}
                                onChange={e => setFormAddDevice(prev => ({...prev, [e.target.name]: e.target.value}))}
                                />
                        </Col>
                    </Row>
                </Modal>}
                {activeMenuItem === 'quanlydanhsach' && <Modal title='Thay đổi vân tay' open={changeID} 
                onCancel={() => {
                    setFormChangeFinger(prev => ({...prev, Id: '', Name: ''}))
                    setChangeID(false)
                }}
                footer={[
                    <Button key='back' onClick={() => {
                        setFormChangeFinger(prev => ({...prev, Id: '', Name: ''}))
                        setChangeID(false)
                    }}>
                        Huỷ
                    </Button>,
                    <Button key='submit' onClick={handleChangeFinger} type='primary' loading={loading}>
                        Xác nhận 
                    </Button>
                ]}
                >
                    <Row gutter={[0, 8]}>
                        <Col span={8}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Người sử dụng
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Select
                                value={formChangeFinger.Name ? formChangeFinger.Name : ''}
                                style={{width: '100%'}}
                                options={formChangeFinger.list}
                                onChange={(e, val) => setFormChangeFinger(prev => ({...prev, Id: e, Name: val.label}))}
                                />
                        </Col>
                    </Row>
                </Modal>}
                <Modal title='Cài đặt mật khẩu bàn phím' open={isOpenChangePw} 
                    onCancel={() => {
                        setFormChangePassword({dv: '', oldPw: '', newPw: '', confirmPw: ''})
                        setIsOpenChangePw(false)
                        }
                    } 
                    footer={[
                        <Button key='back' onClick={() => {
                            setFormChangePassword({dv: '', oldPw: '', newPw: '', confirmPw: ''})
                            setIsOpenChangePw(false)
                        }}>
                            Huỷ
                        </Button>,
                        <Button key='submit' onClick={handleChangePassword} type='primary'>
                            Xác nhận 
                        </Button>
                    ]}>
                    <Row gutter={[0,6]}>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Mã thiết bị
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Select 
                                value={formChangePassword.dv ? formChangePassword.dv : ''}
                                style={{width: '100%'}}
                                options={optionSelect}
                                onChange={e => setFormChangePassword(prev => ({...prev, dv: e}))}
                            />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Mật khẩu cũ
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input.Password
                                name='oldPw'
                                value={formChangePassword.oldPw ? formChangePassword.oldPw : ''}
                                onChange={e => setFormChangePassword(prev => ({...prev, [e.target.name]: e.target.value}))}
                                maxLength={6}
                                placeholder='Ký tự số 0-9' 
                            />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Mật khẩu mới
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input.Password 
                                name='newPw'
                                value={formChangePassword.newPw ? formChangePassword.newPw : ''}
                                onChange={e => setFormChangePassword(prev => ({...prev, [e.target.name]: e.target.value}))}
                                maxLength={6}
                                placeholder='Ký tự số 0-9' 
                            />
                        </Col>
                        <Col span={8}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Xác nhận mật khẩu
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input.Password 
                                name='confirmPw'
                                value={formChangePassword.confirmPw ? formChangePassword.confirmPw : ''}
                                onChange={e => setFormChangePassword(prev => ({...prev, [e.target.name]: e.target.value}))}
                                maxLength={6}
                                placeholder='Ký tự số 0-9' 
                            />
                        </Col>
                    </Row>
                </Modal>
                <Modal title='Cài đặt Wifi' 
                    open={isOpenChangeWifi} 
                    onCancel={() => {
                        setFormChangeWifi({dv: '', SSID: '', PASS: ''})
                        setIsOpenChangeWifi(false)
                    }}
                    footer={[
                        <Button key='back' onClick={() => {
                            setFormChangeWifi({dv: '', SSID: '', PASS: ''})
                            setIsOpenChangeWifi(false)
                        }}>
                            Huỷ
                        </Button>,
                        <Button key='submit' onClick={handleChangeWifi} type='primary'>
                            Xác nhận 
                        </Button>
                    ]}
                > 
                    <Row gutter={[0,6]}>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Mã thiết bị
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Select 
                                style={{width: '100%'}}
                                value={formChangeWifi.dv ? formChangeWifi.dv : ''}
                                options={optionSelect}
                                onChange={e => setFormChangeWifi(prev => ({...prev, dv: e}))}
                            />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Tên wifi
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input 
                                name='SSID'
                                value={formChangeWifi.SSID ? formChangeWifi.SSID : ''}
                                onChange={e => setFormChangeWifi(prev => ({...prev, [e.target.name]: e.target.value}))}
                            />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Mật khẩu wifi
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input 
                                name='PASS'
                                value={formChangeWifi.PASS ? formChangeWifi.PASS : ''}
                                onChange={e => setFormChangeWifi(prev => ({...prev, [e.target.name]: e.target.value}))}
                            />
                        </Col>
                    </Row>
                </Modal>
                <Modal title="Cài đặt tài khoản" open={isOpenChangeAccount} 
                    onCancel={() => {
                        setFormChangeAccount({oldEmail: '', newEmail: '', code: ''})
                        setIsOpenChangeAccount(false)
                    }}
                    style={{zIndex: 10}}
                    footer={[
                        <Button key='back' onClick={() => {
                            setFormChangeAccount({oldEmail: '', newEmail: '', code: ''})
                            setIsOpenChangeAccount(false)
                        }}>
                            Huỷ
                        </Button>,
                        <Button key='submit' onClick={handleChangeAccount} type='primary'>
                            Xác nhận 
                        </Button>
                    ]}>
                    <Row gutter={[0, 8]}>
                        <Col span={24}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                               Email đăng nhập cũ
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input 
                                name='oldEmail'
                                value={formChangeAccount.oldEmail ? formChangeAccount.oldEmail : ''}
                                onChange={e => setFormChangeAccount(prev => ({...prev, [e.target.name]: e.target.value}))}
                            />
                        </Col>
                        {alertFormChangeAccount.oldEmail && <Col span={24}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5, color: 'red'}}
                            >
                               {alertFormChangeAccount.oldEmail}
                            </Typography.Text>
                        </Col>}
                        <Col span={24}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Email đăng nhập mới
                            </Typography.Text>
                        </Col>
                        <Col span={19}>
                            <Input 
                                name='newEmail'
                                value={formChangeAccount.newEmail ? formChangeAccount.newEmail : ''}
                                onChange={e => setFormChangeAccount(prev => ({...prev, [e.target.name]: e.target.value}))}
                            />
                        </Col>
                        <Col span={1}></Col>
                        <Col span={4}>
                            <Button type='primary' onClick={handleSendMailToNewAccount} loading={loading}>Gửi mã</Button>
                        </Col>
                        {alertFormChangeAccount.newEmail && <Col span={24}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5, color: 'red'}}
                            >
                               {alertFormChangeAccount.newEmail}
                            </Typography.Text>
                        </Col>}
                        <Col span={24}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Mã xác nhận
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input 
                                maxLength={6}
                                name='code'
                                value={formChangeAccount.code ? formChangeAccount.code : ''}
                                onChange={e => setFormChangeAccount(prev => ({...prev, [e.target.name]: e.target.value}))}
                            />
                        </Col>
                        {alertFormChangeAccount.code && <Col span={24}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5, color: 'red'}}
                            >
                               {alertFormChangeAccount.code}
                            </Typography.Text>
                        </Col>}
                    </Row>
                </Modal>
                <Modal title='Thay đổi thông tin thiết bị' open={changeDevice}
                    onCancel={() => {
                        setFormChangeDevice({dv: '', Address: '', Phone: '', Manager: '', Email: ''})
                        setChangeDevice(false)
                    }}
                    footer={[
                        <Button key='back' onClick={() => {
                            setFormChangeDevice({dv: '', Address: '', Phone: '', Manager: '', Email: ''})
                            setChangeDevice(false)
                        }}>
                            Huỷ
                        </Button>,
                        <Button key='submit' onClick={handleChangeDevice} type='primary'>
                            Xác nhận 
                        </Button>
                    ]}
                >
                    <Row gutter={[0,8]}>
                        <Col span={24}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                               Mã thiết bị
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Select 
                                style={{width: '100%'}}
                                value={formChangeDevice.dv ? formChangeDevice.dv : ''}
                                options={optionSelect}
                                onChange={e => setFormChangeDevice(prev => ({...prev, dv: e}))}
                            />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Người quản lý
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input 
                                name='Manager'
                                placeholder='Nguyễn Văn A'
                                value={formChangeDevice.Manager ? formChangeDevice.Manager : ''}
                                onChange={(e) => setFormChangeDevice(prev => ({...prev, [e.target.name]: e.target.value}))}
                                />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Địa chỉ
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input
                                name='Address' 
                                placeholder='280/2A khu phố ABC, Phường XYZ'
                                value={formChangeDevice.Address ? formChangeDevice.Address : ''}
                                onChange={e => setFormChangeDevice(prev => ({...prev, [e.target.name]: e.target.value}))}
                                />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Email
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input
                                name='Email' 
                                placeholder='user@gmail.com'
                                value={formChangeDevice.Email ? formChangeDevice.Email : ''}
                                onChange={e => setFormChangeDevice(prev => ({...prev, [e.target.name]: e.target.value}))}
                                />
                        </Col>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Số điện thoại
                            </Typography.Text>
                        </Col>
                        <Col span={24}>
                            <Input 
                                name='Phone'
                                placeholder='0904xxxxxx'
                                value={formChangeDevice.Phone ? formChangeDevice.Phone : ''}
                                onChange={e => setFormChangeDevice(prev => ({...prev, [e.target.name]: e.target.value}))}
                                />
                        </Col>
                    </Row>
                </Modal>
            </Container>
        </>
    )
}

export default Home
