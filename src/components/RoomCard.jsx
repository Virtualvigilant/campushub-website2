// RoomCard.jsx
import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { MapPin, Wifi, Droplets, Zap, Shield, Star, Heart } from "lucide-react";
import { Link } from "wouter";

const amenityIcons = {
  wifi: <Wifi className="w-3.5 h-3.5" />,
  water: <Droplets className="w-3.5 h-3.5" />,
  electricity: <Zap className="w-3.5 h-3.5" />,
};

export function RoomCard({
  id,
  title,
  type,
  price,
  location,
  distance,
  image,
  amenities,
  verified,
  rating,
  reviews,
}) {
  return (
    <Card 
      className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
      data-testid={`card-room-${id}`}
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          {verified && (
            <Badge className="bg-primary text-primary-foreground gap-1">
              <Shield className="w-3 h-3" />
              Verified
            </Badge>
          )}
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {type}
          </Badge>
        </div>

        <button 
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          data-testid={`button-favorite-${id}`}
        >
          <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500 transition-colors" />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-white/80 text-sm flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {distance} from campus
            </p>
          </div>
          {rating && (
            <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">{rating}</span>
              {reviews && <span className="text-xs text-muted-foreground">({reviews})</span>}
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
            {location}
          </p>
        </div>

        <div className="flex gap-2">
          {amenities.slice(0, 3).map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-1 text-xs text-muted-foreground bg-muted rounded-full px-2 py-1"
            >
              {amenityIcons[amenity.toLowerCase()]}
              <span className="capitalize">{amenity}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <span className="text-xl font-bold text-primary">KES {price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <Link href={`/room/${id}`}>
            <Button size="sm" data-testid={`button-view-${id}`}>
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
