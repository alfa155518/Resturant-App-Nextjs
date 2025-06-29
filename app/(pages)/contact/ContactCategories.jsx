
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
export default function ContactCategories({ styles }) {
    return (
        <>
            <motion.div
                className={styles.mapSection}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <h2>Find Us on the Map</h2>
                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55611.045857631936!2d31.217264623773602!3d30.059556316911856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sEl%20Cairo%2C%20Gobernaci%C3%B3n%20de%20El%20Cairo!5e1!3m2!1ses!2seg!4v1743378852726!5m2!1ses!2seg"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Restaurant Location"
                    ></iframe>
                </div>
            </motion.div>


            <motion.div
                className={styles.ctaSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <div className={styles.ctaImageContainer}>
                    <Image
                        src="/images/dining-experience.webp"
                        alt="Dining Experience"
                        fill
                        priority
                        className={styles.ctaImage}
                    />
                </div>
                <div className={styles.ctaContent}>
                    <h2>Ready to Experience Our Cuisine?</h2>
                    <p>Make a reservation today and enjoy a memorable dining experience.</p>
                    <Link href={"/tables"}>
                        <motion.button
                            className={styles.ctaButton}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Book a Table
                        </motion.button>
                    </Link>
                </div>
            </motion.div>
        </>
    )
}
