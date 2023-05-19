import {useState, useEffect} from 'react'
import { FileTextOutlined, ClusterOutlined, UnorderedListOutlined, DeleteOutlined, ContactsOutlined, TableOutlined, WifiOutlined } from '@ant-design/icons'
import { Typography, Table, Pagination, Modal, Tag, Input, Select, DatePicker, Row, Col } from 'antd'

import '../../styles/home.css'
import MenuLv1 from '../shared/MenuLv1'
import Container from '../shared/Container'
import HeadContainer from '../shared/HeadContainer'
import BreadCrumb from '../shared/BreadCrumb'
import { dbRef, putData, removeData } from '../../Firebase/config.js'
import { get, onValue } from 'firebase/database'
import moment from 'moment/moment'

function Home() {

    const [activeMenuItem, setActiveMenuItem] = useState('quanlythietbi')
    const [selectDevice, setSelectDevice] = useState('')
    const [isMenuChange, setIsMenuChange] = useState(false)
    const [openAllowDelete, setOpenAllowDelete] = useState(false)
    const [changeID, setChangeID] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [connectDevice, setConnectDevice] = useState(false)
    const [isOpenChangePw, setIsOpenChangePw] = useState(false)
    const [isOpenChangeWifi, setIsOpenChangeWifi] = useState(false)
    const [checkForm, setCheckForm] = useState({Name: false, Dob: false, Phone: false, IdNumber: false, dv: false})
    const [idDelete, setIdDelete] = useState(0)
    const [optionSelect, setOptionSelect] = useState(() => {
        const data = []
        get(dbRef).then(snapshot => {
            snapshot.child('/dv').forEach(node => {
                data.push({value: node.key, label: node.key.toUpperCase()})
            })
        }).catch(err => {
            console.log(err)
        })
        return data 
    })
    const [dataTableQLDS, setDataTableQLDS] = useState([])
    const [dataTableQLTB, setDataTableQLTB] = useState([])
    const [dataTableQLLS, setDataTableQLLS] = useState([])
    const [formAddPer, setFormAddPer] = useState(
        {Name: '', Dob: '', Phone: '', IdNumber: '', dv: ''}
    )
    const [formAddDevice, setFormAddDevice] = useState(
        {dv: '', Address: '', Phone: '', Manager: '', Email: ''}
    )
    const [formChangeFinger, setFormChangeFinger] = useState({Id: '', Name: '', list: []})
    const [formChangePassword, setFormChangePassword] = useState({dv: '', oldPw: '', newPw: '', confirmPw: ''})
    const [formChangeWifi, setFormChangeWifi] = useState({dv: '', SSID: '', PASS: ''})
    const [formConnectDevice, setFormConnectDevice] = useState({dv: ''})

    useEffect(() => {
        onValue(dbRef, snapshot => {
            let newData = []
            snapshot.child('/dv/').forEach(node => {
                newData.push({...node.child('/detail').val()})
                setDataTableQLTB(newData)
            })
        })
    }, [])

    useEffect(() => {
        if(selectDevice) {
            onValue(dbRef, snapshot => {
                let history = []
                snapshot.child(`/listUsedId/${selectDevice}`).forEach(node => {
                    node.forEach(doc => {
                        get(dbRef).then(item => {
                            let temp = {}
                            item.child(`/dv/${selectDevice}/IDs`).forEach(valId => {
                                if(doc.val() === valId.child('/Id').val()){
                                    return temp = {
                                        Name: valId.child('/Name').val(),
                                        Phone: valId.child('/Phone').val()
                                    }
                                }
                            })
                            history.push({
                                Id: doc.val(),
                                dv: selectDevice.toUpperCase(),
                                Date: node.key,
                                Time: doc.key,
                                ...temp
                            })
                        }).catch(err => console.log(err))
                        setDataTableQLLS(history)
                    })
                })
            })
        }
    }, [selectDevice])

    const handleChangePassword = () => {
        if(formChangePassword.dv && formChangePassword.oldPw && formChangePassword.newPw && formChangePassword.confirmPw){
            get(dbRef).then(snapshot => {
                if(formChangePassword.oldPw === snapshot.child(`/dv/${formChangePassword.dv}/Key`).val() && formChangePassword.newPw === formChangePassword.confirmPw){
                    putData(`/dv/${formChangePassword.dv}/Key`, formChangePassword.newPw)
                    putData(`/dv/${formChangePassword.dv}/Action`, 5)
                    setFormChangePassword({dv: '', oldPw: '', newPw: '', confirmPw: ''})
                    setIsOpenChangePw(false)
                }
            })
        }
    }

    const handleChangeWifi = () => {
        if(formChangeWifi.dv && formChangeWifi.SSID && formChangeWifi.PASS) {
            putData(`/dv/${formChangeWifi.dv}/SSID`, formChangeWifi.SSID)
            putData(`/dv/${formChangeWifi.dv}/PASS`, formChangeWifi.PASS)
            setFormChangeWifi({dv: '', SSID: '', PASS: ''})
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
    }

    const handleAddPerson = async () => {
        if(formAddPer.Name && formAddPer.Dob && formAddPer.Phone.length >= 10 && (formAddPer.IdNumber.length === 9 || formAddPer.IdNumber.length === 12) && formAddPer.dv){
            let countID = 0
            await get(dbRef).then(snapshot => {
                let i = 0
                let less = 0
                snapshot.child(`/dv/${formAddPer.dv}/IDs`).forEach(node => {
                    i++
                    countID = node.key
                    console.log(countID, i)
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
            putData(`/dv/${formAddPer.dv}/IDs/${countID}`, {
                Name: formAddPer.Name,
                Dob: formAddPer.Dob,
                IdNumber: Number(formAddPer.IdNumber),
                Phone: formAddPer.Phone,
                CreatedDate: date,
                CreatedTime: time,
                Id: countID
            })
            putData(`/dv/${formAddPer.dv}/IDtemp`, countID)
            putData(`/dv/${formAddPer.dv}/waitScan`, 1)
            putData(`/dv/${formAddPer.dv}/Action`, 1)
            // setDataTableQLDS(prev => [...prev, {...formAddPer, CreatedDate: date, CreatedTime: time, Id: countID}])
            setCheckForm({Name: false, Dob: false, Phone: false, IdNumber: false, dv: false})
            setFormAddPer({Name: '', Dob: '', Phone: '', IdNumber: '', dv: ''})
            setIsOpen(false)
        }else{
            !formAddPer.Name ? setCheckForm(prev => ({...prev, Name: true})) : setCheckForm(prev => ({...prev, Name: false}))
            !formAddPer.Dob ? setCheckForm(prev => ({...prev, Dob: true})) : setCheckForm(prev => ({...prev, Dob: false}))
            formAddPer.Phone.length < 10 ? setCheckForm(prev => ({...prev, Phone: true})) : setCheckForm(prev => ({...prev, Phone: false}))
            formAddPer.IdNumber.length != 9 || formAddPer.IdNumber.length != 12 ? setCheckForm(prev => ({...prev, IdNumber: true})) : setCheckForm(prev => ({...prev, IdNumber: false}))
            !formAddPer.dv ? setCheckForm(prev => ({...prev, dv: true})) : setCheckForm(prev => ({...prev, dv: false}))
        }
    }
    
    const handleChangeSelect = (e) => {
        // get(dbRef).then(snapshot => {
        //     snapshot.child('/dv/' + e + '/IDs').forEach(doc => {
        //         setDataTableQLDS(prev => [...prev, {...doc.val()}])
        //     })
        // }).catch(err => {
        //     console.log(err)
        // })
        onValue(dbRef, snapshot => {
            let newData = []
            snapshot.child('/dv/' + e + '/IDs').forEach(doc => {
                newData.push({...doc.val()})
                setDataTableQLDS(newData)
            })
        })
        setSelectDevice(e)
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
                setFormAddDevice({dv: '', Address: '', Phone: '', Manager: '', Email: ''})
                setIsOpen(false)
            }
        }else {
    
        }
        
    }

    const handleChangeFinger = () => {
        if(formChangeFinger.Id){
            putData(`/dv/${selectDevice}/IDtemp/`, formChangeFinger.Id)
            putData(`/dv/${selectDevice}/Action`, 1)
            putData(`/dv/${selectDevice}/waitScan`, 1)
            setFormChangeFinger(prev => ({...prev, Id: '', Name: ''}))
            setChangeID(false)
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
            title: 'Mã khu vực',
            width: '120px',
            dataIndex: 'dv',
            key: 'dv',
            sorter: (a, b) => {

            }
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
            width: '100px',
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
            sorter: () => {}
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
            title: 'Mã khu vực',
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
            sorter: () => {}
        },
    ]

    const buttonsQLTB = [
        {
            name: 'Thêm thiết bị',
            onClick: () => setIsOpen(true),
            span: 3
        },
        {
            name: 'Kết nối thiết bị',
            onClick: () => setConnectDevice(true),
            span: 3,
            style: {marginLeft: '-40px'}
        }
    ]

    const buttonsQLDS = [
        {
            name: 'Thêm nguời',
            onClick: () => setIsOpen(true),
            span: 3
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
            <Container>
                <MenuLv1 setIsOpenChangePw={setIsOpenChangePw} setIsOpenChangeWifi={setIsOpenChangeWifi} activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} style={`${isMenuChange ? 'MenuChange' : ''}`} menus={menu}/>
                <div style={{width: '100%', zIndex: 20}}>
                    {/* <div className='headTitle'> */}
                        {/* <UnorderedListOutlined className='headTitle__box' onClick={() => setIsMenuChange(true)}/> */}
                        {/* <TableOutlined className='headTitle__box' onClick={() => setIsOpenChangePw(true)}/>
                        <WifiOutlined className='headTitle__box' onClick={() => setIsOpenChangeWifi(true)}/> */}
                    {/* </div> */}
                    <div className='ViewContainer'>
                        {
                            activeMenuItem === 'quanlythietbi' && 
                            <>
                                <BreadCrumb list={['Quản lý thiết bị', "Danh sách"]}/>
                                <HeadContainer buttons={buttonsQLTB} span={6}/>
                                <Table 
                                    columns={columnTableQLTB}
                                    dataSource={dataTableQLTB}
                                    bordered
                                    size='small'
                                    pagination={false}
                                    style={{height: 'auto', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
                                />
                                <Pagination 
                                    defaultCurrent={1}
                                    total={1}
                                    pageSize={1}
                                    current={1}
                                    // onChange={}
                                    style={{textAlign: 'right', marginTop: 10}}
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
                                    span={9} handleChangeSelect={(e) => handleChangeSelect(e)}
                                    />
                                <Table 
                                    columns={columnTableQLDS}
                                    dataSource={dataTableQLDS}
                                    bordered
                                    size='small'
                                    pagination={false}
                                    style={{height: 'auto', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
                                />
                                <Pagination 
                                    defaultCurrent={1}
                                    total={1}
                                    pageSize={1}
                                    current={1}
                                    // onChange={}
                                    style={{textAlign: 'right', marginTop: 10}}
                                    />
                            </>
                        }
                        {
                            activeMenuItem === 'quanlylichsu' &&
                            <>
                                <BreadCrumb list={["Quản lý lịch sử", "Danh sách"]}/>
                                <HeadContainer buttons={[]} select optionSelect={optionSelect} span={3} handleChangeSelect={(e) => handleChangeSelect(e)}/>
                                <Table 
                                    columns={columnTableQLLS}
                                    dataSource={dataTableQLLS}
                                    bordered
                                    size='small'
                                    pagination={false}
                                    style={{height: 'auto', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto'}}
                                />
                                <Pagination 
                                    defaultCurrent={1}
                                    total={1}
                                    pageSize={1}
                                    current={1}
                                    // onChange={}
                                    style={{textAlign: 'right', marginTop: 10}}
                                    />
                            </>
                        }
                    </div>
                </div>
                {activeMenuItem === 'quanlydanhsach' && <Modal title='Xoá mã định danh' open={openAllowDelete} onOk={handleAllowDelete} onCancel={() => setOpenAllowDelete(false)}>
                    <p>Bạn có chắc chắn muốn xoá mã định danh <Typography.Text style={{fontWeight: 600}}>{idDelete}</Typography.Text></p>
                </Modal>}
                {activeMenuItem === 'quanlydanhsach' && <Modal title='Thêm người' open={isOpen} onCancel={() => setIsOpen(false)} onOk={handleAddPerson}>
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
                                Mã khu vực
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
                                    Trường mã khu vực chưa điền !
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
                                Mã khu vực
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
                {activeMenuItem === 'quanlydanhsach' && <Modal title='Thay đổi vân tay' open={changeID} onCancel={() => setChangeID(false)} onOk={handleChangeFinger}>
                    <Row gutter={[0, 8]}>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Họ tên
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
                {activeMenuItem === 'quanlythietbi' && <Modal title='Kết nối thiết bị' open={connectDevice} onCancel={() => setConnectDevice(false)}>
                        <Row gutter={[0, 8]}>
                            <Col span={6}>
                                <Typography.Text
                                    style={{fontWeight: 600, marginLeft: 5}}
                                >
                                    Mã khu vực
                                </Typography.Text>
                            </Col>
                            <Col span={24}>
                                <Select
                                    value={formConnectDevice.dv ? formConnectDevice.dv : ''}
                                    style={{width: '100%'}}
                                    options={optionSelect}
                                    onChange={e => setFormConnectDevice({dv: e})}
                                />
                            </Col>
                        </Row>
                </Modal>}
                <Modal title='Đổi mật khẩu bàn phím số' open={isOpenChangePw} 
                    onCancel={() => {
                        setFormChangePassword({dv: '', oldPw: '', newPw: '', confirmPw: ''})
                        setIsOpenChangePw(false)
                        }
                    } onOk={handleChangePassword}>
                    <Row gutter={[0,6]}>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Mã khu vực
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
                            />
                        </Col>
                    </Row>
                </Modal>
                <Modal title='Đổi wifi' 
                    open={isOpenChangeWifi} 
                    onOk={handleChangeWifi}
                    onCancel={() => {
                        setFormChangeWifi({dv: '', SSID: '', PASS: ''})
                        setIsOpenChangeWifi(false)
                    }}
                > 
                    <Row gutter={[0,6]}>
                        <Col span={6}>
                            <Typography.Text
                                style={{fontWeight: 600, marginLeft: 5}}
                            >
                                Mã khu vực
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
            </Container>
        </>
    )
}

export default Home
