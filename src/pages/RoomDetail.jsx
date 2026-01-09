import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  MapPin, 
  Shield, 
  Star, 
  Heart, 
  Share2, 
  Wifi, 
  Droplets, 
  Zap, 
  Car,
  Users,
  Ruler,
  Calendar,
  MessageCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";

const roomData = {
  id: "1",
  title: "Modern Bedsitter Near University",
  type: "Bedsitter",
  price: 8500,
  deposit: 8500,
  location: "Langata Road, Near University of Nairobi",
  distance: "500m",
  size: "18 sqm",
  maxOccupants: 1,
  availableFrom: "Immediately",
  images: [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
  ],
  amenities: [
    { name: "WiFi", icon: Wifi, available: true },
    { name: "Water", icon: Droplets, available: true },
    { name: "Electricity", icon: Zap, available: true },
    { name: "Parking", icon: Car, available: false },
  ],
  description: `This modern bedsitter is perfect for students looking for comfortable, affordable accommodation near campus. 

The room features:
• Well-lit living space with large windows
• Modern kitchenette with cooking essentials
• Private bathroom with hot shower
• Built-in wardrobe for storage
• Study desk area

The building has 24-hour security, a backup water tank, and is located just 5 minutes walk from the main campus gate. Nearby amenities include a supermarket, pharmacy, and several food joints popular with students.`,
  verified: true,
  rating: 4.8,
  reviews: 24,
  landlord: {
    name: "John Kamau",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    responseRate: "98%",
    responseTime: "within 2 hours",
    memberSince: "2022",
    properties: 8,
  },
  reviewsList: [
    {
      id: "1",
      author: "Mary W.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      rating: 5,
      date: "2 weeks ago",
      comment: "Great place! Very clean and the landlord is super responsive. Perfect for students.",
    },
    {
      id: "2",
      author: "Peter K.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      rating: 4,
      date: "1 month ago",
      comment: "Good value for money. Close to campus and peaceful neighborhood. Water pressure could be better though.",
    },
  ],
};

export default function RoomDetail() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Link href="/listings">
              <Button variant="ghost" className="gap-2 -ml-4" data-testid="button-back">
                <ChevronLeft className="w-4 h-4" />
                Back to listings
              </Button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                <img 
                  src={roomData.images[currentImage]}
                  alt={roomData.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  {roomData.verified && (
                    <Badge className="bg-primary text-primary-foreground gap-1">
                      <Shield className="w-3 h-3" />
                      Verified
                    </Badge>
                  )}
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {roomData.type}
                  </Badge>
                </div>

                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isFavorited ? "bg-red-500 text-white" : "bg-white/90 text-muted-foreground hover:text-red-500"
                    }`}
                    onClick={() => setIsFavorited(!isFavorited)}
                    data-testid="button-favorite"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                  </button>
                  <button 
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-share"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <button 
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-foreground hover:bg-white transition-colors disabled:opacity-50"
                    onClick={() => setCurrentImage(Math.max(0, currentImage - 1))}
                    disabled={currentImage === 0}
                    data-testid="button-prev-image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {roomData.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImage ? "bg-white" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentImage(index)}
                      />
                    ))}
                  </div>
                  <button 
                    className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-foreground hover:bg-white transition-colors disabled:opacity-50"
                    onClick={() => setCurrentImage(Math.min(roomData.images.length - 1, currentImage + 1))}
                    disabled={currentImage === roomData.images.length - 1}
                    data-testid="button-next-image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {roomData.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImage ? "border-primary" : "border-transparent hover:border-border"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{roomData.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {roomData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {roomData.rating} ({roomData.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Ruler className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Size</p>
                  <p className="font-semibold">{roomData.size}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Max Occupants</p>
                  <p className="font-semibold">{roomData.maxOccupants}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <MapPin className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="font-semibold">{roomData.distance}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="font-semibold">{roomData.availableFrom}</p>
                </div>
              </div>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {roomData.amenities.map((amenity) => (
                      <div 
                        key={amenity.name}
                        className={`flex items-center gap-3 p-3 rounded-lg ${
                          amenity.available ? "bg-primary/5" : "bg-muted/50 opacity-50"
                        }`}
                      >
                        <amenity.icon className={`w-5 h-5 ${amenity.available ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={amenity.available ? "" : "line-through"}>{amenity.name}</span>
                        {amenity.available && <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{roomData.description}</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Reviews</h2>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{roomData.rating}</span>
                      <span className="text-muted-foreground">({roomData.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {roomData.reviewsList.map((review) => (
                      <div key={review.id} className="border-b border-border/50 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>{review.author[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium">{review.author}</span>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                            <div className="flex gap-0.5 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-6" data-testid="button-all-reviews">
                    View All {roomData.reviews} Reviews
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-border/50 sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-primary">KES {roomData.price.toLocaleString()}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Deposit: KES {roomData.deposit.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full h-12 gap-2" size="lg" data-testid="button-book-viewing">
                      <Calendar className="w-5 h-5" />
                      Book Viewing
                    </Button>
                    <Button variant="outline" className="w-full h-12 gap-2" size="lg" data-testid="button-message">
                      <MessageCircle className="w-5 h-5" />
                      Message Landlord
                    </Button>
                  </div>

                  <div className="border-t border-border pt-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={roomData.landlord.image} />
                        <AvatarFallback>{roomData.landlord.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{roomData.landlord.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {roomData.landlord.properties} properties
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Response rate</span>
                        <span className="font-medium text-primary">{roomData.landlord.responseRate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Response time</span>
                        <span className="font-medium">{roomData.landlord.responseTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Member since</span>
                        <span className="font-medium">{roomData.landlord.memberSince}</span>
                      </div>
                    </div>

                    <Button variant="ghost" className="w-full mt-4 gap-2" data-testid="button-call">
                      <Phone className="w-4 h-4" />
                      Show Phone Number
                    </Button>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Clock className="w-4 h-4" />
                      Quick Inquiry
                    </div>
                    <Textarea 
                      placeholder="Hi, I'm interested in this room. Is it still available?"
                      className="mb-3 resize-none"
                      rows={3}
                      data-testid="textarea-inquiry"
                    />
                    <Button className="w-full" data-testid="button-send-inquiry">
                      Send Inquiry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
