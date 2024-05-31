import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
  src?: string | null | undefined;
  height: number;
  width: number;
}

const Avatar: React.FC<AvatarProps> = ({ src, height, width }) => {
  if (src) {
    return (
      <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height={height}
        width={width}
      />
    );
  }
  return <FaUserCircle size={24} />;
};

export default Avatar;
