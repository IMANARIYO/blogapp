import { imagePaths } from "./imagespaths/images";
import { getRandomCategory } from "./posts";

export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndex];
};
export const defaultUser = {
  id: 2,
  fullNames: "User Full Name",
  username: "user",
  email: "user@example.com",
  profilePicture: "/media/pexels-photo-2280549.webp",
  password: "user123",
  gender: "male",
  role: "user",
  otpExpiresAt: null,
  deleted: false,
  otp: null,
  token: null,
  verified: false,
  phoneNumber: "0787795163",
  createdAt: "2024-08-05T16:42:25.319Z",
  updatedAt: "2024-08-05T16:42:25.319Z",
  posts: [
    {
      id: 4,
      title: "Post 4",
      content: "Content of post 4.",
      category: "Health",
      authorId: 2,
      image: "/media/glasses-notebook-wooden-business-163142.webp",
      createdAt: "2024-08-05T16:42:25.365Z",
      updatedAt: "2024-08-05T16:42:25.365Z",
      comments: [
        {
          id: 6,
          content: "This is comment number 4.",
          userId: 4,
          postId: 4,
          createdAt: "2024-08-05T16:42:25.376Z",
          updatedAt: "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      id: 2,
      title: "Second Post",
      content: "Content of the second post.",
      category: "Technology",
      authorId: 2,
      image: "/media/istockphoto-911834392-612x612 - Copy.jpg",
      createdAt: "2024-08-05T16:42:25.358Z",
      updatedAt: "2024-08-05T16:42:25.358Z",
      comments: [
        {
          id: 4,
          content: "This is comment number 2.",
          userId: 2,
          postId: 2,
          createdAt: "2024-08-05T16:42:25.376Z",
          updatedAt: "2024-08-05T16:42:25.376Z"
        }
      ]
    }
  ],
  comments: [
    {
      id: 1,
      content: "This is a comment on the first post by user 2.",
      userId: 2,
      postId: 1,
      createdAt: "2024-08-05T16:42:25.372Z",
      updatedAt: "2024-08-05T16:42:25.372Z"
    },
    {
      id: 4,
      content: "This is comment number 2.",
      userId: 2,
      postId: 2,
      createdAt: "2024-08-05T16:42:25.376Z",
      updatedAt: "2024-08-05T16:42:25.376Z"
    }
  ]
};

const defaultUsers = [defaultUser];

export const default_users =  [
    {
      "id": 2,
      "fullNames": "User Full Name",
      "username": "user",
      "email": "user@example.com",
      "profilePicture": "/media/pexels-photo-2280549.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795163",
      "createdAt": "2024-08-05T16:42:25.319Z",
      "updatedAt": "2024-08-05T16:42:25.319Z",
      "posts": [
        {
          "id": 4,
          "title": "Post 4",
          "content": "Content of post 4.",
          "category": "Health",
          "authorId": 2,
          "image": "/media/glasses-notebook-wooden-business-163142.webp",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 6,
              "content": "This is comment number 4.",
              "userId": 4,
              "postId": 4,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        },
        {
          "id": 2,
          "title": "Second Post",
          "content": "Content of the second post.",
          "category": "Technology",
          "authorId": 2,
          "image": "/media/istockphoto-911834392-612x612 - Copy.jpg",
          "createdAt": "2024-08-05T16:42:25.358Z",
          "updatedAt": "2024-08-05T16:42:25.358Z",
          "comments": [
            {
              "id": 4,
              "content": "This is comment number 2.",
              "userId": 2,
              "postId": 2,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 1,
          "content": "This is a comment on the first post by user 2.",
          "userId": 2,
          "postId": 1,
          "createdAt": "2024-08-05T16:42:25.372Z",
          "updatedAt": "2024-08-05T16:42:25.372Z"
        },
        {
          "id": 4,
          "content": "This is comment number 2.",
          "userId": 2,
          "postId": 2,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 1,
      "fullNames": "Imanariyobaptiste",
      "username": "admin",
      "email": "admin@example.com",
      "profilePicture": "/media/car-8647797_1280.jpg",
      "password": "$2b$04$Q.jfvdxqldJOSvbcWvL0Ge8azm7kBsIwIoaCySPGz134J5xe2F3qm",
      "gender": "male",
      "role": "admin",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795163",
      "createdAt": "2024-08-05T16:42:25.319Z",
      "updatedAt": "2024-08-05T16:42:25.319Z",
      "posts": [
        {
          "id": 22,
          "title": "Post 22",
          "content": "Content of post 22.",
          "category": "Education",
          "authorId": 1,
          "image": "/media/pexels-photo-5838911.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": []
        },
        {
          "id": 1,
          "title": "First Post",
          "content": "This is the content of the first post.",
          "category": "Health",
          "authorId": 1,
          "image": "/media/car-8647797_1280 - Copy.jpg",
          "createdAt": "2024-08-05T16:42:25.358Z",
          "updatedAt": "2024-08-05T16:42:25.358Z",
          "comments": [
            {
              "id": 22,
              "content": "This is comment number 20.",
              "userId": 1,
              "postId": 1,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            },
            {
              "id": 3,
              "content": "This is comment number 1.",
              "userId": 1,
              "postId": 1,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            },
            {
              "id": 2,
              "content": "Another comment on the first post by user 1.",
              "userId": 1,
              "postId": 1,
              "createdAt": "2024-08-05T16:42:25.372Z",
              "updatedAt": "2024-08-05T16:42:25.372Z"
            },
            {
              "id": 1,
              "content": "This is a comment on the first post by user 2.",
              "userId": 2,
              "postId": 1,
              "createdAt": "2024-08-05T16:42:25.372Z",
              "updatedAt": "2024-08-05T16:42:25.372Z"
            }
          ]
        },
        {
          "id": 3,
          "title": "Post 3",
          "content": "Content of post 3.",
          "category": "Technology",
          "authorId": 1,
          "image": "/media/pexels-photo-5838911 - Copy.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 5,
              "content": "This is comment number 3.",
              "userId": 3,
              "postId": 3,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 2,
          "content": "Another comment on the first post by user 1.",
          "userId": 1,
          "postId": 1,
          "createdAt": "2024-08-05T16:42:25.372Z",
          "updatedAt": "2024-08-05T16:42:25.372Z"
        },
        {
          "id": 3,
          "content": "This is comment number 1.",
          "userId": 1,
          "postId": 1,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        },
        {
          "id": 22,
          "content": "This is comment number 20.",
          "userId": 1,
          "postId": 1,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 3,
      "fullNames": "User 3",
      "username": "user3",
      "email": "user3@example.com",
      "profilePicture": "/media/pexels-photo-3541916.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795120",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 5,
          "title": "Post 5",
          "content": "Content of post 5.",
          "category": "Finance",
          "authorId": 3,
          "image": "/media/pexels-photo-1438072.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 7,
              "content": "This is comment number 5.",
              "userId": 5,
              "postId": 5,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 5,
          "content": "This is comment number 3.",
          "userId": 3,
          "postId": 3,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 4,
      "fullNames": "User 4",
      "username": "user4",
      "email": "user4@example.com",
      "profilePicture": "/media/pexels-photo-2781814 - Copy.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795121",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 6,
          "title": "Post 6",
          "content": "Content of post 6.",
          "category": "Education",
          "authorId": 4,
          "image": "/media/pexels-photo-170811.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 8,
              "content": "This is comment number 6.",
              "userId": 6,
              "postId": 6,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 6,
          "content": "This is comment number 4.",
          "userId": 4,
          "postId": 4,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 5,
      "fullNames": "User 5",
      "username": "user5",
      "email": "user5@example.com",
      "profilePicture": "/media/pexels-photo-346529 - Copy.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795122",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 7,
          "title": "Post 7",
          "content": "Content of post 7.",
          "category": "Entertainment",
          "authorId": 5,
          "image": "/media/pexels-photo-1545743 - Copy.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 9,
              "content": "This is comment number 7.",
              "userId": 7,
              "postId": 7,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 7,
          "content": "This is comment number 5.",
          "userId": 5,
          "postId": 5,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 6,
      "fullNames": "User 6",
      "username": "user6",
      "email": "user6@example.com",
      "profilePicture": "/media/oldtimer-1197800_640 - Copy.jpg",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795123",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 8,
          "title": "Post 8",
          "content": "Content of post 8.",
          "category": "Sports",
          "authorId": 6,
          "image": "/media/istockphoto-911834392-612x612.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 10,
              "content": "This is comment number 8.",
              "userId": 8,
              "postId": 8,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 8,
          "content": "This is comment number 6.",
          "userId": 6,
          "postId": 6,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 7,
      "fullNames": "User 7",
      "username": "user7",
      "email": "user7@example.com",
      "profilePicture": "/media/pexels-photo-5554303 - Copy.jpg",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795124",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 9,
          "title": "Post 9",
          "content": "Content of post 9.",
          "category": "Lifestyle",
          "authorId": 7,
          "image": "/media/pexels-photo-5838911 - Copy.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 11,
              "content": "This is comment number 9.",
              "userId": 9,
              "postId": 9,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 9,
          "content": "This is comment number 7.",
          "userId": 7,
          "postId": 7,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 8,
      "fullNames": "User 8",
      "username": "user8",
      "email": "user8@example.com",
      "profilePicture": "/media/pexels-photo-3343253.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795125",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 10,
          "title": "Post 10",
          "content": "Content of post 10.",
          "category": "Travel",
          "authorId": 8,
          "image": "/media/pexels-photo-2219024.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 12,
              "content": "This is comment number 10.",
              "userId": 10,
              "postId": 10,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 10,
          "content": "This is comment number 8.",
          "userId": 8,
          "postId": 8,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 9,
      "fullNames": "User 9",
      "username": "user9",
      "email": "user9@example.com",
      "profilePicture": "/media/istockphoto-1348870264-612x612 - Copy.jpg",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795126",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 11,
          "title": "Post 11",
          "content": "Content of post 11.",
          "category": "Technology",
          "authorId": 9,
          "image": "/media/pexels-photo-577585.webp",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 13,
              "content": "This is comment number 11.",
              "userId": 11,
              "postId": 11,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 11,
          "content": "This is comment number 9.",
          "userId": 9,
          "postId": 9,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 10,
      "fullNames": "User 10",
      "username": "user10",
      "email": "user10@example.com",
      "profilePicture": "/media/pexels-photo-4067768 - Copy.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795127",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 12,
          "title": "Post 12",
          "content": "Content of post 12.",
          "category": "Health",
          "authorId": 10,
          "image": "/media/pexels-photo-3586765.webp",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 14,
              "content": "This is comment number 12.",
              "userId": 12,
              "postId": 12,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 12,
          "content": "This is comment number 10.",
          "userId": 10,
          "postId": 10,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 11,
      "fullNames": "User 11",
      "username": "user11",
      "email": "user11@example.com",
      "profilePicture": "/media/pexels-photo-3541916 - Copy.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795128",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 13,
          "title": "Post 13",
          "content": "Content of post 13.",
          "category": "Finance",
          "authorId": 11,
          "image": "/media/pexels-photo-317356 - Copy.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 15,
              "content": "This is comment number 13.",
              "userId": 13,
              "postId": 13,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 13,
          "content": "This is comment number 11.",
          "userId": 11,
          "postId": 11,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 12,
      "fullNames": "User 12",
      "username": "user12",
      "email": "user12@example.com",
      "profilePicture": "/media/library-la-trobe-study-students-159740 - Copy.jpg",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795129",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 14,
          "title": "Post 14",
          "content": "Content of post 14.",
          "category": "Education",
          "authorId": 12,
          "image": "/media/pexels-photo-4167544 - Copy.webp",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 16,
              "content": "This is comment number 14.",
              "userId": 14,
              "postId": 14,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 14,
          "content": "This is comment number 12.",
          "userId": 12,
          "postId": 12,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 13,
      "fullNames": "User 13",
      "username": "user13",
      "email": "user13@example.com",
      "profilePicture": "/media/glasses-notebook-wooden-business-163142.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795130",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 15,
          "title": "Post 15",
          "content": "Content of post 15.",
          "category": "Entertainment",
          "authorId": 13,
          "image": "/media/pexels-photo-1326946 - Copy.webp",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 17,
              "content": "This is comment number 15.",
              "userId": 15,
              "postId": 15,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 15,
          "content": "This is comment number 13.",
          "userId": 13,
          "postId": 13,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 14,
      "fullNames": "User 14",
      "username": "user14",
      "email": "user14@example.com",
      "profilePicture": "/media/pexels-photo-4167544 - Copy.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795131",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 16,
          "title": "Post 16",
          "content": "Content of post 16.",
          "category": "Sports",
          "authorId": 14,
          "image": "/media/pexels-photo-3343253 - Copy.webp",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 18,
              "content": "This is comment number 16.",
              "userId": 16,
              "postId": 16,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 16,
          "content": "This is comment number 14.",
          "userId": 14,
          "postId": 14,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 15,
      "fullNames": "User 15",
      "username": "user15",
      "email": "user15@example.com",
      "profilePicture": "/media/pexels-photo-356040.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795132",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 17,
          "title": "Post 17",
          "content": "Content of post 17.",
          "category": "Lifestyle",
          "authorId": 15,
          "image": "/media/istockphoto-1348870264-612x612 - Copy.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 19,
              "content": "This is comment number 17.",
              "userId": 17,
              "postId": 17,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 17,
          "content": "This is comment number 15.",
          "userId": 15,
          "postId": 15,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 16,
      "fullNames": "User 16",
      "username": "user16",
      "email": "user16@example.com",
      "profilePicture": "/media/pexels-photo-170811.jpg",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795133",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 18,
          "title": "Post 18",
          "content": "Content of post 18.",
          "category": "Travel",
          "authorId": 16,
          "image": "/media/pexels-photo-346529.webp",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 20,
              "content": "This is comment number 18.",
              "userId": 18,
              "postId": 18,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 18,
          "content": "This is comment number 16.",
          "userId": 16,
          "postId": 16,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 17,
      "fullNames": "User 17",
      "username": "user17",
      "email": "user17@example.com",
      "profilePicture": "/media/library-la-trobe-study-students-159740.jpg",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795134",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 19,
          "title": "Post 19",
          "content": "Content of post 19.",
          "category": "Technology",
          "authorId": 17,
          "image": "/media/library-la-trobe-study-students-159740.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": [
            {
              "id": 21,
              "content": "This is comment number 19.",
              "userId": 19,
              "postId": 19,
              "createdAt": "2024-08-05T16:42:25.376Z",
              "updatedAt": "2024-08-05T16:42:25.376Z"
            }
          ]
        }
      ],
      "comments": [
        {
          "id": 19,
          "content": "This is comment number 17.",
          "userId": 17,
          "postId": 17,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 18,
      "fullNames": "User 18",
      "username": "user18",
      "email": "user18@example.com",
      "profilePicture": "/media/pexels-photo-3586765.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795135",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 20,
          "title": "Post 20",
          "content": "Content of post 20.",
          "category": "Health",
          "authorId": 18,
          "image": "/media/pexels-photo-3184163.webp",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": []
        }
      ],
      "comments": [
        {
          "id": 20,
          "content": "This is comment number 18.",
          "userId": 18,
          "postId": 18,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 19,
      "fullNames": "User 19",
      "username": "user19",
      "email": "user19@example.com",
      "profilePicture": "/media/pexels-photo-4167544.webp",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795136",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [
        {
          "id": 21,
          "title": "Post 21",
          "content": "Content of post 21.",
          "category": "Finance",
          "authorId": 19,
          "image": "/media/pexels-photo-303040 - Copy.jpg",
          "createdAt": "2024-08-05T16:42:25.365Z",
          "updatedAt": "2024-08-05T16:42:25.365Z",
          "comments": []
        }
      ],
      "comments": [
        {
          "id": 21,
          "content": "This is comment number 19.",
          "userId": 19,
          "postId": 19,
          "createdAt": "2024-08-05T16:42:25.376Z",
          "updatedAt": "2024-08-05T16:42:25.376Z"
        }
      ]
    },
    {
      "id": 20,
      "fullNames": "User 20",
      "username": "user20",
      "email": "user20@example.com",
      "profilePicture": "/media/pexels-photo-170811.jpg",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795137",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [],
      "comments": []
    },
    {
      "id": 21,
      "fullNames": "User 21",
      "username": "user21",
      "email": "user21@example.com",
      "profilePicture": "/media/pexels-photo-2219024.jpg",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "male",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795138",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [],
      "comments": []
    },
    {
      "id": 22,
      "fullNames": "User 22",
      "username": "user22",
      "email": "user22@example.com",
      "profilePicture": "/media/pexels-photo-1545743 - Copy.jpg",
      "password": "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
      "gender": "female",
      "role": "user",
      "otpExpiresAt": null,
      "deleted": false,
      "otp": null,
      "token": null,
      "verified": false,
      "phoneNumber": "0787795139",
      "createdAt": "2024-08-05T16:42:25.344Z",
      "updatedAt": "2024-08-05T16:42:25.344Z",
      "posts": [],
      "comments": []
    }
  ]
  export const getLastDefaultUser = () => default_users[default_users.length - 1];
  export const addDefaultUser = (user) => {
    default_users.push(user);
  };
  