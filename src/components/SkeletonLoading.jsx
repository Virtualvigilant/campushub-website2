import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Clock } from "lucide-react";

export default function SkeletonLoading() {
  const repeat = (n) => Array.from({ length: n });

  return (
    <div className="min-h-screen bg-background px-4 py-8 flex flex-col gap-6">
      {/* Main Image */}
      <div className="w-full aspect-[16/10] bg-gray-300 animate-pulse rounded-2xl"></div>

      {/* Thumbnail gallery */}
      <div className="grid grid-cols-4 gap-3">
        {repeat(4).map((_, i) => (
          <div key={i} className="aspect-video bg-gray-300 animate-pulse rounded-lg"></div>
        ))}
      </div>

      {/* Title & Info */}
      <div className="space-y-2">
        <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded"></div>
        <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded"></div>
      </div>

      {/* Room Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {repeat(4).map((_, i) => (
          <div key={i} className="h-16 bg-gray-300 animate-pulse rounded-xl"></div>
        ))}
      </div>

      {/* Amenities */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="h-5 w-1/4 bg-gray-300 animate-pulse rounded"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {repeat(4).map((_, i) => (
              <div key={i} className="h-10 bg-gray-300 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Description */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-2">
          <div className="h-5 w-1/3 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-20 w-full bg-gray-300 animate-pulse rounded"></div>
        </CardContent>
      </Card>

      {/* Deposit */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-1">
          {repeat(3).map((_, i) => (
            <div key={i} className="h-3 w-full bg-gray-300 animate-pulse rounded"></div>
          ))}
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="border-border/50">
        <CardContent className="p-4 space-y-3">
          <div className="h-5 w-1/4 bg-gray-300 animate-pulse rounded"></div>
          {repeat(2).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 w-1/3 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-3 w-full bg-gray-300 animate-pulse rounded"></div>
              </div>
            </div>
          ))}
          <div className="h-8 w-full bg-gray-300 animate-pulse rounded"></div>
        </CardContent>
      </Card>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card className="border-border/50 sticky top-24">
          <CardContent className="p-4 space-y-3">
            <div className="h-6 w-1/3 bg-gray-300 animate-pulse rounded"></div>
            <div className="h-8 w-full bg-gray-300 animate-pulse rounded"></div>
            <div className="h-12 w-full bg-gray-300 animate-pulse rounded"></div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full"></div>
              <div className="space-y-1 flex-1">
                <div className="h-3 w-1/2 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-2 w-1/3 bg-gray-300 animate-pulse rounded"></div>
              </div>
            </div>
            <div className="h-8 w-full bg-gray-300 animate-pulse rounded"></div>

            <div className="bg-muted/50 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm mb-1">
                <Clock className="w-3 h-3 text-gray-300 animate-pulse" />
                <div className="h-2 w-1/4 bg-gray-300 animate-pulse rounded"></div>
              </div>
              <Textarea className="h-16 resize-none bg-gray-300 animate-pulse" />
              <div className="h-8 w-full bg-gray-300 animate-pulse rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
