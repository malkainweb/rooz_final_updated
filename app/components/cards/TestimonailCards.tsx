import { Testimonial } from "../testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isCenter: boolean;
}

// Testimonial Card Component
const TestimonialCard = ({ testimonial, isCenter }: TestimonialCardProps) => {
  return (
    <div
      className={`bg-zinc-800/50  flex flex-col justify-between h-full backdrop-blur-sm p-6 rounded-[30px] border border-zinc-700/50 transition-all duration-500 `}
    >
      <p className="text-gray-300 mb-8 leading-relaxed text-left">
        {testimonial.text}
      </p>
      <div className="flex border-t border-t-[#D9D9D9]/50 pt-8 items-center  gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-white font-semibold">- {testimonial.author}</p>
          <p className="text-gray-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
