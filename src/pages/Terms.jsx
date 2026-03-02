import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <div className="pt-24 pb-20 min-h-screen bg-white">
            <section className="py-16 bg-gradient-to-b from-[#FFF9F5] to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="font-playfair text-4xl md:text-5xl text-gray-900 mb-4">
                            Terms of <span className="italic text-[#D4AF37]">Service</span>
                        </h1>
                        <p className="text-gray-500">Last updated: February 2026</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-12">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="font-playfair text-2xl text-gray-900 mb-4">1. Acceptance of Terms</h2>
                                <p className="text-gray-600">
                                    By accessing and using the Girlies Luxe website, you accept and agree to be bound by the terms and provision of this agreement.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-playfair text-2xl text-gray-900 mb-4">2. Appointment Policies</h2>
                                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                    <li>All appointments require a deposit to secure your booking</li>
                                    <li>Rescheduling must be done at least 24 hours in advance</li>
                                    <li>Cancellations within 24 hours may forfeit the deposit</li>
                                    <li>Please arrive on time for your scheduled appointment</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="font-playfair text-2xl text-gray-900 mb-4">3. Service Guarantees</h2>
                                <p className="text-gray-600">
                                    We strive to provide the highest quality services. However, individual results may vary based on hair type, skin condition, and other factors. We will work with you to ensure your satisfaction.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-playfair text-2xl text-gray-900 mb-4">4. Intellectual Property</h2>
                                <p className="text-gray-600">
                                    All content on this website, including logos, images, text, and design, is the property of Girlies Luxe and may not be reproduced without permission.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-playfair text-2xl text-gray-900 mb-4">5. Limitation of Liability</h2>
                                <p className="text-gray-600">
                                    Girlies Luxe shall not be liable for any damages arising from the use of our website or services. Your use of our services is at your own risk.
                                </p>
                            </div>

                            <div>
                                <h2 className="font-playfair text-2xl text-gray-900 mb-4">6. Contact Information</h2>
                                <p className="text-gray-600">
                                    For questions about these Terms of Service, please contact us at hello@glamstudio.com
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Back to Home */}
            <div className="text-center mt-8">
                <Link to="/" className="text-[#D4AF37] hover:underline">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Terms;
