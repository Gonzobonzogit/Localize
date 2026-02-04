-- 1. Locations Table (for cities/countries)
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  country VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  continent VARCHAR(50)
  -- No lat/long (as discussed)
);

-- 2. Users Table (now with location!)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  location_id INTEGER REFERENCES locations(id), -- User's home location
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Events Table (links to locations)
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  location_id INTEGER REFERENCES locations(id), -- Event's location
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  category VARCHAR(50),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- Event creator
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. RSVPs Table (tracks who's going where)
CREATE TABLE rsvps (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('going', 'interested', 'not_going')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, event_id) -- No duplicate RSVPs
);

-- 5. User Events Table (tracks user history)
CREATE TABLE user_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('created', 'attending', 'attended', 'missed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

