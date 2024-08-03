import { models } from "../src/models/index.js";
import { passHashing } from "../src/utils/passwordfunctions.js";

const { User } = models;

// Define the seedUsers function
export const seedUsers = async () => {
  try {
    // Hash the passwords for each user
    const adminHashedPassword = await passHashing('admin123');
    const userHashedPassword = await passHashing('user123');

    // Bulk create users with unique passwords
    const createdUsers = await User.bulkCreate([
      {
        username: 'admin',
        email: 'admin@example.com',
        password: adminHashedPassword,
        profilePicture: '/media/1722719109044-profile-1.jpeg',
        role: 'admin',
        fullNames: "Imanariyobaptiste",
        gender: 'male',
        phoneNumber: '0787795163'
      },
      {
        username: 'user',
        email: 'user@example.com',
        fullNames: "userfull names",
        password: userHashedPassword,
        profilePicture: '/media/1722719109044-profile-1.jpeg',
        role: 'user',
        gender: 'male',
        phoneNumber: '0787795163'
      },
    ]);

    console.log('Users seeded successfully!');
    
    // Fetch and log the inserted users to verify
    // const insertedUsers = await User.findAll({
    //   where: {
    //     username: ['admin', 'user']
    //   }
    // });
    // console.log('Inserted Users:', insertedUsers);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

// Use ES6 import.meta.url to check if the file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedUsers().catch(console.error);
}
