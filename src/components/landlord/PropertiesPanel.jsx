// src/components/landlord/PropertiesPanel.jsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function PropertiesPanel({ properties, onAdd, onEdit, onDelete }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Properties</h2>
        <Button onClick={onAdd} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      <div className="space-y-4">
        {properties.map((property) => (
          <Card key={property.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{property.name}</p>
                <p className="text-sm text-muted-foreground">{property.location}</p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" onClick={() => onEdit(property)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => onDelete(property.id)}>
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
