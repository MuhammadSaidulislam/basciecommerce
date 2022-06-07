import React, { useEffect, useState } from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCoffee, faDeleteLeft, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Layout from '../Layout/Layout';
import { getCart, removeItem, updateItem } from '../../api/auth';
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
    // let [count, setCount] = useState(1);

    // function incrementCount() {
    //     count = count + 1;
    //     setCount(count);
    // }
    // function decrementCount() {
    //     count = count - 1;
    //     setCount(count);
    // }

    // total value
    const getTotal = () => {
        return items.reduce((currentvalue, nextValue) => {
            return currentvalue + nextValue.count * nextValue.price;
        }, 0);
    };


    // update quantity
     //update prodcut qnt
     const [count, setCount] = useState(items.count);
  const handelChnage = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

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
                                    <h1>Shopping Cart {items.length}</h1>

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
                                                        <button className="minus-btn" type="button" name="button">
                                                            <FontAwesomeIcon icon={faMinusCircle} />
                                                        </button>
                                                        <input type="number" value={count} onChange={handelChnage(data.id)} />
                                                        <button className="plus-btn" type="button" name="button">
                                                            <FontAwesomeIcon icon={faPlusCircle} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="total-price">$ {data.price}</div>
                                                </td>
                                                <td>
                                                    <div className="deleteBtn">
                                                        <button onClick={() => removeItem(data.id)} className="delete-btn">
                                                            <FontAwesomeIcon icon={faClose} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={4} className='totalAmount'><p >Total Value: {getTotal()}</p></td>
                                        </tr>
                                    </tfoot>
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