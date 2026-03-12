export const services = [
    // MAKEUP SERVICES
    {
        id: 1,
        name: "Full Glam Home Service",
        description: "Complete glamorous makeup look for your special event. Perfect for weddings, parties, and big occasions. Includes premium products and lashes.",
        price: 350,
        image: "https://res.cloudinary.com/djjgkezui/image/upload/v1773319003/WhatsApp_Image_2026-03-12_at_12.26.24_PM_1_ee5q23.jpg",
        category: "makeup",
        duration: "1.5 hours",
        includes: ["Full Glam Makeup", "Lashes", "Premium Products"]
    },
    {
        id: 2,
        name: "Soft Glam Home Service",
        description: "Beautiful soft glam look that enhances your natural beauty. Perfect for casual events, dates, and everyday elegance.",
        price: 250,
        image: "https://res.cloudinary.com/djjgkezui/image/upload/v1773319714/WhatsApp_Image_2026-03-12_at_12.28.58_PM_da65ga.jpg",
        category: "makeup",
        duration: "1 hour",
        includes: ["Soft Glam Makeup", "Lashes", "Lip Gloss"]
    },
    {
        id: 3,
        name: "Wake & Make",
        description: "Complete morning glam session. Get ready for your day with a stunning makeup look.",
        price: 300,
        image: "https://res.cloudinary.com/djjgkezui/image/upload/v1773319713/WhatsApp_Image_2026-03-12_at_12.28.57_PM_1_lsr34b.jpg",
        category: "makeup",
        duration: "1.5 hours",
        includes: ["Wake & Makeup", "Lashes", "Finish"]
    },
    {
        id: 4,
        name: "Wake In",
        description: "Quick wake-up makeup service. Perfect for busy mornings or last-minute events.",
        price: 200,
        image: "https://res.cloudinary.com/djjgkezui/image/upload/v1773319723/WhatsApp_Image_2026-03-12_at_12.28.57_PM_lj5ghx.jpg",
        category: "makeup",
        duration: "45 mins",
        includes: ["Quick Makeup", "Light Lashes"]
    },
    {
        id: 5,
        name: "Light Makeup / Touch Up",
        description: "Light makeup application or touch-up service. Subtle enhancement for any occasion.",
        price: 150,
        image: "https://res.cloudinary.com/djjgkezui/image/upload/v1773319507/WhatsApp_Image_2026-03-12_at_12.44.11_PM_r4uqq8.jpg",
        category: "makeup",
        duration: "30 mins",
        includes: ["Light Makeup", "Touch Up"]
    },
    {
        id: 6,
        name: "Bridal Makeup",
        description: "Complete bridal look including trial session, day-of makeup, and touch-up kit. We create your dream wedding look that lasts all day and night.",
        price: 350,
        image: "https://res.cloudinary.com/djjgkezui/image/upload/v1773319294/WhatsApp_Image_2026-03-12_at_12.29.18_PM_a8msnq.jpg",
        category: "makeup",
        duration: "2 hours",
        includes: ["Trial Session", "Day-of Makeup", "Touch-up Kit", "Lashes"]
    },
    {
        id: 7,
        name: "Bridesmaids Makeup",
        description: "Professional makeup for bridesmaids. Charged per person - contact for group rates.",
        price: null,
        note: "Price varies by number of people",
        image: "https://i.pinimg.com/1200x/e7/6e/d0/e76ed0d0452bafc3eeb67bf0cf9c9105.jpg",
        category: "makeup",
        duration: "1 hour per person",
        includes: ["Makeup Application", "Lashes"]
    },
    {
        id: 8,
        name: "Graduation Makeup",
        description: "Perfect graduation look! Professional makeup for your special day. Charged per person.",
        price: null,
        note: "Price varies by number of people",
        image: "https://i.pinimg.com/1200x/1c/ef/82/1cef8219f6f1baa928e2779783c39c89.jpg",
        category: "makeup",
        duration: "1 hour per person",
        includes: ["Makeup Application", "Lashes"]
    },

    // WIG SERVICES
    {
        id: 9,
        name: "Wig Installation - Frontal",
        description: "Professional lace frontal wig installation with a natural, seamless finish.",
        price: 150,
        image: "https://i.pinimg.com/1200x/2c/53/df/2c53df5fcee21c949d49aecb92eb0cea.jpg",
        category: "hair",
        duration: "1.5 hours",
        includes: ["Frontal Installation", "Secure Application", "Blending"]
    },
    {
        id: 10,
        name: "Wig Installation - Closure",
        description: "Professional lace closure wig installation for a natural hairline.",
        price: 100,
        image: "https://i.pinimg.com/1200x/38/33/7f/38337f3ef9a407309aedd2a83e87fe73.jpg",
        category: "hair",
        duration: "1.5 hours",
        includes: ["Closure Installation", "Secure Application", "Blending"]
    },
    {
        id: 11,
        name: "Wig Styling",
        description: "Professional wig styling to give your wig a fresh, customized look.",
        price: null,
        note: "Comes with extra cost",
        image: "https://i.pinimg.com/736x/51/03/0b/51030b9cf58d699f3c0ae78c1a2e233d.jpg",
        category: "hair",
        duration: "1 hour",
        includes: ["Wig Styling", "Custom Look"]
    },
    {
        id: 12,
        name: "Wig Revamp",
        description: "Bring your old wig back to life with washing, conditioning, styling, and restructuring.",
        price: 150,
        image: "https://i.pinimg.com/736x/b5/1f/aa/b51faaca43ccd8a0a6917d349632deea.jpg",
        category: "hair",
        duration: "2 hours",
        includes: ["Deep Conditioning", "Steam Treatment", "Restyling", "Finishing"]
    },
    {
        id: 13,
        name: "Wig Sewing - Frontal",
        description: "Professional sewing of lace frontal wigs for secure and long-lasting installation.",
        price: 200,
        image: "https://i.pinimg.com/1200x/c9/82/e4/c982e48b1b5594d236e76ac134a43cdb.jpg",
        category: "hair",
        duration: "2 hours",
        includes: ["Frontal Sewing", "Secure Attachment", "Customization"]
    },
    {
        id: 14,
        name: "Wig Sewing - Closure",
        description: "Professional sewing of lace closure wigs for a natural finish.",
        price: 150,
        image: "https://i.pinimg.com/736x/0d/15/cb/0d15cbed78cd3d46ed67c119275fcd65.jpg",
        category: "hair",
        duration: "2 hours",
        includes: ["Closure Sewing", "Secure Attachment", "Customization"]
    },

    // NAILS SERVICES
    {
        id: 15,
        name: "Gel Manicure",
        description: "Long-lasting gel polish that shines for weeks. Perfectly shaped nails with our signature finish.",
        price: 55,
        image: "https://res.cloudinary.com/djjgkezui/image/upload/v1773320028/WhatsApp_Image_2026-03-12_at_12.29.39_PM_mf3xlg.jpg",
        category: "nails",
        duration: "1 hour",
        includes: ["Nail Shaping", "Cuticle Care", "Gel Polish", "Top Coat"]
    },
    {
        id: 16,
        name: "Acrylic Nails",
        description: "Durable acrylic extensions in any shape and length. From natural to dramatic, we create your dream nails.",
        price: 75,
        image: "https://res.cloudinary.com/djjgkezui/image/upload/v1773320026/WhatsApp_Image_2026-03-12_at_12.29.38_PM_szq6lf.jpg",
        category: "nails",
        duration: "1.5 hours",
        includes: ["Nail Extensions", "Shape & Length", "Gel Polish", "Cuticle Care"]
    },
    {
        id: 17,
        name: "Nail Art",
        description: "Creative nail art designs from subtle accents to full artistic expressions. Express your unique style.",
        price: 35,
        image: "https://res.cloudinary.com/djjgkezui/image/upload/v1773320031/WhatsApp_Image_2026-03-12_at_12.29.38_PM_1_u5cl1i.jpg",
        category: "nails",
        duration: "30 mins",
        includes: ["Design Consultation", "Custom Art", "Premium Products"]
    },
    {
        id: 18,
        name: "Luxury Pedicure",
        description: "Indulgent pedicure experience with massage, exfoliation, and perfect polish. Relax and rejuvenate.",
        price: 65,
        image: "https://i.pinimg.com/736x/d9/0c/f0/d90cf0f5816bf8fc393a0a47eb81e305.jpg",
        category: "nails",
        duration: "1 hour",
        includes: ["Foot Spa", "Exfoliation", "Massage", "Polish"]
    },

    // LIP GLOSS SERVICES
    {
        id: 19,
        name: "Custom Lip Gloss",
        description: "Personalized lip gloss created specifically for you. Choose your favorite shades and finishes for your perfect pout.",
        price: 45,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80",
        category: "lipgloss",
        duration: "30 mins",
        includes: ["Color Consultation", "2 Lip Gloss Tubes", "Custom Shade Matching"]
    },
    {
        id: 20,
        name: "Lip Gloss Bar",
        description: "Visit our lip gloss bar and choose from our collection of luxurious, hydrating lip glosses in various finishes.",
        price: 25,
        image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=600&q=80",
        category: "lipgloss",
        duration: "15 mins",
        includes: ["One Lip Gloss", "Shade Selection", "Application Tips"]
    },
    {
        id: 21,
        name: "Lip Care & Gloss Combo",
        description: "Complete lip treatment including exfoliation, hydration, and your choice of premium lip gloss.",
        price: 55,
        image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80",
        category: "lipgloss",
        duration: "45 mins",
        includes: ["Lip Exfoliation", "Hydration Treatment", "Custom Lip Gloss", "Lip Care Kit"]
    }
];

export const serviceCategories = [
    { id: "all", name: "All Services" },
    { id: "makeup", name: "Makeup" },
    { id: "hair", name: "Wigs & Hair" },
    { id: "nails", name: "Nails" },
    { id: "lipgloss", name: "Lip Gloss" }
];

// Note: Prices may vary depending on location. Contact for details.
export const priceNote = "Note: Prices are in Ghana Cedis (GH₵) and may vary depending on location. Contact us for a quote.";
