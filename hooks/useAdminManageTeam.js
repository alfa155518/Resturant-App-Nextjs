import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { AdminManageTeamContext } from "@/store/AdminManageTeamProvider";
import { useContext, useState } from "react";


export default function useAdminManageTeam() {

    // Admin Manage Team Context
    const { teamMembers, handelAddTeamMember, handelUpdateTeamMember, handelDeleteTeamMember } = useContext(AdminManageTeamContext);

    // State
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState(null);
    const [imagePreview, setImagePreview] = useState('');


    // Filter team members based on search and role
    const filteredMembers = teamMembers?.filter(member => {
        const matchesSearch =
            member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'All' || member.role === roleFilter;
        return matchesSearch && matchesRole;
    }) || [];

    // Handle edit member
    const handleEdit = (member) => {
        setMemberToEdit(member);
        setIsModalOpen(true);
    };

    // Handle delete member
    const handleDelete = (id) => {
        const confirmDelete = ConfirmationDialog({
            message: `Are you sure you want to delete this team member?`,
            onConfirm: () => {
                handelDeleteTeamMember(id);
            },
            confirmText: 'Delete',
            confirmButtonStyle: {
                background: '#ff4444',
            },
            cancelButtonStyle: {
                background: '#6c757d',
            }
        });
        confirmDelete.show();
    };

    // Handle add new member
    const handleAddNew = () => {
        setMemberToEdit(null);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setMemberToEdit(null);
    };

    // Default form values
    const defaultFormValues = {
        id: '',
        name: '',
        role: '',
        email: '',
        salary: '',
        hire_date: new Date().toISOString().split('T')[0],
        bio: '',
        image: null,
        is_active: false,
    };

    // Form state
    const [formData, setFormData] = useState({ ...defaultFormValues });

    // Get form values from member data or use defaults
    const getFormValues = (member) => {
        if (!member) return { ...defaultFormValues };
        return {
            id: member.id || '',
            name: member.name || '',
            role: member.role || '',
            email: member.email || '',
            salary: member.salary || '',
            hire_date: member.hire_date || defaultFormValues.hire_date,
            bio: member.bio || '',
            image: member.image || null,
            is_active: member.is_active
        };
    };

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (formData) => {
        const memberData = {
            ...formData
        };
        if (memberToEdit) {
            // Update existing member
            handelUpdateTeamMember(memberData);
        } else {
            // Add new member
            handelAddTeamMember(memberData);
        }
        closeModal();
    };

    // Available roles for filtering
    const roles = ['All', 'Head Chef', 'Sous Chef', 'Pastry Chef', 'Line Cook', 'Prep Cook', 'Dishwasher', 'Server', 'Bartender', 'Hostess', 'Busser', 'Manager'];

    // Animation variants for the team grid
    const teamGridVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    // Animation variants for the team member
    const teamMemberVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    // Return values
    return [
        teamMembers,
        searchTerm,
        setSearchTerm,
        roleFilter,
        setRoleFilter,
        isModalOpen,
        memberToEdit,
        imagePreview,
        filteredMembers,
        handleEdit,
        handleDelete,
        handleAddNew,
        closeModal,
        formData,
        setFormData,
        getFormValues,
        handleFileChange,
        handleSubmit,
        roles,
        teamGridVariants,
        teamMemberVariants,
    ]

}
