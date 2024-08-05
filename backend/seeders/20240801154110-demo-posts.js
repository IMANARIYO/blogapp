import { models } from "../src/models/index.js";

const { Post } = models;

// Define the seedPosts function
export const seedPosts = async () => {
  try {
    // Insert the predefined posts
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

    console.log('Predefined posts seeded successfully!');

    // Generate additional posts
    const numberOfAdditionalPosts = 10; // Adjust the number of additional posts
    const additionalPosts = [];

    for (let i = 0; i < numberOfAdditionalPosts; i++) {
      additionalPosts.push({
        title: `Post ${i + 3}`, // Continue numbering from Post 3
        content: `Content of post ${i + 3}.`,
        category: `category${(i % 5) + 1}`, // Rotate through 5 categories
        authorId: (i % 5) + 1, // Cycle through 5 authors
        image: '/media/1722727213995-tree.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Bulk create additional posts
    await Post.bulkCreate(additionalPosts);

    console.log('Additional posts seeded successfully!');
  } catch (error) {
    console.error('Error seeding posts:', error);
  }
};

// Use ES6 import.meta.url to check if the file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPosts().catch(console.error);
}
