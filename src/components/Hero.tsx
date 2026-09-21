import { ArrowRight, Search } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <span className="hero-label">
            Construction materials delivered
          </span>

          <h1>
            Everything You Need
            <br />
            <span>To Build.</span>
          </h1>

          <p>
            Cement, steel, plumbing, electrical and construction
            materials from trusted brands delivered directly to your site.
          </p>

          <div className="hero-search">
            <Search />

            <input
              type="text"
              placeholder="What material are you looking for?"
            />

            <button>
              Search
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="popular-searches">
            <span>Popular:</span>
            <button>Cement</button>
            <button>TMT Steel</button>
            <button>PVC Pipes</button>
            <button>Paint</button>
          </div>
        </div>
      </div>
    </section>
  );
}