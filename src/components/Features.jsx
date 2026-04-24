import React from "react";
import { Truck, ShieldCheck, CreditCard, Headphones } from "lucide-react";

const features = [
    {
        icon: <Truck size={40} />,
        title: "Fast Delivery",
        desc: "Get your products delivered quickly and safely at your doorstep.",
    },
    {
        icon: <ShieldCheck size={40} />,
        title: "Secure Payment",
        desc: "100% secure payment with trusted payment gateways.",
    },
    {
        icon: <CreditCard size={40} />,
        title: "Easy Payments",
        desc: "Multiple payment options including UPI, cards, and COD.",
    },
    {
        icon: <Headphones size={40} />,
        title: "24/7 Support",
        desc: "Our support team is always ready to help you anytime.",
    },
];

const Features = () => {
    return (
        <section className="bg-gray-50 py-12 md:py-20">

            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Why Choose Us
                    </h2>
                    <p className="text-gray-600 text-lg">
                        We provide the best services for our customers
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition"
                        >
                            <div className="flex justify-center mb-4 text-blue-600">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-semibold mb-2">
                                {feature.title}
                            </h3>

                            <p className="text-gray-600 text-sm">
                                {feature.desc}
                            </p>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
};

export default Features;