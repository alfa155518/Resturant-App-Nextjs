
import Team from '@/app/(pages)/admin/team/Team';
import styles from '../../../../src/css/admin-team.module.css';

export const metadata = {
    title: 'Team Management | Gourmet Haven Restaurant',
    description: 'Admin Team Management | Manage restaurant team members',
}

export default function AdminTeamPage() {
    return (
        <div className={styles.teamContainer}>
            <Team />
        </div>
    );
}
