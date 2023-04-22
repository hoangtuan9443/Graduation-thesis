import { Row, Col, Button, Input, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './headContainer.css'

function HeadContainer({buttons = [], select = false, span = 0, optionSelect = [], handleChangeSelect}) {
    return (
        <div style={{width: '100%', paddingBottom: 10, marginTop: 10}}>
            <Row>
                {
                    buttons.map((item, index) => {
                        return (
                            <Col key={index} span={item.span} style={{marginTop: 5}}>
                                <Button
                                    type='primary'
                                    onClick={item.onClick}
                                    style={item.style}
                                    >
                                        {item.name}
                                </Button>
                            </Col>
                        )
                    })
                }
                <Col span={19-span}></Col>
                {
                    select && <Col span={3}>
                        <Select 
                            placeholder='Chọn khu vực'
                            style={{width: '90%', marginRight: 10, marginTop: 5}}
                            options={optionSelect}
                            onChange={handleChangeSelect}
                            />
                    </Col>
                }
                <Col span={5}>
                    <div className='customSearchInput'>
                        <Input className='customSearchInput__input' placeholder='Tìm kiếm' style={{width: '85%', border: 'none'}}/>
                        <Button 
                            icon={<SearchOutlined />}
                            type='primary'
                            size={10}
                            style={{borderRadius: 20, marginLeft: 5}}
                        ></Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HeadContainer
