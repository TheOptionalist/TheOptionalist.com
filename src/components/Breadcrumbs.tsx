import Link from "next/link";

export default function Breadcrumbs({
  items
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <div className="breadcrumbs">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`}>
            {item.href && !isLast ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
            {!isLast && <span> / </span>}
          </span>
        );
      })}
    </div>
  );
}
