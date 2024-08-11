import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Bar, Line, Pie } from "react-chartjs-2";
import { getAllMyPosts } from "../../../services/postService";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import {
  getAllCommentsIcomment,
  getCommentsForUserPosts,
} from "../../../services/commentsService";

// Register the components of Chart.js that you are using
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const UserDashboardSummary = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalCommentsOnUserPosts, setTotalCommentsOnUserPosts] = useState(0);
  const [monthlyPosts, setMonthlyPosts] = useState([]);
  const [monthlyComments, setMonthlyComments] = useState([]);
  const [postsWithComments, setPostsWithComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total posts by the user
        const posts = await getAllMyPosts();
        setTotalPosts(posts.length);

        // Fetch total comments by the user
        const commentsByUser = await getAllCommentsIcomment();
        setTotalComments(commentsByUser.length);

        // Fetch total comments on user's posts
        const commentsOnUserPosts = await getCommentsForUserPosts();
        setTotalCommentsOnUserPosts(commentsOnUserPosts.length);

        // Aggregate monthly posts data
        const postsByMonth = Array(12).fill(0);
        posts.forEach((post) => {
          const month = new Date(post.createdAt).getMonth();
          postsByMonth[month]++;
        });
        setMonthlyPosts(postsByMonth);

        // Aggregate monthly comments data
        const commentsByMonth = Array(12).fill(0);
        commentsOnUserPosts.forEach((comment) => {
          const month = new Date(comment.createdAt).getMonth();
          commentsByMonth[month]++;
        });
        setMonthlyComments(commentsByMonth);

        // Group comments by post and by month
        const postsData = posts.map((post) => {
          const postComments = commentsOnUserPosts.filter(
            (comment) => comment.postId === post.id
          );

          const monthlyComments = Array(12).fill(0);
          postComments.forEach((comment) => {
            const month = new Date(comment.createdAt).getMonth();
            monthlyComments[month]++;
          });

          return {
            postTitle: post.title,
            monthlyComments,
          };
        });

        setPostsWithComments(postsData);
        console.log("Posts Data: ", postsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // Log postsWithComments after it has been updated
  useEffect(() => {
    console.log("Posts With Comments: ", postsWithComments);
  }, [postsWithComments]);

  // Labels for months
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "short" })
  );

  // Bar chart data for monthly posts
  const postsBarChartData = {
    labels: months,
    datasets: [
      {
        label: "Posts per Month",
        data: monthlyPosts,
        backgroundColor: "#3e95cd",
      },
    ],
  };

  // Line chart data for monthly posts
  const postsLineChartData = {
    labels: months,
    datasets: [
      {
        label: "Posts per Month (Line)",
        data: monthlyPosts,
        borderColor: "#3e95cd",
        backgroundColor: "rgba(62, 149, 205, 0.2)",
        fill: true,
      },
    ],
  };

  // Pie chart data for comparing posts and comments
  const comparePieChartData = {
    labels: ["Posts", "Comments"],
    datasets: [
      {
        label: "Posts vs Comments",
        data: [totalPosts, totalComments],
        backgroundColor: ["#ff6384", "#36a2eb"],
      },
    ],
  };

  // Combined bar chart data for posts and comments
  const combinedBarChartData = {
    labels: months,
    datasets: [
      {
        label: "Posts per Month",
        data: monthlyPosts,
        backgroundColor: "#3e95cd",
      },
      {
        label: "Comments per Month",
        data: monthlyComments,
        backgroundColor: "#8e5ea2",
      },
    ],
  };

  // Bar chart data for comments received on each post by month
  const commentsPerPostChartData = {
    labels: months,
    datasets: postsWithComments.map((post) => ({
      label: post.postTitle,
      data: months.map((month, index) => post.monthlyComments[index] || 0),
      backgroundColor:
        "#" + Math.floor(Math.random() * 16777215).toString(16), // Random color for each post
    })),
  };

  // Chart options
  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const datasetLabel = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${datasetLabel}: ${value}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
        footerFont: {
          size: 10,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Dashboard Summary</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Posts</h2>
          <p className="text-3xl font-bold">{totalPosts}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Comments by User</h2>
          <p className="text-3xl font-bold">{totalComments}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">Total Comments on User's Posts</h2>
          <p className="text-3xl font-bold">{totalCommentsOnUserPosts}</p>
        </div>
      </div>
      <section className="mb-6 flex flex-wrap gap-6 justify-evenly">
  <div className="bg-white shadow-md rounded-lg p-4 flex-1 min-w-[300px] max-w-[600px] sm:flex-col">
    <h3 className="text-xl font-semibold mb-4">Posts per Month (Bar Chart)</h3>
    <Bar data={postsBarChartData} options={chartOptions} />
  </div>
  <div className="bg-white shadow-md rounded-lg p-4 flex-1 min-w-[300px] max-w-[600px]">
    <h3 className="text-xl font-semibold mb-4">Posts per Month (Line Chart)</h3>
    <Line data={postsLineChartData} options={chartOptions} />
  </div>
</section>


      {/* Pie Charts Section */}

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Posts vs Comments</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Pie data={comparePieChartData} options={chartOptions} />
        </div>
      </section>

      {/* Combined Bar Chart Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Combined Posts and Comments per Month</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Bar data={combinedBarChartData} options={chartOptions} />
        </div>
      </section>

      {/* Comments Per Post Bar Chart Section */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Comments Received on Each Post by Month</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <Bar data={commentsPerPostChartData} options={chartOptions} />
        </div>
      </section>
    </div>
  );
};

export default UserDashboardSummary;
