import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  X, 
  Grid3X3, 
  List,
  ChevronDown
} from "lucide-react";

const allRooms = [
  {
    id: "1",
    title: "Modern Bedsitter Near University",
    type: "Bedsitter",
    price: 8500,
    location: "Langata Road",
    distance: "500m",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
    amenities: ["WiFi", "Water", "Electricity"],
    verified: true,
    rating: 4.8,
    reviews: 24,
  },
  {
    id: "2",
    title: "Spacious Single Room with Balcony",
    type: "Single Room",
    price: 6000,
    location: "Kibera Drive",
    distance: "800m",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    amenities: ["Water", "Electricity"],
    verified: true,
    rating: 4.5,
    reviews: 18,
  },
  {
    id: "3",
    title: "Cozy 1-Bedroom Apartment",
    type: "1 Bedroom",
    price: 15000,
    location: "Nairobi West",
    distance: "1.2km",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600",
    amenities: ["WiFi", "Water", "Electricity"],
    verified: false,
    rating: 4.2,
    reviews: 12,
  },
  {
    id: "4",
    title: "Student Hostel - Shared Room",
    type: "Shared",
    price: 4500,
    location: "University Way",
    distance: "200m",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600",
    amenities: ["WiFi", "Water"],
    verified: true,
    rating: 4.0,
    reviews: 45,
  },
  {
    id: "5",
    title: "Furnished Studio Apartment",
    type: "Studio",
    price: 12000,
    location: "Kilimani",
    distance: "2km",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600",
    amenities: ["WiFi", "Water", "Electricity"],
    verified: true,
    rating: 4.7,
    reviews: 31,
  },
  {
    id: "6",
    title: "Budget Single Room",
    type: "Single Room",
    price: 5000,
    location: "South C",
    distance: "1.5km",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600",
    amenities: ["Water", "Electricity"],
    verified: false,
    rating: 3.8,
    reviews: 8,
  },
  {
    id: "7",
    title: "Premium 2-Bedroom with Study",
    type: "2 Bedroom",
    price: 25000,
    location: "Westlands",
    distance: "3km",
    image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=600",
    amenities: ["WiFi", "Water", "Electricity"],
    verified: true,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: "8",
    title: "Affordable Bedsitter for Students",
    type: "Bedsitter",
    price: 7000,
    location: "Lavington",
    distance: "1.8km",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600",
    amenities: ["Water", "Electricity"],
    verified: true,
    rating: 4.3,
    reviews: 22,
  },
];

const roomTypes = ["All Types", "Single Room", "Bedsitter", "Studio", "1 Bedroom", "2 Bedroom", "Shared"];
const distances = ["Any Distance", "< 500m", "< 1km", "< 2km", "< 5km"];

export default function Listings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedDistance, setSelectedDistance] = useState("Any Distance");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // removed TypeScript type
  const [sortBy, setSortBy] = useState("recommended");

  const filteredRooms = allRooms.filter((room) => {
    if (verifiedOnly && !room.verified) return false;
    if (selectedType !== "All Types" && room.type !== selectedType) return false;
    if (room.price < priceRange[0] || room.price > priceRange[1]) return false;
    if (searchQuery && !room.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !room.location.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const activeFiltersCount = [
    selectedType !== "All Types",
    selectedDistance !== "Any Distance",
    verifiedOnly,
    priceRange[0] > 0 || priceRange[1] < 30000,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Browse Rooms</h1>
            <p className="text-muted-foreground">
              {filteredRooms.length} verified rooms available near your campus
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search by location, title, or campus..."
                className="pl-12 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="h-12 gap-2"
                onClick={() => setShowFilters(!showFilters)}
                data-testid="button-toggle-filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1">{activeFiltersCount}</Badge>
                )}
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 w-[180px]" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="distance">Nearest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="hidden md:flex border border-border rounded-lg overflow-hidden">
                <button
                  className={`p-3 ${viewMode === "grid" ? "bg-muted" : "hover:bg-muted/50"} transition-colors`}
                  onClick={() => setViewMode("grid")}
                  data-testid="button-view-grid"
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  className={`p-3 ${viewMode === "list" ? "bg-muted" : "hover:bg-muted/50"} transition-colors`}
                  onClick={() => setViewMode("list")}
                  data-testid="button-view-list"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {showFilters && (
            <Card className="mb-8 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Filter Results</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedType("All Types");
                      setSelectedDistance("Any Distance");
                      setVerifiedOnly(false);
                      setPriceRange([0, 30000]);
                    }}
                    data-testid="button-clear-filters"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Room Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger data-testid="select-room-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Distance from Campus</label>
                    <Select value={selectedDistance} onValueChange={setSelectedDistance}>
                      <SelectTrigger data-testid="select-distance">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {distances.map((dist) => (
                          <SelectItem key={dist} value={dist}>{dist}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">
                      Price Range: KES {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      min={0}
                      max={30000}
                      step={500}
                      className="mt-6"
                      data-testid="slider-price"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Other Filters</label>
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id="verified" 
                        checked={verifiedOnly}
                        onCheckedChange={(checked) => setVerifiedOnly(checked)}
                        data-testid="checkbox-verified"
                      />
                      <label htmlFor="verified" className="text-sm cursor-pointer">
                        Verified listings only
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedType !== "All Types" && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  {selectedType}
                  <button 
                    onClick={() => setSelectedType("All Types")}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {verifiedOnly && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  Verified Only
                  <button 
                    onClick={() => setVerifiedOnly(false)}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 30000) && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  KES {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                  <button 
                    onClick={() => setPriceRange([0, 30000])}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          {filteredRooms.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} {...room} />
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="py-16 text-center">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No rooms found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType("All Types");
                    setSelectedDistance("Any Distance");
                    setVerifiedOnly(false);
                    setPriceRange([0, 30000]);
                  }}
                  data-testid="button-reset-search"
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="mt-12 flex justify-center">
            <Button variant="outline" size="lg" className="gap-2" data-testid="button-load-more">
              Load More Rooms
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
