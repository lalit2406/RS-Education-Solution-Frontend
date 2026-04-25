import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCloudUploadAlt,
  FaFileAlt,
  FaTrash,
  FaMagic,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import "../../styles/ai-tools/documentAnalyzer.css";

export default function DocumentAnalyzer() {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [rsDaLoading, setRsDaLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // no initial API → instant load
    setRsDaLoading(false);
  }, []);

  const API_URL = import.meta.env.VITE_DOCUMENT_ANALYZER_API;

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
  ];

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only JPG, PNG, WEBP, PDF and DOCX files are allowed.");
      return false;
    }

    return true;
  };

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearAll = () => {
    setFile(null);
    setResult(null);
    resetInput();
  };

  const handleFileSelect = (selectedFile) => {
    if (!validateFile(selectedFile)) return;

    setFile(selectedFile);
    setResult(null);
  };

  const onInputChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelect(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Please upload a document first.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.status === "success") {
        setResult(res.data.data);
        toast.success("Document analyzed successfully.");
      } else {
        toast.error("Unable to analyze document.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while analyzing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="da-page">
        <div className="da-container">
          {/* TOP BAR */}
          <div className="da-topbar">
            <Link to="/ai-tools" className="da-back">
              <FaArrowLeft />
              Back to AI Tools
            </Link>

            <div className="da-badge">
              <FaMagic />
              AI Powered Analyzer
            </div>
          </div>

          {/* HERO */}
          <section className="da-hero">
            {rsDaLoading ? (
              <>
                <div className="rs-da-skeleton-title"></div>
                <div className="rs-da-skeleton-desc"></div>
              </>
            ) : (
              <>
                <h1>Smart Document Analyzer</h1>

                <p>
                  Upload your document and instantly get
                  <strong> summary insights</strong>,
                  <strong> extracted key information</strong>, and
                  <strong> eligible course suggestions</strong> with a premium
                  AI powered experience.
                </p>
              </>
            )}
          </section>

          {/* UPLOAD SECTION */}
          {rsDaLoading ? (
            <section className="da-upload-card">
              <div className="rs-da-skeleton-box"></div>
              <div className="rs-da-skeleton-btn"></div>
            </section>
          ) : (
            !result && (
              <section className="da-upload-card">
                {!file ? (
                  <div
                    className={`da-dropzone ${dragActive ? "active" : ""}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragActive(true);
                    }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FaCloudUploadAlt className="da-upload-icon" />

                    <h3>Drag & Drop File Here</h3>

                    <p>or click to browse from your device</p>

                    <span>Supports JPG, PNG, WEBP, PDF, DOCX</span>

                    <input
                      hidden
                      ref={fileInputRef}
                      type="file"
                      onChange={onInputChange}
                      accept=".pdf,.docx,.png,.jpg,.jpeg,.webp"
                    />
                  </div>
                ) : (
                  <div className="da-file-box">
                    <div className="da-file-left">
                      <FaFileAlt />

                      <div>
                        <h4>{file.name}</h4>
                        <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>

                    <div className="da-file-actions">
                      <button
                        className="da-replace-btn"
                        onClick={() => fileInputRef.current.click()}
                      >
                        Replace
                      </button>

                      <button className="da-delete-btn" onClick={clearAll}>
                        <FaTrash />
                      </button>
                    </div>

                    <input
                      hidden
                      ref={fileInputRef}
                      type="file"
                      onChange={onInputChange}
                      accept=".pdf,.docx,.png,.jpg,.jpeg,.webp"
                    />
                  </div>
                )}

                <button
                  className="da-analyze-btn"
                  onClick={handleAnalyze}
                  disabled={loading}
                >
                  {loading ? "Analyzing Document..." : "Analyze Document"}
                </button>
              </section>
            )
          )}

          {/* LOADING */}
          {loading && (
            <section className="da-skeleton-wrap">
              <div className="da-skeleton da-sk-big"></div>
              <div className="da-skeleton da-sk-mid"></div>
              <div className="da-skeleton da-sk-mid"></div>
              <div className="da-skeleton da-sk-small"></div>
            </section>
          )}

          {/* RESULT */}
          {result && (
            <section className="da-result-section">
              {/* SUMMARY */}
              <div className="da-result-card da-summary-card">
                <div className="da-card-top">
                  <span className="da-mini-badge">AI Summary</span>
                  <h2>Analysis Summary</h2>
                </div>

                <p>{result.analysis_summary}</p>
              </div>

              {/* DATA */}
              <div className="da-result-card">
                <div className="da-card-top">
                  <span className="da-mini-badge">Structured Insights</span>
                  <h2>Extracted Data</h2>
                </div>

                <div className="da-grid">
                  <div className="da-info-box">
                    <span>📄 Document Type</span>
                    <p>
                      {result.extracted_data?.document_type || "Not Available"}
                    </p>
                  </div>

                  <div className="da-info-box">
                    <span>👤 Student Name</span>
                    <p>
                      {result.extracted_data?.student_name || "Not Available"}
                    </p>
                  </div>

                  <div className="da-info-box">
                    <span>📝 Analysis Note</span>
                    <p>
                      {result.extracted_data?.analysis_note || "Not Available"}
                    </p>
                  </div>

                  <div className="da-info-box">
                    <span>🔍 Key Fields</span>
                    <p>
                      {result.extracted_data?.key_fields || "Not Available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* COURSES */}
              <div className="da-result-card">
                <div className="da-card-top">
                  <span className="da-mini-badge">Recommendations</span>
                  <h2>Eligible Courses</h2>
                </div>

                <div className="da-course-list">
                  {result.eligible_courses?.length > 0 ? (
                    result.eligible_courses.map((course, index) => (
                      <div key={index} className="da-course-chip">
                        🎓 {course}
                      </div>
                    ))
                  ) : (
                    <p>No course suggestions available.</p>
                  )}
                </div>
              </div>

              {/* NEW */}
              <div className="da-new-doc-wrap">
                <button className="da-new-doc-btn" onClick={clearAll}>
                  Analyze New Document
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
