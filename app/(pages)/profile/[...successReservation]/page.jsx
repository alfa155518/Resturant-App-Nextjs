'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import styles from '@/scss/pages/success-reservation.module.scss';
import Link from 'next/link';
import { FaGift, FaTag, FaBirthdayCake, FaHome, FaClipboardList, FaCreditCard, FaCalendarAlt, FaClock, FaUsers, FaMoneyBillWave, FaTable, FaCheckCircle, FaRegClock, FaDownload } from 'react-icons/fa';
import { verifyPaymentSession } from '@/actions/profile';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { paymentSuccessReservation } from './paymentSuccessReservation';

export default function SuccessReservation() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [paymentDetailsReservation, setPaymentDetailsReservation] = useState(null);
    const [paymentDetailsArray, setPaymentDetailsArray] = useState([]); // Store array of payments
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    // Get session ID and reservation ID from URL
    const sessionId = searchParams.get("session_id");
    const reservationId = searchParams.get("reservation_id");

    // Handle window resize for confetti
    useEffect(() => {
        const updateSize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);


    // Verify payment and handle state
    useEffect(() => {
        const processPayment = async () => {
            await paymentSuccessReservation(
                sessionId,
                reservationId,
                verifyPaymentSession,
                router,
                setIsLoading,
                setPaymentDetailsReservation,
                setPaymentDetailsArray
            );
        };

        processPayment();
    }, [sessionId, reservationId, pathname, router]);

    // Loading state
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Verifying payment...</p>
            </div>
        );
    }

    // Payment not found
    if (!paymentDetailsReservation) {
        router.push('/profile');
        return null;
    }

    return (
        <>
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={400}
                recycle={false}
                gravity={0.1}
            />

            <motion.div
                className={styles.successContainer}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    className={styles.successContent}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                >
                    <motion.div
                        className={styles.iconWrapper}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    >
                        <div className={styles.partyIcons}>
                            <FaBirthdayCake className={styles.partyIcon} />
                            <FaGift className={styles.partyIcon} />
                            <FaTag className={styles.partyIcon} />
                        </div>
                    </motion.div>

                    <motion.h1
                        className={styles.successTitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Celebration Time!
                    </motion.h1>

                    <motion.p
                        className={styles.successMessage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        Your reservation is confirmed! Get ready for an amazing dining experience that's about to rock your world! 🎉
                    </motion.p>

                    <motion.div
                        className={styles.reservationDetails}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        {paymentDetailsReservation && (
                            <>
                                <div className={styles.detailItem}>
                                    <span><FaCalendarAlt /></span> {new Date(paymentDetailsReservation.payment_date).toLocaleDateString()}
                                </div>
                                <div className={styles.detailItem}>
                                    <span><FaClock /></span> {paymentDetailsReservation.reservation_time + " PM"}
                                </div>
                                <div className={styles.detailItem}>
                                    <span><FaUsers /></span> {paymentDetailsReservation.guest_count} people
                                </div>

                                <div className={styles.paymentInfo}>
                                    <h3>
                                        <FaCreditCard /> Payment Information
                                    </h3>
                                    <div className={styles.paymentGrid}>
                                        <motion.div
                                            className={`${styles.paymentDetail} ${styles.method}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <h4>Payment Method</h4>
                                            <p>
                                                <FaCreditCard className={styles.creditCardIcon} /> {paymentDetailsReservation.payment_method || 'Credit Card'}
                                            </p>
                                        </motion.div>
                                        <motion.div
                                            className={styles.paymentDetail}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <h4>Payment Status</h4>
                                            <p>
                                                <FaCheckCircle className={styles.checkCircleIcon} /> {paymentDetailsReservation.payment_status || 'Completed'}
                                            </p>
                                        </motion.div>
                                        <motion.div
                                            className={styles.paymentDetail}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <h4>Table ID</h4>
                                            <p>
                                                <FaTable className={styles.tableIcon} /> {paymentDetailsReservation.table_id || 'T-001'}
                                            </p>
                                        </motion.div>
                                        <motion.div
                                            className={styles.paymentDetail}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <h4>Table Name</h4>
                                            <p>{paymentDetailsReservation.table_name || 'Luxury Table'}</p>
                                        </motion.div>
                                        <motion.div
                                            className={styles.paymentDetail}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 }}
                                        >
                                            <h4>Payment Date</h4>
                                            <p>
                                                <FaRegClock className={styles.clockIcon} /> {new Date().toLocaleDateString()}
                                            </p>
                                        </motion.div>
                                        <motion.div
                                            className={styles.paymentDetail}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            <h4>Amount Paid</h4>
                                            <p>
                                                <FaMoneyBillWave className={styles.moneyIcon} /> ${paymentDetailsReservation.amount || '220.00'}
                                            </p>
                                        </motion.div>
                                    </div>
                                    {paymentDetailsReservation.pdf_download_url && (
                                        <motion.div
                                            className={styles.downloadReceipt}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.8 }}
                                        >
                                            <Link
                                                href={paymentDetailsReservation.pdf_download_url}
                                                className={styles.downloadLink}
                                                target="_blank"
                                                download
                                            >
                                                <FaDownload className={styles.downloadIcon} />
                                                Download Receipt (PDF)
                                            </Link>
                                        </motion.div>
                                    )}
                                </div>
                            </>
                        )}
                    </motion.div>

                    <motion.div
                        className={styles.actionButtons}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/profile" className={styles.viewReservationsBtn}>
                                <FaClipboardList className={styles.buttonIcon} />
                                View Reservations
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/" className={styles.homeBtn}>
                                <FaHome className={styles.buttonIcon} />
                                Back to Home
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </>
    );
}