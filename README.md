# 🍽️ Modern Restaurant Management System

A full-stack restaurant management application built with Next.js (frontend) and Laravel (backend). This platform provides a complete solution for restaurant operations, including online ordering, table reservations, menu management, and an admin dashboard for restaurant staff.

## ✨ Features

### Customer Facing
- 🍔 Interactive digital menu with categories and food details
- 🛍️ Online food ordering system
- 📅 Table reservation system
- 📱 Responsive design for all devices
- 🔍 Advanced search and filtering
- ⭐ Customer reviews and ratings
- 🛒 Shopping cart with real-time updates
- 🔒 Secure checkout process
- 📱 Mobile-first approach

### Admin Dashboard
- 📊 Sales analytics and reporting
- 📝 Menu management (add/edit/delete items)
- 🏷️ Category management
- 📅 Reservation management
- 📦 Order tracking and management
- 👥 Customer management
- 📱 Staff management
- 📈 Business insights and reports

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Data Fetching**: Axios
- **Authentication**: JWT
- **UI Components**: Custom components with accessibility in mind

### Backend
- **Framework**: Laravel 10+
- **Database**: MySQL/PostgreSQL
- **API**: RESTful API
- **Authentication**: Laravel Sanctum
- **File Storage**: Local/Cloud Storage

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- PHP 8.1+
- Composer
- MySQL/PostgreSQL

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the frontend directory and add your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   # Add other environment variables as needed
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy the `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Configure your database in the `.env` file.

6. Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```

7. Start the development server:
   ```bash
   php artisan serve
   ```

## 📁 Project Structure

```
frontend/
├── public/             # Static files
├── src/
│   ├── app/           # App router pages
│   ├── components/    # Reusable components
│   ├── context/       # Context providers
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utility functions
│   ├── styles/        # Global styles
│   └── types/         # TypeScript type definitions
```

## 🌟 Features in Detail

### Authentication System
- Secure JWT-based authentication
- Role-based access control (Admin, Staff, Customer)
- Password reset functionality
- Protected routes

### Menu Management
- Dynamic menu categories
- Food item details with images
- Dietary information and allergens
- Search and filter functionality

### Order System
- Real-time order tracking
- Order history
- Multiple payment methods
- Email notifications

### Admin Dashboard
- Intuitive interface
- Real-time statistics
- Inventory management
- Staff management

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - your.email@example.com

Project Link: [https://github.com/yourusername/restaurant-app](https://github.com/yourusername/restaurant-app)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Laravel Documentation](https://laravel.com/docs)
- [Font Awesome](https://fontawesome.com/)
- [Unsplash](https://unsplash.com/) for food images
- All contributors who helped improve this project
