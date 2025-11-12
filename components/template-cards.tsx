// =====================
// components/template-cards.tsx
// =====================
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const templates = [
{
title: "Basic Product",
desc: "General hardware. Core folders with docs, models, and BOM.",
img: "/images/template-basic.png",
},
{
title: "3D Printed Design",
desc: "Print-first with tunes & processes for slicer configs.",
img: "/images/template-print.jpg",
},
{
title: "Electronics Assembly",
desc: "Schematics, PCBs, and component lists organized for review.",
img: "/images/board.jpg",
},
];


export function TemplateCards() {
return (
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
{templates.map((t) => (
<Card key={t.title} className="overflow-hidden">
<CardHeader>
<CardTitle>{t.title}</CardTitle>
</CardHeader>
<CardContent className="space-y-3">
<div className="relative h-36 w-full overflow-hidden rounded-md border bg-muted">
<Image src={t.img} alt="template preview" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" fill className="object-cover" />
</div>
<p className="text-sm text-muted-foreground">{t.desc}</p>
</CardContent>
<CardFooter>
<Button className="w-full">Use this template</Button>
</CardFooter>
</Card>
))}
</div>
);
}