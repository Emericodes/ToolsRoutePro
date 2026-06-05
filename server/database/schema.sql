SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS planning;
DROP TABLE IF EXISTS service;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS user;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. User table (Manager / Planner)
CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(180) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- 2. Client table (Flexible and robust)
CREATE TABLE client (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,  
  client_reference VARCHAR(100) NOT NULL,      
  name VARCHAR(150) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address VARCHAR(255) NOT NULL
);

-- 3. Service table (Accepts any client vocabulary)
CREATE TABLE service (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  client_id INT UNSIGNED NOT NULL,
  service_type VARCHAR(100) NOT NULL,          
  work_duration_minutes INT UNSIGNED NOT NULL, 
  monthly_visits INT UNSIGNED NOT NULL,        
  last_visit_date DATE NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'CONTRAT', 
  FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE
);

-- 4. Planning table (For generating the current optimization sheet)
CREATE TABLE planning (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  service_id INT UNSIGNED NOT NULL,
  assigned_day VARCHAR(20),                    
  technician_name VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'Assigned',
  FOREIGN KEY (service_id) REFERENCES service(id) ON DELETE CASCADE
);
