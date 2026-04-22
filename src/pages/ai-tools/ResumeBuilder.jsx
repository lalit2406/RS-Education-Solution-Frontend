import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaMagic,
  FaFileAlt,
  FaCopy,
  FaDownload,
  FaRedo,
  FaPlus,
  FaTrash,
  FaUserTie,
  FaLaptopCode,
  FaGraduationCap,
  FaCertificate,
  FaBriefcase,
  FaLink,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../../styles/ai-tools/resumeBuilder.css";

const rbInitialForm = {
  name: "",
  phone: "",
  email: "",
  location: "",
  linkedin: "",
  summary: "",
  skills: {
    languages: "",
    web_dev: "",
    ml_ai: "",
    libraries: "",
    tools_dbs: "",
  },
  projects: [
    {
      role: "",
      name: "",
      description: "",
      tech_stack: "",
      impact: "",
    },
  ],
  education: [
    {
      degree: "",
      institution: "",
      year: "",
      score: "",
    },
  ],
  certifications: [""],
};

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_RESUME_API_URL;

  const [rbForm, setRbForm] = useState(rbInitialForm);
  const [rbLoading, setRbLoading] = useState(false);
  const [rbShowForm, setRbShowForm] = useState(true);
  const [rbGeneratedResume, setRbGeneratedResume] = useState(null);
  const [rbCopied, setRbCopied] = useState(false);

  /* ---------------- basic handlers ---------------- */

  const rbHandleChange = (e) => {
    const { name, value } = e.target;
    setRbForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const rbHandleSkillChange = (e) => {
    const { name, value } = e.target;

    setRbForm((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [name]: value,
      },
    }));
  };

  /* ---------------- projects ---------------- */

  const rbHandleProjectChange = (index, field, value) => {
    const updated = [...rbForm.projects];
    updated[index][field] = value;

    setRbForm((prev) => ({
      ...prev,
      projects: updated,
    }));
  };

  const rbAddProject = () => {
    setRbForm((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          role: "",
          name: "",
          description: "",
          tech_stack: "",
          impact: "",
        },
      ],
    }));
  };

  const rbRemoveProject = (index) => {
    if (rbForm.projects.length === 1) return;

    setRbForm((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- education ---------------- */

  const rbHandleEducationChange = (index, field, value) => {
    const updated = [...rbForm.education];
    updated[index][field] = value;

    setRbForm((prev) => ({
      ...prev,
      education: updated,
    }));
  };

  const rbAddEducation = () => {
    setRbForm((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          year: "",
          score: "",
        },
      ],
    }));
  };

  const rbRemoveEducation = (index) => {
    if (rbForm.education.length === 1) return;

    setRbForm((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- certifications ---------------- */

  const rbHandleCertificationChange = (index, value) => {
    const updated = [...rbForm.certifications];
    updated[index] = value;

    setRbForm((prev) => ({
      ...prev,
      certifications: updated,
    }));
  };

  const rbAddCertification = () => {
    setRbForm((prev) => ({
      ...prev,
      certifications: [...prev.certifications, ""],
    }));
  };

  const rbRemoveCertification = (index) => {
    if (rbForm.certifications.length === 1) return;

    setRbForm((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  /* ---------------- helper functions ---------------- */

  const rbHasValue = (value) => String(value || "").trim() !== "";

  const rbSplitSkills = (text) =>
    String(text || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const rbFilteredProjects = (projects) =>
    projects.filter(
      (item) =>
        rbHasValue(item.role) ||
        rbHasValue(item.name) ||
        rbHasValue(item.description) ||
        rbHasValue(item.tech_stack) ||
        rbHasValue(item.impact)
    );

  const rbFilteredEducation = (education) =>
    education.filter(
      (item) =>
        rbHasValue(item.degree) ||
        rbHasValue(item.institution) ||
        rbHasValue(item.year) ||
        rbHasValue(item.score)
    );

  const rbFilteredCertifications = (certs) =>
    certs.filter((item) => rbHasValue(item));

  /* ---------------- submit ---------------- */

  const rbGenerateResume = async (e) => {
    e.preventDefault();

    try {
      setRbLoading(true);

      const cleanProjects = rbFilteredProjects(rbForm.projects);
      const cleanEducation = rbFilteredEducation(rbForm.education);
      const cleanCerts = rbFilteredCertifications(
        rbForm.certifications
      );

      const payload = {
        name: rbForm.name,
        phone: rbForm.phone,
        email: rbForm.email,
        location: rbForm.location,
        profiles: rbHasValue(rbForm.linkedin)
          ? [
              {
                platform: "LinkedIn",
                link: rbForm.linkedin,
              },
            ]
          : [],
        summary: rbForm.summary,
        skills: rbForm.skills,
        projects: cleanProjects,
        education: cleanEducation,
        certifications: cleanCerts,
      };

      await axios.post(apiUrl, payload);

      /* We use our own premium preview */
      setRbGeneratedResume(payload);
      setRbShowForm(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
        console.log(error);
      setRbGeneratedResume({
        ...rbForm,
        projects: rbFilteredProjects(rbForm.projects),
        education: rbFilteredEducation(rbForm.education),
        certifications: rbFilteredCertifications(
          rbForm.certifications
        ),
      });

      setRbShowForm(false);
    } finally {
      setRbLoading(false);
    }
  };

  /* ---------------- actions ---------------- */

  const rbCopyResume = async () => {
    const text = JSON.stringify(rbGeneratedResume, null, 2);
    await navigator.clipboard.writeText(text);

    setRbCopied(true);

    setTimeout(() => {
      setRbCopied(false);
    }, 1600);
  };

  const rbDownloadResume = () => {
    const fileText = JSON.stringify(
      rbGeneratedResume,
      null,
      2
    );

    const blob = new Blob([fileText], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "resume.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const rbCreateNewResume = () => {
    setRbForm(rbInitialForm);
    setRbGeneratedResume(null);
    setRbShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ---------------- preview data ---------------- */

  const rbPreview = rbGeneratedResume || {};
  const rbProjects = rbFilteredProjects(
    rbPreview.projects || []
  );
  const rbEducation = rbFilteredEducation(
    rbPreview.education || []
  );
  const rbCerts = rbFilteredCertifications(
    rbPreview.certifications || []
  );

  const rbSkillGroups = [
    {
      title: "Languages",
      values: rbSplitSkills(
        rbPreview.skills?.languages
      ),
    },
    {
      title: "Web Dev",
      values: rbSplitSkills(
        rbPreview.skills?.web_dev
      ),
    },
    {
      title: "AI / ML",
      values: rbSplitSkills(
        rbPreview.skills?.ml_ai
      ),
    },
    {
      title: "Libraries",
      values: rbSplitSkills(
        rbPreview.skills?.libraries
      ),
    },
    {
      title: "Tools / DB",
      values: rbSplitSkills(
        rbPreview.skills?.tools_dbs
      ),
    },
  ].filter((item) => item.values.length > 0);

  return (
    <div className="rb-page-wrap">
      <div className="rb-page-container">
        <div className="rb-topbar">
          <button
            className="rb-back-btn"
            onClick={() => navigate("/ai-tools")}
          >
            <FaArrowLeft />
            Back to AI Tools
          </button>

          <div className="rb-top-badge">
            <FaMagic />
            AI Resume Builder
          </div>
        </div>

        <div className="rb-hero-card">
          <div className="rb-hero-left">
            <h1>Create Premium ATS Resume</h1>

            <p>
              Smart resume builder with clean structure,
              recruiter focused layout and modern design.
            </p>

          </div>

          <div className="rb-hero-icon">
            <FaFileAlt />
          </div>
        </div>

        {/* ---------------- FORM ---------------- */}

        {rbShowForm && (
  <form
    className="rb-main-form"
    onSubmit={rbGenerateResume}
  >
    {/* PERSONAL DETAILS */}
    <section className="rb-section-card rb-form-card">
      <div className="rb-form-head">
        <div className="rb-form-icon">
          <FaUserTie />
        </div>

        <div>
          <h2>Personal Details</h2>
          <p>
            Basic information recruiters use to contact
            you.
          </p>
        </div>
      </div>

      <div className="rb-grid-two">
        <div className="rb-input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={rbForm.name}
            onChange={rbHandleChange}
            required
          />
        </div>

        <div className="rb-input-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={rbForm.phone}
            onChange={rbHandleChange}
          />
        </div>

        <div className="rb-input-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={rbForm.email}
            onChange={rbHandleChange}
          />
        </div>

        <div className="rb-input-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="City, State"
            value={rbForm.location}
            onChange={rbHandleChange}
          />
        </div>

        <div className="rb-input-group rb-full-width">
          <label>LinkedIn / Portfolio</label>
          <input
            type="text"
            name="linkedin"
            placeholder="Paste profile link"
            value={rbForm.linkedin}
            onChange={rbHandleChange}
          />
        </div>
      </div>

      <div className="rb-input-group">
        <label>Professional Summary</label>
        <textarea
          rows="5"
          name="summary"
          placeholder="Write a short professional summary"
          value={rbForm.summary}
          onChange={rbHandleChange}
        />
      </div>
    </section>

    {/* SKILLS */}
    <section className="rb-section-card rb-form-card">
      <div className="rb-form-head">
        <div className="rb-form-icon">
          <FaLaptopCode />
        </div>

        <div>
          <h2>Technical Skills</h2>
          <p>
            Add strong keywords for better ATS score.
          </p>
        </div>
      </div>

      <div className="rb-grid-two">
        <div className="rb-input-group">
          <label>Languages</label>
          <input
            type="text"
            name="languages"
            placeholder="Python, JavaScript, Java"
            value={rbForm.skills.languages}
            onChange={rbHandleSkillChange}
          />
        </div>

        <div className="rb-input-group">
          <label>Web Development</label>
          <input
            type="text"
            name="web_dev"
            placeholder="React, Node.js, HTML, CSS"
            value={rbForm.skills.web_dev}
            onChange={rbHandleSkillChange}
          />
        </div>

        <div className="rb-input-group">
          <label>AI / ML</label>
          <input
            type="text"
            name="ml_ai"
            placeholder="TensorFlow, LangChain"
            value={rbForm.skills.ml_ai}
            onChange={rbHandleSkillChange}
          />
        </div>

        <div className="rb-input-group">
          <label>Libraries</label>
          <input
            type="text"
            name="libraries"
            placeholder="NumPy, Pandas"
            value={rbForm.skills.libraries}
            onChange={rbHandleSkillChange}
          />
        </div>

        <div className="rb-input-group rb-full-width">
          <label>Tools / Databases</label>
          <input
            type="text"
            name="tools_dbs"
            placeholder="Git, MongoDB, Docker"
            value={rbForm.skills.tools_dbs}
            onChange={rbHandleSkillChange}
          />
        </div>
      </div>
    </section>

    {/* PROJECTS */}
    <section className="rb-section-card rb-form-card">
      <div className="rb-section-head rb-space-between">
        <div className="rb-form-head rb-no-margin">
          <div className="rb-form-icon">
            <FaBriefcase />
          </div>

          <div>
            <h2>Projects</h2>
            <p>
              Add strong real work or personal projects.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rb-add-btn"
          onClick={rbAddProject}
        >
          <FaPlus />
          Add Project
        </button>
      </div>

      {rbForm.projects.map((item, index) => (
        <div
          key={index}
          className="rb-repeat-card rb-modern-repeat"
        >
          <div className="rb-repeat-top">
            <span className="rb-count-badge">
              Project {index + 1}
            </span>

            <button
              type="button"
              className="rb-delete-btn"
              onClick={() =>
                rbRemoveProject(index)
              }
            >
              <FaTrash />
            </button>
          </div>

          <div className="rb-grid-two">
            <div className="rb-input-group">
              <label>Role</label>
              <input
                placeholder="Developer"
                value={item.role}
                onChange={(e) =>
                  rbHandleProjectChange(
                    index,
                    "role",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="rb-input-group">
              <label>Project Name</label>
              <input
                placeholder="AI Chatbot"
                value={item.name}
                onChange={(e) =>
                  rbHandleProjectChange(
                    index,
                    "name",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="rb-input-group">
              <label>Tech Stack</label>
              <input
                placeholder="React, Node.js"
                value={item.tech_stack}
                onChange={(e) =>
                  rbHandleProjectChange(
                    index,
                    "tech_stack",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="rb-input-group">
              <label>Impact</label>
              <input
                placeholder="Improved speed by 40%"
                value={item.impact}
                onChange={(e) =>
                  rbHandleProjectChange(
                    index,
                    "impact",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <div className="rb-input-group">
            <label>Description</label>
            <textarea
              rows="4"
              placeholder="Describe what you built"
              value={item.description}
              onChange={(e) =>
                rbHandleProjectChange(
                  index,
                  "description",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      ))}
    </section>

    {/* EDUCATION */}
    <section className="rb-section-card rb-form-card">
      <div className="rb-section-head rb-space-between">
        <div className="rb-form-head rb-no-margin">
          <div className="rb-form-icon">
            <FaGraduationCap />
          </div>

          <div>
            <h2>Education</h2>
            <p>
              Add latest and relevant qualifications.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rb-add-btn"
          onClick={rbAddEducation}
        >
          <FaPlus />
          Add Education
        </button>
      </div>

      {rbForm.education.map((item, index) => (
        <div
          key={index}
          className="rb-repeat-card rb-modern-repeat"
        >
          <div className="rb-repeat-top">
            <span className="rb-count-badge">
              Education {index + 1}
            </span>

            <button
              type="button"
              className="rb-delete-btn"
              onClick={() =>
                rbRemoveEducation(index)
              }
            >
              <FaTrash />
            </button>
          </div>

          <div className="rb-grid-two">
            <div className="rb-input-group">
              <label>Degree</label>
              <input
                placeholder="B.Tech CSE"
                value={item.degree}
                onChange={(e) =>
                  rbHandleEducationChange(
                    index,
                    "degree",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="rb-input-group">
              <label>Institution</label>
              <input
                placeholder="University name"
                value={item.institution}
                onChange={(e) =>
                  rbHandleEducationChange(
                    index,
                    "institution",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="rb-input-group">
              <label>Year</label>
              <input
                placeholder="2026"
                value={item.year}
                onChange={(e) =>
                  rbHandleEducationChange(
                    index,
                    "year",
                    e.target.value
                  )
                }
              />
            </div>

            <div className="rb-input-group">
              <label>Score / CGPA</label>
              <input
                placeholder="8.5 CGPA"
                value={item.score}
                onChange={(e) =>
                  rbHandleEducationChange(
                    index,
                    "score",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        </div>
      ))}
    </section>

    {/* CERTIFICATIONS */}
    <section className="rb-section-card rb-form-card">
      <div className="rb-section-head rb-space-between">
        <div className="rb-form-head rb-no-margin">
          <div className="rb-form-icon">
            <FaCertificate />
          </div>

          <div>
            <h2>Certifications</h2>
            <p>
              Add certificates, internships or awards.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="rb-add-btn"
          onClick={rbAddCertification}
        >
          <FaPlus />
          Add
        </button>
      </div>

      {rbForm.certifications.map((item, index) => (
        <div
          key={index}
          className="rb-cert-row"
        >
          <div className="rb-input-group">
            <label>
              Certification {index + 1}
            </label>

            <input
              placeholder="AWS Cloud Practitioner"
              value={item}
              onChange={(e) =>
                rbHandleCertificationChange(
                  index,
                  e.target.value
                )
              }
            />
          </div>

          <button
            type="button"
            className="rb-delete-btn"
            onClick={() =>
              rbRemoveCertification(index)
            }
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </section>

    <button
      type="submit"
      className="rb-submit-btn"
      disabled={rbLoading}
    >
      {rbLoading
        ? "Generating Resume..."
        : "Generate Resume"}
    </button>
  </form>
)}

        {/* ---------------- PREVIEW ---------------- */}

        {!rbShowForm && rbGeneratedResume && (
          <section className="rb-output-card">
            <div className="rb-section-head rb-space-between">
              <div className="rb-inline-head">
                <FaFileAlt />
                <h2>Generated Resume</h2>
              </div>

              <div className="rb-action-group">
                <button
                  className="rb-copy-btn"
                  onClick={rbCopyResume}
                >
                  <FaCopy />
                  {rbCopied
                    ? "Copied"
                    : "Copy"}
                </button>

                <button
                  className="rb-copy-btn"
                  onClick={rbDownloadResume}
                >
                  <FaDownload />
                  Download
                </button>

                <button
                  className="rb-copy-btn"
                  onClick={rbCreateNewResume}
                >
                  <FaRedo />
                  New Resume
                </button>
              </div>
            </div>

            <div className="rb-preview-sheet">
              {/* header */}
              <div className="rb-resume-name">
                {rbPreview.name}
              </div>

              <div className="rb-resume-contact">
                {rbHasValue(
                  rbPreview.phone
                ) && (
                  <span>
                    <FaPhoneAlt />
                    {rbPreview.phone}
                  </span>
                )}

                {rbHasValue(
                  rbPreview.email
                ) && (
                  <span>
                    <FaEnvelope />
                    {rbPreview.email}
                  </span>
                )}

                {rbHasValue(
                  rbPreview.location
                ) && (
                  <span>
                    <FaMapMarkerAlt />
                    {rbPreview.location}
                  </span>
                )}

                {rbHasValue(
                  rbPreview.linkedin
                ) && (
                  <span>
                    <FaLink />
                    LinkedIn
                  </span>
                )}
              </div>

              {/* summary */}
              {rbHasValue(
                rbPreview.summary
              ) && (
                <>
                  <div className="rb-preview-section">
                    Professional Summary
                  </div>

                  <p className="rb-summary-box">
                    {rbPreview.summary}
                  </p>
                </>
              )}

              {/* skills */}
              {rbSkillGroups.length >
                0 && (
                <>
                  <div className="rb-preview-section">
                    Technical Skills
                  </div>

                  <div className="rb-skill-wrap">
                    {rbSkillGroups.map(
                      (
                        group,
                        index
                      ) => (
                        <div
                          key={
                            index
                          }
                          className="rb-skill-group"
                        >
                          <div className="rb-skill-title">
                            {
                              group.title
                            }
                          </div>

                          <div className="rb-badge-row">
                            {group.values.map(
                              (
                                item,
                                i
                              ) => (
                                <span
                                  key={
                                    i
                                  }
                                  className="rb-skill-badge"
                                >
                                  {
                                    item
                                  }
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}

              {/* projects */}
              {rbProjects.length >
                0 && (
                <>
                  <div className="rb-preview-section">
                    Projects
                  </div>

                  {rbProjects.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="rb-pro-card"
                      >
                        {(rbHasValue(
                          item.name
                        ) ||
                          rbHasValue(
                            item.role
                          )) && (
                          <div className="rb-pro-head">
                            {
                              item.name
                            }
                            {rbHasValue(
                              item.role
                            ) &&
                              ` | ${item.role}`}
                          </div>
                        )}

                        {rbHasValue(
                          item.description
                        ) && (
                          <div className="rb-preview-line">
                            {
                              item.description
                            }
                          </div>
                        )}

                        {rbHasValue(
                          item.tech_stack
                        ) && (
                          <div className="rb-preview-line">
                            <strong>
                              Tech:
                            </strong>{" "}
                            {
                              item.tech_stack
                            }
                          </div>
                        )}

                        {rbHasValue(
                          item.impact
                        ) && (
                          <div className="rb-impact-line">
                            {
                              item.impact
                            }
                          </div>
                        )}
                      </div>
                    )
                  )}
                </>
              )}

              {/* education */}
              {rbEducation.length >
                0 && (
                <>
                  <div className="rb-preview-section">
                    Education
                  </div>

                  {rbEducation.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="rb-edu-card"
                      >
                        <div className="rb-pro-head">
                          {
                            item.degree
                          }
                        </div>

                        <div className="rb-preview-line">
                          {
                            item.institution
                          }
                        </div>

                        <div className="rb-preview-line">
                          {item.year}{" "}
                          {rbHasValue(
                            item.score
                          ) &&
                            `| ${item.score}`}
                        </div>
                      </div>
                    )
                  )}
                </>
              )}

              {/* certs */}
              {rbCerts.length >
                0 && (
                <>
                  <div className="rb-preview-section">
                    Certifications
                  </div>

                  <div className="rb-badge-row">
                    {rbCerts.map(
                      (
                        item,
                        index
                      ) => (
                        <span
                          key={
                            index
                          }
                          className="rb-skill-badge"
                        >
                          {
                            item
                          }
                        </span>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}