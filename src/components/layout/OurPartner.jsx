import React from "react";
import "../../styles/layout/ourpartner.css";

const partners = [
  "/images/partners/sharda_uni.png",
  "/images/partners/amity_uni.png",
  "/images/partners/bennet_uni.png",
  "/images/partners/bits_uni.png",
  "/images/partners/chandigarh_uni.png",
  "/images/partners/galgotia_uni.png",
  "/images/partners/gniot_uni.png",
  "/images/partners/jcbose_uni.png",
  "/images/partners/lpu_uni.png",
  "/images/partners/manav_uni.png",
  "/images/partners/noida_uni.png",
  "/images/partners/srm_uni.png",
  "/images/partners/subhbharti_uni.png",
  "/images/partners/thapar_uni.png",
  "/images/partners/iilm_uni.png",
  "/images/partners/inderprasth_uni.png",
  "/images/partners/mangalyatan_uni.png",
  "/images/partners/mangamay_uni.png",
  "/images/partners/shivnadar_uni.png",
  "/images/partners/smit-uni.png",
  "/images/partners/vit_uni.png",
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