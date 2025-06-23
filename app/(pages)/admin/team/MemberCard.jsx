import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiUser, FiMail, FiDollarSign, FiCalendar } from 'react-icons/fi';
import Image from 'next/image';
export default function MemberCard({ styles, filteredMembers, handleEdit, handleDelete, teamGridVariants, teamMemberVariants }) {
    return (
        <motion.div
            className={styles.teamGrid}
            variants={teamGridVariants}
            initial="hidden"
            animate="visible"
        >
            {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                    <motion.div
                        key={member.id}
                        className={`${styles.teamCard} ${!member.is_active ? styles.inactive : ''}`}
                        variants={teamMemberVariants}
                        whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    >
                        <div className={styles.memberImage}>
                            {member.image ? (
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={120}
                                    height={120}
                                    className={styles.avatar}
                                    priority
                                />
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    <FiUser size={40} />
                                </div>
                            )}
                            <span className={`${styles.statusBadge} ${member.is_active ? '' : styles.inactive}`}>
                                {member.is_active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div className={styles.memberInfo}>
                            <div className={styles.memberHeader}>
                                <h3>{member.name}</h3>

                            </div>
                            <p className={styles.role}>{member.role}</p>
                            <p className={styles.email}><FiMail className={styles.infoIcon} /> {member.email}</p>
                            {member.salary && (
                                <p className={styles.salary}>
                                    <FiDollarSign className={styles.infoIcon} />
                                    ${member.salary.toLocaleString()}
                                </p>
                            )}
                            {member.hire_date && (
                                <p className={styles.hireDate}>
                                    <FiCalendar className={styles.infoIcon} />
                                    Hired: {new Date(member.hire_date).toLocaleDateString()}
                                </p>
                            )}
                            <div className={styles.contactInfo}>
                                <div className={styles.contactItem}>
                                    <FiMail className={styles.contactIcon} />
                                    <span>{member.email}</span>
                                </div>
                            </div>
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.editButton}
                                    onClick={() => handleEdit(member)}
                                >
                                    <FiEdit2 /> Edit
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(member.id)}
                                >
                                    <FiTrash2 /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className={styles.noResults}>
                    <p>No team members found. Try adjusting your search or add a new team member.</p>
                </div>
            )}
        </motion.div>
    )
}