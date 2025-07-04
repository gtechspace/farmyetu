# FarmYetu Project

# Getting Started: Initial Setup

## 1. Clone the central repository

Open your terminal. Navigate to the directory where you want to store your project files, and then run:
git clone https://github.com/gtechspace/farmyetu.git

## 2. Navigate into the Project Directory

cd farmyetu

### open with your ide e.g. visual basic

## 3. Setup Your Local Development Server (Recommended)

To view your website changes live, use a local server like VS Code's "Live Server" extension:

VS Code Live Server:

Install the "Live Server" extension from the VS Code Marketplace.

Right-click on index.html (or your specific HTML page) and select "Open with Live Server".

# Git Contributions

## 1.Pull from central repository

git checkout main
git pull origin main

## 2. Create feature branch

git checkout -b <branchname>
e.g. git checkout -b "about-page"

## 3. Switch to feature branch

git checkout <brachname>
e.g git checkout about-page

## 4. Create html, css and javascript files based on designated section/page

Strictly work only on your assigned files/sections.

e.g Create a Product.html, Product.css and Product.js if working on Products page in visual basic work space

## 5. Stage and commit your changes regularly

git add <filename> or git add .
git commit -m "added changes"

## 6. Sync Your Feature Branch with the Latest main (Crucial for Merge Conflicts)

### Always perform this step before pushing your branch or creating a Pull Request. This updates your feature branch with any new changes from main, allowing you to resolve conflicts locally.

git pull origin main # While on your feature branch

## 7. If conflicts arise: Resolve them in your code editor, then git add the files again and git commit -m "fix: Resolved merge conflicts from main".

## If no conflicts arise push to your branch/ featured branch

git push origin <featuredbranch>

# Website Pages & Sections

## HomePage

About Group
Mission Statement
Featured Products
Client Testimonials

## ProductsPage - Display farm products

product images
product descriptions
product prices
Counters
Add to cart buttons

## OrderPage

Personal Details Form
Delivery Details Form
Billing Details
Confirmation Status Popup

## ContactPage

Contact Form
Location Map

## Website inspiration

https://kakilaorganics.co.ke/shop/

## Images

https://unsplash.com/
https://www.pexels.com/
