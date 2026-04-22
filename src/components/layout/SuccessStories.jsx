import React from "react";

const successStories = [
  {
    name: "Rahul Sharma",
    course: "B.Tech CSE",
    college: "Delhi Technological University, Delhi",
    text: "R.S Education helped me choose the right college in Delhi. The AI tool matched my rank perfectly and saved me a lot of time.",
  },
  {
    name: "Priya Verma",
    course: "MBA",
    college: "MDI Gurgaon, Haryana",
    text: "The counseling sessions were extremely helpful. I got into one of the top MBA colleges in Haryana with proper guidance.",
  },
  {
    name: "Aman Yadav",
    course: "B.Tech IT",
    college: "NSUT, Delhi",
    text: "Their AI recommendation system suggested NSUT which I hadn’t considered earlier. Best decision of my life!",
  },
  {
    name: "Sneha Patil",
    course: "BBA",
    college: "Symbiosis, Pune",
    text: "From application to final admission, everything was smooth. Pune was always my dream and they made it possible.",
  },
  {
    name: "Rohit Dahiya",
    course: "B.Tech Mechanical",
    college: "YMCA Faridabad, Haryana",
    text: "I was confused about colleges, but their team guided me step-by-step and I secured a great college in Haryana.",
  },
  {
    name: "Neha Kulkarni",
    course: "MBA",
    college: "PUMBA, Pune",
    text: "Their AI insights and expert advice helped me crack MBA admissions in Pune. Highly recommended!",
  },
];

export default function SuccessStories() {
  return (
    <section className="rs-success">
      <h2 className="rs-success-title">Success Stories</h2>

      <div className="rs-carousel">
        <div className="rs-carousel-track">

          {/* ORIGINAL */}
          <div className="rs-success-grid">
            {successStories.map((item, index) => (
              <div className="rs-success-card" key={index}>
                <div className="rs-stars">★★★★★</div>

                <p className="rs-success-text">"{item.text}"</p>

                <div className="rs-user">
                  <img
                    src={`https://ui-avatars.com/api/?name=${item.name.replace(
                      " ",
                      "+"
                    )}&background=8b5e3c&color=fff`}
                    alt={item.name}
                  />
                  <div>
                    <h4>{item.name}</h4>
                    <p>
                      {item.course}, {item.college}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DUPLICATE (for smooth scroll) */}
          <div className="rs-success-grid">
            {successStories.map((item, index) => (
              <div className="rs-success-card" key={index}>
                <div className="rs-stars">★★★★★</div>

                <p className="rs-success-text">"{item.text}"</p>

                <div className="rs-user">
                  <img
                    src={`https://ui-avatars.com/api/?name=${item.name.replace(
                      " ",
                      "+"
                    )}&background=8b5e3c&color=fff`}
                    alt={item.name}
                  />
                  <div>
                    <h4>{item.name}</h4>
                    <p>
                      {item.course}, {item.college}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}