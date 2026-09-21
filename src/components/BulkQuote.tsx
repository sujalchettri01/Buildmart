import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function BulkQuote() {
  return (
    <section className="bulk-section">
      <div className="container">

        <div className="bulk-box">

          {/* ICON */}

          <div className="bulk-icon">
            <FileText size={36} />
          </div>

          {/* CONTENT */}

          <div>
            <span>
              FOR CONTRACTORS & BUILDERS
            </span>

            <h2>
              Buying construction materials in bulk?
            </h2>

            <p>
              Send us your material requirement and get
              competitive pricing for your complete project.
            </p>
          </div>

          {/* REQUEST QUOTE BUTTON */}

          <Link
            to="/bulk-quote"
            className="bulk-quote-button"
          >
            Request a Quote
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}