CREATE DATABASE estate;
USE estate;


CREATE TABLE IF NOT EXISTS user (
    uid INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    google_id VARCHAR(255),
    password VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS properties (
    pid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(255),
    location VARCHAR(255) NOT NULL,
    image_path VARCHAR(255)
);

INSERT INTO properties (title, price, location, category, image_path)
VALUES
('Skyline Haven', '$1,50,000', 'Coimbatore', 'House', 'project_img_1.jpg'),
('Vista Verde', '$3,50,000', 'Chennai', 'Villa', 'project_img_2.jpg'),
('Serenity Suites', '$5,50,000', 'Coimbatore', 'House', 'project_img_3.jpg'),
('Central Square', '$2,50,000', 'Erode', 'House', 'project_img_4.jpg');

CREATE TABLE admin(
   aid INT PRIMARY KEY AUTO_INCREMENT,
   email VARCHAR(255),
   password VARCHAR(255)
);

INSERT INTO admin (email,password) VALUES ("estate.co@gmail.com","estate.co123");



CREATE TABLE rental_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category ENUM('house','apartment','pg','co-living') NOT NULL,
    owner_name VARCHAR(255) NOT NULL,
    owner_phone VARCHAR(20) NOT NULL,
    location VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    type TEXT NOT NULL,
    rent_amount DECIMAL(10,2) NOT NULL,
    deposit_amount DECIMAL(10,2) DEFAULT 0,
    furnishing ENUM('unfurnished','semi-furnished','fully-furnished') DEFAULT 'unfurnished',
    available_from DATE,
    amenities TEXT,
    gender ENUM('male','female','any') DEFAULT 'any',
    status ENUM('available','rented','removed') DEFAULT 'available',
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE rental_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES rental_listings(id) ON DELETE CASCADE
);

INSERT INTO rental_listings 
(title, category, owner_name, owner_phone, location, address,type, rent_amount, deposit_amount, furnishing, available_from, amenities, gender, status, image_url)
VALUES
('2BHK House Near Bus Stand', 'house', 'Ramesh Kumar', '9876543210', 'Erode', '10/2 Nehru Street, Erode', '2BHK',12000, 50000, 'semi-furnished', '2025-02-01', 'Parking, Borewell, CCTV', 'any', 'available', '/images/h1-img1.jpg'),
('Men PG - Near CIT', 'pg', 'Arun Prakash', '9876001234', 'Coimbatore', '12/7, Avinashi Road, Peelamedu', '2 Sharing',6000, 5000, 'fully-furnished', '2025-01-10', 'Wifi, Food, Washing Machine, Parking', 'male', 'available', '/images/p1-img1.jpg');

INSERT INTO rental_images (listing_id, image_url) VALUES
(1, '/images/h1-img1.jpg'),
(1, '/images/h1-img2.jpg'),
(1, '/images/h1-img3.jpg'),
(1, '/images/h1-img4.jpg'),
(2, '/images/p1-img1.jpg'),
(2, '/images/p1-img2.jpg'),
(2, '/images/p1-img3.jpg'),
(2, '/images/p1-img4.jpg');


CREATE TABLE selling_properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    bhk VARCHAR(50),
    sqft INT,
    property_condition VARCHAR(10),
    year_built INT,
    description TEXT,
    main_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO selling_properties
(title, location, price, bhk, sqft, property_condition, year_built, description, main_image)
VALUES
('Modern 2BHK Apartment', 'Erode, Tamil Nadu', 4200000, '2 BHK', 950, 'new', 2022,
 'A modern apartment with good ventilation and covered car parking.',
 '/images/s_1.jpg'),

('Independent 3BHK House', 'Coimbatore, Tamil Nadu', 7800000, '3 BHK', 1450, 'old', 2015,
 'Spacious independent house located in a peaceful residential area.',
 '/images/s_2.jpg'),

('Compact 1BHK Flat', 'Salem, Tamil Nadu', 2900000, '1 BHK', 620, 'old', 2010,
 'Affordable flat suitable for small families or bachelor accommodation.',
 '/images/s_3.jpg'),

('Luxury Villa 4BHK', 'Chennai, Tamil Nadu', 15500000, '4 BHK', 2800, 'new', 2023,
 'Premium modern villa with private lawn and modular kitchen.',
 '/images/s_4.jpg');


CREATE TABLE land_listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    sqft INT,
    land_type VARCHAR(50),       
    road_access VARCHAR(50),    
    description TEXT,
    main_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO land_listings 
(title, location, price, sqft, land_type, road_access, description, main_image)
VALUES
('Agricultural Farmland with Well', 'Salem, Omalur', 2200000, 43560, 'agriculture', 
 '20ft road', 'One-acre fertile agricultural land with a borewell and good road access.', 
 '/images/l_1.jpg');



 CREATE TABLE user_contact(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200),
    email VARCHAR(200),
    phone VARCHAR(20),
    message VARCHAR(200)
 );