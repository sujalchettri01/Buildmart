import {
  BadgeCheck,
  IndianRupee,
  PackageCheck,
  Truck,
} from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: <BadgeCheck />,
      title: "Genuine Materials",
      description: "Products sourced from trusted suppliers.",
    },
    {
      icon: <IndianRupee />,
      title: "Competitive Prices",
      description: "Great pricing for retail and bulk orders.",
    },
    {
      icon: <Truck />,
      title: "Site Delivery",
      description: "Materials delivered directly to your project.",
    },
    {
      icon: <PackageCheck />,
      title: "Bulk Orders",
      description: "Built specifically for contractors and builders.",
    },
  ];

  return (
    <section className="why-section">
      <div className="container why-grid">
        {benefits.map((benefit) => (
          <div className="benefit" key={benefit.title}>
            <div className="benefit-icon">{benefit.icon}</div>

            <div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}