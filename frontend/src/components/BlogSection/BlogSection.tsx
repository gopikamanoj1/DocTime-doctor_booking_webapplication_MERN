import React from 'react';

const BlogSection: React.FC = () => {
  // Sample blog posts data (replace with actual data from your backend)
  const blogPosts = [
    {
      id: 1,
      title: '5 Tips for a Healthy Lifestyle',
      excerpt: 'Discover five simple yet effective tips for maintaining a healthy lifestyle and improving your overall well-being.',
      date: 'March 10, 2024',
      author: 'Dr. Emily Johnson',
    },
    {
      id: 2,
      title: 'Understanding Common Allergies',
      excerpt: 'Learn about common allergies, their symptoms, causes, and treatment options to better manage allergic reactions.',
      date: 'March 5, 2024',
      author: 'Dr. Michael Lee',
    },
    // Add more blog posts as needed
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Blog & Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">{`Published on ${post.date} by ${post.author}`}</p>
                <a href="#" className="text-blue-500 hover:underline">
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#" className="text-blue-500 hover:underline">
            View All Articles
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
