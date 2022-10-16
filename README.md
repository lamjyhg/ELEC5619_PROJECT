# ELEC5619 Project

### Library
-- Front-end Lib

- ant-design/icons  4.7.0
- devexpress/dx-react-scheduler-material-ui  3.0.5
- emotion/react  11.10.4
- emotion/styled  11.10.4
- googlemaps/react-wrapper  1.1.35
- mui/material  5.10.8
- react-google-maps/api  2.12.2
- reduxjs/toolkit  1.8.5
- testing-library/jest-dom  5.16.5
- testing-library/react  13.3.0
- testing-library/user-event  13.5.0
- antd  4.22.8
- axios  0.27.2
- google-map-react  2.2.0
- js-cookie  3.0.1
- lottie-react  2.3.1
- moment  2.29.4
- prettier  2.7.1
- react  18.2.0
- react-cookie  4.1.1
- react-dom  18.2.0
- react-places-autocomplete  7.3.0
- react-redux  8.0.2
- react-router-dom  6.3.0
- react-scripts  5.0.1
- sass  1.54.7
- use-places-autocomplete  4.0.0
- validator  13.7.0
- web-vitals  2.1.4




-- Backend libs
- org.springframework.boot spring-boot-starter-data-jpa
- org.springframework.boot spring-boot-starter-web
- org.flywaydb flyway-core
- org.flywaydb flyway-mysql
- test junit junit 4.13.1
- org.projectlombok lombok
- com.h2database h2
- mysql mysql-connector-java
- annotationProcessor org.projectlombok lombok
- org.springframework.boot spring-boot-starter-test
- com.vladmihalcea hibernate-types-52 2.16.2
- javax.validation, name validation-api, version 2.0.1.Final
- org.mapstruct mapstruct 1.5.2.Final
- org.mapstruct mapstruct-processor 1.5.2.Final
- org.springframework.boot spring-boot-starter-validation)
- com.sendgrid sendgrid-java 4.4.1
- org.flywaydb flyway-core 9.4.0
- org.springframework.boot, name spring-boot-starter-security 2.7.3
- io.jsonwebtoken, name jjwt, version 0.2
- test junit, name junit, version 4.4




## Functionality
- Register:  <br />
Users can register a new account by providing the required fields and an email will be sent to activate their account.  <br />
- Login:  <br />
User can login with their email and password <br />

- Activate Account:  <br />
User should be activated and then log in <br />


- Change password:  <br />
Users can change their password if they provide the correct current password. <br />

- Forget password:  <br />
Users can reset their email by using this function, they are required to fill in their email and a one time link will be sent to their email if the email exists in the database. <br />

- Single gym page:  <br />
Each gym will have a detailed page, where the information such as trading hours, name and location are displayed.  <br />

- Comment:  <br />
Users can leave a comment to a gym and rate the gym. <br />

- Gyms:  <br />
View nearby gyms by list or map <br />
Search gyms by their name which is displayed by list only <br />

- Profile:  <br />
View today customer’s appointments <br />

- Owner Appointments:  <br />
See all appointments of gyms that owner created <br />
Cancel by owner with comment <br />

- Customer Appointments:  <br />
See all appointments that customer booked <br />
- Cancel by customer <br />

- Create Gym:  <br />
Add gym name, trading hours, description , maximum appointment number <br />
Upload Gym Image Cover <br />

- Make Appointment:  <br />
Add appointment based on trading hours of selected date with customer’s information <br />

- Admin Usermanagement:  <br />
View all users with information of username, id and role <br />
View detailed information of a selected user <br />
Edit role of a selected user <br />



- Admin Gym Application Management:  <br />
View all gym applications <br />
View single gym application page <br />
Approve gym application <br />
Disapprove gym application <br />





## How to run the project 

This is a fronted-backend separated project. To run this project, you need to run both the frontend server and backend server.



- Make sure you have nodejs and java installed on your device, you can follow the link  to install both if you don’t have.
	`NodeJs: https://nodejs.org/en/download/`
	`Java: https://www.oracle.com/java/technologies/downloads/`


- First, you need to clone the project by running the following:
`git clone https://github.com/lamjyhg/ELEC5619_PROJECT.git`


- Then, to run the frontend server, you need to enter the “frontend” folder by running the following:
`cd ELEC5619_PROJECT/frontend`

-  Then, you need to install the packages used by the project by running the following
         `npm install`
         This command will install all the required packages to your device.

-  Now, you can run the frontend server by running
	`npm start`



- Now, you have already run the frontend server, the next step is to run the backend server. Create a new terminal and enter the “backend” folder by running the following
`cd ELEC5619_PROJECT/backend`

- Register a Sendgrid account and get a api key from *https://sendgrid.com/*
Run these three command at the backend together with your api key (this command can be found in Sendgrid integration guilde)
`echo "export SENDGRID_API_KEY='YOUR_API_KEY'" > sendgrid.env
echo "sendgrid.env" >> .gitignore
source ./sendgrid.env
Then, you can run
     ./gradlew bootrun`



      

- Now, both frontend and backend are started, you can start exploring our site!



- If you want to run tests, use the following command
./gradlew test

