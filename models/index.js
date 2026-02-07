const Location = require('./Location');
const Event = require('./Event');
const User = require('./Users');

//Defining relationships
Location.hasMany(Event, {
    foreignKey: 'location_id',
    onDelete: 'CASCADE'
}); 

Event.belongsTo(Location, {
    foreignKey: 'location_id'
});

User.hasMany(Event, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Event.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Location, Event, User };