"use client"

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void
}

export default function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  const questions = [
    "Welke tuindiensten bieden jullie aan?",
    "Kan ik een offerte aanvragen?",
    "Wat zijn jullie openingstijden?",
    "Hoe kan ik contact opnemen?",
    "Hebben jullie ervaring met gazononderhoud?",
    "Doen jullie ook boomverzorging?",
    "Kunnen jullie een tuinontwerp maken?",
    "Installeren jullie irrigatiesystemen?",
    "Wat kost tuinonderhoud per maand?",
    "Doen jullie ecologisch tuinieren?",
  ]

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-2 whitespace-nowrap">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question)}
            className="text-xs font-medium bg-gradient-to-b from-white to-gray-50 border border-green-100 hover:border-green-300 text-green-800 py-1.5 px-3 rounded-full transition-all shadow-sm hover:shadow hover:bg-gradient-to-b hover:from-green-50 hover:to-green-100 flex-shrink-0"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  )
}
