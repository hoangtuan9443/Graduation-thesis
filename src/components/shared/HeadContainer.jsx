import { Row, Col, Button, Input, Select } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import './headContainer.css'

function HeadContainer({
    buttons = [], 
    select = false, 
    span = 0, 
    optionSelect = [], 
    handleChangeSelect, 
    selectDevice, 
    disabled = false,
    searchValue,
    setSearchValue,
    handleSearch,
    handleReload,
    placeholder
}) {

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
                            value={selectDevice ? selectDevice : ''}
                            onChange={handleChangeSelect}
                            />
                    </Col>
                }
                <Col span={5}>
                    <div className='customSearchInput'>
                        <Input 
                            className='customSearchInput__input' 
                            placeholder={placeholder} 
                            style={{width: '73%', border: 'none'}}
                            value={searchValue ? searchValue : ''}
                            onChange={e => setSearchValue(e.target.value)}
                            />
                        <Button 
                            icon={<ReloadOutlined />}
                            size={10}
                            style={{borderRadius: 20}}
                            onClick={handleReload}
                        ></Button>
                        <Button 
                            icon={<SearchOutlined />}
                            type='primary'
                            size={10}
                            style={{borderRadius: 20, marginLeft: 5}}
                            disabled={disabled || selectDevice ? false : true}
                            onClick={handleSearch}
                        ></Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default HeadContainer
