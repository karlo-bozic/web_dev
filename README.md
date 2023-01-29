# Online Fashio Central - Moda - WebApp

What is it?:
-   It is a online shoppping website that sells fashion items like clothing.
-   Backend: 
    >   EXPRESS JS - built in
    >   NODE.JS 
    >   MYSQL - need to download
-   Frontend:
    >   Bootstrap - CDN
    >   JQUERY - CDN


What can you do?:
-   authentication = users have to log in with correct details + hashing of password(bcrypt)
-   pesrsonal & private areas = users can only add products to basket if they are logged in + the profile and checkout pages are not accessible if not logged in
-   CRUD oprations = [C] register user [R] reads the product table and displays them in products page + shows user dtails in profile page [U] update user details in profile page [D] delete account + remove products from basket
-   profile management = updating user details such as name, username, password, email address + delete account
-   search & filter mechanism = filter through product in the products page by size, price, and gender + also search by name
-   validation for forms = all form have validation (e.g. entering an email requires you to have @ in it, etc) 
-   asynchronous communication  = JSON
-   communication with the User  = alerts for most user interaction (e.g. wrong login details, adding to basket, user is deleted, etc)


How to set it up? [DEPLOYMENT INSTRUCTIONS]:
-   download mysql database software 
-   download the folder to your C:\
-   create new database with any name and create new root user with any name and password
-   go to the db.js file in the lib folder + change the database name and password in db.js to the one of your root user - localhost
-   you must then go to your cmd and cd to thepath of the project folder
-   the you should run 'npm start', which should tell you that you are connected to port 8000
-   Then go to your web browser - Chrome - and type in - localhost:8000 - andpress enter
-   You should be able to see the home page then

How to create user and login? [INSTRUCTION]:
-   on the navigation bar at the top of thepage, click on the more tab
-   in the drop down menu select register
-   once on the register page you should enter your details and click sign up
-   you will be redirected to the login page, where you will enter the username and password that you entered


