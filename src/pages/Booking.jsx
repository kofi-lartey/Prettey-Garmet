import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiCheck, FiChevronLeft, FiChevronRight, FiShoppingBag, FiTruck, FiPlus, FiMinus } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { services } from '../data/services';

const Booking = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState(null);
    const [step, setStep] = useState(1);
    
    // Determine if this is an order (lip gloss) or booking (service)
    const isOrder = searchParams.get('product') !== null;
    
    // Order specific state
    const [quantity, setQuantity] = useState(1);
    const [orderDetails, setOrderDetails] = useState({
        shade: '',
        finish: 'Glossy',
        flavor: 'Vanilla',
        customNote: ''
    });
    
    // Shipping info for orders
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        city: '',
        deliveryNotes: ''
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    useEffect(() => {
        // Check for product (lip gloss order)
        const productId = searchParams.get('product');
        if (productId) {
            const product = services.find(s => s.id === parseInt(productId));
            if (product && product.category === 'lipgloss') {
                setSelectedService(product);
                setStep(2); // Skip to order details
                return;
            } else {
                navigate('/services');
                return;
            }
        }
        
        // Check for service (regular booking)
        const serviceId = searchParams.get('service');
        if (serviceId) {
            const service = services.find(s => s.id === parseInt(serviceId));
            if (service) {
                setSelectedService(service);
                setStep(2);
            }
        }
    }, [searchParams, navigate]);

    const timeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        const days = [];

        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            days.push({ day: prevMonthLastDay - i, isCurrentMonth: false, date: null });
        }

        // Current month days
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i, 0, 0, 0, 0);
            const isPast = date.getTime() < today.getTime();

            days.push({
                day: i,
                isCurrentMonth: true,
                isPast,
                date: date
            });
        }

        // Next month days
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({ day: i, isCurrentMonth: false, date: null });
        }

        return days;
    };

    const handleDateSelect = (day) => {
        if (day.isCurrentMonth && !day.isPast) {
            setSelectedDate(day.date);
            setSelectedTime(null);
        }
    };

    // Calculate total price
    const totalPrice = isOrder 
        ? (selectedService?.price || 0) * quantity 
        : (selectedService?.price || 0);

    const handleSubmit = async () => {
        setIsSending(true);
        setSendError(null);

        let templateParams;

        if (isOrder) {
            // Order submission (lip gloss)
            templateParams = {
                client_name: formData.name,
                client_email: formData.email,
                client_phone: formData.phone.replace(/\D/g, ''),
                service_name: selectedService?.name || 'Not selected',
                service_price: `GH₵${selectedService?.price || 0}`,
                
                // Order details
                quantity: quantity.toString(),
                total_price: `GH₵${totalPrice}`,
                shade: orderDetails.shade || 'Not specified',
                finish: orderDetails.finish,
                flavor: orderDetails.flavor,
                custom_note: orderDetails.customNote || 'No custom notes',
                
                // Shipping
                shipping_address: `${shippingInfo.address}, ${shippingInfo.city}`,
                delivery_notes: shippingInfo.deliveryNotes || 'None',
                
                notes: formData.notes || 'No extra notes',
                current_year: new Date().getFullYear(),
                is_order: 'true'
            };
        } else {
            // Booking submission (service)
            const rawDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
            const timeParts = selectedTime ? selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i) : null;

            let formattedTime = '';
            if (timeParts) {
                let hours = parseInt(timeParts[1]);
                const minutes = timeParts[2];
                const ampm = timeParts[3].toUpperCase();
                if (ampm === 'PM' && hours !== 12) hours += 12;
                if (ampm === 'AM' && hours === 12) hours = 0;
                formattedTime = `${hours.toString().padStart(2, '0')}${minutes}`;
            }

            const formattedDate = rawDate.replace(/-/g, '');
            const cal_start = `${formattedDate}T${formattedTime}00`;
            const cal_end_time = (parseInt(formattedTime) + 100).toString().padStart(4, '0');
            const cal_end = `${formattedDate}T${cal_end_time}00`;

            const studio_location = 'Nungua Kantamato, Accra, Ghana';
            const studio_lat = '5.6068032';
            const studio_lng = '-0.1021721';
            const google_maps_link = `https://www.google.com/maps?q=${studio_lat},${studio_lng}`;

            templateParams = {
                client_name: formData.name,
                client_email: formData.email,
                client_phone: formData.phone.replace(/\D/g, ''),
                service_name: selectedService?.name || 'Not selected',
                service_duration: selectedService?.duration || 'N/A',
                service_price: `GH₵${totalPrice}`,
                appointment_date: selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected',
                appointment_time: selectedTime || 'Not selected',
                notes: formData.notes || 'No extra notes',
                cal_start: cal_start,
                cal_end: cal_end,
                current_year: new Date().getFullYear(),
                studio_location: studio_location,
                studio_lat: studio_lat,
                studio_lng: studio_lng,
                google_maps_link: google_maps_link,
                is_order: 'false',
                
                // Order fields (not applicable for bookings - use placeholders)
                quantity: '1',
                total_price: `GH₵${totalPrice}`,
                shade: 'N/A (Service Booking)',
                finish: 'N/A',
                flavor: 'N/A',
                custom_note: 'N/A',
                shipping_address: 'N/A (In-Studio Service)',
                delivery_notes: 'N/A'
            };
        }

        try {
            await emailjs.send(
                'service_1enpmxd',
                'template_6fk9ssv',
                templateParams,
                'T3IYBhRySeZMyFwd7'
            );
            setShowConfirmation(true);
        } catch (error) {
            console.error('EmailJS Error:', error);
            
            // Fallback to mailto
            let subject, body;
            
            if (isOrder) {
                subject = `New Order: ${formData.name} - ${selectedService?.name || 'Lip Gloss'}`;
                body = `ORDER - Girlies Luxe

CLIENT DETAILS
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

PRODUCT
Product: ${selectedService?.name}
Quantity: ${quantity}
Shade: ${orderDetails.shade || 'Not specified'}
Finish: ${orderDetails.finish}
Flavor: ${orderDetails.flavor}
Price: GH₵${selectedService?.price} each
Total: GH₵${totalPrice}

SHIPPING
Address: ${shippingInfo.address}
City: ${shippingInfo.city}
Notes: ${shippingInfo.deliveryNotes || 'None'}

NOTES
${formData.notes || 'None'}`;
            } else {
                subject = `New Booking: ${formData.name} - ${selectedService?.name || 'Service'}`;
                body = `BOOKING REQUEST - Girlies Luxe

CLIENT DETAILS
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

SERVICE
Service: ${selectedService?.name || 'Not selected'}
Duration: ${selectedService?.duration || 'N/A'}
Price: GH₵${totalPrice}

APPOINTMENT
Date: ${selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Not selected'}
Time: ${selectedTime || 'Not selected'}

NOTES
${formData.notes || 'None'}`;
            }
            
            window.location.href = `mailto:addobeagloria162@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setShowConfirmation(true);
        } finally {
            setIsSending(false);
        }
    };

    // Confirmation Screen
    if (showConfirmation) {
        return (
            <div className="pt-24 pb-20 min-h-screen bg-gradient-to-b from-[#FFF9F5] to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-lg mx-auto text-center py-16"
                    >
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                            <FiCheck className="text-5xl text-green-500" />
                        </div>
                        <h2 className="font-playfair text-3xl text-gray-900 mb-4">
                            {isOrder ? 'Order Confirmed!' : 'Booking Confirmed!'}
                        </h2>
                        <p className="text-gray-500 mb-8">
                            {isOrder 
                                ? `Thank you for your order! We'll contact you within 24 hours to confirm delivery details.`
                                : `Your appointment has been booked! We've sent a confirmation to ${formData.email}.`
                            }
                        </p>
                        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                            <h3 className="font-semibold text-gray-900 mb-4">
                                {isOrder ? 'Order Summary' : 'Appointment Details'}
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">{isOrder ? 'Product:' : 'Service:'}</span>
                                    <span className="font-medium">{selectedService?.name}</span>
                                </div>
                                {isOrder && (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Quantity:</span>
                                            <span className="font-medium">{quantity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Shade:</span>
                                            <span className="font-medium">{orderDetails.shade || 'Not specified'}</span>
                                        </div>
                                    </>
                                )}
                                {!isOrder && (
                                    <>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Date:</span>
                                            <span className="font-medium">
                                                {selectedDate ? selectedDate.toLocaleDateString() : 'Not selected'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Time:</span>
                                            <span className="font-medium">{selectedTime || 'Not selected'}</span>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-between border-t pt-2 mt-2">
                                    <span className="text-gray-500">Total:</span>
                                    <span className="font-semibold text-[#D4AF37]">GH₵{totalPrice}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/services')}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4AF37] text-white rounded-full font-medium transition-all duration-300 hover:bg-[#b8962f]"
                        >
                            Continue
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    // Header text based on type
    const headerTitle = isOrder 
        ? 'Order Your Lip Gloss'
        : 'Schedule Your Session';
    const headerSubtitle = isOrder
        ? 'Choose your shades and get them delivered'
        : 'Select your preferred service, date, and time to book your appointment';
    const step2Label = isOrder ? 'Order Details' : 'Date & Time';

    return (
        <div className="pt-24 pb-20">
            {/* Header */}
            <section className="py-16 bg-gradient-to-b from-[#FFF9F5] to-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-4 block">
                            {isOrder ? 'Shop Lip Gloss' : 'Book Your Appointment'}
                        </span>
                        <h1 className="font-playfair text-4xl md:text-5xl text-gray-900 mb-4">
                            {headerTitle}
                        </h1>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            {headerSubtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="py-8 bg-white border-b">
                <div className="container-custom">
                    <div className="flex justify-center items-center gap-4">
                        {[
                            { num: 1, label: isOrder ? 'Select' : 'Service' },
                            { num: 2, label: step2Label },
                            { num: 3, label: 'Details' }
                        ].map((s, i) => (
                            <div key={s.num} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${step >= s.num
                                    ? 'bg-[#D4AF37] text-white'
                                    : 'bg-gray-200 text-gray-500'
                                    }`}>
                                    {s.num}
                                </div>
                                <span className={`ml-2 hidden sm:inline ${step >= s.num ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {s.label}
                                </span>
                                {i < 2 && (
                                    <div className={`w-12 sm:w-20 h-0.5 mx-4 ${step > s.num ? 'bg-[#D4AF37]' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Select Service/Product */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        <h2 className="font-playfair text-2xl mb-6">
                                            {isOrder ? 'Select a Product' : 'Select a Service'}
                                        </h2>
                                        <div className="space-y-4">
                                            {services
                                                .filter(service => isOrder ? service.category === 'lipgloss' : service.category !== 'lipgloss')
                                                .map((service) => (
                                                <motion.div
                                                    key={service.id}
                                                    whileHover={{ scale: 1.01 }}
                                                    onClick={() => {
                                                        setSelectedService(service);
                                                        setStep(2);
                                                    }}
                                                    className={`bg-white p-6 rounded-2xl shadow-lg cursor-pointer transition-all ${selectedService?.id === service.id
                                                        ? 'ring-2 ring-[#D4AF37]'
                                                        : 'hover:shadow-xl'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <img
                                                            src={service.image}
                                                            alt={service.name}
                                                            className="w-20 h-20 rounded-xl object-cover"
                                                        />
                                                        <div className="flex-1">
                                                            <h3 className="font-playfair text-xl mb-1">{service.name}</h3>
                                                            <p className="text-gray-500 text-sm mb-2">{service.duration}</p>
                                                            <p className="text-[#D4AF37] font-semibold">GH₵{service.price}</p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Date & Time OR Order Details */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        {/* ORDER FLOW - Step 2: Order Details */}
                                        {isOrder ? (
                                            <div>
                                                <div className="flex items-center justify-between mb-6">
                                                    <h2 className="font-playfair text-2xl">Order Details</h2>
                                                    <button
                                                        onClick={() => setStep(1)}
                                                        className="text-[#D4AF37] hover:underline"
                                                    >
                                                        Change Product
                                                    </button>
                                                </div>

                                                <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
                                                    {/* Quantity */}
                                                    <div>
                                                        <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                            Quantity
                                                        </label>
                                                        <div className="flex items-center gap-4">
                                                            <button
                                                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                                            >
                                                                <FiMinus />
                                                            </button>
                                                            <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                                                            <button
                                                                onClick={() => setQuantity(q => q + 1)}
                                                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                                                            >
                                                                <FiPlus />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Shade */}
                                                    <div>
                                                        <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                            Preferred Shade (Optional)
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={orderDetails.shade}
                                                            onChange={(e) => setOrderDetails({...orderDetails, shade: e.target.value})}
                                                            placeholder="e.g., Rose, Nude, Berry"
                                                            className="input-field"
                                                        />
                                                    </div>

                                                    {/* Finish */}
                                                    <div>
                                                        <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                            Finish
                                                        </label>
                                                        <select
                                                            value={orderDetails.finish}
                                                            onChange={(e) => setOrderDetails({...orderDetails, finish: e.target.value})}
                                                            className="input-field"
                                                        >
                                                            <option value="Glossy">Glossy</option>
                                                            <option value="Matte">Matte</option>
                                                            <option value="Satin">Satin</option>
                                                            <option value="Shimmer">Shimmer</option>
                                                        </select>
                                                    </div>

                                                    {/* Flavor */}
                                                    <div>
                                                        <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                            Flavor
                                                        </label>
                                                        <select
                                                            value={orderDetails.flavor}
                                                            onChange={(e) => setOrderDetails({...orderDetails, flavor: e.target.value})}
                                                            className="input-field"
                                                        >
                                                            <option value="Vanilla">Vanilla</option>
                                                            <option value="Strawberry">Strawberry</option>
                                                            <option value="Mint">Mint</option>
                                                            <option value="Peach">Peach</option>
                                                            <option value="Rose">Rose</option>
                                                        </select>
                                                    </div>

                                                    {/* Custom Note */}
                                                    <div>
                                                        <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                            Custom Notes (Optional)
                                                        </label>
                                                        <textarea
                                                            value={orderDetails.customNote}
                                                            onChange={(e) => setOrderDetails({...orderDetails, customNote: e.target.value})}
                                                            placeholder="Any special requests..."
                                                            rows={3}
                                                            className="input-field resize-none"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex gap-4">
                                                    <button
                                                        onClick={() => setStep(1)}
                                                        className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        onClick={() => setStep(3)}
                                                        className="flex-1 py-3 rounded-full gold-gradient text-white font-medium hover:shadow-lg transition-shadow"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // BOOKING FLOW - Step 2: Date & Time
                                            <div>
                                                <div className="flex items-center justify-between mb-6">
                                                    <h2 className="font-playfair text-2xl">Select Date & Time</h2>
                                                    <button
                                                        onClick={() => setStep(1)}
                                                        className="text-[#D4AF37] hover:underline"
                                                    >
                                                        Change Service
                                                    </button>
                                                </div>

                                                {/* Calendar */}
                                                <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <button
                                                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                                            className="p-2 hover:bg-gray-100 rounded-full"
                                                        >
                                                            <FiChevronLeft />
                                                        </button>
                                                        <h3 className="font-playfair text-lg">
                                                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                        </h3>
                                                        <button
                                                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                                            className="p-2 hover:bg-gray-100 rounded-full"
                                                        >
                                                            <FiChevronRight />
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-7 gap-2 mb-2">
                                                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                                            <div key={day} className="text-center text-sm text-gray-500 py-2">
                                                                {day}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="grid grid-cols-7 gap-2">
                                                        {generateCalendarDays().map((day, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleDateSelect(day)}
                                                                disabled={!day.isCurrentMonth || day.isPast}
                                                                className={`p-3 rounded-xl text-center transition-all ${!day.isCurrentMonth
                                                                    ? 'text-gray-300'
                                                                    : day.isPast
                                                                        ? 'text-gray-300 cursor-not-allowed'
                                                                        : selectedDate?.toDateString() === day.date?.toDateString()
                                                                            ? 'bg-[#D4AF37] text-white'
                                                                            : 'hover:bg-[#F8E1E7] text-gray-700'
                                                                    }`}
                                                            >
                                                                {day.day}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Time Slots */}
                                                {selectedDate && (
                                                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                                                        <h3 className="font-playfair text-lg mb-4 flex items-center gap-2">
                                                            <FiClock className="text-[#D4AF37]" />
                                                            Available Times
                                                        </h3>
                                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                                            {timeSlots.map((time) => (
                                                                <button
                                                                    key={time}
                                                                    onClick={() => setSelectedTime(time)}
                                                                    className={`py-3 px-4 rounded-xl font-medium transition-all ${selectedTime === time
                                                                        ? 'bg-[#D4AF37] text-white'
                                                                        : 'bg-gray-100 hover:bg-[#F8E1E7] text-gray-700'
                                                                        }`}
                                                                >
                                                                    {time}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="mt-6 flex gap-4">
                                                    <button
                                                        onClick={() => setStep(1)}
                                                        className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                                                    >
                                                        Back
                                                    </button>
                                                    <button
                                                        onClick={() => setStep(3)}
                                                        disabled={!selectedDate || !selectedTime}
                                                        className="flex-1 py-3 rounded-full gold-gradient text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Step 3: Details */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="font-playfair text-2xl">
                                                {isOrder ? 'Shipping Details' : 'Your Details'}
                                            </h2>
                                            <button
                                                onClick={() => setStep(2)}
                                                className="text-[#D4AF37] hover:underline"
                                            >
                                                {isOrder ? 'Change Order' : 'Change Date/Time'}
                                            </button>
                                        </div>

                                        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
                                            {/* Shipping for orders */}
                                            {isOrder && (
                                                <>
                                                    <div>
                                                        <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                            Delivery Address *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={shippingInfo.address}
                                                            onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                                                            className="input-field"
                                                            placeholder="Street address"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                            City / Area *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={shippingInfo.city}
                                                            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                                                            className="input-field"
                                                            placeholder="e.g., Accra, Tema"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                            Delivery Instructions (Optional)
                                                        </label>
                                                        <textarea
                                                            value={shippingInfo.deliveryNotes}
                                                            onChange={(e) => setShippingInfo({...shippingInfo, deliveryNotes: e.target.value})}
                                                            className="input-field resize-none"
                                                            placeholder="Any special delivery instructions..."
                                                            rows={2}
                                                        />
                                                    </div>
                                                </>
                                            )}

                                            <div>
                                                <label className="block text-gray-600 mb-2 text-sm font-medium">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="input-field"
                                                    placeholder="Your Name"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-600 mb-2 text-sm font-medium">Email</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="input-field"
                                                    placeholder="your@email.com"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-600 mb-2 text-sm font-medium">Phone</label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="input-field"
                                                    placeholder="+1 (555) 000-0000"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-gray-600 mb-2 text-sm font-medium">
                                                    {isOrder ? 'Order Notes (Optional)' : 'Additional Notes (Optional)'}
                                                </label>
                                                <textarea
                                                    value={formData.notes}
                                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                    className="input-field resize-none"
                                                    placeholder={isOrder ? "Any special requests for your order..." : "Any special requests for your appointment..."}
                                                    rows={3}
                                                />
                                            </div>

                                            {sendError && (
                                                <div className="p-4 bg-red-50 text-red-600 rounded-lg">
                                                    {sendError}
                                                </div>
                                            )}

                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSending || !formData.name || !formData.email || !formData.phone || (isOrder && (!shippingInfo.address || !shippingInfo.city))}
                                                className="w-full py-4 rounded-full gold-gradient text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center justify-center gap-2"
                                            >
                                                {isSending 
                                                    ? 'Processing...' 
                                                    : isOrder 
                                                        ? 'Place Order' 
                                                        : 'Confirm Booking'
                                                }
                                                <FiCheck />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sidebar - Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
                                <h3 className="font-playfair text-xl mb-4">
                                    {isOrder ? 'Order Summary' : 'Booking Summary'}
                                </h3>
                                
                                {selectedService && (
                                    <div className="flex gap-4 mb-4">
                                        <img
                                            src={selectedService.image}
                                            alt={selectedService.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h4 className="font-medium text-gray-900">{selectedService.name}</h4>
                                            <p className="text-gray-500 text-sm">{selectedService.duration}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Show order details in summary if order */}
                                {isOrder && step >= 2 && (
                                    <div className="border-t pt-4 mb-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Quantity:</span>
                                            <span>{quantity}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Shade:</span>
                                            <span>{orderDetails.shade || 'Not specified'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Finish:</span>
                                            <span>{orderDetails.finish}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Flavor:</span>
                                            <span>{orderDetails.flavor}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Show booking details in summary if booking */}
                                {!isOrder && step >= 2 && (
                                    <div className="border-t pt-4 mb-4 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Date:</span>
                                            <span>
                                                {selectedDate 
                                                    ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                                    : 'Not selected'
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Time:</span>
                                            <span>{selectedTime || 'Not selected'}</span>
                                        </div>
                                    </div>
                                )}

                                {selectedService && (
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">Total</span>
                                            <span className="font-semibold text-[#D4AF37] text-xl">GH₵{totalPrice}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Booking;
