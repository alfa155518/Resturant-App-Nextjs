"use client";
import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../../src/css/single-blog.module.css';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaShare, FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaComment } from 'react-icons/fa';

// Optimize data fetching
const fetchBlogPost = (id, blogPosts) => {
  const currentPostId = parseInt(id);
  return blogPosts.find(post => post.id === currentPostId);
};

const fetchRelatedPosts = (currentPost, blogPosts) => {
  if (!currentPost) return [];
  
  return blogPosts.filter(post => {
    if (post.id === currentPost.id) return false;
    return post.category === currentPost.category ||
      post.tags.some(tag => currentPost.tags.includes(tag));
  }).slice(0, 3);
};
export default function SingleBlog() {
  const params = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Mock blog posts data - in a real app, you would fetch this from an API
  const blogPosts = [
    {
      id: 1,
      title: "Seasonal Ingredients: Summer Edition",
      excerpt: "Discover the vibrant flavors of summer with our guide to seasonal ingredients that will elevate your culinary experience.",
      content: `
        <p>Summer brings an abundance of fresh, vibrant ingredients that can transform your cooking. From juicy tomatoes to fragrant herbs, the season offers a cornucopia of flavors waiting to be explored.</p>
        
        <h2>The Stars of Summer</h2>
        <p>When the temperature rises, local markets fill with colorful produce that reaches peak flavor. Here are some standout ingredients to incorporate into your summer menu:</p>
        
        <h3>1. Heirloom Tomatoes</h3>
        <p>These jewels of summer come in a rainbow of colors and offer complex, sweet flavors that bear little resemblance to their supermarket counterparts. Slice them simply with good olive oil and flaky salt, or use them in a rustic galette.</p>
        
        <h3>2. Stone Fruits</h3>
        <p>Peaches, nectarines, plums, and apricots reach their prime in summer. Their sweet-tart balance works beautifully in both sweet and savory applications. Try grilling peaches to serve alongside pork, or make a simple stone fruit galette for dessert.</p>
        
        <h3>3. Fresh Herbs</h3>
        <p>Basil, mint, cilantro, and other herbs flourish in summer gardens. Use them generously to add brightness and complexity to your dishes. A handful of torn basil transforms a simple pasta, while mint elevates summer beverages.</p>
        
        <h2>Chef's Tips for Summer Cooking</h2>
        <p>When working with peak-season ingredients, less is often more. Here are some approaches our chefs recommend:</p>
        
        <ul>
          <li>Let quality ingredients shine with minimal intervention</li>
          <li>Embrace raw preparations that showcase freshness</li>
          <li>Use high heat cooking methods like grilling to enhance natural sweetness</li>
          <li>Balance rich dishes with acidic components like citrus or vinegar</li>
          <li>Don't overthink it - sometimes the simplest preparation yields the most delicious results</li>
        </ul>
        
        <h2>A Simple Summer Recipe</h2>
        <p>Here's a favorite from our kitchen that highlights the best of summer produce:</p>
        
        <h3>Heirloom Tomato & Burrata Salad</h3>
        <p><strong>Ingredients:</strong></p>
        <ul>
          <li>2-3 large heirloom tomatoes, different colors if possible</li>
          <li>1 ball fresh burrata cheese</li>
          <li>Extra virgin olive oil</li>
          <li>Flaky sea salt and freshly ground black pepper</li>
          <li>Fresh basil leaves</li>
          <li>Optional: balsamic glaze</li>
        </ul>
        
        <p><strong>Method:</strong></p>
        <ol>
          <li>Slice tomatoes into different shapes and arrange on a platter</li>
          <li>Place burrata in the center</li>
          <li>Drizzle generously with olive oil</li>
          <li>Season with flaky salt and pepper</li>
          <li>Scatter torn basil leaves over the top</li>
          <li>If using, drizzle with a small amount of balsamic glaze</li>
          <li>Serve immediately with crusty bread</li>
        </ol>
        
        <p>This simple preparation allows the quality of each ingredient to shine through, creating a dish that's greater than the sum of its parts.</p>
        
        <h2>Looking Ahead</h2>
        <p>As we move through the season, different varieties will reach their peak. Stay tuned for our follow-up article on late summer ingredients, where we'll explore the transition into early fall flavors.</p>
        
        <p>Until then, we encourage you to visit your local farmers' market and discover the incredible produce available in your area. Your taste buds—and your dinner guests—will thank you.</p>
      `,
      image: "/images/blog/blog-1.webp",
      gallery: [
        "/images/blog/blog-1.1.webp",
        "/images/blog/blog-1.2.webp",
        "/images/blog/blog-1.3.webp",
        "/images/blog/blog-1.4.webp",
      ],
      date: "June 15, 2023",
      author: "Chef John Doe",
      authorImage: "/images/auhers/auther-1.webp",
      authorBio: "Executive Chef with over 15 years of experience in fine dining. Specializes in seasonal, locally-sourced cuisine.",
      category: "Food",
      tags: ["seasonal", "ingredients", "summer", "cooking"],
      comments: [
        {
          id: 1,
          name: "Maria Garcia",
          date: "June 16, 2023",
          content: "This was so helpful! I've been wondering how to use all the tomatoes from my garden. Will definitely try the burrata salad recipe."
        },
        {
          id: 2,
          name: "James Wilson",
          date: "June 17, 2023",
          content: "Great article! Would love to see more seasonal recipes like this."
        }
      ]
    },
    {
      id: 2,
      title: "The Art of Wine Pairing",
      excerpt: "Learn the secrets of perfect wine pairing from our expert sommelier and enhance your dining experience.",
      image: "/images/blog/blog-2.webp",
      date: "May 28, 2023",
      author: "David Wilson",
      category: "Drinks",
      tags: ["wine", "pairing", "dining", "experience"]
    },
    {
      id: 3,
      title: "Behind the Scenes: A Day in Our Kitchen",
      excerpt: "Take a peek behind the curtain and discover what goes into creating our award-winning dishes.",
      content: `
        <p>Ever wondered what happens in a professional restaurant kitchen? Join us for an exclusive behind-the-scenes look at a typical day in our bustling culinary workspace.</p>
        
        <h2>The Morning Prep</h2>
        <p>Our day begins long before the first customer arrives. By 7:00 AM, our kitchen is already alive with activity:</p>
        
        <h3>Fresh Deliveries</h3>
        <p>Local farmers and suppliers arrive with the day's fresh ingredients. Our chefs personally inspect each delivery, ensuring only the finest produce makes it into our kitchen.</p>
        
        <h3>Mise en Place</h3>
        <p>The French culinary phrase "mise en place" means "everything in its place," and it's the foundation of our kitchen operations. Vegetables are chopped, sauces are prepared, and proteins are portioned—all to ensure smooth service later in the day.</p>
        
        <h2>The Staff Meal</h2>
        <p>At 11:00 AM, our entire team gathers for the staff meal. This important tradition serves multiple purposes:</p>
        <ul>
          <li>It provides nourishment for the demanding shift ahead</li>
          <li>It allows our chefs to experiment with new flavors and techniques</li>
          <li>It builds camaraderie among our front and back of house teams</li>
          <li>It gives everyone a chance to taste and discuss the day's specials</li>
        </ul>
        
        <h2>Service Time</h2>
        <p>When the doors open at noon, the kitchen transforms into a choreographed dance of precision and timing:</p>
        
        <h3>The Line</h3>
        <p>Our line cooks work at specialized stations—grill, sauté, cold apps, and pastry. Each position requires different skills, but all demand speed, accuracy, and consistency.</p>
        
        <h3>The Pass</h3>
        <p>The heart of our kitchen is "the pass"—where the head chef inspects every dish before it leaves the kitchen. Nothing reaches our guests without meeting our exacting standards.</p>
        
        <h2>The Evening Rush</h2>
        <p>Between 6:00 PM and 9:00 PM, our kitchen reaches peak intensity. Tickets stream in continuously, and the team works with remarkable focus and coordination. The noise level rises, temperatures soar, but the quality of each plate remains paramount.</p>
        
        <h2>Closing Down</h2>
        <p>After the last guests have been served, the real cleaning begins. Every surface is scrubbed, equipment is maintained, and preparations begin for tomorrow. Inventory is checked, orders are placed, and notes are made on the day's service.</p>
        
        <p>It's often past midnight when our chefs finally leave, tired but satisfied with another successful day of creating memorable dining experiences.</p>
        
        <h2>The Unseen Dedication</h2>
        <p>What many diners don't realize is the level of dedication required in a professional kitchen. Our team works holidays, weekends, and long hours—all driven by passion for their craft and the desire to create moments of culinary joy.</p>
        
        <p>Next time you dine with us, take a moment to appreciate not just the flavors on your plate, but the skilled team working behind the scenes to make your experience exceptional.</p>
      `,
      image: "/images/blog/blog-3.webp",
      gallery: [
        "/images/blog/blog-3.1.webp",
        "/images/blog/blog-3.2.webp",
        "/images/blog/blog-3.3.webp",
        "/images/blog/blog-3.4.webp"
      ],
      date: "May 10, 2023",
      author: "Chef Michael Chen",
      authorImage: "/images/auhers/auther-3.webp",
      authorBio: "Head Chef with a passion for innovative cooking techniques and mentoring the next generation of culinary talent.",
      category: "Kitchen",
      tags: ["behind-the-scenes", "kitchen", "cooking", "chefs"],
      comments: [
        {
          id: 1,
          name: "Thomas Brown",
          date: "May 11, 2023",
          content: "Fascinating insight into the kitchen life! I had no idea how much preparation goes into each service."
        },
        {
          id: 2,
          name: "Sophia Lee",
          date: "May 12, 2023",
          content: "As a culinary student, this was really inspiring. Would love to stage in your kitchen someday!"
        }
      ]
    },
    {
      id: 4,
      title: "Hosting the Perfect Dinner Party",
      excerpt: "Tips and tricks from our event specialists on how to host a memorable dinner party for your guests.",
      image: "/images/blog/blog-4.webp",
      date: "April 22, 2023",
      author: "Sarah Johnson",
      category: "Events",
      tags: ["hosting", "dinner", "party", "tips"]
    },
    {
      id: 5,
      title: "Sustainable Practices in Modern Restaurants",
      excerpt: "How we're working to reduce our environmental footprint while maintaining exceptional quality.",
      content: `
        <p>Sustainability is no longer just a buzzword in the restaurant industry—it's a necessity. At our establishment, we believe that exceptional dining and environmental responsibility can go hand in hand.</p>
        
        <h2>Our Sustainability Journey</h2>
        <p>When we first opened our doors, we made a commitment to minimize our environmental impact. This journey has evolved over time, but our core principles remain:</p>
        <ul>
          <li>Source locally and seasonally whenever possible</li>
          <li>Reduce waste at every stage of our operation</li>
          <li>Conserve energy and water</li>
          <li>Engage with suppliers who share our values</li>
          <li>Continuously educate ourselves and our team</li>
        </ul>
        
        <h2>Farm-to-Table in Practice</h2>
        <p>The term "farm-to-table" has become commonplace, but what does it really mean in practice?</p>
        
        <h3>Building Relationships with Farmers</h3>
        <p>We've developed direct relationships with over 20 local farms within a 100-mile radius. These partnerships allow us to:</p>
        <ul>
          <li>Access the freshest seasonal produce</li>
          <li>Support sustainable farming practices</li>
          <li>Reduce transportation emissions</li>
          <li>Create a more resilient local food system</li>
        </ul>
        
        <h3>Menu Development</h3>
        <p>Our menu changes with the seasons, reflecting what's available locally rather than forcing nature to conform to our preferences. This approach:</p>
        <ul>
          <li>Challenges our chefs to be creative</li>
          <li>Provides guests with peak-flavor ingredients</li>
          <li>Reduces the environmental cost of out-of-season produce</li>
          <li>Creates anticipation for seasonal specialties</li>
        </ul>
        
        <h2>Waste Reduction Initiatives</h2>
        <p>The restaurant industry has traditionally been associated with high levels of waste. We're working to change that paradigm:</p>
        
        <h3>Nose-to-Tail and Root-to-Stem Cooking</h3>
        <p>We utilize every part of our ingredients. Vegetable trimmings become stock, meat scraps transform into charcuterie, and herb stems flavor oils and vinegars.</p>
        
        <h3>Composting Program</h3>
        <p>Any food waste that can't be repurposed is composted, creating nutrient-rich soil for the very farms that supply our ingredients—completing the cycle.</p>
        
        <h3>Minimal Packaging</h3>
        <p>We work with suppliers to reduce packaging waste, using reusable containers for deliveries whenever possible.</p>
        
        <h2>Energy and Water Conservation</h2>
        <p>Restaurants are notoriously resource-intensive. We've implemented several measures to address this:</p>
        <ul>
          <li>Energy-efficient kitchen equipment</li>
          <li>LED lighting throughout our space</li>
          <li>Low-flow water fixtures</li>
          <li>Strategic scheduling of equipment usage to reduce peak energy demand</li>
          <li>Regular maintenance to ensure optimal efficiency</li>
        </ul>
        
        <h2>Challenges and Ongoing Efforts</h2>
        <p>We're proud of our progress, but we recognize that sustainability is a journey, not a destination. Some challenges we continue to address:</p>
        <ul>
          <li>Balancing sustainability with guest expectations</li>
          <li>Finding eco-friendly alternatives for certain specialized ingredients</li>
          <li>Managing costs while maintaining our environmental commitments</li>
          <li>Educating guests about our practices without being preachy</li>
        </ul>
        
        <h2>Join Us in This Effort</h2>
        <p>Sustainability in restaurants isn't just about what happens in our kitchen—it's also about consumer choices. You can support sustainable dining by:</p>
        <ul>
          <li>Choosing restaurants with transparent sourcing practices</li>
          <li>Being open to seasonal menu changes</li>
          <li>Asking questions about where your food comes from</li>
          <li>Understanding that sustainable practices may come with slightly higher prices</li>
        </ul>
        
        <p>We believe that the future of dining is both delicious and sustainable. By making conscious choices today, we can ensure that future generations will continue to enjoy the pleasures of exceptional food.</p>
      `,
      image: "/images/blog/blog-5.webp",
      gallery: [
        "/images/blog/blog-5.1.webp",
        "/images/blog/blog-5.2.webp",
        "/images/blog/blog-5.3.webp",
        "/images/blog/blog-5.4.webp",
      ],
      date: "April 5, 2023",
      author: "Emily Rodriguez",
      authorImage: "/images/auhers/auther-5.webp",
      authorBio: "Sustainability Director with a background in environmental science and a passion for eco-friendly gastronomy.",
      category: "Sustainability",
      tags: ["sustainable", "eco-friendly", "environment", "practices"],
      comments: [
        {
          id: 1,
          name: "Robert Chen",
          date: "April 6, 2023",
          content: "It's refreshing to see restaurants taking sustainability seriously. Your composting program is particularly impressive!"
        },
        {
          id: 2,
          name: "Amelia Thompson",
          date: "April 8, 2023",
          content: "I'd love to know more about your farm partners. Would you consider hosting farm-to-table events where diners can meet the producers?"
        }
      ]
    },
  ];

  useEffect(() => {
    // Find the current blog post based on the URL parameter
    // const currentPostId = parseInt(params.singleBlog);
    // const currentPost = blogPosts.find(post => post.id === currentPostId);

    // if (currentPost) {
    //   setBlogPost(currentPost);

    //   // Find related posts (same category or shared tags)
    //   const related = blogPosts.filter(post => {
    //     if (post.id === currentPostId) return false; // Exclude current post

    //     // Include posts with same category or at least one shared tag
    //     return post.category === currentPost.category ||
    //       post.tags.some(tag => currentPost.tags.includes(tag));
    //   }).slice(0, 3); // Limit to 3 related posts

    //   setRelatedPosts(related);
    // }
    const currentPost = fetchBlogPost(params.singleBlog, blogPosts);
  
    if (currentPost) {
      setBlogPost(currentPost);
      setRelatedPosts(fetchRelatedPosts(currentPost, blogPosts));
    }
    // Simulate loading delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, [params.singleBlog]);

  if (!blogPost) {
    return (
      <div className={styles.loadingContainer}>
        <motion.div
          className={styles.loadingSpinner}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className={styles.singleBlogContainer}>
      <motion.div
        className={styles.backButton}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/blog">
          <span><FaArrowLeft /> Back to Blog</span>
        </Link>
      </motion.div>

      <motion.div
        className={styles.blogHeader}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>{blogPost.title}</h1>

        <div className={styles.blogMeta}>
          <span><FaCalendarAlt /> {blogPost.date}</span>
          <span><FaUser /> {blogPost.author}</span>
          <span><FaTag /> {blogPost.category}</span>
        </div>
      </motion.div>

      <motion.div
        className={styles.featuredImage}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src={blogPost.image}
          alt={blogPost.title}
          width={1200}
          height={600}
          className={styles.mainImage}
          priority
        />
      </motion.div>

      <div className={styles.blogContent}>
        <motion.div
          className={styles.contentWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className={styles.blogText}
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          {blogPost.gallery && (
            <motion.div
              className={styles.imageGallery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3>Image Gallery</h3>
              <div className={styles.galleryGrid}>
                {blogPost.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`${styles.galleryItem} ${activeImage === index ? styles.active : ''}`}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      width={300}
                      height={200}
                      className={styles.galleryImage}
                    />
                  </motion.div>
                ))}
              </div>
              {blogPost.gallery.length > 0 && (
                <div className={styles.galleryLightbox}>
                  <Image
                    src={blogPost.gallery[activeImage]}
                    alt={`Gallery image ${activeImage + 1}`}
                    width={900}
                    height={600}
                    className={styles.lightboxImage}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <div className={styles.galleryNavigation}>
                    <button
                      onClick={() => setActiveImage(prev => (prev === 0 ? blogPost.gallery.length - 1 : prev - 1))}
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <span>{activeImage + 1} / {blogPost.gallery.length}</span>
                    <button
                      onClick={() => setActiveImage(prev => (prev === blogPost.gallery.length - 1 ? 0 : prev + 1))}
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          <motion.div
            className={styles.tagShare}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.tags}>
              {blogPost.tags.map(tag => (
                <span key={tag} className={styles.tag}>
                  <FaTag /> {tag}
                </span>
              ))}
            </div>
            <div className={styles.shareContainer}>
              <button
                className={styles.shareButton}
                onClick={() => setShowShareOptions(!showShareOptions)}
                aria-label="Share this article"
              >
                <FaShare /> Share
              </button>

              {showShareOptions && (
                <motion.div
                  className={styles.shareOptions}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <button aria-label="Share on Facebook"><FaFacebookF /></button>
                  <button aria-label="Share on Twitter"><FaTwitter /></button>
                  <button aria-label="Share on LinkedIn"><FaLinkedinIn /></button>
                  <button aria-label="Share on Pinterest"><FaPinterestP /></button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.authorBox}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3>About the Author</h3>
          <div className={styles.authorContent}>
            {blogPost.authorImage && (
              <div className={styles.authorImage}>
                <Image
                  src={blogPost.authorImage}
                  alt={blogPost.author}
                  width={100}
                  height={100}
                />
              </div>
            )}
            <div className={styles.authorInfo}>
              <h4>{blogPost.author}</h4>
              <p>{blogPost.authorBio || "Culinary expert and contributor to our blog."}</p>
            </div>
          </div>
        </motion.div>

        {blogPost.comments && (
          <motion.div
            className={styles.commentsSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3>Comments ({blogPost.comments.length})</h3>
            <div className={styles.commentsList}>
              {blogPost.comments.map(comment => (
                <div key={comment.id} className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <h4>{comment.name}</h4>
                    <span>{comment.date}</span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
            <div className={styles.commentForm}>
              <h5>Leave a Comment</h5>
              <form>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required autoComplete='name' />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required autoComplete='email' />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="comment">Comment</label>
                  <textarea id="comment" name="comment" rows="4" required autoComplete='comment'></textarea>
                </div>
                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label='Post comment'
                >
                  <FaComment /> Post Comment
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <motion.div
          className={styles.relatedPosts}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2>Related Articles</h2>
          <div className={styles.relatedGrid}>
            {relatedPosts.map(post => (
              <motion.div
                key={post.id}
                className={styles.relatedCard}
                whileHover={{ y: -10 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <div className={styles.relatedImageContainer}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={350}
                      height={200}
                      className={styles.relatedImage}

                    />
                  </div>
                  <div className={styles.relatedInfo}>
                    <span className={styles.relatedCategory}>{post.category}</span>
                    <h3>{post.title}</h3>
                    <div className={styles.relatedMeta}>
                      <span><FaCalendarAlt /> {post.date}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}