const sequelize = require('../config/connection');
const { Location, Event, User } = require('../models');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    //Seed Locations
    const locations = await Location.bulkCreate([
        { country: 'USA', city: 'New York', continent: 'North America' },
        { country: 'France', city: 'Paris', continent: 'Europe' },
        { country: 'Japan', city: 'Toyko', continent: 'Asia' },
        { country: 'Brazil', city: 'Rio De Janeiro', continent: 'South America' },
        { country: 'Australia', city: 'Sydney', continent: 'Oceania' }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
};

seedDatabase();