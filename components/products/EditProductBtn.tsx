import Link from "next/link";
import Pen from "../../public/img/icons/pen.svg";

type Props = {
  id: string | number;
  children?: string;
  cssClass?: string;
};

export default function EditProductBtn({ id, children, cssClass }: Props) {
  return (
    <Link
      href={`/product/${id}/edit`}
      className={` text-green-500 rounded-lg bg-white px-2 py-1 flex gap-2 justify-center items-center ${cssClass}`}
    >
      {children}
      <Pen />
    </Link>
  );
}
