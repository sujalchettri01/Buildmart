import { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface MaterialItem {
  id: number;
  material: string;
  quantity: string;
  unit: string;
}

export default function BulkQuotePage() {
  // =====================================================
  // CONTACT INFORMATION
  // =====================================================

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  // =====================================================
  // DELIVERY INFORMATION
  // =====================================================

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");

  // =====================================================
  // ADDITIONAL REQUIREMENTS
  // =====================================================

  const [requirements, setRequirements] = useState("");

  // =====================================================
  // MATERIALS
  // =====================================================

  const [materials, setMaterials] = useState<MaterialItem[]>([
    {
      id: 1,
      material: "",
      quantity: "",
      unit: "bag",
    },
  ]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const materialOptions = [
    "Cement",
    "Steel & TMT",
    "Plumbing",
    "Electrical",
    "Paint",
    "Bricks",
    "Plywood",
    "Sanitaryware",
  ];

  // =====================================================
  // ADD MATERIAL
  // =====================================================

  const addMaterial = () => {
    setMaterials((current) => [
      ...current,
      {
        id: Date.now(),
        material: "",
        quantity: "",
        unit: "piece",
      },
    ]);
  };

  // =====================================================
  // REMOVE MATERIAL
  // =====================================================

  const removeMaterial = (id: number) => {
    if (materials.length === 1) return;

    setMaterials((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  // =====================================================
  // UPDATE MATERIAL
  // =====================================================

  const updateMaterial = (
    id: number,
    field: keyof MaterialItem,
    value: string
  ) => {
    setMaterials((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  // =====================================================
  // SUBMIT BULK QUOTE
  // =====================================================

  const handleSubmit = () => {
    setError("");
    setSuccess(false);

    // FULL NAME

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // MOBILE

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError(
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    // EMAIL

    if (
      email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    // DELIVERY ADDRESS

    if (!deliveryAddress.trim()) {
      setError("Please enter the full delivery address.");
      return;
    }

    // PIN CODE

    if (!/^\d{6}$/.test(pinCode)) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    // DELIVERY LOCATION

    if (!deliveryLocation.trim()) {
      setError("Please enter the delivery location.");
      return;
    }

    // MATERIAL VALIDATION

    const invalidMaterial = materials.some(
      (item) =>
        !item.material ||
        !item.quantity ||
        Number(item.quantity) <= 0
    );

    if (invalidMaterial) {
      setError(
        "Please select each material and enter a valid quantity."
      );
      return;
    }

    // ===================================================
    // FRONTEND DEMO DATA
    //
    // Later this object can be sent to your backend.
    // ===================================================

    const bulkQuoteData = {
      customer: {
        fullName,
        mobile,
        email,
      },

      delivery: {
        address: deliveryAddress,
        landmark,
        pinCode,
        location: deliveryLocation,
      },

      materials,

      requirements,
    };

    console.log(
      "Bulk Quote Request:",
      bulkQuoteData
    );

    setSuccess(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header />
      <Navbar />

      <main className="bulk-quote-page">
        <div className="container">

          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div className="bulk-quote-breadcrumb">
            <Link to="/">Home</Link>

            <span>›</span>

            <span>Bulk Quote</span>
          </div>

          {/* =================================================
              PAGE HEADING
          ================================================= */}

          <div className="bulk-quote-heading">

            <span className="section-label">
              CONTRACTOR & BULK ORDERS
            </span>

            <h1>
              Request a Bulk Quote
            </h1>

            <p>
              Tell us what materials you need and where
              you need them delivered. We'll prepare a
              quotation for your bulk order.
            </p>

          </div>

          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {success && (
            <div className="quote-success-message">

              <strong>
                ✓ Quote request submitted
              </strong>

              <span>
                Your bulk quote request has been recorded
                in this demo. Backend submission will be
                connected later.
              </span>

            </div>
          )}

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (
            <div className="checkout-error">

              <strong>
                Please check your information
              </strong>

              <span>
                {error}
              </span>

            </div>
          )}

          {/* =================================================
              MAIN LAYOUT
          ================================================= */}

          <div className="bulk-quote-layout">

            {/* =================================================
                LEFT SIDE FORM
            ================================================= */}

            <div className="bulk-quote-form">

              {/* =================================================
                  1. CONTACT INFORMATION
              ================================================= */}

              <section className="checkout-card">

                <div className="checkout-section-title">

                  <span>
                    1
                  </span>

                  <div>

                    <h2>
                      Contact Information
                    </h2>

                    <p>
                      We'll use these details to contact
                      you about your quotation.
                    </p>

                  </div>

                </div>

                <div className="checkout-form-grid">

                  {/* FULL NAME */}

                  <div className="form-group">

                    <label>
                      Full Name *
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(event) =>
                        setFullName(
                          event.target.value
                        )
                      }
                    />

                  </div>

                  {/* MOBILE */}

                  <div className="form-group">

                    <label>
                      Mobile Number *
                    </label>

                    <input
                      type="tel"
                      inputMode="numeric"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={mobile}
                      onChange={(event) =>
                        setMobile(
                          event.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                    />

                  </div>

                  {/* EMAIL */}

                  <div className="form-group full-width">

                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
                        )
                      }
                    />

                  </div>

                </div>

              </section>

              {/* =================================================
                  2. DELIVERY DETAILS
              ================================================= */}

              <section className="checkout-card">

                <div className="checkout-section-title">

                  <span>
                    2
                  </span>

                  <div>

                    <h2>
                      Delivery Details
                    </h2>

                    <p>
                      Tell us exactly where the construction
                      materials need to be delivered.
                    </p>

                  </div>

                </div>

                <div className="checkout-form-grid">

                  {/* FULL DELIVERY ADDRESS */}

                  <div className="form-group full-width">

                    <label>
                      Full Delivery Address *
                    </label>

                    <textarea
                      className="quote-address-textarea"
                      placeholder="House / building, road, locality, village or area"
                      value={deliveryAddress}
                      onChange={(event) =>
                        setDeliveryAddress(
                          event.target.value
                        )
                      }
                    />

                  </div>

                  {/* LANDMARK */}

                  <div className="form-group">

                    <label>
                      Landmark / Area
                    </label>

                    <input
                      type="text"
                      placeholder="Nearby landmark or area"
                      value={landmark}
                      onChange={(event) =>
                        setLandmark(
                          event.target.value
                        )
                      }
                    />

                  </div>

                  {/* PIN CODE */}

                  <div className="form-group">

                    <label>
                      PIN Code *
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="6-digit PIN code"
                      maxLength={6}
                      value={pinCode}
                      onChange={(event) =>
                        setPinCode(
                          event.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                    />

                  </div>

                  {/* DELIVERY LOCATION */}

                  <div className="form-group full-width">

                    <label>
                      Delivery Location *
                    </label>

                    <input
                      type="text"
                      placeholder="Example: Gangtok, Sikkim"
                      value={deliveryLocation}
                      onChange={(event) =>
                        setDeliveryLocation(
                          event.target.value
                        )
                      }
                    />

                    <small className="delivery-location-help">
                      Enter the town, city, village or
                      construction-site location.
                    </small>

                  </div>

                </div>

              </section>

              {/* =================================================
                  3. MATERIALS REQUIRED
              ================================================= */}

              <section className="checkout-card">

                <div className="checkout-section-title">

                  <span>
                    3
                  </span>

                  <div>

                    <h2>
                      Materials Required
                    </h2>

                    <p>
                      Add one or more materials and the
                      required quantities.
                    </p>

                  </div>

                </div>

                <div className="quote-material-list">

                  {materials.map(
                    (item, index) => (
                      <div
                        className="quote-material-row"
                        key={item.id}
                      >

                        {/* MATERIAL NUMBER */}

                        <div className="quote-material-number">
                          {index + 1}
                        </div>

                        {/* MATERIAL */}

                        <select
                          value={item.material}
                          onChange={(event) =>
                            updateMaterial(
                              item.id,
                              "material",
                              event.target.value
                            )
                          }
                        >

                          <option value="">
                            Select material
                          </option>

                          {materialOptions.map(
                            (material) => (
                              <option
                                value={material}
                                key={material}
                              >
                                {material}
                              </option>
                            )
                          )}

                        </select>

                        {/* QUANTITY */}

                        <input
                          type="number"
                          min="1"
                          placeholder="Quantity"
                          value={item.quantity}
                          onChange={(event) =>
                            updateMaterial(
                              item.id,
                              "quantity",
                              event.target.value
                            )
                          }
                        />

                        {/* UNIT */}

                        <select
                          value={item.unit}
                          onChange={(event) =>
                            updateMaterial(
                              item.id,
                              "unit",
                              event.target.value
                            )
                          }
                        >

                          <option value="bag">
                            Bag
                          </option>

                          <option value="tonne">
                            Tonne
                          </option>

                          <option value="kg">
                            Kg
                          </option>

                          <option value="piece">
                            Piece
                          </option>

                          <option value="sheet">
                            Sheet
                          </option>

                          <option value="coil">
                            Coil
                          </option>

                          <option value="litre">
                            Litre
                          </option>

                          <option value="box">
                            Box
                          </option>

                        </select>

                        {/* REMOVE */}

                        <button
                          type="button"
                          className="remove-material-button"
                          onClick={() =>
                            removeMaterial(
                              item.id
                            )
                          }
                          disabled={
                            materials.length === 1
                          }
                          aria-label="Remove material"
                        >
                          ×
                        </button>

                      </div>
                    )
                  )}

                </div>

                {/* ADD MATERIAL */}

                <button
                  type="button"
                  className="add-material-button"
                  onClick={addMaterial}
                >
                  + Add Another Material
                </button>

              </section>

              {/* =================================================
                  4. ADDITIONAL REQUIREMENTS
              ================================================= */}

              <section className="checkout-card">

                <div className="checkout-section-title">

                  <span>
                    4
                  </span>

                  <div>

                    <h2>
                      Additional Requirements
                    </h2>

                    <p>
                      Add brands, sizes, specifications or
                      delivery instructions.
                    </p>

                  </div>

                </div>

                <div className="form-group">

                  <label>
                    Message
                  </label>

                  <textarea
                    className="quote-textarea"
                    placeholder="Example: Need UltraTech cement, 12mm Tata Tiscon TMT, preferred delivery time, unloading instructions..."
                    value={requirements}
                    onChange={(event) =>
                      setRequirements(
                        event.target.value
                      )
                    }
                  />

                </div>

              </section>

            </div>

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <aside className="bulk-quote-summary">

              <span className="section-label">
                BULK PROCUREMENT
              </span>

              <h2>
                Get Bulk Pricing
              </h2>

              <p>
                Bulk orders may require custom pricing,
                transport planning and delivery scheduling.
              </p>

              <div className="quote-benefits">

                <div>

                  <strong>
                    ✓ Multiple Materials
                  </strong>

                  <span>
                    Request several construction materials
                    in one quotation.
                  </span>

                </div>

                <div>

                  <strong>
                    ✓ Bulk Pricing
                  </strong>

                  <span>
                    Pricing can be prepared according to
                    your required quantity.
                  </span>

                </div>

                <div>

                  <strong>
                    ✓ Delivery Planning
                  </strong>

                  <span>
                    Transport and delivery can be planned
                    according to your delivery address,
                    PIN code and location.
                  </span>

                </div>

              </div>

              {/* SUBMIT */}

              <button
                type="button"
                className="submit-quote-button"
                onClick={handleSubmit}
              >
                Submit Quote Request
              </button>

              <p className="quote-disclaimer">
                Final prices, transport charges and
                availability will be confirmed before
                accepting the order.
              </p>

            </aside>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}