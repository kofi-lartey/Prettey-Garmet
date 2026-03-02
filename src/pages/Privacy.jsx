import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Privacy = () => {
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
                            Privacy <span className="italic text-[#D4AF37]">Policy</span>
                        </h1>
                        <p className="text-gray-500">Last updated: February 2026</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-12">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto prose prose-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="font-playfair text-2xl text-gray-900 mb-4">1. Introduction</h2>
                            <p className="text-gray-600 mb-6">
                                At Girlies Luxe, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                            </p>

                            <h2 className="font-playfair text-2xl text-gray-900 mb-4">2. Information We Collect</h2>
                            <p className="text-gray-600 mb-6">
                                We may collect personal information that you voluntarily provide to us when you:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                                <li>Book an appointment</li>
                                <li>Contact us through our website</li>
                                <li>Sign up for our newsletter</li>
                                <li>Use our social media channels</li>
                            </ul>

                            <h2 className="font-playfair text-2xl text-gray-900 mb-4">3. How We Use Your Information</h2>
                            <p className="text-gray-600 mb-6">
                                We may use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                                <li>Schedule and manage your appointments</li>
                                <li>Send you marketing and promotional materials</li>
                                <li>Respond to your inquiries and questions</li>
                                <li>Improve our website and services</li>
                            </ul>

                            <h2 className="font-playfair text-2xl text-gray-900 mb-4">4. Information Sharing</h2>
                            <p className="text-gray-600 mb-6">
                                We do not sell, trade, or otherwise transfer your personal information to outside parties except as described below:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-2">
                                <li>Service providers who assist in our operations</li>
                                <li>Legal requirements when required by law</li>
                            </ul>

                            <h2 className="font-playfair text-2xl text-gray-900 mb-4">5. Contact Us</h2>
                            <p className="text-gray-600 mb-6">
                                If you have questions or comments about this Privacy Policy, please contact us at hello@glamstudio.com
                            </p>
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

export default Privacy;
