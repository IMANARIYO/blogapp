const defaultUser = {
    id: 2,
    fullNames: "User Full Name",
    username: "user",
    email: "user@example.com",
    profilePicture: "/media/pexels-photo-2280549.webp",
    password: "$2b$04$sn.s4pRjTGMAzfU3/w1tUucTHyF5ld0.r45sM8WcFaARcFqbj.lkm",
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
  