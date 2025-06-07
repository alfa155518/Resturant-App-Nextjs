"use client";

import Team from '@/components/admin/pages/Team';
import styles from '../../../../src/css/admin-team.module.css';

export default function AdminTeamPage() {
    return (
        <div className={styles.teamContainer}>
            <Team />
        </div>
    );
}
