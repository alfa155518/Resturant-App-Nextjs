"use client";

import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiMail,
  FiPhone,
  FiClock,
  FiX,
  FiUpload,
  FiLink,
  FiTwitter,
  FiFacebook,
  FiInstagram,
  FiLinkedin
} from 'react-icons/fi';
import styles from '../../../src/css/admin-team.module.css';
import { useState } from 'react';
import Image from 'next/image';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Form state
  const [newMember, setNewMember] = useState({
    name: '',
    role: 'Staff',
    hire_date: new Date().toISOString().split('T')[0],
    salary: '',
    email: '',
    image: '',
    bio: '',
    is_active: true
  });

  // Roles list
  const roles = [
    'Manager',
    'Chef',
    'Sous Chef',
    'Line Cook',
    'Server',
    'Bartender',
    'Host/Hostess',
    'Busser',
    'Dishwasher',
    'Staff'
  ];

  // Sample team data - replace with actual API call
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Head Chef',
      email: 'john@example.com',
      hire_date: '2022-01-15',
      salary: 50000,
      image: '/images/team/chef1.jpg',
      bio: 'Experienced chef with 10+ years in fine dining',
      is_active: true
    },
    // Add more sample data as needed
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = activeFilter === 'all' || member.status === activeFilter;

    return matchesSearch && matchesFilter;
  });

  const handleAddMember = (member) => {
    setTeamMembers([...teamMembers, {
      ...member,
      id: teamMembers.length + 1,
      salary: Number(member.salary) // Ensure salary is a number
    }]);
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditMember = (updatedMember) => {
    setTeamMembers(teamMembers.map(member =>
      member.id === updatedMember.id ? updatedMember : member
    ));
    setIsEditModalOpen(false);
    setSelectedMember(null);
    // Reset form after editing
    setNewMember({
      name: '',
      position: '',
      email: '',
      phone: '',
      department: 'Kitchen',
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      image: '',
      bio: '',
      social: {
        twitter: '',
        facebook: '',
        instagram: '',
        linkedin: ''
      }
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewMember(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMember(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAddModalOpen) {
      handleAddMember(newMember);
    } else {
      handleEditMember({
        ...selectedMember,
        ...newMember
      });
    }
  };

  // Reset form
  const resetForm = () => {
    setNewMember({
      name: '',
      role: 'Staff',
      hire_date: new Date().toISOString().split('T')[0],
      salary: '',
      email: '',
      image: '',
      bio: '',
      is_active: true
    });
  };

  const handleDeleteMember = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  return (
    <div className={styles.teamContainer}>
      <motion.div
        className={styles.teamHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Team Management</h1>
        <p>Manage your restaurant team members and their roles</p>
      </motion.div>

      <motion.div
        className={styles.teamActions}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterButtons}>
          <button
            className={`${styles.filterButton} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Members
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'active' ? styles.active : ''}`}
            onClick={() => setActiveFilter('active')}
          >
            Active
          </button>
          <button
            className={`${styles.filterButton} ${activeFilter === 'inactive' ? styles.active : ''}`}
            onClick={() => setActiveFilter('inactive')}
          >
            Inactive
          </button>
        </div>

        <button
          className={styles.addButton}
          onClick={() => setIsAddModalOpen(true)}
        >
          <FiPlus /> Add Team Member
        </button>
      </motion.div>

      <motion.div
        className={styles.teamGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <motion.div
              key={member.id}
              className={`${styles.teamCard} ${member.status === 'inactive' ? styles.inactive : ''}`}
              variants={itemVariants}
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
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <FiUser size={40} />
                  </div>
                )}
                <span className={`${styles.statusBadge} ${member.status === 'active' ? styles.active : ''}`}>
                  {member.status}
                </span>
              </div>

              <div className={styles.memberInfo}>
                <h3>{member.name}</h3>
                <p className={styles.position}>{member.position}</p>
                <p className={styles.department}>{member.department}</p>

                <div className={styles.contactInfo}>
                  <div className={styles.contactItem}>
                    <FiMail className={styles.contactIcon} />
                    <span>{member.email}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <FiPhone className={styles.contactIcon} />
                    <span>{member.phone}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <FiClock className={styles.contactIcon} />
                    <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      setSelectedMember(member);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteMember(member.id)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div
            className={styles.noResults}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p>No team members found matching your criteria.</p>
          </motion.div>
        )}
      </motion.div>

      {/* Add/Edit Member Modal */}
      <AnimatePresence>
        {(isAddModalOpen || isEditModalOpen) && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsAddModalOpen(false);
              setIsEditModalOpen(false);
              setSelectedMember(null);
            }}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>{isAddModalOpen ? 'Add New Team Member' : 'Edit Team Member'}</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    setSelectedMember(null);
                  }}
                  aria-label="Close modal"
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.modalBody}>
                <form onSubmit={handleSubmit} className={styles.memberForm}>
                  <div className={styles.avatarUpload}>
                    <div className={styles.avatarPreview}>
                      {newMember.image ? (
                        <Image
                          src={newMember.image}
                          alt="Preview"
                          width={120}
                          height={120}
                          className={styles.avatarImage}
                        />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          <FiUser size={32} />
                        </div>
                      )}
                    </div>
                    <div className={styles.uploadControls}>
                      <input
                        type="file"
                        id="memberImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className={styles.fileInput}
                      />
                      <label htmlFor="memberImage" className={styles.uploadButton}>
                        <FiUpload /> Upload Photo
                      </label>
                      <button
                        type="button"
                        className={styles.linkButton}
                        onClick={(e) => {
                          e.preventDefault();
                          const url = prompt('Enter image URL:');
                          if (url) {
                            setNewMember(prev => ({ ...prev, image: url }));
                          }
                        }}
                      >
                        <FiLink /> Use URL
                      </button>
                    </div>
                  </div>


                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={newMember.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="role">Role *</label>
                      <select
                        id="role"
                        name="role"
                        value={newMember.role}
                        onChange={handleInputChange}
                        className={styles.selectInput}
                        required
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="salary">Salary ($)</label>
                      <input
                        type="number"
                        id="salary"
                        name="salary"
                        value={newMember.salary}
                        onChange={handleInputChange}
                        placeholder="e.g., 45000"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="hire_date">Hire Date</label>
                      <input
                        type="date"
                        id="hire_date"
                        name="hire_date"
                        value={newMember.hire_date}
                        onChange={handleInputChange}
                        className={styles.dateInput}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={newMember.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={newMember.is_active}
                        onChange={handleInputChange}
                      />
                      <span className={styles.checkmark}></span>
                      Active Team Member
                    </label>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="bio">Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={newMember.bio}
                      onChange={handleInputChange}
                      placeholder="A short bio about the team member..."
                      rows="4"
                      className={styles.textarea}
                    ></textarea>
                  </div>

                  <div className={styles.formActions}>
                    <button
                      type="button"
                      className={styles.cancelButton}
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setIsEditModalOpen(false);
                        setSelectedMember(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={styles.saveButton}
                      disabled={!newMember.name || !newMember.position || !newMember.email || !newMember.department}
                    >
                      {isAddModalOpen ? 'Add Team Member' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Team;