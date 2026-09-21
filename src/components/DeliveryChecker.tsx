import { useState } from "react";
import { MapPin } from "lucide-react";

export default function DeliveryChecker() {
  const [pinCode, setPinCode] = useState("");
  const [status, setStatus] = useState<
    "idle" | "available" | "unavailable" | "invalid"
  >("idle");

  const checkDelivery = () => {
    if (!/^\d{6}$/.test(pinCode)) {
      setStatus("invalid");
      return;
    }

    /*
      FRONTEND DEMO ONLY

      For now we are using sample PIN prefixes.

      Later this will call the backend and check
      actual serviceable PIN codes.
    */

    const serviceablePrefixes = [
      "734", // Siliguri / nearby sample
      "737", // Sikkim sample
    ];

    const isAvailable =
      serviceablePrefixes.some((prefix) =>
        pinCode.startsWith(prefix)
      );

    if (isAvailable) {
      setStatus("available");
    } else {
      setStatus("unavailable");
    }
  };

  return (
    <div className="delivery-checker">

      <div className="delivery-checker-heading">
        <MapPin size={18} />

        <div>
          <strong>
            Check Delivery Availability
          </strong>

          <span>
            Enter your delivery PIN code
          </span>
        </div>
      </div>

      <div className="delivery-checker-form">

        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter 6-digit PIN code"
          maxLength={6}
          value={pinCode}
          onChange={(event) => {
            const value =
              event.target.value.replace(/\D/g, "");

            setPinCode(value);
            setStatus("idle");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              checkDelivery();
            }
          }}
        />

        <button
          type="button"
          onClick={checkDelivery}
        >
          Check
        </button>

      </div>

      {status === "invalid" && (
        <div className="delivery-message delivery-invalid">
          Please enter a valid 6-digit PIN code.
        </div>
      )}

      {status === "available" && (
        <div className="delivery-message delivery-available">

          <strong>
            ✓ Delivery available
          </strong>

          <span>
            Estimated delivery: 2–5 business days
          </span>

        </div>
      )}

      {status === "unavailable" && (
        <div className="delivery-message delivery-unavailable">

          <strong>
            Delivery currently unavailable
          </strong>

          <span>
            You can still request a bulk quotation for
            this location.
          </span>

        </div>
      )}

    </div>
  );
}