-- Insert Roles
INSERT INTO roles (name, description) VALUES
('admin', 'Administrator with full access'),
('user', 'Regular passenger with limited access');

-- Insert Permissions
INSERT INTO permissions (name, description) VALUES
('create', 'Create new resources'),
('read', 'Read resources'),
('update', 'Update existing resources'),
('delete', 'Delete resources'),
('manage_users', 'Manage user accounts'),
('manage_roles', 'Manage roles and permissions'),
('create_flight', 'Create flights'),
('read_flight', 'Read flights'),
('update_flight', 'Update flights'),
('cancel_flight', 'Cancel flights'),
('delete_flight', 'Delete flights'),
('create_booking', 'Create bookings'),
('read_booking', 'Read bookings'),
('read_own_booking', 'Read own bookings'),
('update_booking', 'Update bookings'),
('cancel_booking', 'Cancel bookings'),
('delete_booking', 'Delete bookings');

-- Insert Role-Permission relationships
INSERT INTO role_permissions (role_id, permission_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
(1, 7), (1, 8), (1, 9), (1, 10), (1, 11),
(1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), -- Admin has all permissions
(2, 2), (2, 1),
(2, 8), -- Read flights
(2, 12), (2, 14), (2, 16); -- User can create booking, read own booking, cancel booking

-- Insert Users
-- Default password for all users is: password123
INSERT INTO users (username, email, password_hash, bio, role_id, created_at) VALUES
('admin_user', 'admin@example.com', '$2b$10$2TTsTeSShRDh3H9xFVZdT.6W8mNON5htTaFp6KvJob3LfTGxGF0aO', 'Airline Administrator', 1, NOW()),
('juan_perez', 'juan@example.com', '$2b$10$2TTsTeSShRDh3H9xFVZdT.6W8mNON5htTaFp6KvJob3LfTGxGF0aO', 'Frequent Flyer Passenger', 2, NOW()),
('maria_garcia', 'maria@example.com', '$2b$10$2TTsTeSShRDh3H9xFVZdT.6W8mNON5htTaFp6KvJob3LfTGxGF0aO', 'Business Traveler', 2, NOW()),
('carlos_lopez', 'carlos@example.com', '$2b$10$2TTsTeSShRDh3H9xFVZdT.6W8mNON5htTaFp6KvJob3LfTGxGF0aO', 'Vacation Traveler', 2, NOW()),
('ana_martinez', 'ana@example.com', '$2b$10$2TTsTeSShRDh3H9xFVZdT.6W8mNON5htTaFp6KvJob3LfTGxGF0aO', 'Student Passenger', 2, NOW()),
('luis_fernandez', 'luis@example.com', '$2b$10$2TTsTeSShRDh3H9xFVZdT.6W8mNON5htTaFp6KvJob3LfTGxGF0aO', 'International Traveler', 2, NOW());

-- Insert Flights
-- available_seats already considers CONFIRMED bookings inserted below
INSERT INTO flights (flight_number, origin, destination, departure_time, capacity, available_seats, status) VALUES
('AV-8520', 'CLO', 'BOG', NOW() + INTERVAL '5 days', 150, 145, 'SCHEDULED'),
('LA-4112', 'CLO', 'MDE', NOW() + INTERVAL '7 days', 120, 114, 'SCHEDULED'),
('AA-9240', 'BOG', 'MIA', NOW() + INTERVAL '12 days', 180, 177, 'SCHEDULED'),
('IB-6588', 'BOG', 'MAD', NOW() + INTERVAL '20 days', 250, 250, 'SCHEDULED'),
('AV-9910', 'CLO', 'CTG', NOW() + INTERVAL '2 days', 100, 100, 'CANCELLED');

-- Insert Bookings
INSERT INTO bookings (user_id, flight_id, seat_count, status, booking_reference, created_at) VALUES
(2, 1, 3, 'CONFIRMED', 'BK-AV8520-001', NOW() - INTERVAL '1 day'),
(3, 1, 2, 'CONFIRMED', 'BK-AV8520-002', NOW() - INTERVAL '12 hours'),
(4, 2, 4, 'CONFIRMED', 'BK-LA4112-001', NOW() - INTERVAL '2 days'),
(5, 2, 2, 'CONFIRMED', 'BK-LA4112-002', NOW() - INTERVAL '18 hours'),
(6, 3, 3, 'CONFIRMED', 'BK-AA9240-001', NOW() - INTERVAL '8 hours'),
(3, 2, 1, 'CANCELLED', 'BK-LA4112-003', NOW() - INTERVAL '3 days');