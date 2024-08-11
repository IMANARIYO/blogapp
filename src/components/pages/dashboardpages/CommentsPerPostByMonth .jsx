import React from "react";

const CommentsPerPostByMonth = ({ postsWithComments }) => {
  // Define months for the table header
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Comments per Post by Month</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post Title</th>
            {months.map((month) => (
              <th key={month} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {month}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {postsWithComments.map((post) => (
            <tr key={post.postTitle}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.postTitle}</td>
              {post.monthlyComments.map((commentCount, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {commentCount}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsPerPostByMonth;
