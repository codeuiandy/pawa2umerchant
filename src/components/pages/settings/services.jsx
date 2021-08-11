import React from "react";

export default function Services() {
  return (
    <div>
      <div className="profileWrap">
        <form action="">
          <p className="pagenameProflPawa">Services</p>
          <div className="selectProductPawasett">
            <div className="SelectHProduct">
              <p>Select Product:</p>
            </div>

            <div className="selPList1">
              <div className="chspin">
                <input type="checkbox" /> <p>Diesel</p>
              </div>

              <div className="chspin">
                <input type="checkbox" /> <p>Solar panels</p>
              </div>

              <div className="chspin">
                <input type="checkbox" /> <p>Electricity</p>
              </div>
            </div>

            <div className="selPList1">
              <div className="chspin">
                <input type="checkbox" /> <p>Generators</p>
              </div>

              <div className="chspin">
                <input type="checkbox" /> <p>Gas</p>
              </div>

              <div className="chspin">
                <input type="checkbox" /> <p>Inverter & Batteries</p>
              </div>
            </div>
          </div>

          <div className="selectProductPawasett">
            <div className="SelectHProduct">
              <p>Select Services:</p>
            </div>

            <div className="selPList1">
              <div className="chspin">
                <input type="checkbox" /> <p>Airtime</p>
              </div>

              <div className="chspin">
                <input type="checkbox" /> <p>Electricity</p>
              </div>
            </div>

            <div className="selPList1">
              <div className="chspin">
                <input type="checkbox" /> <p>Internet/Data</p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="saveChangesBtn">
        <button>Save and continue</button>
      </div>
    </div>
  );
}
