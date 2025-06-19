
import useNotificationSettings from '@/hooks/useNotifiCationsSettings';
import { motion } from 'framer-motion';
import { FiMail } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';

export default function Notification({ styles }) {

    // custom hook notification Settings 
    const [notificationSettings, toggleNotification] = useNotificationSettings();

    if (!notificationSettings || notificationSettings.length === 0) {
        return (
            <motion.div
                className={styles.settingsCard}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
            >
                <div className={styles.cardHeader}>
                    <h3><FiMail /> Notification Settings</h3>
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
            transition={{ duration: 0.3, delay: 0.4 }}
        >
            <div className={styles.cardHeader}>
                <h3><FiMail /> Notification Settings</h3>
            </div>

            <div className={styles.notificationContent}>
                <div className={styles.notificationGroup}>
                    <h4 className={styles.notificationGroupTitle}>Order Notifications</h4>
                    <div className={styles.notificationSetting}>
                        <span className={styles.notificationLabel}>New Order Received</span>
                        <div className={styles.toggleSwitch}>
                            <input className={styles.formInput}
                                type="checkbox"
                                id="new_order"
                                checked={notificationSettings.new_order}
                                onChange={() => toggleNotification('new_order')}
                                required
                                autoComplete='new_order'
                                name='new_order'
                            />
                            <label className={styles.toggleLabel} htmlFor="new_order"></label>
                        </div>
                    </div>
                    <div className={styles.notificationSetting}>
                        <span className={styles.notificationLabel}>Order Status Updates</span>
                        <div className={styles.toggleSwitch}>
                            <input className={styles.formInput}
                                type="checkbox"
                                id="order_status"
                                checked={notificationSettings.order_status}
                                onChange={() => toggleNotification('order_status')}
                                required
                                autoComplete='order_status'
                                name='order_status'
                            />
                            <label className={styles.toggleLabel} htmlFor="order_status"></label>
                        </div>
                    </div>
                </div>

                <div className={styles.notificationGroup}>
                    <h4 className={styles.notificationGroupTitle}>Reservation Notifications</h4>
                    <div className={styles.notificationSetting}>
                        <span className={styles.notificationLabel}>New Reservation</span>
                        <div className={styles.toggleSwitch}>
                            <input className={styles.formInput}
                                type="checkbox"
                                id="new_reservation"
                                checked={notificationSettings.new_reservation}
                                onChange={() => toggleNotification('new_reservation')}
                                required
                                autoComplete='new_reservation'
                                name='new_reservation'
                            />
                            <label className={styles.toggleLabel} htmlFor="new_reservation"></label>
                        </div>
                    </div>
                    <div className={styles.notificationSetting}>
                        <span className={styles.notificationLabel}>Reservation Reminders</span>
                        <div className={styles.toggleSwitch}>
                            <input className={styles.formInput}
                                type="checkbox"
                                id="reservation_reminder"
                                checked={notificationSettings.reservation_reminder}
                                onChange={() => toggleNotification('reservation_reminder')}
                                required
                                autoComplete='reservation_reminder'
                                name='reservation_reminder'
                            />
                            <label className={styles.toggleLabel} htmlFor="reservation_reminder"></label>
                        </div>
                    </div>
                </div>

                <div className={styles.notificationGroup}>
                    <h4 className={styles.notificationGroupTitle}>Other Notifications</h4>
                    <div className={styles.notificationSetting}>
                        <span className={styles.notificationLabel}>New Customer Review</span>
                        <div className={styles.toggleSwitch}>
                            <input className={styles.formInput}
                                type="checkbox"
                                id="new_review"
                                checked={notificationSettings.new_review}
                                onChange={() => toggleNotification('new_review')}
                                required
                                autoComplete='new_review'
                                name='new_review'
                            />
                            <label className={styles.toggleLabel} htmlFor="new_review"></label>
                        </div>
                    </div>
                    <div className={styles.notificationSetting}>
                        <span className={styles.notificationLabel}>Low Inventory Alert</span>
                        <div className={styles.toggleSwitch}>
                            <input className={styles.formInput}
                                type="checkbox"
                                id="low_inventory"
                                checked={notificationSettings.low_inventory}
                                onChange={() => toggleNotification('low_inventory')}
                                required
                                autoComplete='low_inventory'
                                name='low_inventory'
                            />
                            <label className={styles.toggleLabel} htmlFor="low_inventory"></label>
                        </div>
                    </div>
                    <div className={styles.notificationSetting}>
                        <span className={styles.notificationLabel}>Daily Summary</span>
                        <div className={styles.toggleSwitch}>
                            <input className={styles.formInput}
                                type="checkbox"
                                id="daily_summary"
                                checked={notificationSettings.daily_summary}
                                onChange={() => toggleNotification('daily_summary')}
                                required
                                autoComplete='daily_summary'
                                name='daily_summary'
                            />
                            <label className={styles.toggleLabel} htmlFor="daily_summary"></label>
                        </div>
                    </div>
                    <div className={styles.notificationSetting}>
                        <span className={styles.notificationLabel}>Weekly Summary</span>
                        <div className={styles.toggleSwitch}>
                            <input className={styles.formInput}
                                type="checkbox"
                                id="weekly_summary"
                                checked={notificationSettings.weekly_summary}
                                onChange={() => toggleNotification('weekly_summary')}
                                required
                                autoComplete='weekly_summary'
                                name='weekly_summary'
                            />
                            <label className={styles.toggleLabel} htmlFor="weekly_summary"></label>
                        </div>
                    </div>
                    <div className={styles.notificationSetting}>
                        <span className={styles.notificationLabel}>Marketing Emails</span>
                        <div className={styles.toggleSwitch}>
                            <input className={styles.formInput}
                                type="checkbox"
                                id="marketing_emails"
                                checked={notificationSettings.marketing_emails}
                                onChange={() => toggleNotification('marketing_emails')}
                                required
                                autoComplete='marketing_emails'
                                name='marketing_emails'
                            />
                            <label className={styles.toggleLabel} htmlFor="marketing_emails"></label>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}