![livecare-rounded-git](https://github.com/user-attachments/assets/88e23c59-e31c-45bd-8f1c-89257431de6d)




# 📋 Table of Contents
* 🚀 [Introduction](#introduction)
* ⚙️ [Tech Stack](#tech-stack)
* 🔋 [Features](#features)
* 🤸 [Quick Start](#quick-start)

# 🚀 Introduction
<a name="introduction"></a>
A comprehensive healthcare patient management system that streamlines appointment booking, doctor-patient interactions, and administrative workflows, built with modern web technologies for reliable and secure healthcare operations.

# ⚙️ Tech Stack
<a name="tech-stack"></a>
* Next.js
* Appwrite
* TypeScript
* Tailwind CSS
* ShadCN
* Twilio

# 🔋 Features
<a name="features"></a>
## ✨ Seamless Healthcare Management
### 🔐 Patient Registration
Create your healthcare journey with a secure and intuitive sign-up process for patients.

### 📅 Dynamic Appointment System
#### 🏥 Book with Ease
Schedule appointments with your preferred doctors at times that work for you.

#### 📊 Administrative Control
Powerful tools for staff to manage, confirm, and update appointment schedules.

#### 🔄 Real-time Updates
Stay informed with instant SMS notifications for appointment confirmations and changes.

### 💼 Comprehensive Management Tools
#### 👨‍⚕️ Doctor-Patient Coordination
Efficiently manage multiple appointments and patient schedules.

#### 📱 Universal Access
Access the system seamlessly across all devices with responsive design.

#### 🗄️ Secure File Management
Upload and manage medical documents securely with Appwrite storage.

### 📊 System Reliability
#### 🔍 Performance Monitoring
Track and optimize application performance with Sentry integration.

#### 🛡️ Data Security
Ensure patient data protection with robust security measures.

# 🤸 Quick Start
<a name="quick-start"></a>
Follow these steps to set up the project locally on your machine.

## Prerequisites
Make sure you have the following installed on your machine:
* Git
* Node.js
* npm (Node Package Manager)

## Cloning the Repository
```bash
git clone https://github.com/adrianhajdin/healthcare.git
cd healthcare
```

## Installation
Install the project dependencies using npm:
```bash
npm install
```

## Set Up Environment Variables
Create a new file named `.env.local` in the root of your project and add the following content:
```env
#APPWRITE
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
NEXT_PUBLIC_BUCKET_ID=

NEXT_PUBLIC_ADMIN_PASSKEY=111111
```

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the Appwrite website.

## Running the Project
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
