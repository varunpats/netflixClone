import React, { useEffect, useState } from 'react';
import './Planscreen.css';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import postscribe from 'postscribe';

export default function Planscreen() {
    // postscribe('.planscreen_plan', '<script src="https://js.stripe.com/v3/"></script>');
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("products")
            .where("active", "==", true)
            .get()
            .then((querySnapshot) => {
                const products = {};
                querySnapshot.forEach(async (prod) => {
                    products[prod.id] = prod.data();
                    const priceSnap = await prod.ref.collection('prices').get();
                    priceSnap.docs.forEach(price => {
                        products[prod.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                });
                setProducts(products)
            })
    }, [])

    const loadCheckout = async (priceId) => {
        const docRef = await db.collection("customers")
            .doc(user.uid).collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin
            });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                alert(`An error occured: ${error.message}`)
            }

            console.log(docRef.price);

            // if (sessionId) {
            //     const stripe = loadStripe('pk_test_51OKxKhSE833rR16LEoIhaOAx2kC5iLUghQekgExXPffJnDZyIjA74SNzWhwf9zw0Kw9eQ4aNRMb4sSkk57mBF0B200WRVgqyE7')
            //     stripe.redirectToCheckout({ sessionId })
            // }
        })
    }

    return (
        <div className='planscreen'>
            {Object.entries(products).map(([productId, productData]) => {
                return (
                    <div className='planscreen_plan'>
                        <div className='planscreen_info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
                    </div>
                )
            })}
        </div>
    )
}
