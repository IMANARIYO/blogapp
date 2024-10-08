import AuthorCard from "./UserCard";
import React, { useEffect, useState } from "react";
import { default_users } from "../../../services/constants/users";
import { getAllUsers } from "../../../services/userService";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState(default_users)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers()
        const users = response.data

    
        if (users && users.length > 0) {
          setAuthors(users)
        }
      } catch (error) {
        console.log('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    )
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Authors</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {authors.map(author => <AuthorCard key={author.id} user={author} />)}
      </div>
    </div>
  )
}

export default AuthorsPage
