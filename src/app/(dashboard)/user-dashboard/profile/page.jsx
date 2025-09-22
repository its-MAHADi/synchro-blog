export default function Profile() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="space-y-3">
        <p><span className="font-semibold">Name:</span> John Doe</p>
        <p><span className="font-semibold">Email:</span> john@example.com</p>
        <p><span className="font-semibold">Role:</span> User</p>
        <p><span className="font-semibold">Member Since:</span> Jan 2025</p>
      </div>
    </div>
  );
}
