import React from "react";
import "../../styles/layout/ourpartner.css";
import sharda from "../../assets/partners/sharda_uni.jpeg";
import amity from "../../assets/partners/amity_uni.jpeg";
import bennett from "../../assets/partners/bennet_uni.jpeg";
import bits from "../../assets/partners/bits_uni.jpeg";
import chandigarh from "../../assets/partners/chandigarh_uni.jpeg";
import galgotias from "../../assets/partners/galgotia_uni.png";
import gniot from "../../assets/partners/gniot_uni.jpeg";
import jcbose from "../../assets/partners/jcbose_uni.png";
import lpu from "../../assets/partners/lpu_uni.png";
import manav from "../../assets/partners/manav_uni.jpeg";
import niu from "../../assets/partners/noida_uni.jpeg";
import srm from "../../assets/partners/srm_uni.png";
import subharti from "../../assets/partners/subhbharti_uni.jpeg";
import thapar from "../../assets/partners/thapar_uni.jpeg";
import iilm from "../../assets/partners/iilm_uni.jpeg";
import ipu from "../../assets/partners/inderprasth_uni.jpeg";
import mangalyatan from "../../assets/partners/mangalyatan_uni.jpeg";
import mangalmay from "../../assets/partners/mangamay_uni.jpeg";
import shivnadar from "../../assets/partners/shivnadar_uni.jpeg";
import smit from "../../assets/partners/smit-uni.jpeg";
import vit from "../../assets/partners/vit_uni.jpeg";

const partners = [
  sharda,
  amity,
  bennett,
  bits,
  chandigarh,
  galgotias,
  gniot,
  jcbose,
  lpu,
  manav,
  niu,
  srm,
  subharti,
  thapar,
  iilm,
  ipu,
  mangalyatan,
  mangalmay,
  shivnadar,
  smit,
  vit,
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
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPartner;