const brands = [
  "UltraTech",
  "ACC",
  "Tata Tiscon",
  "JSW Steel",
  "Asian Paints",
  "Astral",
];

export default function Brands() {
  return (
    <section className="brands-section">
      <div className="container">

        <div className="section-header">
          <div>
            <span className="section-label">TRUSTED BRANDS</span>
            <h2>Shop by Brand</h2>
          </div>
        </div>

        <div className="brands-grid">
          {brands.map((brand) => (
            <div className="brand-card" key={brand}>
              {brand}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}