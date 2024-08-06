import AuthorCard from "./UserCard";
import React from "react";

const authors = [
  {
    name: 'John Doe',
    posts: 12,
    profileImage:
      'https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Jane Smith',
    posts: 8,
    profileImage:
      'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Alice Johnson',
    posts: 20,
    profileImage:
      'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Bob Brown',
    posts: 5,
    profileImage:
      'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    name: 'Emily Davis',
    posts: 15,
    profileImage:
      'https://images.pexels.com/photos/2589653/pexels-photo-2589653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
  // Add more authors as needed
]

const AuthorsPage = () => {
  return (
    <div className=' p-4'>
      <h1 className='text-3xl font-bold mb-4'>Authors</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {authors.map((author, index) =>
          <AuthorCard key={index} author={author} />
        )}
      </div>
    </div>
  )
}

export default AuthorsPage
