import { models } from "../src/models/index.js";

const { Post } = models;

// Define the seedPosts function
export const seedPosts = async () => {
  try {
    // Insert posts into the Posts table
    await Post.bulkCreate([
      {
        title: 'First Post',
        content: 'This is the content of the first post.',
        category: 'category1',
        authorId: 1, // Assuming the first user created in the users seeder has id 1
        image: '/media/1722727213995-tree.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Second Post',
        content: 'Content of the second post.',
        category: 'category2',
        authorId: 2, // Assuming the second user created in the users seeder has id 2
        image: '/media/1722727213995-tree.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    
    // console.log('Posts seeded successfully!');
  } catch (error) {
    console.error('Error seeding posts:', error);
  }
};

// Use ES6 import.meta.url to check if the file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPosts().catch(console.error);
}
