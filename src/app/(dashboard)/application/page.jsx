"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import LoadingApplicationList from "./loading";

const ApplicationPage = () => {
  const [profApps, setProfApps] = useState([]);
  const [blockApps, setBlockApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/applications");
      const data = await res.json();
      setProfApps(data.professionChangeApps || []);
      setBlockApps(data.blockRetakeApps || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) return <><LoadingApplicationList/></>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Application List</h1>

      {/* Profession Change Applications */}
      <h2 className="text-xl font-semibold mb-2">Profession Change Requests</h2>
      {profApps.length === 0 ? (
        <p>No profession change applications</p>
      ) : (
        <table className="min-w-full border border-gray-300 mb-6">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Current Profession</th>
              <th className="px-4 py-2 border">Reason</th>
              <th className="px-4 py-2 border">Applied At</th>
            </tr>
          </thead>
          <tbody>
            {profApps.map(app => (
              <tr key={app._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 border">{app.email}</td>
                <td className="px-4 py-2 border">{app.currentProfession}</td>
                <td className="px-4 py-2 border">{app.reason}</td>
                <td className="px-4 py-2 border">{new Date(app.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Block Retake Applications */}
      <h2 className="text-xl font-semibold mb-2">Permanent Block Requests (3 Retakes)</h2>
      {blockApps.length === 0 ? (
        <p>No block requests</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Profession</th>
              <th className="px-4 py-2 border">Reason</th>
              <th className="px-4 py-2 border">Applied At</th>
            </tr>
          </thead>
          <tbody>
            {blockApps.map(app => (
              <tr key={app._id} className="border hover:bg-gray-50">
                <td className="px-4 py-2 border">{app.email}</td>
                <td className="px-4 py-2 border">{app.profession}</td>
                <td className="px-4 py-2 border">{app.reason}</td>
                <td className="px-4 py-2 border">{new Date(app.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicationPage;
