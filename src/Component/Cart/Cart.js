import React, { useEffect, useRef, useState } from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import Layout from '../Layout/Layout';
import { getCart, removeItem, updateItem } from '../../api/cart';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";



const Cart = () => {
    const ref = useRef(null);
    // products item
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(items.count);
    // credit card
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");

    //get cart data
    useEffect(() => {
        setItems(getCart());
    }, []);

    // total value
    const getTotal = () => {
        return items.reduce((currentvalue, nextValue) => {
            return currentvalue + nextValue.count * nextValue.price;
        }, 0);
    };

    //update prodcut quantity
    const handelChnage = (productId, eventValue) => {
        setCount(eventValue < 1 ? 1 : eventValue);
        if (eventValue >= 1) {
            let updatePrice = updateItem(productId, eventValue);
            setItems(updatePrice)
        }
    };

    useEffect(() => {
        ref.current.focus();
    }, []);

    // delete product
    const deleteProduct = async (id) => {
        let newCart = await removeItem(id);
        setItems(newCart);
    }

    return (
        <>
            <Layout
                title="E-commerce"
            >
                <section className='cartSection'>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="shopping-cart">
                                    <div className="title">
                                        <h1>Shopping Cart</h1>

                                    </div>
                                    <div className="table-responsive">
                                        <table className="table productCart text-center">
                                            <thead>
                                                <tr>
                                                    <th>Product Image</th>
                                                    <th>Product name</th>
                                                    <th>Product Quantity</th>
                                                    <th>Product price</th>
                                                    <th>Delete product</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map(data =>
                                                    <tr key={data.id} className='align-middle'>
                                                        <th scope="row">
                                                            <div className="productImage">
                                                                <img src={data.image} alt="product" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className="productname">
                                                                <p>{data.name}</p>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="quantity">
                                                                <input type="number" value={data.count} onChange={(e) => handelChnage(data.id, e.target.value)} />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="total-price">$ {data.price * data.count}</div>
                                                        </td>
                                                        <td>
                                                            <div className="deleteBtn">
                                                                <button onClick={() => deleteProduct(data.id)} className="delete-btn">
                                                                    <FontAwesomeIcon icon={faClose} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <td colSpan={5} className='totalAmount'><p >Total Value: {getTotal()}</p></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </Col>

                            <Col md={6}>
                                <div className='checkoutInfo'>
                                    <ul className="form-style-1">
                                        <li><label>Full Name <span className="required">*</span></label>
                                            <input type="text" name="field1" className="form-control" placeholder="Full name" required /></li>
                                        <li>
                                            <label>Email <span className="required">*</span></label>
                                            <input type="email" name="field3" className="field-long" placeholder="E-mail address" required />
                                        </li>

                                        <li>
                                            <label>Your Address <span className="required">*</span></label>
                                            <textarea name="field5" id="field5" className="field-long field-textarea" placeholder="Address" required></textarea>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="App-payment">
                                    <Card
                                        number={number}
                                        name={name}
                                        expiry={expiry}
                                        cvc={cvc}
                                        focused={focus}
                                    />
                                    <div className='cardBox'>
                                        <input
                                            type="tel"
                                            name="number"
                                            placeholder="Card Number"
                                            className='form-control'
                                            maxLength="16"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            onFocus={(e) => setFocus(e.target.name)}
                                            ref={ref}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            className='form-control'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            onFocus={(e) => setFocus(e.target.name)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            pattern="\d\d/\d\d"
                                            maxLength="4"
                                            className='form-control'
                                            value={expiry}
                                            onChange={(e) => setExpiry(e.target.value)}
                                            onFocus={(e) => setFocus(e.target.name)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="cvc"
                                            maxLength="4"
                                            placeholder="CVC"
                                            className='form-control'
                                            value={cvc}
                                            onChange={(e) => setCvc(e.target.value)}
                                            onFocus={(e) => setFocus(e.target.name)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='checkout'>
                                    <Link type='submit' to='/thankyou'>Confirm Order</Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>

        </>
    )
}

export default Cart