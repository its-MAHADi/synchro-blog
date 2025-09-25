export default function MyPostsPage() {
  const posts = [
    { id: 1, title: "First Post", date: "2025-09-20" },
    { id: 2, title: "Learning Next.js", date: "2025-09-21" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">My Posts</h1>

      <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-t">
              <td className="p-3">{post.title}</td>
              <td className="p-3 text-sm text-gray-500">{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
