import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiCheck, FiChevronLeft, FiChevronRight, FiAlertCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import { services } from '../data/services';

const Booking = () => {
    const [searchParams] = useSearchParams();
    const [selectedService, setSelectedService] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [sendError, setSendError] = useState(null);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    useEffect(() => {
        const serviceId = searchParams.get('service');
        if (serviceId) {
            const service = services.find(s => s.id === parseInt(serviceId));
            if (service) {
                setSelectedService(service);
                setStep(2);
            }
        }
    }, [searchParams]);

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
        today.setHours(0, 0, 0, 0); // Normalize today to midnight

        for (let i = 1; i <= daysInMonth; i++) {
            // Create date at midnight for consistent comparison
            const date = new Date(year, month, i, 0, 0, 0, 0);

            // Date is past if it's before today
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

    const handleBooking = async () => {
        setIsSending(true);
        setSendError(null);

        // Format date for Google Calendar (Example: 20260315T140000Z)
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

        // Create Start and End time (adds 1 hour for the calendar block)
        const cal_start = `${formattedDate}T${formattedTime}00`;
        const cal_end_time = (parseInt(formattedTime) + 100).toString().padStart(4, '0');
        const cal_end = `${formattedDate}T${cal_end_time}00`;

        // Google Maps location
        const studio_location = 'Nungua Kantamato, Accra, Ghana';
        const studio_lat = '5.6068032';
        const studio_lng = '-0.1021721';
        const google_maps_link = `https://www.google.com/maps?q=${studio_lat},${studio_lng}`;

        // Prepare template parameters for EmailJS
        const templateParams = {
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
            google_maps_link: google_maps_link
        };

        try {
            // Replace these with your actual EmailJS credentials
            // Get your credentials from https://www.emailjs.com/
            await emailjs.send(
                'service_1enpmxd',     // Replace with your EmailJS service ID
                'template_6fk9ssv',   // Replace with your EmailJS template ID
                templateParams,
                'T3IYBhRySeZMyFwd7'     // Replace with your EmailJS public key
            );

            // Show confirmation
            setShowConfirmation(true);
        } catch (error) {
            console.error('EmailJS Error:', error);

            // If EmailJS fails, fall back to mailto
            const subject = `New Booking: ${formData.name} - ${selectedService?.name || 'Service'}`;
            const body =
                `BOOKING REQUEST - Girlies Luxe

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

            // Open email client as fallback
            window.location.href = `mailto:kofilartey12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            setShowConfirmation(true);
        } finally {
            setIsSending(false);
        }
    };

    const totalPrice = selectedService?.price || 0;

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
                            Book Your Appointment
                        </span>
                        <h1 className="font-playfair text-4xl md:text-5xl text-gray-900 mb-4">
                            Schedule Your <span className="italic text-[#D4AF37]">Session</span>
                        </h1>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Select your preferred service, date, and time to book your appointment
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Progress Steps */}
            <section className="py-8 bg-white border-b">
                <div className="container-custom">
                    <div className="flex justify-center items-center gap-4">
                        {[
                            { num: 1, label: 'Service' },
                            { num: 2, label: 'Date & Time' },
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

            {/* Booking Content */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Select Service */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
                                        <h2 className="font-playfair text-2xl mb-6">Select a Service</h2>
                                        <div className="space-y-4">
                                            {services.map((service) => (
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

                                {/* Step 2: Select Date & Time */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                    >
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
                                            <h2 className="font-playfair text-2xl">Your Details</h2>
                                            <button
                                                onClick={() => setStep(2)}
                                                className="text-[#D4AF37] hover:underline"
                                            >
                                                Change Date/Time
                                            </button>
                                        </div>

                                        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
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
                                                <label className="block text-gray-600 mb-2 text-sm font-medium">Additional Notes (Optional)</label>
                                                <textarea
                                                    value={formData.notes}
                                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                    className="input-field min-h-[100px] resize-none"
                                                    placeholder="Any special requests or information we should know..."
                                                />
                                            </div>

                                            <div className="mt-6 flex gap-4">
                                                <button
                                                    onClick={() => setStep(2)}
                                                    className="px-6 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    onClick={handleBooking}
                                                    disabled={isSending}
                                                    className="flex-1 py-3 rounded-full gold-gradient text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
                                                >
                                                    {isSending ? 'Sending...' : 'Confirm Booking'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Booking Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-6 rounded-2xl shadow-xl sticky top-28"
                            >
                                <h3 className="font-playfair text-xl mb-6">Booking Summary</h3>

                                {selectedService ? (
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-center gap-4 pb-4 border-b">
                                            <img
                                                src={selectedService.image}
                                                alt={selectedService.name}
                                                className="w-16 h-16 rounded-xl object-cover"
                                            />
                                            <div>
                                                <h4 className="font-medium">{selectedService.name}</h4>
                                                <p className="text-gray-500 text-sm">{selectedService.duration}</p>
                                            </div>
                                        </div>

                                        {selectedDate && (
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FiCalendar className="text-[#D4AF37]" />
                                                <span>{selectedDate.toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}</span>
                                            </div>
                                        )}

                                        {selectedTime && (
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FiClock className="text-[#D4AF37]" />
                                                <span>{selectedTime}</span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 mb-6">Select a service to see summary</p>
                                )}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-lg font-semibold">
                                        <span>Total</span>
                                        <span className="text-[#D4AF37]">GH₵{totalPrice}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {showConfirmation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                        onClick={() => setShowConfirmation(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full text-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-20 h-20 rounded-full bg-[#D4AF37] flex items-center justify-center mx-auto mb-6">
                                <FiCheck className="text-white text-4xl" />
                            </div>
                            <h3 className="font-playfair text-2xl mb-4">Booking Confirmed!</h3>
                            <p className="text-gray-500 mb-2">
                                Thank you for your booking! We've sent a confirmation email to {formData.email}.
                            </p>
                            <p className="text-gray-500 mb-6">
                                Girlies Luxe - Studio Address: <a href="https://www.google.com/maps?q=5.6068032,-0.1021721" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">Nungua Kantmato, Accra, Ghana</a>
                            </p>
                            {sendError && (
                                <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
                                    <FiAlertCircle />
                                    <span className="text-sm">{sendError}</span>
                                </div>
                            )}
                            <button
                                onClick={() => {
                                    setShowConfirmation(false);
                                    window.location.href = '/';
                                }}
                                className="w-full py-3 rounded-full gold-gradient text-white font-medium"
                            >
                                Done
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Booking;
