# 🧠 YinMed Blog

YinMed Blog is a medical learning and career platform designed to connect students, medical professionals, and recruiters in one ecosystem. It provides a structured space for medical knowledge sharing, mentorship, and recruitment opportunities.

---

## Live Demo

https://yin-med-blog.vercel.app/

---

## Project Vision

The goal of YinMed Blog is to solve three major problems:

- People can learn and get access to verified medical information
- Lack of structured medical learning platforms for students
- Lack of mentorship for health care student
- Limited platforms for medical experts to share verified knowledge
- Difficulty for recruiters to find and verify qualified medical professionals

---

## Features

### Authentication System

- User signup and login with Firebase Authentication
- Secure password handling
- Username uniqueness validation
- Real-time form validation (phone, username, password)

---

### User Roles System

- Student
- Medical Expert
- Recruiter

Each role has different access permissions and dashboard experience.
Each role undergo different verification before earning a badge, the
available are User, Student, Expert, Recruiter.

---

### Blog System (Core Feature)

- Experts can create medical articles
- Users can read published content
- Articles organized by categories (Biochemistry, Pharmacology, etc.)
- Individual post detail pages

---

### Expert System

- Expert profiles with specialization
- Bio and professional details
- Verified status (future enhancement)

---

### Recruiter System

- Recruiters can discover experts
- Post job opportunities
- Verify professional profiles (future enhancement)

---

### Search & Filter

- Search blog posts by title
- Filter content by category

---

### UX Features

- Real-time username validation
- Phone number validation (11 digits)
- Disabled submit button until form is valid
- Loading states during authentication
- Error handling and feedback messages

---

## Tech Stack

- React.js
- Firebase Authentication
- Firestore Database
- Firebase Storage (future use)
- React Router
- CSS3

---

## Key Highlights

- Role-based system architecture
- Real-time validation logic
- Secure authentication flow
- Scalable Firestore database design
- Clean and responsive UI
- Production-level frontend structure

---

## Project Structure

/src
/components
Navbar
/pages
Home
Login
Signup
Dashboard
/services
firebase.js
