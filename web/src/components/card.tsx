import Image from "next/image";

interface CardProps {
  title: string;
  thumbnail: string;
  completionStatus: string;
}

const Card: React.FC<CardProps> = ({ title, thumbnail, completionStatus }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={thumbnail}
        alt={title}
        width={300}
        height={169}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{completionStatus}</p>
      </div>
    </div>
  );
};

export default Card;
