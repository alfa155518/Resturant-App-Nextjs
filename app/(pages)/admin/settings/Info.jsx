import { motion } from 'framer-motion';
import { FiSave, FiX, FiEdit2, FiMail, FiInfo, FiMapPin, FiPhone, FiGlobe, FiUpload, FiImage } from 'react-icons/fi';
import Image from 'next/image';
import useRestaurantInfo from '@/hooks/useRestaurantInfo';
import Skeleton from 'react-loading-skeleton';

export default function SettingsInfo({ styles }) {
    // useRestaurantInfo hook
    const [restaurantInfo,
        setRestaurantInfo,
        editingRestaurantInfo,
        setEditingRestaurantInfo,
        handleRestaurantInfoSubmit,
        handleLogoChange,
        handleLogoClick,
        logoPreview,
        fileInputRef] = useRestaurantInfo();

    if (!restaurantInfo || restaurantInfo.length === 0) {
        return (
            <motion.div
                className={styles.settingsCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>
                        <FiInfo className={styles.cardIcon} />
                        Restaurant Information
                    </h3>
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
            transition={{ duration: 0.3, delay: 0.1 }}
        >
            <div className={styles.cardHeader}>
                <h3><FiInfo /> Restaurant Information</h3>
                {!editingRestaurantInfo ? (
                    <button
                        className={styles.editBtn}
                        onClick={() => setEditingRestaurantInfo(true)}
                    >
                        <FiEdit2 /> Edit
                    </button>
                ) : (
                    <button
                        className={styles.cancelBtn}
                        onClick={() => setEditingRestaurantInfo(false)}
                    >
                        <FiX /> Cancel
                    </button>
                )}
            </div>

            {!editingRestaurantInfo ? (
                <div className={styles.infoContent}>
                    <div className={styles.logoContainer}>
                        {restaurantInfo.logo ? (
                            <div className={styles.logoPreview}>
                                <Image
                                    src={restaurantInfo.logo}
                                    alt="Restaurant Logo"
                                    width={120}
                                    height={120}
                                    className={styles.logoImage}
                                />
                            </div>
                        ) : (
                            <div className={styles.logoPlaceholder}>
                                <FiImage size={48} className={styles.logoIcon} />
                                <span>No logo uploaded</span>
                            </div>
                        )}
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Restaurant Name</span>
                        <span className={styles.infoValue}>{restaurantInfo.name}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}><FiMapPin /> Address</span>
                        <span className={styles.infoValue}>{restaurantInfo.address}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}><FiPhone /> Phone</span>
                        <span className={styles.infoValue}>{restaurantInfo.phone}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}><FiMail /> Email</span>
                        <span className={styles.infoValue}>{restaurantInfo.email}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}><FiGlobe /> Website</span>
                        <span className={styles.infoValue}>{restaurantInfo.website}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Description</span>
                        <span className={styles.infoValue}>{restaurantInfo.description}</span>
                    </div>
                </div>
            ) : (
                <form className={styles.formWrapper} onSubmit={handleRestaurantInfoSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="logo" className={styles.formLabel}>Restaurant Logo</label>
                        <div className={styles.logoUploadContainer}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleLogoChange}
                                accept="image/*"
                                className={styles.fileInput}
                                name="logo"
                                id="logo"
                            />
                            <div className={styles.logoUpload} onClick={handleLogoClick}>
                                {logoPreview ? (
                                    <Image
                                        src={logoPreview}
                                        alt="Logo Preview"
                                        width={100}
                                        height={100}
                                        className={styles.logoPreviewImage}
                                    />
                                ) : (
                                    <div className={styles.uploadPlaceholder}>
                                        <FiUpload size={24} />
                                        <span>Click to upload logo</span>
                                        <small>Recommended size: 200x200px</small>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="restaurantName" className={styles.formLabel}>Restaurant Name</label>
                        <input id="restaurantName" className={styles.formInput}
                            type="text"
                            value={restaurantInfo.name}
                            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
                            required
                            name='restaurant-name'
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="restaurantAddress" className={styles.formLabel}>Address</label>
                        <input id="restaurantAddress" className={styles.formInput}
                            type="text"
                            value={restaurantInfo.address}
                            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, address: e.target.value })}
                            required
                            name='restaurant-address'
                        />
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label htmlFor="restaurantPhone" className={styles.formLabel}>Phone</label>
                            <input id="restaurantPhone" className={styles.formInput}
                                type="text"
                                value={restaurantInfo.phone}
                                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })}
                                required
                                name='restaurant-phone'
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="restaurantEmail" className={styles.formLabel}>Email</label>
                            <input id="restaurantEmail" className={styles.formInput}
                                type="email"
                                value={restaurantInfo.email}
                                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })}
                                required
                                name='restaurant-email'
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="restaurantWebsite" className={styles.formLabel}>Website</label>
                        <input id="restaurantWebsite" className={styles.formInput}
                            type="text"
                            value={restaurantInfo.website}
                            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, website: e.target.value })}
                            required
                            name='restaurant-website'
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="restaurantDescription" className={styles.formLabel}>Description</label>
                        <textarea id="restaurantDescription" className={styles.formTextarea}
                            value={restaurantInfo.description}
                            onChange={(e) => setRestaurantInfo({ ...restaurantInfo, description: e.target.value })}
                            rows="3"
                            required
                            name='restaurant-description'
                        ></textarea>
                    </div>
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