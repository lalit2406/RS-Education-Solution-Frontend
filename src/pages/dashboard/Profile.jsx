import { useState, useEffect } from "react";
import "../../styles/dashboard/profile.css";
import { updateProfileUser } from "../../services/authService";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";

export default function Profile() {
  const [saving, setSaving] = useState(false);
  const { user, setUser } = useUser();


  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    exam: "SAT",
    score: "",
    universities: [],
    academic: {
      gpa: "",
      achievement: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(profile);
  const [newUniversity, setNewUniversity] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (user) {
      const formattedData = {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        school: user.school || "",
        exam: user.exam || "SAT",
        score: user.score || "",
        universities: user.universities || [],
        academic: {
          gpa: user.academic?.gpa || "",
          achievement: user.academic?.achievement || "",
        },
      };

      setProfile(formattedData);
      setOriginalProfile(JSON.parse(JSON.stringify(formattedData)));
    }
  }, [user]);

  // ✅ DETECT CHANGES
  useEffect(() => {
    const changed = JSON.stringify(profile) !== JSON.stringify(originalProfile);
    setHasChanges(Boolean(changed));
  }, [profile, originalProfile]);

  // ✅ BROWSER REFRESH WARNING
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasChanges]);


  // ✅ HANDLE INPUT CHANGE
  const handleChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const previousUser = user;

    try {
      setSaving(true);

      setUser({
        ...user,
        ...profile,
      });

      setIsEditing(false);
      setHasChanges(false);

      const res = await updateProfileUser(profile);

      setUser(res.data.user);

      setProfile({
        name: res.data.user.name || "",
        email: res.data.user.email || "",
        phone: res.data.user.phone || "",
        school: res.data.user.school || "",
        exam: res.data.user.exam || "SAT",
        score: res.data.user.score || "",
        universities: res.data.user.universities || [],
        academic: {
          gpa: res.data.user.academic?.gpa || "",
          achievement: res.data.user.academic?.achievement || "",
        },
      });

      setOriginalProfile(JSON.parse(JSON.stringify(res.data.user)));

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      setUser(previousUser);
      toast.error("Update failed. Changes reverted.");
    } finally {
      setSaving(false);
    }
  };

  // ✅ DISCARD (STAY IN EDIT MODE)
  const handleDiscard = () => {
    setProfile(JSON.parse(JSON.stringify(originalProfile)));
    setNewUniversity("");
    setHasChanges(false);
  };

  const handleAcademicChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      academic: {
        ...prev.academic,
        [field]: value,
      },
    }));
  };

  const calculateStrength = () => {
    let score = 0;

    if (profile.name) score += 10;
    if (profile.email) score += 10;
    if (profile.phone) score += 10;
    if (profile.school) score += 10;
    if (profile.exam) score += 10;
    if (profile.score) score += 10;
    if (profile.universities.length > 0) score += 20;

    if (profile.academic?.gpa) score += 10;
    if (profile.academic?.achievement) score += 10;

    return score;
  };

  return (
    <div className="rs-profile-page">
      {/* HEADER */}
      <div className="rs-profile-header">
        <h1>My Profile</h1>
        <p>Customize your academic identity and track your milestones.</p>
      </div>

      {/* ⚠️ UNSAVED WARNING */}
      {isEditing && hasChanges && (
        <div
          style={{
            background: "#fff3cd",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        >
          ⚠️ You have unsaved changes
        </div>
      )}

      <div className="rs-profile-grid">
        {/* LEFT */}
        <div className="rs-profile-left">
          <div className="rs-profile-card">
            <div className="rs-profile-avatar">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`}
                style={{ background: "random" }}
                alt="profile"
              />
              <div className="rs-avatar-edit">📷</div>
            </div>

            <h2>{profile.name}</h2>
            <p className="rs-profile-sub">Class of 2025 • Pre-Med Track</p>

            <div className="rs-profile-strength">
              <span>PROFILE STRENGTH</span>
              <span>{calculateStrength()}%</span>
            </div>

            <div className="rs-strength-bar">
              <div style={{ width: `${calculateStrength()}%` }}></div>
            </div>
          </div>

          <div className="rs-academic-card">
            <h4>ACADEMIC SNAPSHOTS</h4>

            {/* GPA */}
            <div className="rs-academic-item">
              <span className="icon">⭐</span>
              <div>
                {isEditing ? (
                  <input
                    className="rs-input"
                    placeholder="Enter GPA"
                    value={profile.academic.gpa}
                    onChange={(e) =>
                      handleAcademicChange("gpa", e.target.value)
                    }
                  />
                ) : (
                  <>
                    <h5>{profile.academic.gpa || "Add GPA"}</h5>
                    <p>Weighted Cumulative</p>
                  </>
                )}
              </div>
            </div>

            {/* ACHIEVEMENT */}
            <div className="rs-academic-item">
              <span className="icon">🏆</span>
              <div>
                {isEditing ? (
                  <input
                    className="rs-input"
                    placeholder="Enter Achievement"
                    value={profile.academic.achievement}
                    onChange={(e) =>
                      handleAcademicChange("achievement", e.target.value)
                    }
                  />
                ) : (
                  <>
                    <h5>{profile.academic.achievement || "Add Achievement"}</h5>
                    <p>Distinction Awarded</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rs-profile-right">
          <div className="rs-profile-info-card">
            <div className="rs-info-header">
              <h3>Personal Information</h3>
            </div>

            <div className="rs-info-grid">
              {["name", "email", "phone", "school"].map((field, i) => {
                const labels = [
                  "FULL NAME",
                  "EMAIL ADDRESS",
                  "PHONE NUMBER",
                  "CURRENT SCHOOL",
                ];

                return (
                  <div className="rs-input-group" key={field}>
                    <label>{labels[i]}</label>
                    {isEditing ? (
                      <input
                        className="rs-input"
                        placeholder="Enter value"
                        value={profile[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                      />
                    ) : (
                      <div className="rs-input">{profile[field]}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rs-goals-card">
            <h3>Academic & Exam Goals</h3>

            <div className="rs-goals-row">
              <div className="rs-goal-block">
                <label>TARGET EXAM</label>

                <div className="rs-chip-group">
                  {["SAT", "ACT", "IB", "AP Exams"].map((exam) => (
                    <span
                      key={exam}
                      className={profile.exam === exam ? "active" : ""}
                      onClick={() => isEditing && handleChange("exam", exam)}
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rs-goal-block">
                <label>TARGET SCORE</label>
                {isEditing ? (
                  <input
                    className="rs-score-box"
                    value={profile.score}
                    onChange={(e) => handleChange("score", e.target.value)}
                  />
                ) : (
                  <div className="rs-score-box">{profile.score}</div>
                )}
              </div>
            </div>

            {/* UNIVERSITIES */}
            <div className="rs-dream">
              <label>DREAM UNIVERSITIES</label>

              <div className="rs-dream-box">
                {profile.universities.map((uni, index) => (
                  <span key={index}>
                    {uni}
                    {isEditing && (
                      <button
                        onClick={() => {
                          const updated = profile.universities.filter(
                            (_, i) => i !== index,
                          );
                          handleChange("universities", updated);
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </span>
                ))}

                {isEditing && (
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "10px" }}
                  >
                    <input
                      className="rs-input"
                      placeholder="Add university..."
                      value={newUniversity}
                      onChange={(e) => setNewUniversity(e.target.value)}
                    />

                    <button
                      onClick={() => {
                        if (newUniversity.trim()) {
                          handleChange("universities", [
                            ...profile.universities,
                            newUniversity,
                          ]);
                          setNewUniversity("");
                        }
                      }}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ACTION BAR */}
          <div className="rs-profile-actions">
            <span
              className="rs-history"
              onClick={() => {
                setOriginalProfile(JSON.parse(JSON.stringify(profile)));
                setIsEditing(true);
              }}
            >
              ✏️ Edit Profile
            </span>

            <div className="rs-action-buttons">
              <button
                className="rs-discard"
                onClick={handleDiscard}
                disabled={!hasChanges}
              >
                Discard Changes
              </button>

              <button
                className="rs-save"
                onClick={handleSave}
                disabled={!hasChanges || saving}
              >
                {saving ? "Saving..." : "Save Profile Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
