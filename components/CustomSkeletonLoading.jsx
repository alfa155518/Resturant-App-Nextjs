import Skeleton from "react-loading-skeleton";
import styles from "../src/css/custom-skeleton-loading.module.css"

export default function CustomSkeletonLoading({ count, height }) {
    return (
        <section className={styles.containerNotFound}>
            {
                Array.from({ length: count }).map((_, index) => (
                    <div key={index} className={styles.notFoundCard}>
                        <Skeleton height={height} />
                    </div>
                ))
            }
        </section>
    );
}