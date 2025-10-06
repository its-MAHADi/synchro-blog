export default function MembershipPage() {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4">Membership</h1>

      <p className="text-gray-600 mb-6">
        Upgrade your membership to enjoy exclusive benefits like unlimited posts and premium features.
      </p>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg flex justify-between items-center">
          <span>Free Plan</span>
          <span className="text-sm text-gray-500">Current</span>
        </div>

        <div className="p-4 border rounded-lg flex justify-between items-center">
          <span>Pro Plan</span>
          <button className="bg-amber-600 text-white px-4 py-2 rounded-lg">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
