/* eslint-disable no-unused-vars */
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard() {
    const [amount, setamount] = useState(350);

    // handlePayment Function
    const handlePayment = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    amount
                })
            });

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Rahul kanyal",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    })

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message)
                    }
                } catch (error) {
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    return (
        <Card className="mt-6 w-96 bg-[#222f3e] text-white">
            {/* CardHeader */}
            <CardHeader color="" className="relative h-96 bg-[#2C3A47]">
                {/* Image  */}
                <img
                    src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8d0c53ea-3feb-419e-a612-6c35d4be018e/air-max-dn-shoes-FtLNfm.png"
                    alt="card-image"
                />
            </CardHeader>

            {/* CardBody */}
            <CardBody>
                {/* Typography For Title */}
                <Typography variant="h5" className="mb-2">
                    My First Product
                </Typography>

                {/* Typography For Price  */}
                <Typography>
                    ₹35234230 <span className=" line-through">₹699</span>
                </Typography>
            </CardBody>

            {/* CardFooter  */}
            <CardFooter className="pt-0">
                {/* Buy Now Button  */}
                <Button onClick={handlePayment} className="w-full bg-[#1B9CFC]">Buy Now</Button>
                <Toaster/>
            </CardFooter>
        </Card>
    );
}