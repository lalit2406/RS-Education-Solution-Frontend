import React from "react";
import "../../styles/layout/ourpartner.css";

const partners = [
  "/images/partners/sharda_uni.webp",
  "/images/partners/amity_uni.webp",
  "/images/partners/bennet_uni.webp",
  "/images/partners/bits_uni.webp",
  "/images/partners/chandigarh_uni.webp",
  "/images/partners/galgotia_uni.webp",
  "/images/partners/gniot_uni.webp",
  "/images/partners/jcbose_uni.webp",
  "/images/partners/lpu_uni.webp",
  "/images/partners/manav_uni.webp",
  "/images/partners/noida_uni.webp",
  "/images/partners/srm_uni.webp",
  "/images/partners/subhbharti_uni.webp",
  "/images/partners/thapar_uni.webp",
  "/images/partners/iilm_uni.webp",
  "/images/partners/inderprasth_uni.webp",
  "/images/partners/mangalyatan_uni.webp",
  "/images/partners/mangamay_uni.webp",
  "/images/partners/shivnadar_uni.webp",
  "/images/partners/smit-uni.webp",
  "/images/partners/vit_uni.webp",
];

const OurPartner = () => {
  return (
    <div className="op-main-wrapper">
      <div className="op-container">
        <h2 className="op-heading">Our Partner Universities</h2>

        <div className="op-grid">
          {partners.map((logo, index) => (
            <div key={index} className="op-card">
              <img
                src={logo}
                alt="partner logo"
                className="op-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPartner;