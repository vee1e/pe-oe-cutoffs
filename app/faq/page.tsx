"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    id: "difficulty",
    question: "What does 'Difficulty' mean?",
    answer:
      'The "difficulty" rating indicates how competitive or challenging it is to get allocated into a subject based on historical allocation data. It reflects the difficulty of the allocation process itself, not the academic difficulty of the subject material. A higher difficulty means fewer students typically get into the course relative to demand.',
  },
  {
    id: "allocation",
    question: "How does the allocation process work?",
    answer:
      "Students submit their subject preferences in a ranked order. These preferences are then allocated based on 4th semester CGPA (Cumulative Grade Point Average). The number of students who can be enrolled in each class is determined by the class capacity. Students are allocated subjects starting from their highest-ranked preference, with higher CGPA students getting priority. If a student's top preference is full, they move on to their second preference, and so on.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-serif mb-2">FAQ</h1>
        <p className="text-neutral-400 mb-8">
          Frequently asked questions about the elective allocation system.
        </p>

        <Card className="bg-neutral-900/50 border-neutral-800">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-neutral-800"
                >
                  <AccordionTrigger className="text-left hover:text-white pr-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
