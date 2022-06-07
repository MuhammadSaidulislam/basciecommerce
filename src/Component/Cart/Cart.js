import React, { useEffect, useState } from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCoffee, faDeleteLeft, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Layout from '../Layout/Layout';
import { getCart,removeItem } from '../../api/auth';
import { Col, Container, Row } from 'react-bootstrap';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    //get cart data
    useEffect(() => {
        setItems(getCart());
    }, [run]);

    // console.log('cart',items);

    // plus minus product item
    let [count, setCount] = useState(1);

    function incrementCount() {
        count = count + 1;
        setCount(count);
    }
    function decrementCount() {
        count = count - 1;
        setCount(count);
    }

    return (
        <>
            <Layout
                title="E-commerce"
            >
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="shopping-cart">
                                <div className="title">
                                    <h1>Shopping Cart</h1>
                                </div>
                                <table className="table productCart">
                                    <tbody>
                                        {items.map(data =>
                                            <tr>
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
                                                        <button onClick={decrementCount} className="minus-btn" type="button" name="button">
                                                            <FontAwesomeIcon icon={faMinusCircle} />
                                                        </button>
                                                        <input type="text" value={count} />
                                                        <button onClick={incrementCount} className="plus-btn" type="button" name="button">
                                                            <FontAwesomeIcon icon={faPlusCircle} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="total-price">$ {data.price}</div>
                                                </td>
                                                <td>
                                                    <div className="deleteBtn">
                                                        <button onClick={()=>removeItem(data.id)} className="delete-btn">
                                                            <FontAwesomeIcon icon={faClose} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Layout>

        </>
    )
}

export default Cart