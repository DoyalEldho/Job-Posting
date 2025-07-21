# Job-Posting
**This is a full-stack job portal web application that allows companies to post job openings and manage applicant submissions, while enabling job seekers to explore job listings and apply with resumes and personalized notes**

# for Companies
**Secure authentication with JWT and role-based access (employee, Company)**
**Post job listings with:Title, description, location, salary, required skills**
**View all applications grouped by job title**
**search applicants by job title**
**View applicant name, email, note, resume, and application time**
**Resume links (PDF) are viewable and downloadable**

 # For Job Seekers
 Register/login securely
 **View available job listings**
 **Apply for jobs with:Resume upload (PDF)**
 **Custom application note**
 **see the applied jobs with resume**

 # How to Run Locally
 1.Clone the repository
 git clone https://github.com/your-username/job-posting-app.git 
 cd job-posting-app

 2.Backend Setup
 cd backend
 npm install
 npm run dev
 
3.Environment Variables
Create a .env file in your backend directory:
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

 3.Frontend Setup
 cd frontend
 npm install
 npm start
 
