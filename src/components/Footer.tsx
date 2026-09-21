export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo">
            Build<span>Mart</span>
          </div>

          <p>
            Your one-stop destination for construction and hardware
            materials.
          </p>
        </div>

        <div>
          <h4>Categories</h4>
          <a href="#">Cement</a>
          <a href="#">Steel</a>
          <a href="#">Plumbing</a>
          <a href="#">Electrical</a>
        </div>

        <div>
          <h4>Customer Service</h4>
          <a href="#">Contact Us</a>
          <a href="#">Track Order</a>
          <a href="#">Returns</a>
          <a href="#">FAQ</a>
        </div>

        <div>
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Terms</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2026 BuildMart. All rights reserved.
      </div>
    </footer>
  );
}