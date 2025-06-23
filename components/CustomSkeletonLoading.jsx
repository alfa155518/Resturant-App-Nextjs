import Skeleton from "react-loading-skeleton";
import styles from "../src/css/custom-skeleton-loading.module.css"

export default function CustomSkeletonLoading() {
    return (
        <section className={styles.containerNotFound}>
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className={styles.notFoundCard}>
                        <Skeleton height={250} />
                    </div>
                ))
            }
        </section>
    );
}