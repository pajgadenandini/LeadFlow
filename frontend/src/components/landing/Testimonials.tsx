import React from "react";

interface TestimonialProps {
  image: string;
  name: string;
  position: string;
  company: string;
  quote: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  image,
  name,
  position,
  company,
  quote,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">
            {position}, {company}
          </p>
        </div>
      </div>
      <p className="text-gray-600 italic">{quote}</p>
      <div className="mt-4 flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="h-5 w-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      name: "Sarah Johnson",
      position: "Sales Director",
      company: "TechCorp",
      quote:
        '"This platform has transformed how we manage our leads. We\'ve seen a 40% increase in conversion rates since implementing it."',
    },
    {
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      name: "Michael Chen",
      position: "CEO",
      company: "GrowthStartup",
      quote:
        '"The analytics and reporting features have given us insights we never had before. Our sales team is now much more efficient."',
    },
    {
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
      name: "Emily Rodriguez",
      position: "Sales Manager",
      company: "RetailPlus",
      quote:
        '"The email campaign features have revolutionized our lead nurturing process. We\'re closing deals faster than ever before."',
    },
  ];

  return (
    <div className="py-16 bg-indigo-50 rounded-2xl px-8 my-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          Trusted by Sales Teams Worldwide
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          See what our customers have to say about our lead management platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={index}
            image={testimonial.image}
            name={testimonial.name}
            position={testimonial.position}
            company={testimonial.company}
            quote={testimonial.quote}
          />
        ))}
      </div>
    </div>
  );
};
