import { default as NextLink } from "next/link";
import { cn } from "~/lib/utils";

type LinkProps = {
  href: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLAnchorElement>;

/** A blue link component, for consistent styling of links. */
export default function BlueLink({ href, children, ...attrs }: LinkProps) {
  return (
    <NextLink
      href={href}
      className={cn(
        "text-blue-800 underline hover:text-blue-500",
        attrs.className,
      )}
      {...attrs}
    >
      {children}
    </NextLink>
  );
}
