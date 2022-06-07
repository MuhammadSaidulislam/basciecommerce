import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Layout from '../Layout/Layout'
import './ThankYou.css'

const ThankYou = () => {
  return (
    <>
    <Layout
    title="E-commerce"
>

<Container>
<Row>
<Col md={12}>
<div className='thankyou'>
<h1>Thank you for order</h1>
</div>
</Col>
</Row>
</Container>
</Layout>
    
    </>
  )
}

export default ThankYou