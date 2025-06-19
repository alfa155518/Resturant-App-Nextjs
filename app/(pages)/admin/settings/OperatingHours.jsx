
import useOperatingHours from '@/hooks/useOperatingHours';
import { motion } from 'framer-motion';
import { FiSave, FiX, FiEdit2, FiClock } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
export default function OperatingHours({ styles }) {
    // operating hours hook
    const [
        editingHours,
        setEditingHours,
        operatingHours,
        handleHoursSubmit,
        updateHours] = useOperatingHours();

    if (!operatingHours || operatingHours.length === 0) {
        return (
            <motion.div
                className={styles.settingsCard}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
            >
                <div className={styles.cardHeader}>
                    <h3><FiClock /> Operating Hours</h3>
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
            transition={{ duration: 0.3, delay: 0.2 }}
        >
            <div className={styles.cardHeader}>
                <h3><FiClock /> Operating Hours</h3>
                {!editingHours ? (
                    <button
                        className={styles.editBtn}
                        onClick={() => setEditingHours(true)}
                    >
                        <FiEdit2 /> Edit
                    </button>
                ) : (
                    <button
                        className={styles.cancelBtn}
                        onClick={() => setEditingHours(false)}
                    >
                        <FiX /> Cancel
                    </button>
                )}
            </div>

            {!editingHours ? (
                <div className={styles.hoursContent}>
                    {operatingHours.map((hours, index) => (
                        <div key={index} className={styles.hourRow}>
                            <span className={styles.dayLabel}>{hours.day}</span>
                            {hours.closed ? (
                                <span className={styles.closedLabel}>Closed</span>
                            ) : (
                                <span className={styles.timeRange}>{hours.open} - {hours.close}</span>
                            )}
                        </div>
                    ))}
                </div>
            ) : (

                <form className={styles.formWrapper} onSubmit={handleHoursSubmit}>
                    {operatingHours.map((hours) => (
                        <div key={hours.id} className={styles.hourInputRow}>
                            <span className={styles.dayLabel}>{hours.day}</span>
                            <div className={styles.hourInputs}>
                                <div className={styles.timeInputs}>
                                    <input
                                        id={`open-${hours.id}`}
                                        className={styles.formInput}
                                        type="time"
                                        value={hours.open.slice(0, 5)} // Format HH:MM
                                        onChange={(e) => updateHours(hours.id, 'open', `${e.target.value}:00`)}
                                        disabled={hours.closed}
                                        required={!hours.closed}
                                        autoComplete={`open-${hours.id}`}
                                        name={`open-${hours.id}`}
                                    />
                                    <span className={styles.timeSeparator}>to</span>
                                    <input
                                        id={`close-${hours.id}`}
                                        className={styles.formInput}
                                        type="time"
                                        value={hours.close.slice(0, 5)} // Format HH:MM
                                        onChange={(e) => updateHours(hours.id, 'close', `${e.target.value}:00`)}
                                        disabled={hours.closed}
                                        required={!hours.closed}
                                        autoComplete={`close-${hours.id}`}
                                        name={`close-${hours.id}`}
                                    />
                                </div>
                                <div className={styles.closedToggle}>
                                    <input
                                        id={`closed-${hours.id}`}
                                        className={styles.formInput}
                                        type="checkbox"
                                        checked={hours.closed}
                                        onChange={(e) => updateHours(hours.id, 'closed', e.target.checked)}
                                        autoComplete={`closed-${hours.id}`}
                                        name={`closed-${hours.id}`}
                                    />
                                    <label className={styles.toggleLabel} htmlFor={`closed-${hours.id}`}></label>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.saveBtn}>
                            <FiSave /> Save Changes
                        </button>
                    </div>
                </form>
            )}
        </motion.div>
    );
}