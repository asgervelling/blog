import { default as NextLink } from "next/link";

type LinkProps = {
  href: string;
  children: React.ReactNode;
};

/** A blue link component, for consistent styling of links. */
export default function BlueLink({ href, children }: LinkProps) {
  return (
    <NextLink href={href} className="text-blue-800 underline hover:text-blue-500">
      {children}
    </NextLink>
  );
}
