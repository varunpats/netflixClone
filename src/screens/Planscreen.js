import React, { useEffect, useState } from 'react';
import './Planscreen.css';
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export default function Planscreen() {
    const [products, setProducts] = useState([]);
    const [subscription, setSubscription] = useState(null);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection("customers")
            .doc(user.uid)
            .collection("subscriptions")
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async subscription => {
                    setSubscription({
                        role: subscription.data().role,
                        current_period_end: subscription.data().current_period_end.seconds,
                        current_period_start: subscription.data().current_period_start.seconds,
                    })
                })
            })
    }, [user.uid])

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
        if (subscription)
            return

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

            if (sessionId) {
                const stripe = window.Stripe('pk_test_51OKxKhSE833rR16LEoIhaOAx2kC5iLUghQekgExXPffJnDZyIjA74SNzWhwf9zw0Kw9eQ4aNRMb4sSkk57mBF0B200WRVgqyE7')
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }

    return (
        <div className='planscreen'><br />
            {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>}

            {Object.entries(products).map(([productId, productData]) => {
                const currentPlan = productData.name.includes(subscription?.role.slice(1));

                return (
                    <div key={productId} className={`${currentPlan && "planscreen_disabled"} planscreen_plan`}>
                        <div className='planscreen_info'>
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !currentPlan && loadCheckout(productData.prices.priceId)}>
                            {currentPlan ? "Active Plan" : "Subscribe"}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
