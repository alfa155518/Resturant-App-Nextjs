import { motion } from 'framer-motion';
import { FiDollarSign } from 'react-icons/fi';

import Skeleton from 'react-loading-skeleton';
import usePaymentMethods from '@/hooks/usePaymentMethods';

export default function PaymentMethods({ styles }) {
    // custom hook for payment methods
    const [paymentMethods, togglePaymentMethod] = usePaymentMethods();

    if (!paymentMethods || paymentMethods.length === 0) {
        return (
            <motion.div
                className={styles.settingsCard}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <div className={styles.cardHeader}>
                    <h3><FiDollarSign /> Payment Methods</h3>
                </div>

                <Skeleton count={5} height={30} />
            </motion.div>
        );
    }


    return (

        <motion.div
            className={styles.settingsCard}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
        >
            <div className={styles.cardHeader}>
                <h3><FiDollarSign /> Payment Methods</h3>
            </div>
            <div className={styles.paymentMethodsContent}>
                {paymentMethods.map(method => (
                    <div key={method.id} className={styles.paymentMethod}>
                        <span className={styles.paymentMethodName}>{method.name}</span>
                        <div className={styles.toggleSwitch}>
                            <input
                                className={styles.formInput}
                                type="checkbox"
                                id={`payment-${method.id}`}
                                checked={method.enabled}
                                onChange={() => togglePaymentMethod(method.id)}
                                autoComplete={`payment-${method.id}`}
                                name={`payment-${method.id}`}
                            />
                            <label className={styles.toggleLabel} htmlFor={`payment-${method.id}`}></label>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}