import { Col, Row, Space } from 'antd'
import React from 'react'
import './Navbar.css'

export default function Navbar() {
  return (
    <>
        <Row className='navbar-laybout' justify={'start'}>
            <Col span={24}>
                <Col span={8}>
                    <Space>
                        <p>He Who Remains</p>
                    </Space>
                </Col>
            </Col>
        </Row>  
    </>
  )
}
