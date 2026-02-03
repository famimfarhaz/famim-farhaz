import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Home, Mail, CircleHelp } from "lucide-react";

function NotFoundPage() {
  return (
    <div className="relative isolate flex min-h-[70vh] items-center justify-center p-6">
      {/* glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(40rem_20rem_at_50%_-4rem,theme(colors.primary/15),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

      <Empty className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-sm md:p-12">
        {/* top badge */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-muted-foreground shadow-sm">
          <CircleHelp className="size-3.5" />
          404 — Not found
        </div>

        <EmptyHeader>
          <EmptyMedia>
            <Avatar className="size-16 ring-4 ring-white/10 shadow-xl">
              <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
              <AvatarFallback>FF</AvatarFallback>
            </Avatar>
          </EmptyMedia>
          <EmptyTitle className="text-3xl md:text-4xl">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">Page not found</span>
          </EmptyTitle>
          <EmptyDescription>
            The page you’re looking for doesn’t exist, has been moved, or the URL
            is mistyped.
          </EmptyDescription>
        </EmptyHeader>

        <EmptyContent>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild>
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="size-4" /> Go to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact" className="inline-flex items-center gap-2">
                <Mail className="size-4" /> Contact Me
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}

export { NotFoundPage };
export default NotFoundPage;
