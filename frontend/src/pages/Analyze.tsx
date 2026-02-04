import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navigation from "../components/nav";

export default function AnalyzeForm() {
  const [textInput, setTextInput] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!pdfFile) {
      alert("Please select a PDF file");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("job_description", textInput);
      formData.append("file", pdfFile);


      const response = await axios.post("http://127.0.0.1:8000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
        },
      });

      setResult(response.data.result);
      navigate("/dashboard", { state: { analysis: response.data } });
    } catch (error: any) {
      setResult(error.response?.data?.detail || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="flex flex-col min-h-screen">
          <Navigation />
          <div className="flex grow justify-center items-center bg-gray-50 text-gray-900">
              <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded space-y-4">
              <textarea
                  className="w-full p-2 border rounded"
                  placeholder="Enter text to match"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
              />
              <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files ? e.target.files[0] : null)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
              />
              <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                  disabled={loading}
              >
                  {loading ? "Analyzing..." : "Analyze"}
              </button>
              {result && (
                  <div className="mt-4 p-4 bg-gray-100 border rounded">
                      <strong>Result:</strong> {result}
                  </div>
                  )}
              </form>
          </div>
      </div>
          );
          }
