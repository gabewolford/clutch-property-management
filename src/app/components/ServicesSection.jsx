import ServicesCard from "./ServicesCard";
import services from "./data/services";

export default function ServicesSection({ id, variant }) {
  if (variant === "grid") {
    return (
      <section id={id}>
        <div className="flex flex-col z-10 w-full h-full bg-primaryLight text-primaryDark border-b border-secondaryBlue">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 h-full px-5 py-20">
            {services.map((service, index) => (
              <ServicesCard key={index} service={service} variant={`grid`} />
            ))}
          </div>
        </div>
      </section>
    );
  } else if (variant === "list") {
    return (
      <section
        id={id}
        className="flex flex-col z-10 w-full h-full bg-primaryLight text-primaryDark"
      >
        <div className="flex flex-col w-full h-full bg-primaryLight text-primaryDark">
          {services.map((service, index) => (
            <ServicesCard key={index} service={service} variant={`list`} />
          ))}
        </div>
      </section>
    );
  }
}
