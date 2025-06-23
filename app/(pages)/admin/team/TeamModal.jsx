
import { FiUser, FiPlus, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TeamModal({ styles, isModalOpen, closeModal, memberToEdit, formData, setFormData, handleSubmit, imagePreview, handleFileChange, roles }) {
    return (
        isModalOpen && (
            <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
            >
                <motion.div
                    className={styles.modalContent}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.modalHeader}>
                        <h2>{memberToEdit ? 'Edit Team Member' : 'Add New Team Member'}</h2>
                        <button className={styles.closeButton} onClick={closeModal}>
                            <FiX />
                        </button>
                    </div>
                    <div className={styles.modalBody}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(formData);
                        }} className={styles.memberForm}>
                            <div className={styles.avatarUpload}>
                                <div className={styles.avatarPreview}>
                                    {formData.image ? (
                                        <Image
                                            src={imagePreview || formData.image}
                                            alt="Profile Preview"
                                            width={150}
                                            height={150}
                                            className={styles.avatarImage}
                                            priority
                                        />
                                    ) : (
                                        <div className={styles.avatarPlaceholder}>
                                            <FiUser size={48} />
                                        </div>
                                    )}
                                </div>
                                <div className={styles.uploadControls}>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        accept="image/*"
                                        className={styles.fileInput}
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                    <label htmlFor="avatar-upload" className={styles.uploadButton}>
                                        <FiPlus /> Upload Photo
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Full Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        autoComplete='name'
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="role">Role *</label>
                                    <select
                                        id="role"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        required
                                        autoComplete='role'
                                    >
                                        <option value="">Select Role</option>
                                        {roles.filter(r => r !== 'All').map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email || ''}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        autoComplete='email'
                                    />
                                </div>

                            </div>

                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="salary">Salary</label>
                                    <input
                                        type="number"
                                        id="salary"
                                        value={formData.salary || ''}
                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                        min="0"
                                        step="0.01"
                                        autoComplete='salary'
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="hireDate">Hire Date</label>
                                    <input
                                        type="date"
                                        id="hireDate"
                                        value={formData.hire_date ? formData.hire_date.split('T')[0] : ''}
                                        onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                                        autoComplete='hire_date'
                                    />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="bio">Bio</label>
                                <textarea
                                    id="bio"
                                    rows="4"
                                    value={formData.bio || ''}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="A short bio about the team member..."
                                    autoComplete='bio'
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="is_active" className={styles.toggleSwitch}>
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        className={styles.toggleInput}
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                        autoComplete='is_active'
                                    />
                                    <span className={styles.toggleSlider}></span>
                                    <span className={styles.toggleLabel}>
                                        {formData.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </label>
                            </div>

                            <div className={styles.formActions}>
                                <button
                                    type="button"
                                    className={styles.cancelButton}
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className={styles.saveButton}
                                    disabled={!formData.name || !formData.role || !formData.email}
                                >
                                    {memberToEdit ? 'Update' : 'Add'} Member
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}