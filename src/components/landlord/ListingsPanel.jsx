// src/components/landlord/ListingsPanel.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ListingsPanel({ listings, onAdd, onEdit, onDelete }) {
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-2xl font-bold">Room Listings</h2>
                <Button onClick={onAdd} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Listing
                </Button>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {listings.map((listing) => (
                    <Card key={listing.id}>
                        <CardHeader>
                            <CardTitle>{listing.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Price: KES {listing.price.toLocaleString()}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Button size="icon" variant="outline" onClick={() => onEdit(listing)}>
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="destructive" onClick={() => onDelete(listing.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
