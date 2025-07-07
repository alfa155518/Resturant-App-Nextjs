


export default function BlogsSidebar({ styles, categories, blogPosts, activeCategory, setActiveCategory }) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarWidget}>
                <h3 className={styles.widgetTitle}>About</h3>
                <p className={styles.widgetText}>
                    Welcome to our culinary blog where we share recipes, stories, and tips from our kitchen to yours.
                </p>
            </div>

            <div className={styles.sidebarWidget}>
                <h3 className={styles.widgetTitle}>Categories</h3>
                <ul className={styles.categoryList}>
                    {categories.map((category) => (
                        <li
                            key={category}
                            className={`${styles.categoryItem} ${activeCategory === category ? styles.active : ''
                                }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                            <span className={styles.categoryCount}>
                                {category === 'All'
                                    ? blogPosts.length
                                    : blogPosts.filter((post) => post.category === category).length}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.sidebarWidget}>
                <h3 className={styles.widgetTitle}>Popular Tags</h3>
                <div className={styles.tagCloud}>
                    {Array.from(
                        new Set(blogPosts.flatMap((post) => post.tags))
                    ).map((tag) => (
                        <span key={tag} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className={styles.sidebarWidget}>
                <h3 className={styles.widgetTitle}>Newsletter</h3>
                <p className={styles.widgetText}>
                    Subscribe to our newsletter for the latest updates and exclusive recipes.
                </p>
                <form className={styles.subscribeForm}>
                    <input
                        type="email"
                        name="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        className={styles.emailInput}
                        required
                    />
                    <button type="submit" className={styles.subscribeButton}>
                        Subscribe
                    </button>
                </form>
            </div>
        </aside>
    );
}