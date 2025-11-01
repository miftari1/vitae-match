import { useLocation } from "react-router-dom";
import React, { useState } from 'react';

interface Analysis {
  id: number;
  filename: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
}


const Dashboard: React.FC = () => {
  const location = useLocation();
  const analysisFromState = location.state?.analysis;
  const [analyses, setAnalyses] = useState<Analysis[]>(analysisFromState ? [analysisFromState] : []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">VitaeMatch Dashboard</h1>
      {analyses.map((a) => (
        <div key={a.id} className="border p-2 mb-2">
          <p><strong>File:</strong> {a.filename}</p>
          <p><strong>Match Score:</strong> {a.match_score}%</p>
          <p><strong>Matched Skills:</strong> {a.matched_skills.join(', ')}</p>
          <p><strong>Missing Skills:</strong> {a.missing_skills.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
